<?php

use App\Models\Partner;
use App\Support\PartnerConsolidation;

test('partner consolidation merges tilila and tililab rows with same logo into both', function () {
    Partner::query()->create([
        'program' => 'tilila',
        'group' => 'media',
        'groups' => ['media'],
        'name' => '2M.ma',
        'logo_path' => 'partners/shared-logo.png',
        'sort' => 10,
        'is_published' => true,
    ]);

    Partner::query()->create([
        'program' => 'tililab',
        'group' => 'media',
        'groups' => ['media'],
        'name' => '2M.ma',
        'logo_path' => 'partners/shared-logo.png',
        'sort' => 10,
        'is_published' => true,
    ]);

    Partner::query()->create([
        'program' => 'tililab',
        'group' => 'media',
        'groups' => ['media'],
        'name' => 'Jooj Media',
        'logo_path' => 'partners/jooj.png',
        'sort' => 12,
        'is_published' => true,
    ]);

    $result = PartnerConsolidation::run();

    expect($result['merged'])->toBe(1)
        ->and(Partner::query()->count())->toBe(2);

    $shared = Partner::query()->where('logo_path', 'partners/shared-logo.png')->first();

    expect($shared)->not->toBeNull()
        ->and($shared->program)->toBe('both');

    expect(Partner::query()->where('logo_path', 'partners/jooj.png')->value('program'))->toBe('tililab');
});

test('shared media partners are stored once with both program', function () {
    Partner::query()->create([
        'program' => 'both',
        'group' => 'media',
        'groups' => ['media'],
        'name' => '2M.ma',
        'logo_path' => 'partners/2M_TV_logo.svg.webp',
        'sort' => 10,
        'is_published' => true,
    ]);

    Partner::query()->create([
        'program' => 'tililab',
        'group' => 'media',
        'groups' => ['media'],
        'name' => 'Jooj Media',
        'logo_path' => 'partners/JOOJ-MASTERBRAND-STRAWBERRY-91x100.png',
        'sort' => 12,
        'is_published' => true,
    ]);

    $duplicates = Partner::query()
        ->get()
        ->groupBy('logo_path')
        ->filter(fn ($rows) => $rows->count() > 1);

    expect($duplicates)->toBeEmpty()
        ->and(Partner::query()->where('name', '2M.ma')->value('program'))->toBe('both')
        ->and(Partner::query()->where('name', 'Jooj Media')->value('program'))->toBe('tililab');
});
