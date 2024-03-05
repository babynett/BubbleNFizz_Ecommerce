<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReportsManagement extends Controller
{
    public function index()
    {
        return view('features.ReportsManagement.AnalyticsBoard');
    }
}
