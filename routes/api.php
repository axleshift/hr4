<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Api\EmployeeTrainingNeedController;  // Add this import
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DepartmentController;

Route::get('/roles', [RoleController::class, 'index']);
Route::get('/departments', [DepartmentController::class, 'index']);

Route::get('/', function () {
    return response()->json(['message' => 'Hello, World!']);
});

Route::apiResource('/announcement', AnnouncementController::class);

// TRAINING MANAGEMENT
Route::apiResource('/training', TrainingController::class);

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
// AUTHENTICATION
Route::post('/auth/verify-session', [AuthController::class, 'verifySession']);


// Add the route for EmployeeTrainingNeedController
Route::apiResource('/training-needs', EmployeeTrainingNeedController::class);

//HR1
use App\Http\Controllers\Api\EmployeeController;

Route::apiResource('/employee', EmployeeController::class);

use App\Http\Controllers\Api\EmployeeTrainingStatusController;

Route::get('/employee-training-status', [EmployeeTrainingStatusController::class, 'index']);
Route::put('/employee-training-status/{employeeId}', [EmployeeTrainingStatusController::class, 'update']);

use App\Http\Controllers\Api\BudgetReportController;

Route::apiResource('/budget-reports', BudgetReportController::class);
