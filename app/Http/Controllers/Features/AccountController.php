<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function editProfile()
    {
        $user = User::with('profile')->where('id', Auth::user()->id)->first();
        return view('auth.EditProfile', [
            'user' => $user
        ]);
    }
}
