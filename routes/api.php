<?php

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