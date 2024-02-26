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
        'payment',
        'payment_image',
        'total_quantity',
        'total_price',
    ];

    public function ownedBy()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
