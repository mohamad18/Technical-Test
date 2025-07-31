<?php

use App\Http\Controllers\Api\OtpController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth.token')->prefix('otp')->group(function () {
    Route::post('generate', [OtpController::class, 'generate']);
    Route::post('validate', [OtpController::class, 'validateOtp']);
});
