<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserInquiryResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Mail;
use App\Mail\InquiryEmail;

class InquiryController extends Controller
{
    public function userInquire(Request $request)
    {
        $authenticatedUser = auth()->user();

        $requestedUserName = $request->input('UserInquire');
        $requestedUser = User::where('fullname', $requestedUserName)->firstOrFail();

        return response()->json([
            'current_user' => new UserResource($authenticatedUser),
            'requested_user' => new UserInquiryResource($requestedUser),
        ]);

    }

    public function userMail(Request $request)
    {
        $requestData = $request->all();

        // Extract data from the request
        $userEmail = $requestData['user'];
        $senderEmail = $requestData['email'];
        $mobileNum = $requestData['mobileNum'];
        $inquireMessage = $requestData['inquireMessage'];

        $emailData = [
            'userEmail' => $userEmail,
            'senderEmail' => $senderEmail,
            'mobileNum' => $mobileNum,
            'inquireMessage' => $inquireMessage
        ];

        Mail::to($userEmail)->send(new InquiryEmail($emailData));

        return response()->json(['message' => 'Email sent successfully'], 200);
    }
}
