<?php

use App\Http\Controllers\CertificateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingPageConroller;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
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
Route::get('/resume/preview/{resume}', [DashboardController::class, 'resumePreview'])->name('resume.preview');

// Auth routes group
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', [DashboardController::class, "index"])->name('dashboard');
    Route::post('/resume', [DashboardController::class, "resumeStore"])->name('resume.store');
    Route::put('/resume/{resume}', [DashboardController::class, "resumeUpdate"])->name('resume.update');
    Route::resource('/admin/project', ProjectController::class);
    Route::resource('/admin/certificate', CertificateController::class);
    Route::resource('/admin/skill', SkillController::class);
});




require __DIR__ . '/auth.php';
