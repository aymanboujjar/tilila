<?php

namespace App\Support;

use App\Models\TililabEdition;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TililabStorageAssetSync
{
    private const BASE = 'tililab-editions';

    public function syncAll(): void
    {
        TililabEdition::query()
            ->where('is_current', false)
            ->orderBy('year')
            ->each(fn (TililabEdition $edition) => $this->syncEdition($edition));
    }

    public function syncEdition(TililabEdition $edition): TililabEdition
    {
        $year = (string) $edition->year;

        if ($year === '' || $edition->is_current) {
            return $edition;
        }

        $gallery = $this->galleryImages($year);
        $winnerPhotos = $this->winnerPhotoMap($year);
        $winners = is_array($edition->winners) ? $edition->winners : [];
        $winners = $this->applyWinnerPhotos($winners, $winnerPhotos);

        $edition->winners = $winners;
        $edition->gallery_images = $gallery;
        $edition->has_gallery = $gallery !== [];
        $edition->cover_image_path = $this->coverImage($year, $gallery, $winners);
        $edition->ceremony_video_path = $this->spotVideo($year) ?? $edition->ceremony_video_path;

        $edition->save();

        return $edition;
    }

    /** @return list<string> */
    private function galleryImages(string $year): array
    {
        $paths = $this->filesIn("gallery/{$year}");

        return array_values(array_filter(
            $paths,
            fn (string $path) => ! str_contains(Str::slug(pathinfo($path, PATHINFO_FILENAME)), 'photo-winner'),
        ));
    }

    /** @return array<string, string> */
    private function winnerPhotoMap(string $year): array
    {
        $map = [];

        foreach ($this->filesIn("winners/{$year}") as $path) {
            $slug = Str::slug(pathinfo($path, PATHINFO_FILENAME));
            if ($slug !== '') {
                $map[$slug] = $path;
            }
        }

        return $map;
    }

    /** @var array<string, list<string>> */
    private const WINNER_PHOTO_ALIASES = [
        'zakaria-jaouhari' => ['zakaria', 'jouhari'],
        'aymen' => ['aymane', 'oulmadou'],
        'photo-winner' => ['coupinates', 'creators'],
        'yassine' => ['yassine', 'fataoui'],
        'mohammed' => ['mohamed', 'bekkali', 'mohammed'],
    ];

    /**
     * @param  list<array<string, mixed>>  $winners
     * @param  array<string, string>  $photoMap
     * @return list<array<string, mixed>>
     */
    private function applyWinnerPhotos(array $winners, array $photoMap): array
    {
        return array_map(function (array $winner) use ($photoMap): array {
            if (! empty($winner['photo_path'])) {
                return $winner;
            }

            $slug = Str::slug((string) ($winner['full_name'] ?? ''));

            foreach ($photoMap as $fileSlug => $path) {
                if ($this->winnerMatchesPhotoSlug($slug, $fileSlug)) {
                    $winner['photo_path'] = $path;

                    return $winner;
                }
            }

            if (isset($photoMap['photo-winner'])) {
                $winner['photo_path'] = $photoMap['photo-winner'];
            }

            return $winner;
        }, $winners);
    }

    private function winnerMatchesPhotoSlug(string $winnerSlug, string $fileSlug): bool
    {
        if ($fileSlug === 'photo-winner') {
            return false;
        }

        if (
            $winnerSlug !== '' &&
            (str_contains($winnerSlug, $fileSlug) || str_contains($fileSlug, $winnerSlug))
        ) {
            return true;
        }

        foreach (self::WINNER_PHOTO_ALIASES[$fileSlug] ?? [] as $alias) {
            if ($alias !== '' && str_contains($winnerSlug, $alias)) {
                return true;
            }
        }

        return false;
    }

    private function coverImage(string $year, array $gallery, array $winners): ?string
    {
        $covers = $this->filesIn("covers/{$year}");

        return $covers[0]
            ?? ($winners[0]['photo_path'] ?? null)
            ?? ($gallery[0] ?? null);
    }

    private function spotVideo(string $year): ?string
    {
        foreach ($this->filesIn("videos/{$year}") as $path) {
            if (str_contains(Str::slug(pathinfo($path, PATHINFO_FILENAME)), 'spot')) {
                return $path;
            }
        }

        return null;
    }

    /** @return list<string> */
    private function filesIn(string $relativeDir): array
    {
        $disk = Storage::disk('public');
        $dir = self::BASE.'/'.$relativeDir;

        if (! $disk->exists($dir)) {
            return [];
        }

        return array_values(array_filter(
            $disk->allFiles($dir),
            fn (string $path) => (bool) pathinfo($path, PATHINFO_EXTENSION),
        ));
    }
}
