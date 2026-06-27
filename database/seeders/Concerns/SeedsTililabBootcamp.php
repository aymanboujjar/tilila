<?php

namespace Database\Seeders\Concerns;

trait SeedsTililabBootcamp
{
    /**
     * @return array<string, mixed>|null
     */
    protected function bootcampForYear(string $year): ?array
    {
        static $byYear = null;

        if ($byYear === null) {
            $path = dirname(__DIR__).'/data/tililab_bootcamp_by_year.php';
            $byYear = is_file($path) ? require $path : [];
        }

        $bootcamp = $byYear[$year] ?? null;

        return is_array($bootcamp) ? $bootcamp : null;
    }
}
