<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'cart_quantity',
        'cart_price'
    ];

    public function product()
    {
        return $this->hasOne(Products::class, 'id', 'product_id');
    }
}
