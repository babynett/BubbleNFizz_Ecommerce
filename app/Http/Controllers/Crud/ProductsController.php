<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function getThreeProducts()
    {
        return Products::limit(3)->get();
    }

    public function getBestSellers()
    {
        return ProductCategory::with('product_details')->orderBy('product_sales', 'desc')->limit(3)->get();
    }

    public function getProduct(Request $request)
    {
        return Products::where('id',$request->id)->first();
    }

    public function getAllProducts()
    {
        return Products::with('category')->get();
    }


    public function getBathProducts()
    {
        return ProductCategory::where('product_category', 'Bubble Bath')->with('product_details')->get();
    }
}
