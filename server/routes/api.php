<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Route::get('/roles', [RoleController::class, 'index']);

Route::get('/', function () {
    return response()->json(['message' => 'Hello, World!']);
});

// API Routes Protected by Session Middleware
//Route::middleware('verify.session')->group(function () {
    Route::apiResource('/announcement', AnnouncementController::class);

    // TRAINING MANAGEMENT
    Route::apiResource('/training', TrainingController::class);
    Route::resource('programs', ProgramController::class);

    Route::apiResource('courses', CourseController::class);
Route::get('/courses/{course}/preview', [CourseController::class, 'preview']);


    Route::apiResource('/modules', ModuleController::class);

    // Module File Management
    Route::get('/modules/download/{module}', [ModuleController::class, 'download']);
    Route::get('/modules/{module}/preview', [ModuleController::class, 'preview']);
//});


//ACCESS CONTROL
use App\Http\Controllers\AuthController;

Route::get('/users', [AuthController::class, 'index']);