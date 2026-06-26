<?php

namespace Database\Seeders\Concerns;

trait SeedsTililabJury
{
    /**
     * @return array<int, array{full_name: string, bio: array{en: string, fr: string, ar: string}, photo_path: null}>
     */
    protected function tililabJuryForYear(string $year): array
    {
        static $byYear = null;

        if ($byYear === null) {
            $path = dirname(__DIR__).'/data/tililab_jury_by_year.php';
            $byYear = is_file($path) ? require $path : [];
        }

        $members = $byYear[$year] ?? [];

        return array_map(
            fn (array $member) => $this->juror(
                $member['name'],
                $member['en'],
                $member['fr'],
                $member['ar'],
            ),
            $members,
        );
    }

    /**
     * @param  list<array<string, mixed>>  $jury
     * @return list<array<string, mixed>>
     */
    protected function mergeJuryPhotoPaths(array $jury, string $year): array
    {
        static $batch = null;
        static $existingByYear = [];

        if ($batch === null) {
            $path = dirname(__DIR__).'/data/tililab_jury_photo_batch.php';
            $batch = is_file($path) ? require $path : [];
        }

        if (! array_key_exists($year, $existingByYear)) {
            $existingByYear[$year] = [];
            $edition = \App\Models\TililabEdition::query()->where('year', $year)->first();
            foreach (is_array($edition?->jury) ? $edition->jury : [] as $member) {
                if (! is_array($member)) {
                    continue;
                }
                $name = $this->normalizeJuryName((string) ($member['full_name'] ?? ''));
                $photo = $member['photo_path'] ?? null;
                if ($name !== '' && is_string($photo) && $photo !== '') {
                    $existingByYear[$year][$name] = $photo;
                }
            }
        }

        $yearBatch = $batch[$year] ?? [];

        return array_map(function (array $member) use ($year, $existingByYear, $yearBatch): array {
            $name = (string) ($member['full_name'] ?? '');
            $key = $this->normalizeJuryName($name);

            if ($key !== '' && isset($existingByYear[$year][$key])) {
                $member['photo_path'] = $existingByYear[$year][$key];

                return $member;
            }

            if ($key !== '' && isset($yearBatch[$name])) {
                $member['photo_path'] = $yearBatch[$name];

                return $member;
            }

            foreach ($yearBatch as $batchName => $path) {
                if ($this->normalizeJuryName($batchName) === $key) {
                    $member['photo_path'] = $path;
                    break;
                }
            }

            return $member;
        }, $jury);
    }

    private function normalizeJuryName(string $name): string
    {
        $normalized = preg_replace('/\s+/u', ' ', trim($name));

        return mb_strtolower(is_string($normalized) ? $normalized : '');
    }
}
