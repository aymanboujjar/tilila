<?php

namespace App\Http\Controllers\Expert;

use App\Http\Controllers\Controller;
use App\Models\Expert;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $expert = $this->resolveExpert($request);

        return Inertia::render('expert/profile-edit', [
            'expert' => $this->expertToForm($expert),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $expert = $this->resolveExpert($request);
        $data = $this->validated($request);

        $removeImage = (bool) ($data['remove_image'] ?? false);
        unset($data['remove_image']);

        if ($request->hasFile('profile_image')) {
            if ($expert->image) {
                Storage::disk('public')->delete($expert->image);
            }
            $data = array_merge($data, $this->storeProfileImageFromUpload($request->file('profile_image')));
        } elseif ($removeImage) {
            if ($expert->image) {
                Storage::disk('public')->delete($expert->image);
            }
            $data['image'] = null;
        }

        $expert->update([
            ...$data,
            'last_activity_at' => now(),
        ]);

        return back()->with('success', 'Your expert profile has been updated.');
    }

    private function resolveExpert(Request $request): Expert
    {
        return Expert::query()->where('user_id', $request->user()->id)->firstOrFail();
    }

    /**
     * @return array<string, mixed>
     */
    private function expertToForm(Expert $expert): array
    {
        return [
            'id' => $expert->id,
            'name' => $this->triLangValue($expert->name),
            'title' => $this->triLangValue($expert->title),
            'location' => $this->triLangValue($expert->location),
            'country' => (string) ($expert->country ?? ''),
            'industries' => $expert->industries ?? [],
            'languages' => $expert->languages ?? [],
            'email' => (string) ($expert->email ?? ''),
            'image_url' => $expert->image_url,
            'details' => $this->normalizeDetailsForForm($expert->details),
        ];
    }

    /**
     * @return array<string, string>
     */
    private function triLangValue(mixed $value): array
    {
        if (is_array($value)) {
            return [
                'en' => trim((string) ($value['en'] ?? '')),
                'fr' => trim((string) ($value['fr'] ?? '')),
                'ar' => trim((string) ($value['ar'] ?? '')),
            ];
        }

        $text = trim((string) ($value ?? ''));

        return ['en' => $text, 'fr' => '', 'ar' => ''];
    }

    /**
     * @param  array<string, mixed>|null  $details
     * @return array<string, mixed>
     */
    private function normalizeDetailsForForm(?array $details): array
    {
        $base = [
            'headlineTags' => [],
            'bio' => [],
            'quote' => ['en' => '', 'fr' => '', 'ar' => ''],
            'socials' => [
                'linkedin' => '',
                'twitter' => '',
                'instagram' => '',
            ],
            'expertise' => [],
            'journey' => [],
            'appearances' => [],
            'articles' => [],
        ];

        if (! is_array($details)) {
            return $base;
        }

        $base['headlineTags'] = is_array($details['headlineTags'] ?? null) ? $details['headlineTags'] : [];
        $base['bio'] = is_array($details['bio'] ?? null) ? $details['bio'] : [];
        $base['quote'] = array_merge($base['quote'], is_array($details['quote'] ?? null) ? $details['quote'] : []);
        $socials = is_array($details['socials'] ?? null) ? $details['socials'] : [];
        $base['socials'] = [
            'linkedin' => trim((string) ($socials['linkedin'] ?? '')),
            'twitter' => trim((string) ($socials['twitter'] ?? '')),
            'instagram' => trim((string) ($socials['instagram'] ?? '')),
        ];
        $base['expertise'] = is_array($details['expertise'] ?? null) ? $details['expertise'] : [];
        $base['journey'] = is_array($details['journey'] ?? null) ? $details['journey'] : [];
        $base['appearances'] = is_array($details['appearances'] ?? null) ? $details['appearances'] : [];
        $base['articles'] = is_array($details['articles'] ?? null) ? $details['articles'] : [];

        return $base;
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.en' => ['required', 'string', 'max:255'],
            'name.fr' => ['nullable', 'string', 'max:255'],
            'name.ar' => ['nullable', 'string', 'max:255'],
            'title' => ['required', 'array'],
            'title.en' => ['required', 'string', 'max:500'],
            'title.fr' => ['nullable', 'string', 'max:500'],
            'title.ar' => ['nullable', 'string', 'max:500'],
            'location' => ['nullable', 'array'],
            'location.en' => ['nullable', 'string', 'max:512'],
            'location.fr' => ['nullable', 'string', 'max:512'],
            'location.ar' => ['nullable', 'string', 'max:512'],
            'country' => ['nullable', 'string', 'max:255'],
            'industries' => ['nullable', 'array'],
            'industries.*' => ['string', 'max:64'],
            'languages' => ['nullable', 'array'],
            'languages.*' => ['string', 'max:8'],
            'email' => ['nullable', 'email', 'max:255'],
            'remove_image' => ['sometimes', 'boolean'],
            'details' => ['nullable', 'array'],
        ]);

        if ($request->hasFile('profile_image')) {
            $request->validate([
                'profile_image' => ['required', 'file', 'max:5120', 'mimes:jpeg,png,webp,gif'],
            ]);
        }

        $validated['name'] = $this->triLangValue($validated['name'] ?? []);
        $validated['title'] = $this->triLangValue($validated['title'] ?? []);
        $validated['location'] = $this->triLangValue($validated['location'] ?? []);
        $validated['country'] = trim((string) ($validated['country'] ?? ''));
        $validated['industries'] = $validated['industries'] ?? [];
        $validated['languages'] = $validated['languages'] ?? [];
        $validated['email'] = trim((string) ($validated['email'] ?? ''));
        $validated['details'] = $this->normalizeDetailsForForm($validated['details'] ?? null);

        return $validated;
    }

    /**
     * Persist file on public disk and store relative path in `image`.
     *
     * @return array{image: string}
     */
    private function storeProfileImageFromUpload(UploadedFile $file): array
    {
        return [
            'image' => $file->store('experts', 'public'),
        ];
    }
}
