<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'product_description',
        'product_images',
        'product_price',
        'product_stock',
        'product_rating',
        'product_scent_name',
    ];

    public function scent()
    {
        return $this->hasOne(ProductScent::class, 'product_id', 'id');
    }

    public function category()
    {
        return $this->hasOne(ProductCategory::class, 'product_id', 'id');
    }

    public function review()
    {
        return $this->hasMany(ProductReview::class, 'product_id', 'id');
    }
}
