<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    function index() {
        return view('shop.shop');
    }
    
    function showCart() {
        return view('shop.cart');
    }
}
