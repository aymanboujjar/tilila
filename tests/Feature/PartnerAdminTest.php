<?php

use App\Models\Partner;
use App\Models\User;

test('tilila page receives published partners from database', function () {
    Partner::query()->create([
        'program' => 'tilila',
        'group' => 'featured',
        'name' => 'Test Partner',
        'logo_path' => '/assets/test-logo.png',
        'sort' => 1,
        'is_published' => true,
    ]);

    $this->get('/tilila')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('user/tilila/index')
            ->has('partners', 1)
            ->where('partners.0.name', 'Test Partner'));
});

test('admin can manage partners from backoffice', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
        'email_verified_at' => now(),
    ]);

    $this->actingAs($admin)
        ->get(route('admin.partners.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/partners/index'));

    $response = $this->actingAs($admin)->post(route('admin.partners.store'), [
        'program' => 'tililab',
        'group' => 'program',
        'name' => 'Backoffice Partner',
        'logo_path' => '/assets/partners/backoffice.png',
        'sort' => 5,
        'is_published' => true,
    ]);

    $response->assertRedirect(route('admin.partners.index'));

    $partner = Partner::query()->where('name', 'Backoffice Partner')->first();

    expect($partner)->not->toBeNull()
        ->and($partner->program)->toBe('tililab')
        ->and($partner->group)->toBe('program')
        ->and($partner->logo_path)->toBe('/assets/partners/backoffice.png');
});

test('about page receives institutional partners from database', function () {
    Partner::query()->create([
        'program' => 'tilila',
        'group' => 'institutional',
        'name' => 'About Partner',
        'logo_path' => '/assets/about-partner.png',
        'sort' => 1,
        'is_published' => true,
    ]);

    $this->get('/about')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('user/about/index')
            ->has('partners', 1)
            ->where('partners.0.name', 'About Partner'));
});
