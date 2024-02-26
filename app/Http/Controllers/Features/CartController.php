<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        return view('customer.cart.Cart');
    }

    public function checkOutPage()
    {
        return view('customer.cart.Checkout');
    }
}
