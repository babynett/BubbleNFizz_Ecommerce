<?php

use App\Http\Controllers\Features\AccountController;
use App\Http\Controllers\Features\CartController;
use App\Http\Controllers\Features\CustomerShopping;
use App\Http\Controllers\Features\OrdersController;
use App\Http\Controllers\Features\UserManagement;
use App\Http\Controllers\Features\UserManagementController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/editprofile', [AccountController::class, 'editProfile']);
Route::get('/customerpoll', [HomeController::class, 'customerPoll']);

Route::get('/customersaccounts', [UserManagementController::class, 'customers']);
Route::get('/employeesaccounts', [UserManagementController::class, 'index']);
Route::get('/addemployee', [UserManagementController::class, 'addEmployee']);
Route::get('/addcustomer', [UserManagementController::class, 'addCustomer']);
Route::get('/orders', [OrdersController::class, 'index']);

Route::get('/shopping', [CustomerShopping::class, 'index']);
Route::get('/shopping/{id}', [CustomerShopping::class, 'getProduct']);
Route::get('/cart', [CartController::class, 'index']);
Route::get('/checkout', [CartController::class, 'checkOutPage']);
