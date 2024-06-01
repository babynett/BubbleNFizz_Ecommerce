<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'order_address',
        'order_apartment',
        'order_phone_number',
        'order_shipping',
        'order_status',
        'payment',
        'payment_reference',
        'payment_image',
        'payment_status',
        'total_quantity',
        'total_price',
    ];

    public function ownedBy()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItems::class, 'order_id', 'id');
    }

    public function refunds()
    {
        return $this->hasOne(RefundImages::class, 'order_id', 'id');
    }

    public function delivery()
    {
        return $this->hasOne(DeliveryStatus::class, 'order_id', 'id');
    }

    public function amountPaid()
    {
        return $this->hasOne(AmountPaid::class, 'order_id', 'id');
    }
}
