<?php

use App\Http\Controllers\Crud\AccountController;
use App\Http\Controllers\Crud\CartController;
use App\Http\Controllers\Crud\DashboardController;
use App\Http\Controllers\Crud\OrdersController;
use App\Http\Controllers\Crud\ProductsController;
use App\Http\Controllers\Crud\ReportsManagement;
use App\Http\Controllers\Crud\ReviewController;
use App\Http\Controllers\Crud\UserManagementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Auth::routes();

Route::post("/mobilelogin", [AccountController::class, 'mobileLogin']);

Route::prefix('usermanagement')->group(function () {
    Route::get("/getallcustomers", [UserManagementController::class, 'getAllCustomers']);
    Route::get("/getallemployees", [UserManagementController::class, 'getAllEmployees']);
    Route::post("/addemployee", [UserManagementController::class, 'addEmployee']);
    Route::post("/addcustomer", [UserManagementController::class, 'addCustomer']);
    Route::post("/adduserpoll", [UserManagementController::class, 'addUserPoll']);
    Route::post("/adduserprofile", [UserManagementController::class, 'addUserProfile']);
    Route::get('/getprofile/{id}', [AccountController::class, 'getProfile']); 
    Route::post('/editcontactno', [AccountController::class, 'editContactNo']); 
    Route::post('/editaddress', [AccountController::class, 'editAddress']); 
    Route::post('/changepassword', [AccountController::class, 'changePassword']); 
});

Route::prefix('products')->group(function () {
    Route::post('/deleteproduct', [ProductsController::class, 'deleteProduct']);
    Route::post('/recoverproduct', [ProductsController::class, 'recoverProduct']);
    Route::get('/getdeletedproducts', [ProductsController::class, 'getDeletedProducts']);
});

Route::prefix('ordersmanagement')->group(function () {
    Route::get('/getallorders', [OrdersController::class, 'getAllOrders']);
    Route::get('/getcancelledorders', [OrdersController::class, 'getCancelledOrders']);
    Route::get("/userorders", [OrdersController::class, 'userOrders']);
    Route::post('/confirmpayment', [OrdersController::class, 'confirmPayment']);
    Route::post('/toreceive', [OrdersController::class, 'toReceive']);
    Route::post('/complete', [OrdersController::class, 'complete']);
    Route::post('/cancelorder', [OrdersController::class, 'cancelOrder']);
});

Route::get('/dashboard', [DashboardController::class, 'dashboardData']);

Route::prefix('reportsmanagement')->group(function () {
    Route::get('/getsales', [ReportsManagement::class, 'getSales']);
    Route::get('getsalesreports', [ReportsManagement::class, 'getSalesReports']);
});

Route::prefix('shopping')->group(function () {
    Route::get('/getthreeproducts', [ProductsController::class, 'getThreeProducts']);
    Route::get('/getbestsellers', [ProductsController::class, 'getBestSellers']);
    Route::get('/getallproducts', [ProductsController::class, 'getAllProducts']);
    Route::get('/getproduct', [ProductsController::class, 'getProduct']);
    Route::post('/addrecentview', [ProductsController::class, 'addRecentView']);
    Route::post('/getrecentproducts', [ProductsController::class, 'getRecentProducts']);
    Route::get('/getbathproducts', [ProductsController::class, 'getBathProducts']);
    Route::get('/getproductreviews', [ReviewController::class, 'getProductReviews']);
    Route::post('/addreview', [ReviewController::class, 'addReview']);
    Route::get('/getusercartcount', [CartController::class, 'getUserCartCount']);
    Route::post('/addtocart', [CartController::class, 'addToCart']);
    Route::post('/deletecartitem', [CartController::class, 'deleteCartItem']);
    Route::post('/addquantity', [CartController::class, 'addQuantity']);
    Route::post('/subquantity', [CartController::class, 'subQuantity']);
    Route::get('/getusercart', [CartController::class, 'getUserCart']);
    Route::post('/submitorder', [CartController::class, 'submitOrder']);
});