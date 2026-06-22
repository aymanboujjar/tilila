<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\MediaItem;
use App\Models\TililabEdition;
use App\Models\TililaEdition;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ActualitesController extends Controller
{
    public function index(): Response
    {
        $news = Event::query()
            ->where('visibility', 'public')
            ->where('status', '!=', 'draft')
            ->orderByDesc('date')
            ->orderByDesc('id')
            ->limit(12)
            ->get()
            ->map(fn (Event $event) => $this->newsPayload($event))
            ->values()
            ->all();

        return Inertia::render('user/actualites/index', [
            'news' => $news,
            'galleryImages' => $this->galleryImages(),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function newsPayload(Event $event): array
    {
        $list = is_array($event->list_payload) ? $event->list_payload : [];
        $badge = $list['badge'] ?? ['en' => 'NEWS', 'fr' => 'NEWS', 'ar' => 'أخبار'];

        return [
            'id' => (string) $event->id,
            'slug' => (string) $event->slug,
            'title' => $event->title ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'excerpt' => $event->description ?? ['en' => '', 'fr' => '', 'ar' => ''],
            'badge' => $badge,
            'badgeTone' => $list['badgeTone'] ?? 'purple',
            'date' => $event->date?->format('Y-m-d') ?? '',
            'cover_image_url' => $event->cover_image_url ?? ($list['imageSrc'] ?? null),
            'href' => route('events.show', $event->id),
        ];
    }

    /**
     * @return list<string>
     */
    private function galleryImages(): array
    {
        $images = [];

        $push = function (?string $path) use (&$images): void {
            if (! is_string($path) || $path === '') {
                return;
            }

            $url = str_starts_with($path, 'http') || str_starts_with($path, '/')
                ? $path
                : Storage::url($path);

            if (! in_array($url, $images, true)) {
                $images[] = $url;
            }
        };

        foreach (
            TililaEdition::query()
                ->orderByDesc('year')
                ->orderByDesc('id')
                ->limit(6)
                ->get() as $edition
        ) {
            $push($edition->cover_image_path);
            foreach (is_array($edition->gallery_images) ? $edition->gallery_images : [] as $path) {
                $push($path);
            }
        }

        foreach (
            TililabEdition::query()
                ->orderByDesc('year')
                ->orderByDesc('id')
                ->limit(4)
                ->get() as $edition
        ) {
            $push($edition->cover_image_path);
            foreach (is_array($edition->gallery_images) ? $edition->gallery_images : [] as $path) {
                $push($path);
            }
        }

        foreach (
            MediaItem::query()
                ->where('visibility', 'public')
                ->where('status', 'published')
                ->orderByDesc('updated_at')
                ->limit(6)
                ->get() as $item
        ) {
            $push($item->image_url);
        }

        $fallbacks = [
            '/assets/tilila/hero-7eme-edition.png',
            '/assets/tilila/editions/edition-2025.png',
            '/assets/tilila/editions/edition-2024.png',
            '/assets/tililab/tililab1.jpg',
            '/assets/tililab/tililab-banner.png',
            '/assets/tilila/trophee-tilila.png',
        ];

        foreach ($fallbacks as $src) {
            $push($src);
        }

        return array_slice($images, 0, 8);
    }
}
