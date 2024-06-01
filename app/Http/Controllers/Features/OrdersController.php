<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function index()
    {
        return view('features.OrdersManagement.Orders');
    }

    public function cancelledOrders()
    {
        return view('features.OrdersManagement.CancelledOrders');
    }

    public function refundManagement()
    {
        return view('features.OrdersManagement.RefundManagement');
    }

    public function deliveryManagement()
    {
        return view('features.OrdersManagement.DeliveryManagement');
    }

    public function allTransactions()
    {
        return view('features.OrdersManagement.AllTransactions');
    }
}
