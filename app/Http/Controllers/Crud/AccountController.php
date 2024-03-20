<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function mobileLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->email)->with('profile')->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response(['error' => "Credentials does not exist!"]);
        } else {
            return response(['user' => $user]);
        }
    }

    public function getProfile($id)
    {
        return UserProfile::where('user_id', $id)->first();
    }

    public function editContactNo(Request $request)
    {
        return UserProfile::where('user_id', $request->user_id)->update([
            'contact_no' => $request->contact_no 
        ]);
    }

    public function editAddress(Request $request)
    {
        return UserProfile::where('user_id', $request->user_id)->update([
            'address' => $request->address,
            'city' => $request->city,
            'postal_code' => $request->postal_code
        ]);
    }

    public function changePassword(Request $request)
    {
        $user = User::where('id', $request->id)->first();
        if (!Hash::check($request->currPassword, $user->password)) {
            return 'false';
        } else {
            User::where('id', $request->id)->update([
                'password' => Hash::make($request->newPassword)
            ]);
            return 'true';
        }
    }
}
