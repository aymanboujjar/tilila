<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ExpertAccountCreated;
use App\Models\Expert;
use App\Models\ExpertApplication;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ExpertApplicationController extends Controller
{
    public function index(Request $request): Response
    {
        $query = ExpertApplication::query()->orderByDesc('created_at');

        if ($search = trim((string) $request->query('search', ''))) {
            $like = '%'.$search.'%';
            $query->where(function ($q) use ($like): void {
                $q->where('full_name', 'like', $like)
                    ->orWhere('email', 'like', $like)
                    ->orWhere('country', 'like', $like)
                    ->orWhere('city', 'like', $like)
                    ->orWhere('current_title', 'like', $like)
                    ->orWhere('status', 'like', $like);
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        return Inertia::render('admin/experts/applications', [
            'applications' => $query->paginate(15)->withQueryString(),
            'filters' => [
                'search' => $request->query('search', ''),
                'status' => $request->query('status', ''),
            ],
            'kpis' => [
                'total' => ExpertApplication::query()->count(),
                'pending' => ExpertApplication::query()->where('status', 'pending')->count(),
                'accepted' => ExpertApplication::query()->where('status', 'accepted')->count(),
                'denied' => ExpertApplication::query()->where('status', 'denied')->count(),
            ],
        ]);
    }

    public function review(Request $request, ExpertApplication $application): RedirectResponse
    {
        $data = $request->validate([
            'decision' => ['required', 'in:accepted,denied'],
            'admin_notes' => ['nullable', 'string', 'max:5000'],
        ]);

        if ($application->status !== 'pending') {
            return back()->with('error', 'This application has already been reviewed.');
        }

        $credentialPayload = null;
        $mailFailed = false;

        DB::transaction(function () use ($application, $data, $request, &$credentialPayload): void {
            $expertId = $application->expert_id;

            if ($data['decision'] === 'accepted') {
                $account = $this->createOrResolveExpertUser($application);
                $expert = $this->createExpertFromApplication($application, $account['user']);
                $expertId = $expert->id;

                $credentialPayload = [
                    'user' => $account['user'],
                    'temporary_password' => $account['temporary_password'],
                    'new_account' => $account['new_account'],
                ];
            }

            $application->update([
                'status' => $data['decision'],
                'admin_notes' => $data['admin_notes'] ?? null,
                'reviewed_at' => now(),
                'reviewed_by_id' => $request->user()?->id,
                'expert_id' => $expertId,
            ]);
        });

        if ($credentialPayload !== null) {
            try {
                /** @var User $targetUser */
                $targetUser = $credentialPayload['user'];

                Mail::to($targetUser->email)->send(new ExpertAccountCreated(
                    user: $targetUser,
                    temporaryPassword: $credentialPayload['temporary_password'],
                    isNewAccount: (bool) $credentialPayload['new_account'],
                ));
            } catch (\Throwable $e) {
                report($e);
                $mailFailed = true;
            }
        }

        if ($mailFailed) {
            return back()->with('warning', 'Application was accepted, but the access email could not be sent. Please verify mail settings and retry.');
        }

        return back()->with('success', 'Application reviewed successfully.');
    }

    public function show(ExpertApplication $application): Response
    {
        $application->load(['reviewedBy:id,name,email', 'expert:id,slug']);

        return Inertia::render('admin/experts/application-show', [
            'application' => $application,
        ]);
    }

    /**
     * @return array{user: User, temporary_password: string|null, new_account: bool}
     */
    private function createOrResolveExpertUser(ExpertApplication $application): array
    {
        $existing = User::query()
            ->where('email', $application->email)
            ->first();

        if ($existing) {
            if ($existing->role !== 'admin' && $existing->role !== 'expert') {
                $existing->role = 'expert';
                $existing->save();
            }

            return [
                'user' => $existing,
                'temporary_password' => null,
                'new_account' => false,
            ];
        }

        $temporaryPassword = Str::password(12);

        $user = User::query()->create([
            'name' => $application->full_name,
            'email' => $application->email,
            'password' => $temporaryPassword,
            'role' => 'expert',
            'email_verified_at' => now(),
        ]);

        return [
            'user' => $user,
            'temporary_password' => $temporaryPassword,
            'new_account' => true,
        ];
    }

    private function createExpertFromApplication(ExpertApplication $application, User $user): Expert
    {
        if ($application->expert_id) {
            $expert = Expert::query()->findOrFail($application->expert_id);
            if ($expert->user_id === null) {
                $expert->update(['user_id' => $user->id]);
            }

            return $expert;
        }

        $fullName = trim((string) $application->full_name);
        $title = trim((string) ($application->current_title ?: 'Expert'));
        $topics = $this->extractTopics((string) $application->expertise);
        $topicTags = array_map(static fn (string $topic) => [
            'en' => $topic,
            'fr' => $topic,
            'ar' => $topic,
        ], $topics);

        $bio = trim((string) ($application->bio ?? ''));

        return Expert::query()->create([
            'user_id' => $user->id,
            'slug' => $this->uniqueSlugFromName($fullName),
            'name' => ['en' => $fullName, 'fr' => $fullName, 'ar' => $fullName],
            'title' => ['en' => $title, 'fr' => $title, 'ar' => $title],
            'tags' => $topicTags,
            'location' => $application->city,
            'country' => $application->country ?: 'Morocco',
            'industries' => array_map(static fn (string $topic) => Str::slug($topic), $topics),
            'languages' => [],
            'badge' => 'Available',
            'status' => 'published',
            'email' => $application->email,
            'details' => [
                'headlineTags' => $topicTags,
                'bio' => [
                    [
                        'en' => $bio,
                        'fr' => $bio,
                        'ar' => $bio,
                    ],
                ],
                'quote' => ['en' => '', 'fr' => '', 'ar' => ''],
                'socials' => [
                    'linkedin' => (string) ($application->linkedin_url ?? ''),
                    'twitter' => '',
                    'instagram' => '',
                ],
                'expertise' => [],
                'journey' => [],
                'appearances' => [],
                'articles' => [],
            ],
            'last_activity_at' => now(),
        ]);
    }

    /**
     * @return list<string>
     */
    private function extractTopics(string $raw): array
    {
        $items = preg_split('/[,;\n]+/', $raw) ?: [];

        $topics = [];
        foreach ($items as $item) {
            $topic = trim($item);
            if ($topic === '') {
                continue;
            }

            $topics[] = Str::limit($topic, 64, '');
        }

        return array_values(array_unique(array_slice($topics, 0, 6)));
    }

    private function uniqueSlugFromName(string $name): string
    {
        $base = Str::slug($name);
        if ($base === '') {
            $base = 'expert';
        }

        $slug = $base;
        $n = 1;

        while (Expert::query()->where('slug', $slug)->exists()) {
            $slug = $base.'-'.$n++;
        }

        return $slug;
    }
}
