<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;


use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\BookingController;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/products', [ProductController::class, 'index'])
    ->name('products.index');

Route::get('/products/{product}/edit', [ProductController::class, 'edit'])
    ->name('products.edit');

Route::put('/products/{product}', [ProductController::class, 'update'])
    ->name('products.update');


Route::prefix('hotel')->group(function () {
    Route::get('/', [RoomController::class, 'index'])->name('hotel.index');
    Route::get('/{id}', [RoomController::class, 'show']);
    Route::post('/', [RoomController::class, 'store']);
    Route::put('update-booking/{id}', [RoomController::class, 'update']);
    Route::delete('/{id}', [RoomController::class, 'destroy']);
});

Route::get('/booking-create', [RoomController::class, 'create']);
Route::get('/booking-create/{room_id}/price', [RoomController::class, 'getRoomPrice']);

Route::get('/edit-booking/{id}', [RoomController::class, 'edit'])
    ->name('booking.edit');

Route::patch('/update-booking/{id}', [RoomController::class, 'update'])
    ->name('booking.update');


require __DIR__ . '/auth.php';
