<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function dashboardData()
    {
        $productCounts = Products::where('is_deleted', 0)->count();
        $totalRevenue = Orders::sum('total_price');
        $totalCustomer = User::where('user_role', 3)->count();
        $totalOrders = Orders::count();

        $monthlyVisitor = DB::select("SELECT MONTHNAME(created_at) AS month,
            COUNT(*) AS visitor_count
            FROM visitors
            GROUP BY MONTHNAME(created_at)
            ORDER BY MONTH(created_at);
        ");

        // return ($monthlyVisitor);

        return response(['product_counts' => $productCounts, 'total_revenue' => $totalRevenue, 'total_customer' => $totalCustomer, 'total_orders' => $totalOrders, 'monthlyVisitor' => $monthlyVisitor]);
    }
}
