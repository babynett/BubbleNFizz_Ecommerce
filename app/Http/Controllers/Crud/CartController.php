<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        Cart::create([
            'product_id' => $request->product_id,
            'user_id' => $request->user_id,
            'cart_quantity' => $request->cart_quantity,
            'cart_price' => $request->cart_price
        ]);
    }

    public function getUserCart(Request $request)
    {
        return Cart::where('user_id', $request->user_id)->with('product')->get();
    }
}
