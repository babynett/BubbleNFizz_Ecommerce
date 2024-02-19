<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'product_rating',
        'product_description',
    ];

    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
