<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\AuthController;
use Tymon\JWTAuth\Http\Middleware\Authenticate;

use Illuminate\Support\Facades\Route;

Route::apiResource('/announcement', AnnouncementController::class);
Route::apiResource('/training', TrainingController::class);
Route::apiResource('/module', ModuleController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [AuthController::class, 'index']);
Route::middleware([Authenticate::class])->group(function () {
    Route::get('/protected-route', function () {
        return response()->json(['message' => 'This is a protected route']);
    });
});
