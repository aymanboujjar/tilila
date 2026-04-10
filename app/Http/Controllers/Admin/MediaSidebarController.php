<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaSidebarSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MediaSidebarController extends Controller
{
    public function edit(): Response
    {
        $row = MediaSidebarSetting::query()->first();
        if ($row === null) {
            $defaults = $this->defaultSidebarPayload();
            $row = MediaSidebarSetting::query()->create($defaults);
        }

        return Inertia::render('admin/media/sidebar', [
            'settings' => [
                'trending_topics' => $row->trending_topics ?? [],
                'resource_links' => $row->resource_links ?? [],
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'trending_topics' => 'required|array',
            'trending_topics.*.title' => 'required|array',
            'trending_topics.*.title.en' => 'required|string|max:255',
            'trending_topics.*.title.fr' => 'nullable|string|max:255',
            'trending_topics.*.title.ar' => 'nullable|string|max:255',
            'trending_topics.*.tag' => 'nullable|array',
            'trending_topics.*.tag.en' => 'nullable|string|max:255',
            'trending_topics.*.tag.fr' => 'nullable|string|max:255',
            'trending_topics.*.tag.ar' => 'nullable|string|max:255',
            'resource_links' => 'required|array',
            'resource_links.*.label' => 'required|array',
            'resource_links.*.label.en' => 'required|string|max:255',
            'resource_links.*.label.fr' => 'nullable|string|max:255',
            'resource_links.*.label.ar' => 'nullable|string|max:255',
            'resource_links.*.url' => 'nullable|string|max:2048',
        ]);

        $row = MediaSidebarSetting::query()->first();
        $payload = [
            'trending_topics' => $this->normalizeTopics($validated['trending_topics']),
            'resource_links' => $this->normalizeLinks($validated['resource_links']),
        ];
        if ($row === null) {
            MediaSidebarSetting::query()->create($payload);
        } else {
            $row->update($payload);
        }

        return redirect()->route('admin.media.sidebar.edit')->with('success', 'Media sidebar saved.');
    }

    /**
     * @return array{trending_topics: list<array{title: array{en: string, fr: string, ar: string}, tag: array{en: string, fr: string, ar: string}}>, resource_links: list<array{label: array{en: string, fr: string, ar: string}, url: string|null}>}
     */
    private function defaultSidebarPayload(): array
    {
        return [
            'trending_topics' => [
                [
                    'title' => ['en' => 'Women in STEM', 'fr' => 'Femmes en STEM', 'ar' => 'النساء في STEM'],
                    'tag' => ['en' => 'April 2026', 'fr' => 'Avril 2026', 'ar' => 'أبريل 2026'],
                ],
                [
                    'title' => ['en' => 'Media parity', 'fr' => 'Parité dans les médias', 'ar' => 'التكافؤ في الإعلام'],
                    'tag' => ['en' => 'Trending', 'fr' => 'Tendance', 'ar' => 'الأكثر تداولًا'],
                ],
                [
                    'title' => ['en' => 'Mentorship', 'fr' => 'Mentorat', 'ar' => 'الإرشاد'],
                    'tag' => ['en' => 'New', 'fr' => 'Nouveau', 'ar' => 'جديد'],
                ],
            ],
            'resource_links' => [
                [
                    'label' => ['en' => 'Media kit (PDF)', 'fr' => 'Kit média (PDF)', 'ar' => 'حقيبة الإعلام (PDF)'],
                    'url' => null,
                ],
                [
                    'label' => ['en' => 'Tilila charter', 'fr' => 'Charte Tilila', 'ar' => 'ميثاق تيليلا'],
                    'url' => null,
                ],
                [
                    'label' => ['en' => 'Press contacts', 'fr' => 'Contacts presse', 'ar' => 'جهات اتصال الصحافة'],
                    'url' => null,
                ],
            ],
        ];
    }

    /**
     * @param  list<array<string, mixed>>  $rows
     * @return list<array{title: array{en: string, fr: string, ar: string}, tag: array{en: string, fr: string, ar: string}}>
     */
    private function normalizeTopics(array $rows): array
    {
        $out = [];
        foreach ($rows as $row) {
            if (! is_array($row)) {
                continue;
            }
            $title = $row['title'] ?? [];
            $tag = $row['tag'] ?? [];
            $tEn = trim((string) ($title['en'] ?? ''));
            if ($tEn === '') {
                continue;
            }
            $out[] = [
                'title' => [
                    'en' => $tEn,
                    'fr' => trim((string) ($title['fr'] ?? '')),
                    'ar' => trim((string) ($title['ar'] ?? '')),
                ],
                'tag' => [
                    'en' => trim((string) ($tag['en'] ?? '')),
                    'fr' => trim((string) ($tag['fr'] ?? '')),
                    'ar' => trim((string) ($tag['ar'] ?? '')),
                ],
            ];
        }

        return $out;
    }

    /**
     * @param  list<array<string, mixed>>  $rows
     * @return list<array{label: array{en: string, fr: string, ar: string}, url: string|null}>
     */
    private function normalizeLinks(array $rows): array
    {
        $out = [];
        foreach ($rows as $row) {
            if (! is_array($row)) {
                continue;
            }
            $label = $row['label'] ?? [];
            $en = trim((string) ($label['en'] ?? ''));
            if ($en === '') {
                continue;
            }
            $url = trim((string) ($row['url'] ?? ''));
            $out[] = [
                'label' => [
                    'en' => $en,
                    'fr' => trim((string) ($label['fr'] ?? '')),
                    'ar' => trim((string) ($label['ar'] ?? '')),
                ],
                'url' => $url === '' ? null : $url,
            ];
        }

        return $out;
    }
}
