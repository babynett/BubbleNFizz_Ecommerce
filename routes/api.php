<?php

use App\Http\Controllers\Crud\CartController;
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

Route::prefix('usermanagement')->group(function () {
    Route::get("/getallcustomers", [UserManagementController::class, 'getAllCustomers']);
    Route::get("/getallemployees", [UserManagementController::class, 'getAllEmployees']);
    Route::post("/addemployee", [UserManagementController::class, 'addEmployee']);
    Route::post("/addcustomer", [UserManagementController::class, 'addCustomer']);
    Route::post("/adduserpoll", [UserManagementController::class, 'addUserPoll']);
    Route::post("/adduserprofile", [UserManagementController::class, 'addUserProfile']);
});

Route::prefix('shopping')->group(function () {
    Route::get('/getthreeproducts', [ProductsController::class, 'getThreeProducts']);
    Route::get('/getproduct', [ProductsController::class, 'getProduct']);
    Route::get('/getproductreviews', [ReviewController::class, 'getProductReviews']);
    Route::post('/addreview', [ReviewController::class, 'addReview']);
    Route::post('/addtocart', [CartController::class, 'addToCart']);
    Route::get('/getusercart', [CartController::class, 'getUserCart']);
});