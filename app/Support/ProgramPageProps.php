<?php

namespace App\Support;

use App\Models\Partner;
use Illuminate\Support\Facades\Storage;

class ProgramPageProps
{
    /** @return array<string, mixed> */
    public static function allPublished(): array
    {
        return [
            'partners' => Partner::query()
                ->where('is_published', true)
                ->orderBy('sort')
                ->orderBy('id')
                ->get(),
        ];
    }

    /** @return array<string, mixed> */
    public static function forProgram(string $program): array
    {
        $props = [
            'partners' => Partner::query()
                ->publishedForProgram($program)
                ->get(),
        ];

        if ($program === 'tililab') {
            $props['teaserVideoUrl'] = self::tililabTeaserVideoUrl();
        }

        return $props;
    }

    private static function tililabTeaserVideoUrl(): ?string
    {
        $relative = ltrim(
            (string) env('TILILAB_TEASER_VIDEO_PATH', 'tililab-editions/videos/bootcamp-2025.mp4'),
            '/',
        );

        if ($relative === '' || ! Storage::disk('public')->exists($relative)) {
            return null;
        }

        return Storage::disk('public')->url($relative);
    }
}
