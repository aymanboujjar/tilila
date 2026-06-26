<?php

namespace App\Support;

use App\Models\TililaEdition;
use App\Models\TililabEdition;
use Illuminate\Support\Facades\Storage;
use Normalizer;

class ProgramTililabArchive
{
    /** @var array<string, string|null> */
    private static array $tililaCeremonyByYear = [];

    /** @var array<string, array<string, string>> */
    private static array $tililaJuryPhotosByYear = [];

    /** @var array<string, string>|null */
    private static ?array $tililaJuryPhotosGlobal = null;

    public static function enrichEdition(TililabEdition $edition): TililabEdition
    {
        if (
            empty($edition->ceremony_video_path)
            && empty($edition->ceremony_video_url)
        ) {
            $edition->ceremony_video_url = self::resolveCeremonyVideoUrl($edition->year);
        }

        $jury = is_array($edition->jury) ? $edition->jury : [];
        $edition->jury = self::enrichJuryPhotos($jury, $edition->year);

        return $edition;
    }

    /**
     * @param  list<array<string, mixed>>  $jury
     * @return list<array<string, mixed>>
     */
    public static function enrichJuryPhotos(array $jury, int|string|null $tililabYear): array
    {
        if ($jury === []) {
            return $jury;
        }

        $tililaYear = self::resolveTililaYear((int) $tililabYear);
        $yearPhotoMap = $tililaYear !== null
            ? self::tililaJuryPhotoMapForYear($tililaYear)
            : [];
        $globalPhotoMap = self::tililaJuryPhotoMapGlobal();

        return array_values(array_map(function (mixed $person) use ($yearPhotoMap, $globalPhotoMap): array {
            if (! is_array($person)) {
                return [];
            }

            if (self::juryPhotoPathIsUsable($person['photo_path'] ?? null)) {
                return $person;
            }

            unset($person['photo_path']);

            $name = self::normalizePersonName((string) ($person['full_name'] ?? ''));
            if ($name === '') {
                return $person;
            }

            $path = $yearPhotoMap[$name] ?? $globalPhotoMap[$name] ?? null;
            if ($path !== null) {
                $person['photo_path'] = $path;
            }

            return $person;
        }, $jury));
    }

    public static function resolveCeremonyVideoUrl(int|string|null $tililabYear): ?string
    {
        $year = (int) $tililabYear;
        if ($year <= 0) {
            return null;
        }

        $tililaYear = self::resolveTililaYear($year);
        if ($tililaYear === null) {
            return null;
        }

        $key = (string) $tililaYear;

        if (! array_key_exists($key, self::$tililaCeremonyByYear)) {
            self::$tililaCeremonyByYear[$key] = TililaEdition::query()
                ->where('year', $key)
                ->value('ceremony_video_url');
        }

        $url = self::$tililaCeremonyByYear[$key];

        return is_string($url) && $url !== '' ? $url : null;
    }

    private static function resolveTililaYear(int $tililabYear): ?int
    {
        if ($tililabYear >= 2026) {
            return 2025;
        }

        if (TililaEdition::query()->where('year', (string) $tililabYear)->exists()) {
            return $tililabYear;
        }

        return null;
    }

    /** @return array<string, string> */
    private static function tililaJuryPhotoMapForYear(int $tililaYear): array
    {
        $key = (string) $tililaYear;

        if (! array_key_exists($key, self::$tililaJuryPhotosByYear)) {
            $rows = TililaEdition::query()->where('year', $key)->value('jury');
            $rows = is_array($rows) ? $rows : [];

            $map = [];
            foreach ($rows as $row) {
                if (! is_array($row)) {
                    continue;
                }

                $name = self::normalizePersonName((string) ($row['full_name'] ?? ''));
                $path = $row['photo_path'] ?? null;

                if ($name !== '' && self::juryPhotoPathIsUsable($path)) {
                    $map[$name] = $path;
                }
            }

            self::$tililaJuryPhotosByYear[$key] = $map;
        }

        return self::$tililaJuryPhotosByYear[$key];
    }

    /** @return array<string, string> */
    private static function tililaJuryPhotoMapGlobal(): array
    {
        if (self::$tililaJuryPhotosGlobal !== null) {
            return self::$tililaJuryPhotosGlobal;
        }

        $map = [];

        $editions = TililaEdition::query()
            ->orderByDesc('year')
            ->get(['jury']);

        foreach ($editions as $edition) {
            $rows = is_array($edition->jury) ? $edition->jury : [];

            foreach ($rows as $row) {
                if (! is_array($row)) {
                    continue;
                }

                $name = self::normalizePersonName((string) ($row['full_name'] ?? ''));
                $path = $row['photo_path'] ?? null;

                if ($name !== '' && ! isset($map[$name]) && self::juryPhotoPathIsUsable($path)) {
                    $map[$name] = $path;
                }
            }
        }

        self::$tililaJuryPhotosGlobal = $map;

        return $map;
    }

    private static function juryPhotoPathIsUsable(mixed $photoPath): bool
    {
        return is_string($photoPath)
            && $photoPath !== ''
            && Storage::disk('public')->exists($photoPath);
    }

    private static function normalizePersonName(string $name): string
    {
        $normalized = preg_replace('/\s+/u', ' ', trim($name));
        $normalized = mb_strtolower(is_string($normalized) ? $normalized : '');

        if ($normalized === '') {
            return '';
        }

        if (class_exists(Normalizer::class)) {
            $decomposed = Normalizer::normalize($normalized, Normalizer::FORM_D);

            if (is_string($decomposed)) {
                $normalized = preg_replace('/\p{Mn}/u', '', $decomposed) ?? $decomposed;
            }
        }

        return $normalized;
    }
}
