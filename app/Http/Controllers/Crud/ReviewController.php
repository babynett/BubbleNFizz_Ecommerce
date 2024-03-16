<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\OrderItems;
use App\Models\Orders;
use App\Models\ProductReview;
use App\Models\Products;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function addReview(Request $request)
    {
        $reviews = ProductReview::where('product_id', $request->product_id)->get();
        $ratingTotal = 0;
        $ratingCount = 0;
        if (count($reviews) > 0) {
            foreach ($reviews as $review) {
                $ratingTotal = $ratingTotal + $review->product_rating;
                $ratingCount = $ratingCount + 1;
            }
        }
        $ratingTotal = $ratingTotal + $request->product_rating;
        $ratingCount = $ratingCount + 1;
        $ratingAvg = $ratingTotal / $ratingCount;
        ProductReview::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'product_rating' => $request->product_rating,
            'product_description' => $request->product_description
        ]);

        Products::where('id', $request->product_id)->update([
            'product_rating' => $ratingAvg
        ]);

        // $product = Products::where('id', $request->product_id)->first();

        // $productRating = $product->product_rating;


    }

    public function getProductReviews(Request $request)
    {
        return ProductReview::where("product_id", $request->product_id)->orderBy('id', 'desc')->with('user')->limit(3)->get();
    }

    public function getProductToReview(Request $request)
    {
        $orders = Orders::where('user_id', $request->user_id)
            ->with(['orderItems' => function ($query) {
                $query->get();
            }])
            ->get();

        $productsToReview = [];
        $productsId = [];

        foreach ($orders as $order) {
            // $productsToReview[] = $order->orderItems; // Access the order items directly
            foreach($order->orderItems as $item) {
                $exist = ProductReview::where('product_id', $item->product_id)->first();
                if (!$exist) {
                    $productsId[] = $item->product_id;
                }
            }
        }

        $productIds = array_unique($productsId);

        foreach($productIds as $productId) {
            $productsToReview[] = Products::where('id', $productId)->first();
        }

        return $productsToReview;
    }
}
