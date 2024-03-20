<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use App\Models\Visitor;
use Illuminate\Http\Request;

class CustomerShopping extends Controller
{
    public function index()
    {
        Visitor::create([
            'ipaddress' => request()->ip()
        ]);
        return view('customer.CustomerIndex');
    }

    public function getProduct($id)
    {
        return view('customer.products.ProductsPage', [
            'id' => $id
        ]);
    }

    public function allProducts()
    {
        return view('customer.products.AllProductsPage');
    }

    public function bubbleBath()
    {
        return view('customer.products.BubbleBathPage');
    }
}
