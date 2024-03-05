<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    function deleteFromCart(Request $request, $id) {
        $usuario = Auth::user();

        // Verifica si hay un usuario autenticado
        if ($usuario) {
            $actualCart = $usuario->cart;
            if($actualCart != null) {
                $newCart = json_decode($actualCart, true);
                $oldId = 0;
                $old = true;
                foreach($newCart as $oldProduct){
                    // Verificar si $oldProduct es un array
                    if(is_array($oldProduct)){
                    }else{
                        $oldProduct = json_decode($oldProduct, true);
                    }
                    $oldId = $oldProduct['id'];
                    
                    if($oldId == $id){
                        $key = array_search($oldProduct, $newCart);
                        unset($newCart[$key]);
                    }
                }
            }
            $cart = json_encode($newCart);
            $usuario->cart = $cart;
            $usuario->update();
            
            // Haz algo con el usuario
            return response()->json(['cart' => $usuario->cart]);
        } else {
            // No hay usuario autenticado
            return response()->json(['products' => '']);
        }
    }
    
    function deleteUnityCart(Request $request, $id) {
        $usuario = Auth::user();

        // Verifica si hay un usuario autenticado
        if ($usuario) {
            $actualCart = $usuario->cart;
            if($actualCart != null) {
                $newCart = json_decode($actualCart, true);
                $oldId = 0;
                foreach($newCart as $oldProduct){
                    // Verificar si $oldProduct es un array
                    if(is_array($oldProduct)){
                    }else{
                        $oldProduct = json_decode($oldProduct, true);
                    }
                    $oldId = $oldProduct['id'];
                    
                    if($oldId == $id){
                        $key = array_search($oldProduct, $newCart);
                        if($oldProduct['count'] > 1){
                            $newCart[$key]['count'] = $oldProduct['count']-1;
                        }
                    }
                }
            }
            $cart = json_encode($newCart);
            $usuario->cart = $cart;
            $usuario->update();
            
            // Haz algo con el usuario
            return response()->json(['cart' => $oldProduct['count']]);
        } else {
            // No hay usuario autenticado
            return response()->json(['products' => '']);
        }
    }

    function addCart(Request $request, $id) {
        $usuario = Auth::user();

        // Verifica si hay un usuario autenticado
        if ($usuario) {
            $product = Product::find($id);
            $actualCart = $usuario->cart;
            $newProduct = json_decode($product, true);
            if($actualCart == null) {
                $newProduct['count'] = 1;
                $newProduct = json_encode($newProduct);
                $newCart[] = $newProduct;
            }else{
                $newCart = json_decode($actualCart, true);
                $newId = $newProduct['id'];
                $oldId = 0;
                $old = true;
                foreach($newCart as $oldProduct){
                    // Verificar si $oldProduct es un array
                    if(is_array($oldProduct)){
                    }else{
                        $oldProduct = json_decode($oldProduct, true);
                    }
                    $oldId = $oldProduct['id'];
                    
                    if($oldId == $newId){
                        $key = array_search($oldProduct, $newCart);
                        $oldProduct['count'] = $oldProduct['count']+1;
                        //$my_array = array_diff($my_array, array('Charles'));
                        $newCart[$key] = $oldProduct;
                        $old = false;
                    }
                }
                if($old){
                    $newProduct['count'] = 1;
                    $num = count($newCart);
                    $newCart += array($num + 1 =>  $newProduct);
                }
            }
            $cart = json_encode($newCart);
            $usuario->cart = $cart;
            $usuario->update();
            
            // Haz algo con el usuario
            return response()->json(['cart' => $newCart]);
        } else {
            // No hay usuario autenticado
            return response()->json(['products' => '']);
        }
    }
    
    function getCart() {
        $usuario = Auth::user();
        return response()->json(['cart' => $usuario->cart, 'number' => count(json_decode($usuario->cart, true))]);
    }
}
