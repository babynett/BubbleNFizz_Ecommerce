<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\OrderItems;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportsManagement extends Controller
{
    public function getSales()
    {
        // $sales = OrderItems::with(['product.category' => function ($query) {
        //     $query->get();
        // }])->get();

        // foreach ($sales as $sale) {
        //     $sale
        // }
        // return $sales;
        $sales = ProductCategory::with('product_details')->get();
        $categories = ['Artisan Facial and Body Soaps', 'Shampoo Bars', 'Bath Bomb', 'Bubble Bath'];
        $soapsSales = 0;
        $shampooSales = 0;
        $bombsSales = 0;
        $bubbleSales = 0;
        // foreach($categories as $category) {
        //     if ($category == $sales->product_category && $category == 'Artisan Facial and Body Soaps') {
        //         $soapsSales += $sales->product_sales;
        //     } else if ($category == $sales->product_category && $category == 'Shampoo Bars') {
        //         $shampooSales += $sales->product_sales;
        //     } else if ($category == $sales->product_category && $category == 'Bath Bomb') {
        //         $bombsSales += $sales->product_sales;
        //     } else if ($category == $sales->product_category && $category == 'Bubble Bath') {
        //         $bubbleSales += $sales->product_sales;
        //     }
        // }

        foreach ($sales as $sale) {
            if ('Artisan Facial and Body Soaps' == $sale->product_category) {
                $soapsSales += $sale->product_sales;
            } else if ('Shampoo Bars' == $sale->product_category) {
                $shampooSales += $sale->product_sales;
            } else if ('Bath Bomb' == $sale->product_category) {
                $bombsSales += $sale->product_sales;
            } else if ('Bubble Bath' == $sale->product_category) {
                $bubbleSales += $sale->product_sales;
            }
        }
        return response(['salesCategory' => [$soapsSales, $shampooSales, $bombsSales, $bubbleSales]]);
    }

    public function getSalesReports(Request $request)
    {
        if (isset($request->startDate)) {
            $weeklySales = DB::select("
            SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as day_of_week,
            SUM(total_price) as total_sales
     FROM orders
     WHERE created_at BETWEEN ? AND ?
     GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d')
    ", [$request->startDate, $request->endDate]);

    return response(['weekly' => $weeklySales]);
        }

        // Monthly sales report query
        $monthlySales = DB::select("
    SELECT YEAR(created_at) as year, MONTHNAME(created_at) as month, SUM(total_price) as total_sales
    FROM orders
    WHERE YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())
    GROUP BY YEAR(created_at), MONTHNAME(created_at)
");

        return response(['monthly' => $monthlySales]);
    }
}
