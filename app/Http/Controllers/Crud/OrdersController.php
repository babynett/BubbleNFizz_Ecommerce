<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\DeliveryStatus;
use App\Models\OrderItems;
use App\Models\Orders;
use App\Models\RefundImages;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function getAllOrders()
    {
        return Orders::with('ownedBy.profile')->with('orderItems.product')->with('refunds')->where('order_status', '!=', 'Cancelled')->where('order_status', '!=', 'Refund')->get();
    }

    public function getRefundOrders()
    {
        return Orders::with('ownedBy.profile')->with('orderItems.product')->with('refunds')->where('order_status', 'Refund')->get();
    }

    public function getDeliveries()
    {
        return Orders::with('ownedBy.profile')->with('orderItems.product')->with('delivery')->where('order_status', 'To Ship')->orWhere('order_status', 'To Receive')->get();
    }

    public function confirmPayment(Request $request)
    {
        DeliveryStatus::create([
            'order_id' => $request->id,
            'delivery_status' => "Preparing To Ship",
        ]);
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

    public function refundItem(Request $request)
    {
        Orders::where('id', $request->id)->update([
            'order_status' => $request->order_status
        ]);

        if ($request->hasFile('refund_images')) {
            $file = $request->file('refund_images');
            $filename = $file->getClientOriginalName();
            request()->refund_images->move(public_path('image/refunds'), $filename);
            RefundImages::create([
                'order_id' => $request->id,
                'refund_image' => $filename,
                'refund_comment' => $request->refund_comment,
                'refund_status' => "Pending"
            ]);
        }

    }

    public function confirmRefund(Request $request)
    {
        return RefundImages::where('id', $request->id)->update([
            'refund_status' => "Accepted"
        ]);
    }

    public function rejectRefund(Request $request)
    {
        return RefundImages::where('id', $request->id)->update([
            'refund_status' => "Rejected"
        ]);
    }

    public function pickedUp(Request $request)
    {
        DeliveryStatus::where("id", $request->id)->update([
            'delivery_status' => "Picked Up by Courier"
        ]);
    }

    public function delivered(Request $request)
    {
        DeliveryStatus::where("id", $request->id)->update([
            'delivery_status' => "Delivered"
        ]);
    }

    public function addCourier(Request $request)
    {
        DeliveryStatus::where("id", $request->id)->update([
            'delivery_courier' => $request->delivery_courier
        ]);
    }

    public function updateTracking(Request $request)
    {
        DeliveryStatus::where('id', $request->id)->update([
            'tracking_number' => $request->tracking_number
        ]);
    }

    public function updateLocation(Request $request)
    {
        DeliveryStatus::where('id', $request->id)->update([
            'delivery_location' => $request->delivery_location
        ]);
    }
}
