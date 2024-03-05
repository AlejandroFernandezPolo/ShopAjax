<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    
    function store(Request $request) {
         //validar
        $validador = Validator::make($request->all(), [
            'name' => 'required|max:100|unique:category,name'
            ]);
        if($validador->fails()){//return false no si es validado
            $respuesta = ['result' => -1, 'message' => $validador->getMessageBag()];
        }else{
            try{
                $category = new Category($request->all());
                $category->save();
                $respuesta = [  
                                'result' => 1, 
                                'message' => 'Categoria insertado correctamente',
                                'categories' => Category::all()
                            ];
            }catch(\Exception $e){
                $respuesta = ['result' => -2, 'message' => $e]; 
            }
        }
        
        //if($validador->passes()){} //return true si es validado
        
        //intentar insertar
        
        
        return response()->json($respuesta);
    }
    
    function show(Request $request){
        $categories = Category::all();
        return response()->json(['categories' => $categories]);
    }
    
    public function destroy(Request $request, $id) {
        try {
            $category = Category::find($id);
            $category->delete($request->all());
            $respuesta = [  
                                'result' => 1, 
                                'message' => 'País eliminado correctamente',
                                'categories' => Category::all() //Si se inserta corectamente le devolvemos el pais entero
                            ];
        } catch(\Exception $e) {
            $respuesta = ['result' => -2, 'message' => $e]; 
        }
        return response()->json(['category'=>$category,'respuesta'=>$respuesta]);
    }
    
    function update(Request $request, $id ){
        $category = Category::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100|unique:category,name'
            ]);
            if($validator->fails()) {
                $respuesta = ['result' => -1, 'message' => $validator->getMessageBag()];
            } else {
                try {
                    $category->update($request->all());
                    $respuesta = [  
                                'result' => 1, 
                                'message' => 'Categoria insertado correctamente',
                                'categories' => Category::all()
                            ];
                } catch(\Exception $e) {
                    $respuesta = ['result' => -2, 'message' => $e];
                }
             return response()->json($respuesta);
            }
        //HAY QUE CONTROLAR LOS NULL
    }
    
    function deleteAll() {
        try {
            $categories = Category::all();
            foreach($categories as $category){
                $category->delete();
            }
            $respuesta = [  
                                'result' => 1, 
                                'message' => 'Todas las categorias han sido eliminadas',
                                'categories' => Category::all()
                            ];
        } catch (\Exception $e) {
            $respuesta = ['result' => -2, 'message' => $e, 'categories' => Category::all()];
        }
        return response()->json($respuesta);
    }
}
