<?php

use App\Http\Controllers\Admin\ExpertController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\OpportunityController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('experts/export.csv', [ExpertController::class, 'exportCsv'])->name('experts.export');
    Route::resource('experts', ExpertController::class)->except(['show']);

    Route::get('opportunities/export.csv', [OpportunityController::class, 'exportCsv'])->name('opportunities.export');
    Route::resource('opportunities', OpportunityController::class);

    Route::resource('events', EventController::class);

    Route::get('media/export.csv', [MediaController::class, 'exportCsv'])->name('media.export');
    Route::resource('media', MediaController::class);
});
