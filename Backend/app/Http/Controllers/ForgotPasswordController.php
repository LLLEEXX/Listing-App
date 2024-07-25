<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Notifications\PasswordResetNotification;
use App\Models\User;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['User not found.'],
            ]);
        }

        $token = $user->createToken('Password Reset',['Password-Reset'], now()->addMinutes(25))->plainTextToken;
        $user->notify(new PasswordResetNotification($token));
    

        return response()->json(['message' => 'Reset link sent to your email'], 200);
    }
}
