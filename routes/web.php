<?php

use App\Http\Controllers\CertificateController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingPageConroller;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;


Route::get('/', [LandingPageConroller::class, 'home'])->name('home');
Route::post('/send-email', [DashboardController::class, 'sendEmail'])->name('send.email');
Route::get('/project', [LandingPageConroller::class, 'project'])->name('project');
Route::get('/login', function () {
    return redirect()->route('home');
});
Route::get('/register', function () {
    return redirect()->route('home');
});

// Auth routes group
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', [DashboardController::class, "index"])->name('dashboard');
    Route::resource('/admin/project', ProjectController::class);
    Route::resource('/admin/certificate', CertificateController::class);
});

Route::post('/chat/send', [ChatController::class, 'send']);
Route::get('/chat', function () {
    return Inertia\Inertia::render('Chat');
});




require __DIR__.'/auth.php';
