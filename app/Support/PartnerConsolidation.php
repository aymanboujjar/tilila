<?php

namespace App\Support;

use App\Models\Partner;
use Illuminate\Support\Collection;

class PartnerConsolidation
{
    /**
     * Migrate logos to storage and merge rows that share the same logo file.
     *
     * @return array{migrated: int, merged: int, remaining: int}
     */
    public static function run(): array
    {
        $migrated = 0;

        Partner::query()->each(function (Partner $partner) use (&$migrated) {
            $storagePath = PartnerLogoStorage::migrateAssetToStorage($partner->logo_path);

            if ($storagePath === null || $storagePath === $partner->logo_path) {
                return;
            }

            $partner->update(['logo_path' => $storagePath]);
            $migrated++;
        });

        $merged = 0;

        Partner::query()
            ->orderBy('id')
            ->get()
            ->groupBy(fn (Partner $partner) => $partner->logo_path ?? "no-logo-{$partner->id}")
            ->each(function (Collection $rows) use (&$merged) {
                if ($rows->count() <= 1) {
                    self::syncGroups($rows->first());

                    return;
                }

                /** @var Partner $keeper */
                $keeper = $rows->first();
                $others = $rows->slice(1);

                $programs = $rows->pluck('program')->unique()->values();
                $program = self::resolveProgram($programs);

                $groups = $rows
                    ->flatMap(fn (Partner $partner) => self::partnerGroups($partner))
                    ->unique()
                    ->values()
                    ->all();

                $name = $rows
                    ->sortByDesc(fn (Partner $partner) => strlen($partner->name))
                    ->first()
                    ->name;

                $keeper->update([
                    'program' => $program,
                    'group' => $groups[0] ?? $keeper->group,
                    'groups' => $groups,
                    'name' => $name,
                    'subtitle' => self::mergeTranslations(
                        $rows->pluck('subtitle')->filter()->all(),
                    ),
                    'meta' => self::mergeTranslations(
                        $rows->pluck('meta')->filter()->all(),
                    ),
                    'sort' => (int) $rows->min('sort'),
                    'is_published' => $rows->contains(fn (Partner $partner) => $partner->is_published),
                ]);

                $others->each(fn (Partner $partner) => $partner->delete());
                $merged += $others->count();
            });

        return [
            'migrated' => $migrated,
            'merged' => $merged,
            'remaining' => Partner::query()->count(),
        ];
    }

    /** @param  Collection<int, string>  $programs */
    private static function resolveProgram(Collection $programs): string
    {
        $normalized = $programs
            ->map(fn (string $program) => strtolower($program))
            ->unique()
            ->values();

        if ($normalized->contains('both')) {
            return 'both';
        }

        if ($normalized->contains('tilila') && $normalized->contains('tililab')) {
            return 'both';
        }

        return $normalized->first() ?? 'tilila';
    }

    /** @return list<string> */
    private static function partnerGroups(Partner $partner): array
    {
        $groups = $partner->groups ?? [];

        if (count($groups) > 0) {
            return array_values(array_unique($groups));
        }

        return $partner->group ? [$partner->group] : [];
    }

    private static function syncGroups(Partner $partner): void
    {
        $groups = self::partnerGroups($partner);

        if ($groups === []) {
            return;
        }

        $partner->update([
            'groups' => $groups,
            'group' => $groups[0],
        ]);
    }

    /**
     * @param  list<array<string, mixed>|null>  $items
     * @return array<string, mixed>|null
     */
    private static function mergeTranslations(array $items): ?array
    {
        $merged = [];

        foreach ($items as $item) {
            if (! is_array($item)) {
                continue;
            }

            foreach ($item as $key => $value) {
                if (is_array($value)) {
                    $merged[$key] = array_merge($merged[$key] ?? [], array_filter($value));
                } elseif (($merged[$key] ?? '') === '' && $value !== '') {
                    $merged[$key] = $value;
                }
            }
        }

        return $merged === [] ? null : $merged;
    }
}
