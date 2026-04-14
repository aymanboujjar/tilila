<?php

use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\ExpertController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\MediaSidebarController;
use App\Http\Controllers\Admin\OpportunityController;
use App\Http\Controllers\Admin\TililaEditionController;
use App\Http\Controllers\Admin\TililabAnalyticsController;
use App\Http\Controllers\Admin\TililabParticipantController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('experts/export.csv', [ExpertController::class, 'exportCsv'])->name('experts.export');
    Route::resource('experts', ExpertController::class)->except(['show']);

    Route::get('opportunities/export.csv', [OpportunityController::class, 'exportCsv'])->name('opportunities.export');
    Route::resource('opportunities', OpportunityController::class);

    Route::resource('events', EventController::class);

    Route::get('media/export.csv', [MediaController::class, 'exportCsv'])->name('media.export');
    Route::get('media/sidebar/edit', [MediaSidebarController::class, 'edit'])->name('media.sidebar.edit');
    Route::put('media/sidebar', [MediaSidebarController::class, 'update'])->name('media.sidebar.update');
    Route::resource('media', MediaController::class);

    Route::get('tililab/participants/export.csv', [TililabParticipantController::class, 'exportCsv'])->name('tililab.participants.export');
    Route::get('tililab/participants', [TililabParticipantController::class, 'index'])->name('tililab.participants.index');
    Route::get('tililab/participants/{participant}', [TililabParticipantController::class, 'show'])->name('tililab.participants.show');
    Route::delete('tililab/participants/{participant}', [TililabParticipantController::class, 'destroy'])->name('tililab.participants.destroy');

    Route::get('tililab/analytics', [TililabAnalyticsController::class, 'index'])->name('tililab.analytics.index');

    Route::resource('tilila/editions', TililaEditionController::class)
        ->except(['show']);
});
