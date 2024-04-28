<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefundImages extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'refund_image',
        'refund_comment',
        'refund_status',
    ];
}
