<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\ContactController; // (optional, if contact form saving is implemented)

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| These routes are for API access only. Frontend (React) calls these routes.
*/

// ------------------- USER AUTH + ACCOUNT ROUTES -------------------

// Register new user
Route::post('/register', [UserController::class, 'store']);

// Login
Route::post('/login', [UserController::class, 'login']);

// Reset password
Route::post('/reset-password', [UserController::class, 'resetPassword']);

// Full User CRUD (optional, for admin)
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);         // List users
    Route::post('/', [UserController::class, 'store']);        // Register user
    Route::get('{id}', [UserController::class, 'show']);       // View user
    Route::put('{id}', [UserController::class, 'update']);     // Update user
    Route::delete('{id}', [UserController::class, 'destroy']); // Delete user
});


// ------------------- PROPERTY ROUTES -------------------

Route::get('/properties', [PropertyController::class, 'index']);     // Get all properties
Route::get('/properties/{id}', [PropertyController::class, 'show']); // Get property by ID
Route::post('/properties', [PropertyController::class, 'store']);    // Add new property


// Route::apiResource('properties', PropertyController::class);
// Route::post('properties/{id}/images', [PropertyController::class, 'updateImages']);


// ------------------- CONTACT FORM (OPTIONAL) -------------------

// Route::post('/contact', [ContactController::class, 'store']); // Contact form submission

