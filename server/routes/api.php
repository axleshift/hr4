<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\AuthController;

use Illuminate\Support\Facades\Route;

// API Resource Routes
Route::apiResource('/announcement', AnnouncementController::class);
Route::apiResource('/training', TrainingController::class);
Route::apiResource('/module', ModuleController::class);

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'sessionLogin']); // Change to sessionLogin
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/users', [AuthController::class, 'index']);

// Protected Routes
Route::middleware('auth')->group(function () {
    Route::get('/protected-route', function () {
        return response()->json(['message' => 'This is a protected route']);
    });
});
