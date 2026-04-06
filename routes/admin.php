<?php

use App\Http\Controllers\Admin\ExpertController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('experts', ExpertController::class)->except(['show']);
});
