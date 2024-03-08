<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function getAllOrders()
    {
        return Orders::with('ownedBy')->where('order_status', '!=', 'Cancelled')->get();
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
}
