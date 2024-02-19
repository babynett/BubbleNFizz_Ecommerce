<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use App\Models\Products;
use App\Models\ProductScent;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // User::create([
        //     'name' => 'Admin',
        //     'email' => "admin@bubblenfizz.com",
        //     'password' => Hash::make("admin"),
        //     'user_role' => 1
        // ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb 200G Fizzing',
            'product_description' => "Bath bombs do not create or form bubbles ~
            For a bubble bath experience, we have our Bubble bath liquids. ~
            We have already reformulated our bath bomb mixture and upgraded it to make sure our bombs won't be damaged during shipping. ~
            Best Advise use warm or hot water for the best fizzing result!! ~
            General Note: ~            
            - One large bath bomb is good enough to provide a relaxing and fizzing experience for an average bathtub. ~
            - Bath bombs do not produce bubbles when mixed with water; instead, they fizz. ~
            - Our bath bombs are made from water-soluble colorants for easy cleaning, and they do not stain your tub. ~
            - We do advise doing a patch test by rubbing the bath bomb on an area of the skin to see if it causes any skin irritation. ~",
            'product_images' => '',
            'product_price' => '149',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Lavander',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb 200G Fizzing',
            'product_description' => "Bath bombs do not create or form bubbles ~
            For a bubble bath experience, we have our Bubble bath liquids. ~
            We have already reformulated our bath bomb mixture and upgraded it to make sure our bombs won't be damaged during shipping. ~
            Best Advise use warm or hot water for the best fizzing result!! ~
            General Note: ~            
            - One large bath bomb is good enough to provide a relaxing and fizzing experience for an average bathtub. ~
            - Bath bombs do not produce bubbles when mixed with water; instead, they fizz. ~
            - Our bath bombs are made from water-soluble colorants for easy cleaning, and they do not stain your tub. ~
            - We do advise doing a patch test by rubbing the bath bomb on an area of the skin to see if it causes any skin irritation. ~",
            'product_images' => '',
            'product_price' => '149',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Eucalyptus',
        ]);
        

        ProductCategory::create([
            'product_id' => 1,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 1,
            'product_scent' => 'Lavander',
        ]);

        ProductCategory::create([
            'product_id' => 2,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 2,
            'product_scent' => 'Eucalyptus',
        ]);
    }
}
