<?php

namespace App\Support;

use App\Models\Partner;

class ProgramPageProps
{
    /** @return array<string, mixed> */
    public static function forProgram(string $program): array
    {
        return [
            'partners' => Partner::query()
                ->publishedForProgram($program)
                ->get(),
        ];
    }
}
