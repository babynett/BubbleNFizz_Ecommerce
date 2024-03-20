<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $userId = Auth::user()->id;
        $user = User::with('profile')->where('id', $userId)->first();
        // dd($user);
        return view('home', [
            'user' => $user,
        ]);
    }
    
    public function customerPoll()
    {
        $userId = Auth::user()->id;
        $user = User::with('profile')->where('id', $userId)->first();
        return view('customer.CustomerPoll', [
            'user' => $user,
        ]);
    }
}
