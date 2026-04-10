<?php

namespace App\Http\Controllers;

use App\Models\MediaItem;
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
        ]);
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
            'meta' => $m->meta ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'cta' => $m->cta ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'imageSrc' => $m->image_url,
        ];
    }
}

