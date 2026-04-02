<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/events', 'events/index')->name('events.index');
Route::inertia('/events/{id}', 'events/[id]')->name('events.show');

