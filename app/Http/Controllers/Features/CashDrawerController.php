<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CashDrawerController extends Controller
{
    public function index()
    {
        return view('features.CashDrawer.PaymentRegister');
    }
}
