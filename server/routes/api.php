<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\AuthController;

use Illuminate\Support\Facades\Route;

// API Resource Routes
Route::apiResource('/announcement', AnnouncementController::class);
Route::apiResource('/training', TrainingController::class);
Route::get('/users', [AuthController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

//LMS MODULE
Route::apiResource('/modules', ModuleController::class);
Route::apiResource('/files', FileController::class);
