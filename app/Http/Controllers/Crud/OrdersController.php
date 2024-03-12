<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\OrderItems;
use App\Models\Orders;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function getAllOrders()
    {
        return Orders::with('ownedBy')->where('order_status', '!=', 'Cancelled')->get();
    }

    public function confirmPayment(Request $request)
    {
        return Orders::where('id', $request->id)->update([
            'order_status' => 'To Ship',
            'payment_status' => 'Paid'
        ]);
    }

    public function toReceive(Request $request)
    {
        return Orders::where('id', $request->id)->update([
            'order_status' => "To Receive"
        ]);
    }

    public function complete(Request $request)
    {
        return Orders::where('id', $request->id)->update([
            'order_status' => "Complete"
        ]);
    }

    public function cancelOrder(Request $request)
    {
        return Orders::where('id', $request->id)->update([
            'order_status' => "Cancelled"
        ]);
    }
    
    public function getCancelledOrders()
    {
        return Orders::with('ownedBy')->where('order_status', 'Cancelled')->get();
    }

    public function userOrders(Request $request)
    {
        return Orders::with(['orderItems.product' => function ($query) { 
            $query->get();
        }])->where('user_id', $request->user_id)->where('order_status', $request->page)->get();
    }
}
