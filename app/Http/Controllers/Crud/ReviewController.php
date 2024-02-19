<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
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
}
