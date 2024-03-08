<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index()
    {
        return view('features.ProductsManagement.ProductsManagement');
    }

    public function deletedProducts()
    {
        return view('features.ProductsManagement.DeletedProducts');
    }
}
