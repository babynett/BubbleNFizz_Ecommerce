<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function index()
    {
        return view('features.UserManagement.EmployeesAccounts');
    }

    public function customers()
    {
        return view('features.UserManagement.CustomersAccounts');
    }

    public function addEmployee()
    {
        return view('features.UserManagement.AddEmployee');
    }
}
