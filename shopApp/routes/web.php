<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Middleware\AdminMiddleware;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('app.base');
});

Route::get('shop',[PagesController::class, 'index'])-> name('shop.index');
Route::get('admin',[AdminController::class, 'index'])-> name('admin.index')->middleware('admin');
Route::post('category', [CategoryController::class, 'store'])->name('category.store');
Route::get('category', [CategoryController::class, 'show'])->name('category.show');
Route::delete('category/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');
Route::delete('category', [CategoryController::class, 'deleteAll'])->name('category.deleteAll');
Route::put('category/{id}', [CategoryController::class, 'update'])->name('category.update');
Route::get('proadmin', [ProductController::class, 'show'])->name('product.show');
Route::get('product', [ProductController::class, 'showPaginate'])->name('product.showPaginate');
Route::post('product', [ProductController::class, 'store'])->name('product.store');
Route::delete('product/{id}', [ProductController::class, 'destroy'])->name('product.destroy');
Route::delete('product', [ProductController::class, 'deleteAll'])->name('product.deleteAll');
Route::get('product/create',[ProductController::class, 'create'])-> name('product.create');
Route::get('product/{id}/edit',[ProductController::class, 'edit'])-> name('product.edit');
Route::put('product/{id}', [ProductController::class, 'update'])->name('product.update');
Route::get('product/{id}/view', [ProductController::class, 'view'])->name('product.view');
Route::get('product/resume', [ProductController::class, 'viewResume'])->name('product.viewResume');
Route::get('/cart', [PagesController::class, 'showCart'])->name('shop.cart');
Route::get('product/{id}/cart', [CartController::class, 'addCart'])->name('product.addCart');
Route::get('product/{id}/dltCart', [CartController::class, 'deleteFromCart'])->name('product.deleteFromCart');
Route::get('product/{id}/dltprodCart', [CartController::class, 'deleteUnityCart'])->name('product.deleteUnityCart');
Route::get('/mycart', [CartController::class, 'getCart'])->name('product.getCart');
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
