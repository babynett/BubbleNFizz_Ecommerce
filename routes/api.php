<?php

use App\Http\Controllers\Crud\AccountController;
use App\Http\Controllers\Crud\CartController;
use App\Http\Controllers\Crud\OrdersController;
use App\Http\Controllers\Crud\ProductsController;
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
});

Route::prefix('ordersmanagement')->group(function () {
    Route::get('/getallorders', [OrdersController::class, 'getAllOrders']);
});

Route::prefix('shopping')->group(function () {
    Route::get('/getthreeproducts', [ProductsController::class, 'getThreeProducts']);
    Route::get('/getallproducts', [ProductsController::class, 'getAllProducts']);
    Route::get('/getproduct', [ProductsController::class, 'getProduct']);
    Route::get('/getbathproducts', [ProductsController::class, 'getBathProducts']);
    Route::get('/getproductreviews', [ReviewController::class, 'getProductReviews']);
    Route::post('/addreview', [ReviewController::class, 'addReview']);
    Route::post('/addtocart', [CartController::class, 'addToCart']);
    Route::post('/addquantity', [CartController::class, 'addQuantity']);
    Route::post('/subquantity', [CartController::class, 'subQuantity']);
    Route::get('/getusercart', [CartController::class, 'getUserCart']);
    Route::post('/submitorder', [CartController::class, 'submitOrder']);
});