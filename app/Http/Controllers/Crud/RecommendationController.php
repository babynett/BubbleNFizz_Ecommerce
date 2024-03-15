<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\Products;
use App\Models\RecentView;
use App\Models\User;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    public function recommendItems(Request $request)
    {
        $users = User::where('id', '!=', $request->user_id)->get();

        $similarities = [];
        foreach($users as $user) {
            $similarity = $this->calculateSimilarity($request->user_id, $user->id);
            $similarities[$user->id] = $similarity;
        }

        arsort($similarities);

        $topUsers = array_slice($similarities, 0, 3, true);

        $recommendedItems = [];
        foreach ($topUsers as $userId => $similarity) {
            $products = RecentView::where('user_id', $userId)->limit(3)->get();
            foreach ($products as $product) {
                if (!in_array($product->product_id, $recommendedItems)) {
                    $recommendedItems[] = $product->product_id;
                }
            }
        }

        $prodItems = [];

        foreach ($recommendedItems as $ids) {
            $prodItems[] = Products::where('id', $ids)->first();
        }

        return $prodItems;
    }

    public function calculateSimilarity($user1, $user2)
    {
        $user1View = RecentView::where('user_id', $user1)->orderBy('id', 'desc')->limit(5)->get();
        $user2View = RecentView::where('user_id', $user2)->orderBy('id', 'desc')->limit(5)->get();

        $similarityCount = 0;

        $user1Prod = [];
        $user2Prod = [];

        foreach($user1View as $view) {
            array_push($user1Prod, $view->product_id);
        }

        foreach($user2View as $view) {
            array_push($user2Prod, $view->product_id);
        }
        
        foreach($user1Prod as $prod) {
            if(in_array($prod, $user2Prod)) {
                $similarityCount = $similarityCount + 1;
            }
        }

        // return response(['user1' => $user1Prod, 'user2' => $user2Prod]);
        return $similarityCount;
    }
}
