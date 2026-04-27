<?php

use App\Http\Controllers\ExpertController;
use App\Http\Controllers\ExpertApplicationController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\OpportunityController;
use App\Http\Controllers\TililabInscriptionController;
use App\Http\Controllers\TililaParticipationController;
use App\Models\TililabEdition;
use App\Models\TililabParticipant;
use App\Models\TililaContestParticipant;
use App\Models\TililaEdition;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $tililaEdition = TililaEdition::query()
        ->orderByDesc('year')
        ->orderBy('sort')
        ->orderByDesc('id')
        ->first();

    $tililabEdition = TililabEdition::query()
        ->orderByDesc('year')
        ->orderBy('sort')
        ->orderByDesc('id')
        ->first();

    return Inertia::render('home/index', [
        'canRegister' => Features::enabled(Features::registration()),
        'tililaEdition' => $tililaEdition,
        'tililabEdition' => $tililabEdition,
        'stats' => [
            'tilila_editions' => TililaEdition::query()->count(),
            'tililab_editions' => TililabEdition::query()->count(),
            'tililab_participants' => TililabParticipant::query()->count(),
            'tilila_submissions' => TililaContestParticipant::query()->count(),
        ],
    ]);
})->name('home');

Route::get('/experts', [ExpertController::class, 'index'])->name('experts.index');
Route::get('/experts/become', [ExpertApplicationController::class, 'create'])->name('experts.become');
Route::post('/experts/become', [ExpertApplicationController::class, 'store'])->name('experts.become.store');
Route::get('/experts/{expert}', [ExpertController::class, 'show'])->name('experts.show');
Route::get('/opportunities', [OpportunityController::class, 'index'])->name('opportunities.index');
Route::get('/opportunities/{opportunity}', [OpportunityController::class, 'show'])->name('opportunities.show');
Route::post('/opportunities/{opportunity}/apply', [OpportunityController::class, 'apply'])->name('opportunities.apply');
Route::get('/about', function () {
    return Inertia::render('user/about/index');
});
Route::get('/contact', function () {
    return Inertia::render('contact/index');
})->name('contact');
Route::get('/tililab', function () {
    $editions = TililabEdition::query()
        ->orderByDesc('year')
        ->orderBy('sort')
        ->orderByDesc('id')
        ->get();

    return Inertia::render('user/tililab/index', [
        'editions' => $editions,
    ]);
});
Route::get('/tilila', function () {
    $editions = TililaEdition::query()
        ->orderByDesc('year')
        ->orderBy('sort')
        ->orderByDesc('id')
        ->get();

    return Inertia::render('user/tilila/index', [
        'editions' => $editions,
    ]);
});

Route::get('/tilila/editions/{edition}', function (TililaEdition $edition) {
    return Inertia::render('user/tilila/edition', [
        'edition' => $edition,
    ]);
});

Route::get('/tilila/editions/{edition}/gallery', function (TililaEdition $edition) {
    return Inertia::render('user/tilila/gallery', [
        'edition' => $edition,
    ]);
});

Route::get('/tilila/editions/{edition}/winners', function (TililaEdition $edition) {
    return Inertia::render('user/tilila/winners', [
        'edition' => $edition,
    ]);
});

Route::get('/tilila/editions/{edition}/jury', function (TililaEdition $edition) {
    return Inertia::render('user/tilila/jury', [
        'edition' => $edition,
    ]);
});

Route::get('/tililab/editions/{edition}', function (TililabEdition $edition) {
    return Inertia::render('user/tililab/edition', [
        'edition' => $edition,
    ]);
});

Route::post('/tilila/participate', [TililaParticipationController::class, 'store'])->name('tilila.participate.store');
Route::get('/tililab/form', function () {
    return Inertia::render('user/tililab/partials/FormOFInscription');
});
Route::post('/tililab/form', [TililabInscriptionController::class, 'store'])->name('tililab.form.store');
Route::get('/media', [MediaController::class, 'index'])->name('media.index');
Route::get('/media/{media}', [MediaController::class, 'show'])->name('media.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        require __DIR__.'/admin.php';
    });
});

require __DIR__.'/events.php';
require __DIR__.'/gouvernance.php';
require __DIR__.'/settings.php';
