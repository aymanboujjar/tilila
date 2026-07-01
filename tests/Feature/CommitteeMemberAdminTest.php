<?php

use App\Models\CommitteeMember;
use App\Models\User;

test('about page receives published committee members from database', function () {
    CommitteeMember::query()->create([
        'name' => 'Test Member',
        'bio' => [
            'fr' => 'Rôle test',
            'en' => 'Test role',
            'ar' => 'دور تجريبي',
        ],
        'photo_path' => '/assets/cpd/test.png',
        'sort' => 1,
        'is_published' => true,
    ]);

    $this->get('/about')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('user/about/index')
            ->has('committeeMembers', 1)
            ->where('committeeMembers.0.name', 'Test Member'));
});

test('admin can manage committee members from backoffice', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
        'email_verified_at' => now(),
    ]);

    $this->actingAs($admin)
        ->get(route('admin.committee-members.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/committee-members/index'));

    $response = $this->actingAs($admin)->post(route('admin.committee-members.store'), [
        'name' => 'Backoffice Member',
        'bio' => [
            'fr' => 'Bio FR',
            'en' => 'Bio EN',
            'ar' => 'Bio AR',
        ],
        'photo_path' => '/assets/cpd/backoffice.png',
        'sort' => 5,
        'is_published' => true,
    ]);

    $response->assertRedirect(route('admin.committee-members.index'));

    $member = CommitteeMember::query()->where('name', 'Backoffice Member')->first();

    expect($member)->not->toBeNull()
        ->and($member->bio['fr'])->toBe('Bio FR')
        ->and($member->photo_path)->toBe('/assets/cpd/backoffice.png');
});

test('unpublished committee members are hidden on about page', function () {
    CommitteeMember::query()->create([
        'name' => 'Hidden Member',
        'bio' => ['fr' => 'Caché'],
        'sort' => 1,
        'is_published' => false,
    ]);

    $this->get('/about')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('user/about/index')
            ->has('committeeMembers', 0));
});
