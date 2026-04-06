<?php

use App\Http\Controllers\ExpertController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'home/index', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('/experts', [ExpertController::class, 'index'])->name('experts.index');
Route::get('/experts/{expert}', [ExpertController::class, 'show'])->name('experts.show');
Route::inertia('/opportunities', 'opportunities/index')->name('opportunities.index');
Route::inertia('/opportunities/{id}', 'opportunities/[id]')->name('opportunities.show');
Route::get('/about', function () {
    return Inertia::render('user/about/index');
});
Route::get('/tililab', function () {
    return Inertia::render('user/tililab/index');
});
Route::get('/tilila', function () {
    return Inertia::render('user/tilila/index');
});
Route::get('/tilila/form', function () {
    return Inertia::render('user/tilila/partials/FormOFInscription');
});
Route::get('/media', function () {
    return Inertia::render('user/media/index');
});
Route::get('/media/{id}', function (string $id) {
    return Inertia::render('user/media/[id]', [
        'id' => $id,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        require __DIR__.'/admin.php';
    });
});

require __DIR__.'/events.php';
require __DIR__.'/gouvernance.php';
require __DIR__.'/settings.php';
