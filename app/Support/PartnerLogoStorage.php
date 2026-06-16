<?php

namespace App\Support;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class PartnerLogoStorage
{
    /** Move a public /assets/… path into storage/app/public/partners. */
    public static function migrateAssetToStorage(?string $logoPath): ?string
    {
        if ($logoPath === null || $logoPath === '') {
            return null;
        }

        if (! str_starts_with($logoPath, '/assets/')) {
            return ltrim($logoPath, '/');
        }

        $source = public_path(ltrim($logoPath, '/'));

        if (! File::isFile($source)) {
            return ltrim($logoPath, '/');
        }

        $filename = basename($logoPath);
        $destination = "partners/{$filename}";

        if (! Storage::disk('public')->exists($destination)) {
            Storage::disk('public')->put($destination, File::get($source));
        }

        return $destination;
    }
}
