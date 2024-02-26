<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        return view('customer.cart.Cart');
    }

    public function checkOutPage()
    {
        $user_id = Auth::user()->id;
        $user = User::where('id', $user_id)->with('profile')->first();
        return view('customer.cart.Checkout', [
            'user' => $user
        ]);
    }
}
