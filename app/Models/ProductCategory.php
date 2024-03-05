<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'product_category',
        'product_sales',
    ];

    public function product_details()
    {
        return $this->hasOne(Products::class, 'id', 'product_id');
    }

}
