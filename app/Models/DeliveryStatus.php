<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'tracking_number',
        'delivery_courier',
        'delivery_location',
        'delivery_status',
    ];
}
