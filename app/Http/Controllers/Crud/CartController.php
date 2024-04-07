<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\OrderItems;
use App\Models\Orders;
use App\Models\ProductCategory;
use App\Models\Products;
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

    public function getUserCartCount(Request $request)
    {
        $cart = Cart::where('user_id', $request->user_id)->count();

        return $cart;
    }

    public function getUserCart(Request $request)
    {
        return Cart::where('user_id', $request->user_id)->with('product')->get();
    }

    public function addQuantity(Request $request)
    {
        Cart::where('id', $request->id)->update([
            'cart_quantity' => $request->cart_quantity,
            'cart_price' => $request->cart_price
        ]);
    }
    
    public function subQuantity(Request $request)
    {
        Cart::where("id", $request->id)->update([
            'cart_quantity' => $request->cart_quantity,
            'cart_price' => $request->cart_price
        ]);
    }

    public function deleteCartItem(Request $request)
    {
        Cart::where('id', $request->id)->delete();
    }

    public function submitOrder(Request $request)
    {
        // return json_encode(json_decode($request->carts));
        if ($request->hasFile('payment_image')) {
            $file = $request->file('payment_image');
            $filename = $file->getClientOriginalName();
            request()->payment_image->move(public_path('image/order'), $filename);
            $order = Orders::create([
                'user_id' => $request->user_id,
                'order_address' => $request->order_address,
                'order_apartment' => $request->order_apartment,
                'order_phone_number' => $request->order_phone_number,
                'order_shipping' => ($request->order_shipping == "Walk In" ? "Completed" : "Pending"),
                'order_status' => 'Pending',
                'payment' => $request->payment,
                'payment_reference' => rand(1000000,9999999),
                'payment_image' => $filename,
                'payment_status' => ($request->payment != "GCash" ? "Paid" : "Pending"),
                'total_quantity' => $request->total_quantity,
                'total_price' => $request->total_price,
            ]);
        } else {
            $order = Orders::create([
                'user_id' => $request->user_id,
                'order_address' => $request->order_address,
                'order_apartment' => $request->order_apartment,
                'order_phone_number' => $request->order_phone_number,
                'order_shipping' => $request->order_shipping,
                'order_status' => ($request->order_shipping == "Walk In" ? "Completed" : "Pending"),
                'payment' => $request->payment,
                'payment_reference' => rand(1000000,9999999),
                'payment_image' => NULL,
                'payment_status' => ($request->payment != "GCash" ? "Paid" : "Pending"),
                'total_quantity' => $request->total_quantity,
                'total_price' => $request->total_price,
            ]);
        }

        $cart_items = json_decode(json_encode(json_decode($request->carts)));

        foreach($cart_items as $items) {
            OrderItems::create([
                'order_id' => $order->id,
                'product_id' => $items->product_id,
                'order_quantity' => $items->cart_quantity,
                'order_price' => $items->cart_price,
            ]);

            $salesCount = ProductCategory::where('product_id', $items->product_id)->first();
            ProductCategory::where('product_id', $items->product_id)->update([
                'product_sales' => (int)$salesCount->product_sales + (int)$items->cart_quantity
            ]);

            $productStock = Products::where('id', $items->product_id)->first();
            Products::where('id', $items->product_id)->update([
                'product_stock' => (int)$productStock->product_stock - (int)$items->cart_quantity
            ]);
            if ($request->order_shipping != "Walk In") {
                Cart::where('id', $items->id)->delete();
            }
        }
    }
}
