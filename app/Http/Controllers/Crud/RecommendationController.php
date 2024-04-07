<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Models\Products;
use App\Models\RecentView;
use App\Models\User;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    public function recommendItems(Request $request)
    {
        $users = User::where('id', '!=', $request->user_id)->get(); // get all other users

        $similarities = []; // nag declare ako ng array
        foreach ($users as $user) { //loop ko lahat ng nakuha kong users
            $similarity = $this->calculateSimilarity($request->user_id, $user->id);
            $similarities[$user->id] = $similarity; // $similarities[3] = 3
        }

        // $similarities[5] = 6 - 5
        // $similarities[6] = 6 - 4
        // $similarities[7] = 6 - 3
        // ====================
        // $similarities[4] = 1
        // $similarities[3] = 0

        arsort($similarities);

        $topUsers = array_slice($similarities, 0, 3, true);

        $recommendedItems = [];
        foreach ($topUsers as $userId => $similarity) {
            $products = RecentView::where('user_id', $userId)->limit(6)->get();
            foreach ($products as $product) {
                if (!in_array($product->product_id, $recommendedItems)) {
                    $recommendedItems[] = $product->product_id;
                }
            }
        }

        $prodItems = [];

        foreach ($recommendedItems as $ids) {
            $prodItems[] = Products::where('id', $ids)->with('category')->first();
        }

        return $prodItems;
    }

    public function similarProducts()
    {
        $products = RecentView::with('product.category', 'product.scent')->get();

        $randomProducts = [];
        $maxProducts = 6;

        // Extract unique category and scent IDs from the recent views
        $categoryIds = $products->pluck('product.category.id')->unique()->toArray();
        $scentIds = $products->pluck('product.scent.id')->unique()->toArray();

        // Fetch products that match the category and scent of recent views
        $filteredProducts = Products::whereHas('category', function ($query) use ($categoryIds) {
            $query->whereIn('id', $categoryIds);
        })->whereHas('scent', function ($query) use ($scentIds) {
            $query->whereIn('id', $scentIds);
        });

        // Ensure enough unique products to fetch
        if ($filteredProducts->count() >= $maxProducts) {
            // Shuffle the filtered products
            $shuffledProducts = $filteredProducts->inRandomOrder()->take($maxProducts)->get();

            $randomProducts = $shuffledProducts->all();
        } else {
            // Handle case when there are not enough unique products
            $randomProducts = $filteredProducts->inRandomOrder()->get();
            $remainingProductsCount = $maxProducts - $randomProducts->count();

            // Fetch additional random products to meet the required count
            $additionalRandomProducts = Products::whereNotIn('id', $randomProducts->pluck('id')->toArray())
                ->with('category')
                ->inRandomOrder()
                ->take($remainingProductsCount)
                ->get();

            $randomProducts = $randomProducts->concat($additionalRandomProducts);
        }

        return $randomProducts;
    }

    public function pollResult(Request $request)
    {
        $scents = $request->product_scent;
        $pollRes = [];
        $allProducts = collect();
        foreach($scents as $key => $scent) {
            if ($scent == "Floral") {
                $florals = ['Rosewood', "Lavander", 'Rosemary Tea', 'Rose Valentine', "Sweet Berry"];
                $pollRes[$key] = Products::whereIn('product_scent_name', $florals)
                ->with('category')
                ->get();
            } else if ($scent == "Gourmand Sweet") {
                $gourmand = ['Vanilla Latte', 'Toasted Marshmallow', 'Coco Gugo', 'Bubblegum'];
                $pollRes[$key] = Products::whereIn('product_scent_name', $gourmand)
                ->with('category')
                ->get();
            } else if ($scent == 'Earthy-Woody Vibes') {
                $earthy = ['Activated Charcoal', 'Coal Black'];
                $pollRes[$key] = Products::whereIn('product_scent_name', $earthy)
                ->with('category')
                ->get();
            } else if ($scent == 'Tropically Fruity') {
                $tropical = ['Papaya', 'Green Apple', 'Energize Lemon'];
                $pollRes[$key] = Products::whereIn('product_scent_name', $tropical)
                ->with('category')
                ->get();
            } else if ($scent == 'Fresh and Clean') {
                $fresh = ['Oatmeal', 'Aloe Berry', 'Surprise Toy for Boy', 'Cucumber'];
                $pollRes[$key] = Products::whereIn('product_scent_name', $fresh)
                ->with('category')
                ->get();
            } else if ($scent == 'Aquatic or Oceanic') {
                $oceanic = ['Sea Shine', 'Ocean Galaxy'];
                $pollRes[$key] = Products::whereIn('product_scent_name', $oceanic)
                ->with('category')
                ->get();
            } else if ($scent == "Oriental Spice") {
                $oriental = ['Royal Goddess', 'Peppermint'];
                $pollRes[$key] = Products::whereIn('product_scent_name', $oriental)
                ->with('category')
                ->get();
            }
            if ($pollRes[$key]->isNotEmpty()) {
                // Select a random category from the retrieved products
                $randomCategory = $pollRes[$key]->random()->category;
    
                // Retrieve products with the same random category
                $randomCategoryProducts = Products::with('category')->whereHas('category', function ($query) use ($randomCategory) {
                    $query->where('product_category', $randomCategory->product_category);
                })->inRandomOrder()->limit(5)->get();
    
                // Merge the random category products with the initially retrieved products
                $allProducts = $allProducts->merge($pollRes[$key])->merge($randomCategoryProducts);
    
                // Remove duplicates
                $allProducts = $allProducts->unique('id')->values();
    
            }
        }
        // Shuffle the collection
        $allProducts = $allProducts->shuffle();
        return $allProducts;
    }

    public function calculateSimilarity($user1, $user2)
    {
        $user1View = RecentView::where('user_id', $user1)->orderBy('id', 'desc')->limit(6)->get();
        $user2View = RecentView::where('user_id', $user2)->orderBy('id', 'desc')->limit(6)->get();

        $similarityCount = 0; // 3

        $user1Prod = []; // [1, 5, 7, 30, 21, 9]
        $user2Prod = []; // [6, 7, 30, 1, 44, 11]

        foreach ($user1View as $view) {
            array_push($user1Prod, $view->product_id);
        }

        foreach ($user2View as $view) {
            array_push($user2Prod, $view->product_id);
        }

        foreach ($user1Prod as $prod) {
            if (in_array($prod, $user2Prod)) {
                $similarityCount = $similarityCount + 1;
            }
        }

        // return response(['user1' => $user1Prod, 'user2' => $user2Prod]);
        return $similarityCount;
    }
}
