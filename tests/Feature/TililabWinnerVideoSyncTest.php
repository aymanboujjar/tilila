<?php

use App\Models\TililabEdition;
use App\Support\TililabStorageAssetSync;
use Illuminate\Support\Facades\Storage;

it('syncs winner project videos from storage onto tililab winners', function () {
    Storage::fake('public');
    Storage::disk('public')->put(
        'tililab-editions/videos/2023/4-coupinates.mp4',
        'fake-video',
    );
    Storage::disk('public')->put(
        'tililab-editions/videos/2023/5-creators.mp4',
        'fake-video',
    );

    $edition = TililabEdition::query()->create([
        'year' => '2023',
        'edition_label' => ['en' => '3rd', 'fr' => '3e', 'ar' => '3'],
        'theme' => ['en' => 'Theme', 'fr' => 'Thème', 'ar' => 'موضوع'],
        'winners' => [
            [
                'full_name' => 'Coupinates (ex-aequo)',
                'bio' => ['en' => 'Bio', 'fr' => 'Bio', 'ar' => 'Bio'],
                'photo_path' => null,
            ],
            [
                'full_name' => 'Creators (ex-aequo)',
                'bio' => ['en' => 'Bio', 'fr' => 'Bio', 'ar' => 'Bio'],
                'photo_path' => null,
            ],
        ],
        'jury' => [],
        'sort' => 0,
        'is_current' => false,
    ]);

    app(TililabStorageAssetSync::class)->syncEdition($edition->fresh());

    $edition->refresh();

    expect($edition->winners[0]['video_path'])->toBe('tililab-editions/videos/2023/4-coupinates.mp4')
        ->and($edition->winners[1]['video_path'])->toBe('tililab-editions/videos/2023/5-creators.mp4');
});

it('assigns spot-winner video to a sole tililab winner', function () {
    Storage::fake('public');
    Storage::disk('public')->put(
        'tililab-editions/videos/2024/spot-winner.mp4',
        'fake-video',
    );

    $edition = TililabEdition::query()->create([
        'year' => '2024',
        'edition_label' => ['en' => '4th', 'fr' => '4e', 'ar' => '4'],
        'theme' => ['en' => 'Theme', 'fr' => 'Thème', 'ar' => 'موضوع'],
        'winners' => [
            [
                'full_name' => 'Yassine Fataoui',
                'bio' => ['en' => 'Bio', 'fr' => 'Bio', 'ar' => 'Bio'],
                'photo_path' => null,
            ],
        ],
        'jury' => [],
        'sort' => 0,
        'is_current' => false,
    ]);

    app(TililabStorageAssetSync::class)->syncEdition($edition->fresh());

    $edition->refresh();

    expect($edition->winners[0]['video_path'])->toBe('tililab-editions/videos/2024/spot-winner.mp4');
});
