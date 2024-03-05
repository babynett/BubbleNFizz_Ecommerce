<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductScent extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'product_scent',
        'product_selected',
    ];
}
