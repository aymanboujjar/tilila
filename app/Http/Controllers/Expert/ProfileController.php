<?php

namespace App\Http\Controllers\Expert;

use App\Http\Controllers\Controller;
use App\Models\Expert;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $expert = $this->resolveExpert($request);

        $details = is_array($expert->details) ? $expert->details : [];
        $socials = is_array($details['socials'] ?? null) ? $details['socials'] : [];

        return Inertia::render('expert/profile-edit', [
            'expert' => [
                'id' => $expert->id,
                'name' => (string) ($expert->name['en'] ?? ''),
                'title' => (string) ($expert->title['en'] ?? ''),
                'email' => (string) ($expert->email ?? ''),
                'phone' => (string) ($details['phone'] ?? ''),
                'country' => (string) ($expert->country ?? ''),
                'city' => is_string($expert->location) ? $expert->location : '',
                'expertise' => (string) ($details['expertise_text'] ?? ''),
                'bio' => (string) (($details['bio'][0]['en'] ?? '') ?: ''),
                'linkedin_url' => (string) ($socials['linkedin'] ?? ''),
                'portfolio_url' => (string) ($details['portfolio_url'] ?? ''),
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $expert = $this->resolveExpert($request);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:500'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:64'],
            'country' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:512'],
            'expertise' => ['nullable', 'string', 'max:3000'],
            'bio' => ['nullable', 'string', 'max:5000'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'portfolio_url' => ['nullable', 'url', 'max:255'],
        ]);

        $details = is_array($expert->details) ? $expert->details : [];
        $details['socials'] = [
            'linkedin' => trim((string) ($data['linkedin_url'] ?? '')),
            'twitter' => (string) (($details['socials']['twitter'] ?? '') ?: ''),
            'instagram' => (string) (($details['socials']['instagram'] ?? '') ?: ''),
        ];
        $details['portfolio_url'] = trim((string) ($data['portfolio_url'] ?? ''));
        $details['phone'] = trim((string) ($data['phone'] ?? ''));
        $details['expertise_text'] = trim((string) ($data['expertise'] ?? ''));
        $details['bio'] = [
            [
                'en' => trim((string) ($data['bio'] ?? '')),
                'fr' => trim((string) ($data['bio'] ?? '')),
                'ar' => trim((string) ($data['bio'] ?? '')),
            ],
        ];

        $title = trim((string) ($data['title'] ?? ''));
        $name = trim((string) $data['name']);

        $expert->update([
            'name' => ['en' => $name, 'fr' => $name, 'ar' => $name],
            'title' => ['en' => $title, 'fr' => $title, 'ar' => $title],
            'email' => trim((string) ($data['email'] ?? '')),
            'country' => trim((string) ($data['country'] ?? '')),
            'location' => trim((string) ($data['city'] ?? '')),
            'details' => $details,
            'last_activity_at' => now(),
        ]);

        return back()->with('success', 'Your expert profile has been updated.');
    }

    private function resolveExpert(Request $request): Expert
    {
        return Expert::query()->where('user_id', $request->user()->id)->firstOrFail();
    }
}
