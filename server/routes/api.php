<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\AuthController;



use Illuminate\Support\Facades\Route;

// API Resource Routes

//AUTH

Route::apiResource('/announcement', AnnouncementController::class);
Route::apiResource('/training', TrainingController::class);
Route::post('register', [AuthController::class, 'register']);

//LMS MODULE
Route::apiResource('/modules', ModuleController::class);
Route::apiResource('/files', FileController::class);
Route::get('files/count', [FileController::class, 'getFileCount']);