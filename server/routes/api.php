<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use Illuminate\Support\Facades\Route;

Route::apiResource('/announcement', AnnouncementController::class);
Route::apiResource('/training', TrainingController::class);