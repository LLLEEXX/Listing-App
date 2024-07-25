<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class VerificationController extends Controller
{
    public function verify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if ($user->email_verified_at !== null) {
            return redirect()->route('already.verified');
        }

        if (hash_equals($hash, sha1($user->getEmailForVerification()))) {
            $user->markEmailAsVerified();
            return redirect()->route('email.verified');
        }
        
        return redirect()->route('error.verifying');
        
    }

    
}
