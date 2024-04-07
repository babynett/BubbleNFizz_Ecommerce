<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Models\Products;
use App\Models\ProductScent;
use App\Models\RecentView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    public function getThreeProducts()
    {
        return Products::limit(6)->get();
    }

    public function getBestSellers()
    {
        return ProductCategory::with('product_details')->orderBy('product_sales', 'desc')->limit(6)->get();
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
        }])->where('product_category', "LIKE", $request->category)->get();
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

    public function editProduct(Request $request)
    {
        if ($request->hasFile('product_image')) {
            $file = $request->file('product_image');
            $filename = $file->getClientOriginalName();
            request()->product_image->move(public_path('image/products'), $filename);

            return Products::where('id', $request->id)->update([
                'product_name' => $request->product_name,
                'product_price' => $request->product_price,
                'product_images' => $filename,
                'product_description' => $request->product_description,
                'product_scent_name' => $request->product_scent,
                'product_stock' => $request->product_stock,
            ]);
        }
    }

    public function adjustStock(Request $request)
    {
        return Products::where('id', $request->id)->update([
            'product_stock' => $request->product_stock
        ]);
    }

    public function addProduct(Request $request)
    {
        if ($request->hasFile('product_image')) {
            $file = $request->file('product_image');
            $filename = $file->getClientOriginalName();
            request()->product_image->move(public_path('image/products'), $filename);

            $product = Products::create([
                'product_name' => $request->product_name,
                'product_description' => $request->product_description,
                'product_images' => $filename,
                'product_price' => $request->product_price,
                'product_stock' => $request->product_stock,
                'product_rating' => '0',
                'product_scent_name' => $request->product_scent,
                'is_deleted' => 0,
            ]);

            ProductCategory::create([
                'product_id' => $product->id,
                'product_category' => $request->product_category,
                'product_sales' => 0
            ]);

            ProductScent::create([
                'product_id' => $product->id,
                'product_scent' => $request->product_scent,
                'product_selected' => 0,
            ]);

            return 'true';
        } else {
            return 'false';
        }
    }
}
