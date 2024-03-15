<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Models\Products;
use App\Models\RecentView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        return Products::where('id', $request->id)->first();
    }

    public function getAllProducts(Request $request)
    {
        // return Products::with(['category' => function($query) use ($request) {
        //     $category = (string)$request->category;
        //     $query->where('product_category', str_replace('%20', ' ', $category))->get();
        // }])->where('is_deleted', 0)->orderBy(DB::raw('CAST(product_price AS UNSIGNED)'), $request->sort == 'Highest Price' ? 'desc' : 'asc')->get();
        return Products::with('category')->where('is_deleted', 0)->orderBy(DB::raw('CAST(product_price AS UNSIGNED)'), $request->sort == 'Highest Price' ? 'desc' : 'asc')->get();
    }

    public function getPaymentProduct(Request $request)
    {
        return ProductCategory::with(['product_details' => function($query) use ($request) {
            $query->where('is_deleted', false);
        }])->where('product_category', $request->category)->get();
        // return $category;
    }

    public function getDeletedProducts()
    {
        return Products::with('category')->where('is_deleted', 1)->get();
    }

    public function getBathProducts()
    {
        return ProductCategory::where('product_category', 'Bubble Bath')->with('product_details')->get();
    }

    public function addRecentView(Request $request)
    {
        return RecentView::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id
        ]);
    }

    public function getRecentProducts(Request $request)
    {
        return RecentView::where('user_id', $request->user_id)->with('product')->get();
    }

    public function deleteProduct(Request $request)
    {
        return Products::where('id', $request->id)->update([
            'is_deleted' => true
        ]);
    }

    public function recoverProduct(Request $request)
    {
        return Products::where('id', $request->id)->update([
            'is_deleted' => false
        ]);
    }
}
