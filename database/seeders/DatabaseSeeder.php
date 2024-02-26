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

        User::create([
            'name' => 'Admin',
            'email' => "admin@bubblenfizz.com",
            'password' => Hash::make("admin"),
            'user_role' => 1
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Handcrafted Body Bar 120g',
            'product_description' => "Handcrafted artisan soaps are a departure from mass-produced commercial soaps. ~
            Each bar is carefully made in small batches, allowing for individual attention to detail and the incorporation 
            of unique ingredients and designs. From the selection of nourishing oils and butters to the infusion of botanical extracts 
            and essential oils, these soaps are a celebration of nature's bounty. ~            
            By choosing handcrafted artisan soaps, you not only elevate your self-care routine but also support local artisans and small businesses. 
            Each bar represents hours of dedication, expertise, and a commitment to creating a product that brings joy and indulgence to your everyday life. ~
            So why settle for the ordinary when you can experience the extraordinary? Explore the world of handcrafted artisan soaps and unlock a whole new level 
            of bathing luxury and self-care bliss. ~",
            'product_images' => '',
            'product_price' => '95',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Toasted Marshmallow',
        ]);

        ProductCategory::create([
            'product_id' => 1,
            'product_category' => "Artisan Facial and Body Soaps"
        ]);

        ProductScent::create([
            'product_id' => 1,
            'product_scent' => 'Toasted Marshmallow',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Handcrafted Body Bar 120g',
            'product_description' => "Handcrafted artisan soaps are a departure from mass-produced commercial soaps. ~
            Each bar is carefully made in small batches, allowing for individual attention to detail and the incorporation 
            of unique ingredients and designs. From the selection of nourishing oils and butters to the infusion of botanical extracts 
            and essential oils, these soaps are a celebration of nature's bounty. ~            
            By choosing handcrafted artisan soaps, you not only elevate your self-care routine but also support local artisans and small businesses. 
            Each bar represents hours of dedication, expertise, and a commitment to creating a product that brings joy and indulgence to your everyday life. ~
            So why settle for the ordinary when you can experience the extraordinary? Explore the world of handcrafted artisan soaps and unlock a whole new level 
            of bathing luxury and self-care bliss. ~",
            'product_images' => '',
            'product_price' => '95',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Lavender',
        ]);

        ProductCategory::create([
            'product_id' => 2,
            'product_category' => "Artisan Facial and Body Soaps"
        ]);

        ProductScent::create([
            'product_id' => 2,
            'product_scent' => 'Lavender',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Handcrafted Body Bar 120g',
            'product_description' => "Handcrafted artisan soaps are a departure from mass-produced commercial soaps. ~
            Each bar is carefully made in small batches, allowing for individual attention to detail and the incorporation 
            of unique ingredients and designs. From the selection of nourishing oils and butters to the infusion of botanical extracts 
            and essential oils, these soaps are a celebration of nature's bounty. ~            
            By choosing handcrafted artisan soaps, you not only elevate your self-care routine but also support local artisans and small businesses. 
            Each bar represents hours of dedication, expertise, and a commitment to creating a product that brings joy and indulgence to your everyday life. ~
            So why settle for the ordinary when you can experience the extraordinary? Explore the world of handcrafted artisan soaps and unlock a whole new level 
            of bathing luxury and self-care bliss. ~",
            'product_images' => '',
            'product_price' => '95',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Rosewood',
        ]);

        ProductCategory::create([
            'product_id' => 3,
            'product_category' => "Artisan Facial and Body Soaps"
        ]);

        ProductScent::create([
            'product_id' => 3,
            'product_scent' => 'Rosewood',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Handcrafted Body Bar 120g',
            'product_description' => "Handcrafted artisan soaps are a departure from mass-produced commercial soaps. ~
            Each bar is carefully made in small batches, allowing for individual attention to detail and the incorporation 
            of unique ingredients and designs. From the selection of nourishing oils and butters to the infusion of botanical extracts 
            and essential oils, these soaps are a celebration of nature's bounty. ~            
            By choosing handcrafted artisan soaps, you not only elevate your self-care routine but also support local artisans and small businesses. 
            Each bar represents hours of dedication, expertise, and a commitment to creating a product that brings joy and indulgence to your everyday life. ~
            So why settle for the ordinary when you can experience the extraordinary? Explore the world of handcrafted artisan soaps and unlock a whole new level 
            of bathing luxury and self-care bliss. ~",
            'product_images' => '',
            'product_price' => '95',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Activated Charcoal',
        ]);

        ProductCategory::create([
            'product_id' => 4,
            'product_category' => "Artisan Facial and Body Soaps"
        ]);

        ProductScent::create([
            'product_id' => 4,
            'product_scent' => 'Activated Charcoal',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Handcrafted Body Bar 120g',
            'product_description' => "Handcrafted artisan soaps are a departure from mass-produced commercial soaps. ~
            Each bar is carefully made in small batches, allowing for individual attention to detail and the incorporation 
            of unique ingredients and designs. From the selection of nourishing oils and butters to the infusion of botanical extracts 
            and essential oils, these soaps are a celebration of nature's bounty. ~            
            By choosing handcrafted artisan soaps, you not only elevate your self-care routine but also support local artisans and small businesses. 
            Each bar represents hours of dedication, expertise, and a commitment to creating a product that brings joy and indulgence to your everyday life. ~
            So why settle for the ordinary when you can experience the extraordinary? Explore the world of handcrafted artisan soaps and unlock a whole new level 
            of bathing luxury and self-care bliss. ~",
            'product_images' => '',
            'product_price' => '95',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Vanilla Latte',
        ]);

        ProductCategory::create([
            'product_id' => 5,
            'product_category' => "Artisan Facial and Body Soaps"
        ]);

        ProductScent::create([
            'product_id' => 5,
            'product_scent' => 'Vanilla Latte',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Handcrafted Body Bar 120g',
            'product_description' => "Handcrafted artisan soaps are a departure from mass-produced commercial soaps. ~
            Each bar is carefully made in small batches, allowing for individual attention to detail and the incorporation 
            of unique ingredients and designs. From the selection of nourishing oils and butters to the infusion of botanical extracts 
            and essential oils, these soaps are a celebration of nature's bounty. ~            
            By choosing handcrafted artisan soaps, you not only elevate your self-care routine but also support local artisans and small businesses. 
            Each bar represents hours of dedication, expertise, and a commitment to creating a product that brings joy and indulgence to your everyday life. ~
            So why settle for the ordinary when you can experience the extraordinary? Explore the world of handcrafted artisan soaps and unlock a whole new level 
            of bathing luxury and self-care bliss. ~",
            'product_images' => '',
            'product_price' => '95',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Oh Papaya!',
        ]);

        ProductCategory::create([
            'product_id' => 6,
            'product_category' => "Artisan Facial and Body Soaps"
        ]);

        ProductScent::create([
            'product_id' => 6,
            'product_scent' => 'Oh Papaya',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Handcrafted Body Bar 120g',
            'product_description' => "Handcrafted artisan soaps are a departure from mass-produced commercial soaps. ~
            Each bar is carefully made in small batches, allowing for individual attention to detail and the incorporation 
            of unique ingredients and designs. From the selection of nourishing oils and butters to the infusion of botanical extracts 
            and essential oils, these soaps are a celebration of nature's bounty. ~            
            By choosing handcrafted artisan soaps, you not only elevate your self-care routine but also support local artisans and small businesses. 
            Each bar represents hours of dedication, expertise, and a commitment to creating a product that brings joy and indulgence to your everyday life. ~
            So why settle for the ordinary when you can experience the extraordinary? Explore the world of handcrafted artisan soaps and unlock a whole new level 
            of bathing luxury and self-care bliss. ~",
            'product_images' => '',
            'product_price' => '60',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Oatmeal',
        ]);

        ProductCategory::create([
            'product_id' => 7,
            'product_category' => "Artisan Facial and Body Soaps"
        ]);

        ProductScent::create([
            'product_id' => 7,
            'product_scent' => 'Oatmeal',
        ]);


        Products::create([
            'product_name' => 'Bubble N Fizz Shampoo Bar 75g',
            'product_description' => "Natural and Eco-friendly Shampoo bars and a much affordable and premium shampoo bar made organically by hand~
            How to use:~
            Directly apply the soap to your hair under running water. As it starts to lather, massage your hair gently up your scalp. Rinse well and pat dry. ~            
            These shampoo bar is compact in size and can last for about 70 to 80 washes depending on your hair length. We package your shampoo bar with paper and an 
            option of a tin can for travel. ~",
            'product_images' => '',
            'product_price' => '90',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Aloe Berry',
        ]);

        ProductCategory::create([
            'product_id' => 8,
            'product_category' => "Shampoo Bars"
        ]);

        ProductScent::create([
            'product_id' => 8,
            'product_scent' => 'Aloe Berry',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Shampoo Bar 75g',
            'product_description' => "Natural and Eco-friendly Shampoo bars and a much affordable and premium shampoo bar made organically by hand~
            How to use:~
            Directly apply the soap to your hair under running water. As it starts to lather, massage your hair gently up your scalp. Rinse well and pat dry. ~            
            These shampoo bar is compact in size and can last for about 70 to 80 washes depending on your hair length. We package your shampoo bar with paper and an 
            option of a tin can for travel. ~",
            'product_images' => '',
            'product_price' => '90',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Sea Shine',
        ]);

        ProductCategory::create([
            'product_id' => 9,
            'product_category' => "Shampoo Bars"
        ]);

        ProductScent::create([
            'product_id' => 9,
            'product_scent' => 'Sea Shine',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Shampoo Bar 75g',
            'product_description' => "Natural and Eco-friendly Shampoo bars and a much affordable and premium shampoo bar made organically by hand~
            How to use:~
            Directly apply the soap to your hair under running water. As it starts to lather, massage your hair gently up your scalp. Rinse well and pat dry. ~            
            These shampoo bar is compact in size and can last for about 70 to 80 washes depending on your hair length. We package your shampoo bar with paper and an 
            option of a tin can for travel. ~",
            'product_images' => '',
            'product_price' => '90',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Royal Goddess',
        ]);

        ProductCategory::create([
            'product_id' => 10,
            'product_category' => "Shampoo Bars"
        ]);

        ProductScent::create([
            'product_id' => 10,
            'product_scent' => 'Royal Goddess',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Shampoo Bar 75g',
            'product_description' => "Natural and Eco-friendly Shampoo bars and a much affordable and premium shampoo bar made organically by hand~
            How to use:~
            Directly apply the soap to your hair under running water. As it starts to lather, massage your hair gently up your scalp. Rinse well and pat dry. ~            
            These shampoo bar is compact in size and can last for about 70 to 80 washes depending on your hair length. We package your shampoo bar with paper and an 
            option of a tin can for travel. ~",
            'product_images' => '',
            'product_price' => '90',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Rosemary Tea',
        ]);

        ProductCategory::create([
            'product_id' => 11,
            'product_category' => "Shampoo Bars"
        ]);

        ProductScent::create([
            'product_id' => 11,
            'product_scent' => 'Rosemary Tea',
        ]);


        Products::create([
            'product_name' => 'Bubble N Fizz Shampoo Bar 75g',
            'product_description' => "Natural and Eco-friendly Shampoo bars and a much affordable and premium shampoo bar made organically by hand~
            How to use:~
            Directly apply the soap to your hair under running water. As it starts to lather, massage your hair gently up your scalp. Rinse well and pat dry. ~            
            These shampoo bar is compact in size and can last for about 70 to 80 washes depending on your hair length. We package your shampoo bar with paper and an 
            option of a tin can for travel. ~",
            'product_images' => '',
            'product_price' => '90',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Coco Gugo',
        ]);

        ProductCategory::create([
            'product_id' => 12,
            'product_category' => "Shampoo Bars"
        ]);

        ProductScent::create([
            'product_id' => 12,
            'product_scent' => 'Coco Gugo',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Lavender',
        ]);

        ProductCategory::create([
            'product_id' => 13,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 13,
            'product_scent' => 'Lavender',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 200g',
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
            'product_scent_name' => 'Lavender',
        ]);

        ProductCategory::create([
            'product_id' => 14,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 14,
            'product_scent' => 'Lavender',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Eucalyptus',
        ]);

        ProductCategory::create([
            'product_id' => 15,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 15,
            'product_scent' => 'Eucalyptus',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 200g',
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
            'product_id' => 16,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 16,
            'product_scent' => 'Eucalyptus',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Peppermint',
        ]);

        ProductCategory::create([
            'product_id' => 17,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 17,
            'product_scent' => 'Peppermint',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Fizzing Bath Bomb 200g',
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
            'product_scent_name' => 'Peppermint',
        ]);

        ProductCategory::create([
            'product_id' => 18,
            'product_category' => "Bath Bombs"
        ]);

        ProductScent::create([
            'product_id' => 18,
            'product_scent' => 'Peppermint',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Bubblegum',
        ]);

        ProductCategory::create([
            'product_id' => 19,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 19,
            'product_scent' => 'Bubblegum',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Fizzing Bath Bomb 200g',
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
            'product_scent_name' => 'Bubblegum',
        ]);

        ProductCategory::create([
            'product_id' => 20,
            'product_category' => "Bath Bombs"
        ]);

        ProductScent::create([
            'product_id' => 20,
            'product_scent' => 'Bubblegum',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Ocean Galaxy',
        ]);

        ProductCategory::create([
            'product_id' => 21,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 21,
            'product_scent' => 'Ocean Galaxy',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Fizzing Bath Bomb 200g',
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
            'product_scent_name' => 'Ocean Galaxy',
        ]);

        ProductCategory::create([
            'product_id' => 22,
            'product_category' => "Bath Bombs"
        ]);

        ProductScent::create([
            'product_id' => 22,
            'product_scent' => 'Ocean Galaxy',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Rose Valentine',
        ]);

        ProductCategory::create([
            'product_id' => 23,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 23,
            'product_scent' => 'Rose Valentine',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Fizzing Bath Bomb 200g',
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
            'product_scent_name' => 'Rose Valentine',
        ]);

        ProductCategory::create([
            'product_id' => 24,
            'product_category' => "Bath Bombs"
        ]);

        ProductScent::create([
            'product_id' => 24,
            'product_scent' => 'Rose Valentine',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Green Apple',
        ]);

        ProductCategory::create([
            'product_id' => 25,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 25,
            'product_scent' => 'Green Apple',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Fizzing Bath Bomb 200g',
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
            'product_scent_name' => 'Green Apple',
        ]);

        ProductCategory::create([
            'product_id' => 26,
            'product_category' => "Bath Bombs"
        ]);

        ProductScent::create([
            'product_id' => 26,
            'product_scent' => 'Green Apple',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Energize Lemon',
        ]);

        ProductCategory::create([
            'product_id' => 27,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 27,
            'product_scent' => 'Energize Lemon',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Fizzing Bath Bomb 200g',
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
            'product_scent_name' => 'Energize Lemon',
        ]);

        ProductCategory::create([
            'product_id' => 28,
            'product_category' => "Bath Bombs"
        ]);

        ProductScent::create([
            'product_id' => 28,
            'product_scent' => 'Energize Lemon',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Coal Black',
        ]);

        ProductCategory::create([
            'product_id' => 29,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 29,
            'product_scent' => 'Coal Black',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Fizzing Bath Bomb 200g',
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
            'product_scent_name' => 'Coal Black',
        ]);

        ProductCategory::create([
            'product_id' => 30,
            'product_category' => "Bath Bombs"
        ]);

        ProductScent::create([
            'product_id' => 30,
            'product_scent' => 'Coal Black',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Oh Papaya/Whitening',
        ]);

        ProductCategory::create([
            'product_id' => 31,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 31,
            'product_scent' => 'Oh Papaya/Whitening',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Fizzing Bath Bomb 200g',
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
            'product_scent_name' => 'Oh Papaya/ Whitening',
        ]);

        ProductCategory::create([
            'product_id' => 32,
            'product_category' => "Bath Bombs"
        ]);

        ProductScent::create([
            'product_id' => 32,
            'product_scent' => 'Oh Papaya/ Whitening',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 150g',
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
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Surprise Toy For Boy',
        ]);

        ProductCategory::create([
            'product_id' => 33,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 33,
            'product_scent' => 'Surprise Toy For Boy',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Bath Bomb Fizzing 200g',
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
            'product_scent_name' => 'Surprise Toy For Boy',
        ]);

        ProductCategory::create([
            'product_id' => 34,
            'product_category' => "Bath Bomb"
        ]);

        ProductScent::create([
            'product_id' => 34,
            'product_scent' => 'Surprise Toy For Boy',
        ]);


        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 100ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Sweet Berry',
        ]);

        ProductCategory::create([
            'product_id' => 35,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 35,
            'product_scent' => 'Sweet Berry',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 250ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '400',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Sweet Berry',
        ]);

        ProductCategory::create([
            'product_id' => 36,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 36,
            'product_scent' => 'Sweet Berry',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 100ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Calm Lavender',
        ]);

        ProductCategory::create([
            'product_id' => 37,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 37,
            'product_scent' => 'Calm Lavender',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 250ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '400',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Calm Lavender',
        ]);

        ProductCategory::create([
            'product_id' => 38,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 38,
            'product_scent' => 'Calm Lavender',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 100ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Candy Bubblegum',
        ]);

        ProductCategory::create([
            'product_id' => 39,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 39,
            'product_scent' => 'Candy Bubblegum',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 250ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '400',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Candy Bubblegum',
        ]);

        ProductCategory::create([
            'product_id' => 40,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 40,
            'product_scent' => 'Candy Bubblegum',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 100ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Peppermint',
        ]);

        ProductCategory::create([
            'product_id' => 41,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 41,
            'product_scent' => 'Peppermint',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 250ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '400',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Peppermint',
        ]);

        ProductCategory::create([
            'product_id' => 42,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 42,
            'product_scent' => 'Peppermint',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 100ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Cucumber',
        ]);

        ProductCategory::create([
            'product_id' => 43,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 43,
            'product_scent' => 'Cucumber',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 250ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '400',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Cucumber',
        ]);

        ProductCategory::create([
            'product_id' => 44,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 44,
            'product_scent' => 'Cucumber',
        ]);

        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 100ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '125',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Trio Bubble Bath',
        ]);

        ProductCategory::create([
            'product_id' => 45,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 45,
            'product_scent' => 'Trio Bubble Bath',
        ]);
        Products::create([
            'product_name' => 'Bubble N Fizz Bubble Bath Liquid 250ml',
            'product_description' => "Bubble N Fizz Bubble Bath Liquid ~
            Have you ever tried bathing in a pool of bubbles? Indulge in our newest bubble bath design. ~
            How does it work? ~
            Gently pour a few drops of the bubble bath liquid under running water until your desired liking. ~
            Maintain a constant agitation with your hands. ~
            Handmade soaps! ~
            Discontinue use if irritation occurs. ~
            For external use only. ~",
            'product_images' => '',
            'product_price' => '400',
            'product_stock' => '100',
            'product_rating' => '0',
            'product_scent_name' => 'Trio Bubble Bath',
        ]);

        ProductCategory::create([
            'product_id' => 46,
            'product_category' => "Bubble Bath",
        ]);

        ProductScent::create([
            'product_id' => 46,
            'product_scent' => 'Trio Bubble Bath',
        ]);
    }
}
