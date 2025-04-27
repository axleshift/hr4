<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Api\EmployeeTrainingNeedController;  // Add this import
use Illuminate\Support\Facades\Route;

Route::get('/roles', [RoleController::class, 'index']);

Route::get('/', function () {
    return response()->json(['message' => 'Hello, World!']);
});

Route::apiResource('/announcement', AnnouncementController::class);

// TRAINING MANAGEMENT
Route::apiResource('/training', TrainingController::class);
Route::get('/training', [TrainingController::class, 'index']);
Route::apiResource('programs', ProgramController::class);

Route::apiResource('courses', CourseController::class);
Route::get('/courses/{course}/preview', [CourseController::class, 'preview']);

Route::apiResource('/modules', ModuleController::class);

// Module File Management
Route::get('/modules/download/{module}', [ModuleController::class, 'download']);
Route::get('/modules/{module}/preview', [ModuleController::class, 'preview']);

// ACCESS CONTROL
use App\Http\Controllers\AuthController;

Route::get('/users', [AuthController::class, 'index']);

// Add the route for EmployeeTrainingNeedController
Route::apiResource('training-needs', EmployeeTrainingNeedController::class);
Route::get('/training-needs/user/{userId}', [EmployeeTrainingNeedController::class, 'getByUserId']);
Route::patch('/training-needs/{id}/status', [EmployeeTrainingNeedController::class, 'updateStatus']);

//Socialite
Route::get('auth/redirect/{provider}', [\App\Http\Controllers\Auth\SocialiteController::class, 'redirectToProvider']);
Route::get('auth/callback/{provider}', [\App\Http\Controllers\Auth\SocialiteController::class, 'handleProviderCallback']);