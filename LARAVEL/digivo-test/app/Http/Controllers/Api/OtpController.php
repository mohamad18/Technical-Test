<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Otp;
use Carbon\Carbon;

class OtpController extends Controller
{
    public function generate(Request $request)
    {
        $user = $request->user;

        $otp = strval(rand(100000, 999999));

        Otp::create([
            'user_id' => $user->id,
            'kode_otp' => $otp,
            'created_at' => now(),
        ]);

        return response()->json([
            'otp' => $otp,
            'message' => 'OTP generated successfully'
        ]);
    }

    public function validateOtp(Request $request)
    {
        $user = $request->user;
        $otpInput = $request->input('otp');

        if (!$otpInput) {
            return response()->json(['error' => 'OTP is required'], 400);
        }

        $otp = Otp::where('user_id', $user->id)
            ->where('kode_otp', $otpInput)
            ->where('created_at', '>=', Carbon::now()->subMinutes(5))
            ->latest()
            ->first();

        if ($otp) {
            return response()->json(['valid' => true, 'message' => 'OTP valid']);
        } else {
            return response()->json(['valid' => false, 'message' => 'OTP invalid or expired']);
        }
    }
}
