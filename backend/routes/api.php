<?php

use App\Http\Controllers\BiographyController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\SettingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('measurements', MeasurementController::class);
Route::apiResource('galleries', GalleryController::class);
Route::apiResource('biographies', BiographyController::class);
Route::apiResource('settings', SettingController::class);
