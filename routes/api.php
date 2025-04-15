<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\ModuleController;
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

    // Module File Management
    Route::apiResource('/modules', ModuleController::class);
    Route::get('/modules/download/{module}', [ModuleController::class, 'download']);
    Route::get('/modules/{module}/preview', [ModuleController::class, 'preview']);
    Route::get('/courses/download/{module}', [ModuleController::class, 'download']);
    Route::get('/courses/{module}/preview', [ModuleController::class, 'preview']);
//});


//ACCESS CONTROL
use App\Http\Controllers\AuthController;

Route::get('users', [AuthController::class, 'index']);  // Add this route to list users

// INTEGRATION
use App\Http\Controllers\Api\EmployeeTrainingController; //HR1
use App\Http\Controllers\Api\AccountController; //ADMIN

Route::apiResource('employee-trainings', EmployeeTrainingController::class);

Route::get('accounts', [AccountController::class, 'index']);
Route::post('accounts', [AccountController::class, 'store']);
Route::get('accounts/{id}', [AccountController::class, 'show']);
Route::put('accounts/{id}', [AccountController::class, 'update']);
Route::delete('accounts/{id}', [AccountController::class, 'destroy']);
