<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\CourseController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Hello, World!']);
});

// API Routes Protected by Session Middleware
//Route::middleware('verify.session')->group(function () {
    Route::apiResource('/announcement', AnnouncementController::class);

    // TRAINING MANAGEMENT
    Route::apiResource('/training', TrainingController::class);
    Route::resource('programs', ProgramController::class);
    Route::resource('courses', CourseController::class);

    Route::apiResource('/modules', ModuleController::class);

    // Module File Management
    Route::get('/modules/download/{module}', [ModuleController::class, 'download']);
    Route::get('/modules/{module}/preview', [ModuleController::class, 'preview']);
//});


//ACCESS CONTROL
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UserProfileController;
use App\Http\Controllers\Api\RolesController;

Route::get('/users', [AuthController::class, 'index']);
// Fetch all roles
Route::get('/roles', [RolesController::class, 'index']);
Route::get('/users', [UserProfileController::class, 'index']);
Route::get('/users/{id}', [UserProfileController::class, 'show']);
Route::put('/users/{id}', [UserProfileController::class, 'update']);
Route::get('users/specific-profile/{id}', [UserProfileController::class, 'showSpecificProfile']);
