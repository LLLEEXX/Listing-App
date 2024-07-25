<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//laravel Register Route

Route::get('email-verified', function () {
    return view('email-verified');
})->name('email.verified');

Route::get('already-verified', function () {
    return view('already-verified');
})->name('already.verified');

Route::get('error-verifying', function () {
    return view('error-verifying');
})->name('error.verifying');
