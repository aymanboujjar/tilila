<?php

use App\Http\Controllers\Admin\ExpertController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('experts/export.csv', [ExpertController::class, 'exportCsv'])->name('experts.export');
    Route::resource('experts', ExpertController::class)->except(['show']);
});
