<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::prefix('api/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/verify-session', [AuthController::class, 'verifySession']);
    Route::get('auth/google', [GoogleAuthController::class, 'redirect'])->name('google-auth');
    Route::get('auth/google/call-back', [GoogleAuthController::class, 'callbackGoogle']);
    Route::post('auth/google', [GoogleAuthController::class, 'callbackGoogle']);
    Route::post('auth/google/call-back', [GoogleAuthController::class, 'callbackGoogle']);
});


Route::fallback(fn() => view('index'));