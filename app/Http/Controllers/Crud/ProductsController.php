<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function getThreeProducts()
    {
        return Products::limit(3)->get();
    }

    public function getProduct(Request $request)
    {
        return Products::find($request->id)->first();
    }
}
