<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Expert;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ExpertController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Expert::query()->orderByDesc('updated_at');

        if ($search = trim((string) $request->query('search', ''))) {
            $like = '%'.$search.'%';
            $query->where(function ($q) use ($like, $search) {
                $q->where('slug', 'like', $like)
                    ->orWhere('email', 'like', $like)
                    ->orWhere('status', 'like', $like);

                foreach (['en', 'fr', 'ar'] as $loc) {
                    $q->orWhere("name->{$loc}", 'like', $like);
                }
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $experts = $query->paginate(15)->withQueryString();

        return Inertia::render('admin/experts/index', [
            'experts' => $experts,
            'filters' => [
                'search' => $request->query('search', ''),
                'status' => $request->query('status', ''),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/experts/create', [
            'statuses' => ['draft', 'pending', 'published', 'suspended'],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Expert::query()->create($this->validated($request));

        return redirect()->route('admin.experts.index')
            ->with('success', 'Expert created.');
    }

    public function edit(Expert $expert): Response
    {
        return Inertia::render('admin/experts/edit', [
            'expert' => $this->expertToForm($expert),
            'statuses' => ['draft', 'pending', 'published', 'suspended'],
        ]);
    }

    public function update(Request $request, Expert $expert): RedirectResponse
    {
        $expert->update($this->validated($request, $expert));

        return redirect()->route('admin.experts.index')
            ->with('success', 'Expert updated.');
    }

    public function destroy(Expert $expert): RedirectResponse
    {
        $expert->delete();

        return redirect()->route('admin.experts.index')
            ->with('success', 'Expert deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function expertToForm(Expert $expert): array
    {
        return [
            'id' => $expert->id,
            'slug' => $expert->slug,
            'name' => $expert->name,
            'title' => $expert->title,
            'tags' => $expert->tags ?? [],
            'location' => $expert->location ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'country' => $expert->country,
            'industries' => $expert->industries ?? [],
            'languages' => $expert->languages ?? [],
            'gradient' => $expert->gradient ?? '',
            'badge' => $expert->badge,
            'status' => $expert->status,
            'email' => $expert->email,
            'avatar' => $expert->avatar,
            'details' => $expert->details,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?Expert $expert = null): array
    {
        $slugRules = [
            'required',
            'string',
            'max:255',
            'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
        ];
        $slugRules[] = $expert
            ? Rule::unique('experts', 'slug')->ignore($expert->id)
            : Rule::unique('experts', 'slug');

        $validated = $request->validate([
            'slug' => $slugRules,
            'name' => 'required|array',
            'name.en' => 'required|string|max:255',
            'name.fr' => 'nullable|string|max:255',
            'name.ar' => 'nullable|string|max:255',
            'title' => 'required|array',
            'title.en' => 'required|string|max:500',
            'title.fr' => 'nullable|string|max:500',
            'title.ar' => 'nullable|string|max:500',
            'tags' => 'nullable|array',
            'location' => 'nullable|array',
            'country' => 'required|string|max:4',
            'industries' => 'nullable|array',
            'industries.*' => 'string|max:64',
            'languages' => 'nullable|array',
            'languages.*' => 'string|max:8',
            'gradient' => 'nullable|string|max:255',
            'badge' => 'nullable|string|max:64',
            'status' => 'required|in:draft,pending,published,suspended',
            'email' => 'nullable|email|max:255',
            'avatar' => 'nullable|string|max:500',
            'details' => 'nullable|array',
        ]);

        if (empty($validated['tags'])) {
            $validated['tags'] = [];
        }
        if (empty($validated['location'])) {
            $validated['location'] = ['en' => '', 'fr' => '', 'ar' => ''];
        }
        if (empty($validated['industries'])) {
            $validated['industries'] = [];
        }
        if (empty($validated['languages'])) {
            $validated['languages'] = [];
        }

        if (empty($validated['tags']) && ! empty($validated['industries'])) {
            $validated['tags'] = array_map(static function (string $ind) {
                $label = ucfirst(str_replace('-', ' ', $ind));

                return ['en' => $label, 'fr' => $label, 'ar' => $label];
            }, $validated['industries']);
        }

        return $validated;
    }
}
