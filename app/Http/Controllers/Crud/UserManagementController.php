<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function getAllEmployees()
    {
        return User::where('user_role', 2)->get();
    }

    public function addEmployee(Request $request)
    {
        return $request;
    }
}
