<?php

use App\Http\Controllers\Api\AnnouncementController;
use Illuminate\Support\Facades\Route;

Route::apiResource('/announcement', AnnouncementController::class);