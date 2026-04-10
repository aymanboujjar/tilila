<?php

namespace App\Http\Controllers;

use App\Models\Expert;
use App\Models\MediaItem;
use App\Models\MediaSidebarSetting;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function index(): Response
    {
        $items = MediaItem::query()
            ->where('visibility', 'public')
            ->where('status', 'published')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (MediaItem $m) => $this->publicPayload($m))
            ->values()
            ->all();

        return Inertia::render('user/media/index', [
            'items' => $items,
            'sidebar' => $this->sidebarPayload(),
        ]);
    }

    public function show(MediaItem $media): Response
    {
        $item = $this->publicPayload($media);

        $related = MediaItem::query()
            ->where('visibility', 'public')
            ->where('status', 'published')
            ->where('slug', '!=', $media->slug)
            ->orderByDesc('updated_at')
            ->limit(12)
            ->get()
            ->map(fn (MediaItem $m) => $this->publicPayload($m))
            ->values()
            ->all();

        return Inertia::render('user/media/[id]', [
            'item' => $item,
            'relatedItems' => $related,
            'sidebar' => $this->sidebarForMediaDetail($media),
        ]);
    }

    /**
     * @return array<string, mixed>|null
     */
    private function sidebarPayload(): ?array
    {
        $row = MediaSidebarSetting::query()->first();
        if ($row === null) {
            return null;
        }

        return [
            'trendingTopics' => $row->trending_topics ?? [],
            'resourceLinks' => $row->resource_links ?? [],
            'expertSpotlight' => null,
        ];
    }

    /**
     * Sidebar on a media detail page: use this item’s topics, links, and featured expert when set;
     * otherwise fall back to the global media sidebar (same as /media index).
     *
     * @return array{trendingTopics: list<mixed>, resourceLinks: list<mixed>, expertSpotlight: array<string, mixed>|null}
     */
    private function sidebarForMediaDetail(MediaItem $media): array
    {
        $global = $this->sidebarPayload();
        $globalTopics = is_array($global) ? ($global['trendingTopics'] ?? []) : [];
        $globalLinks = is_array($global) ? ($global['resourceLinks'] ?? []) : [];

        $topics = is_array($media->trending_topics) ? $media->trending_topics : [];
        $links = is_array($media->resource_links) ? $media->resource_links : [];

        $expertSpotlight = null;
        if ($media->featured_expert_id) {
            $e = Expert::query()->find($media->featured_expert_id);
            if ($e && $e->isPublished()) {
                $expertSpotlight = [
                    'name' => $e->name ?? ['en' => '', 'fr' => '', 'ar' => ''],
                    'image' => $e->image_url,
                    'profileHref' => route('experts.show', $e),
                ];
            }
        }

        return [
            'trendingTopics' => count($topics) > 0 ? $topics : $globalTopics,
            'resourceLinks' => count($links) > 0 ? $links : $globalLinks,
            'expertSpotlight' => $expertSpotlight,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function publicPayload(MediaItem $m): array
    {
        return [
            'id' => (string) $m->slug,
            'categoryId' => (string) ($m->category_id ?? ''),
            'badge' => $m->badge ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'title' => $m->title ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'excerpt' => $m->excerpt ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'meta' => $this->composedMeta($m),
            'cta' => MediaItem::defaultCta(),
            'imageSrc' => $m->image_url,
        ];
    }

    /**
     * @return array{en: string, fr: string, ar: string}
     */
    private function composedMeta(MediaItem $m): array
    {
        $read = is_array($m->reading_label) ? $m->reading_label : [];
        $loc = is_array($m->location_label) ? $m->location_label : [];
        $fallback = is_array($m->meta) ? $m->meta : [];

        $out = ['en' => '', 'fr' => '', 'ar' => ''];
        foreach (['en', 'fr', 'ar'] as $lang) {
            $r = trim((string) ($read[$lang] ?? ''));
            $l = trim((string) ($loc[$lang] ?? ''));
            if ($r !== '' && $l !== '') {
                $out[$lang] = $r.' · '.$l;
            } elseif ($r !== '') {
                $out[$lang] = $r;
            } elseif ($l !== '') {
                $out[$lang] = $l;
            } else {
                $out[$lang] = trim((string) ($fallback[$lang] ?? ''));
            }
        }

        return $out;
    }
}
