<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'email.email' => 'Invalid email',
            'password.confirmed' => 'Passwords do not match',
            'password.min' => 'Password must be at least 8 characters long',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'pass_reset_errs' => $validatedData->messages(),
            ]);
        }

        $validatedData = $validatedData->validated(); // Retrieve validated data

        $user = User::where('email', $validatedData['email'])->first();
        if (!$user) {
            return response()->json(['email' => 'Invalid Email Address']);
        }

        $resetToken = $user->tokens()
            ->where('name', 'Password Reset')
            ->where('abilities', 'like', '%"Password-Reset"%')
            ->first();

        if ($resetToken->expires_at->isPast()) {
            return response()->json(['token' => 'Password reset token has expired. Please request a new one.'], 400);
            $resetToken->delete();
        }

        $user->password = $validatedData['password'];
        $user->save();

        $resetToken->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Password reset successfully',
        ]);
    }

}
