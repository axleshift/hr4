<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\FileController;
use Illuminate\Support\Facades\Route;

// Public Routes (Authentication)
Route::get('/', function () {
    return response()->json(['message' => 'Hello, World!']);
});

// Protected Routes (Require Session Token)
Route::middleware(['verify.session'])->group(function () {
    Route::apiResource('/announcement', AnnouncementController::class);
    Route::apiResource('/training', TrainingController::class);
    Route::apiResource('/modules', ModuleController::class);
    Route::apiResource('/files', FileController::class);
    Route::get('files/count', [FileController::class, 'getFileCount']);
});
