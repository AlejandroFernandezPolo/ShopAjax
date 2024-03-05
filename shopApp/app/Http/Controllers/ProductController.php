<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    
    function destroy(Request $request, $id) {
        try {
            $product = Product::find($id);
            $product->delete($request->all());
            $respuesta = [  
                                'result' => 1, 
                                'message' => 'País eliminado correctamente',
                                'categories' => Product::all() //Si se inserta corectamente le devolvemos el pais entero
                            ];
        } catch(\Exception $e) {
            $respuesta = ['result' => -2, 'message' => $e]; 
        }
        return response()->json(['product'=>$product,'respuesta'=>$respuesta]);
    }
    
    function update(Request $request, $id ){
        $product = Product::find($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100|unique:category,name'
            ]);
            if($validator->fails()) {
                $respuesta = ['result' => -1, 'message' => $validator->getMessageBag()];
            } else {
                try {
                    $index = 0;
                    $specification = [];
                    while($index < count($request->spec_name)){
                        if( $request->spec_name[$index] != null && $request->spec_data[$index] != null){
                            $specification += array($request->spec_name[$index] =>  $request->spec_data[$index]);
                        }
                        $index++;
                    }
                    $specifications = json_encode($specification);
                    $specifications = json_encode($specification);
                    $product->specifications = $specifications;
        
                    // Actualiza los demás campos del producto con los datos de la solicitud
                    $product->update($request->except('spec_name', 'spec_data'));
                    $respuesta = [  
                                'result' => 1, 
                                'message' => 'Producto insertado correctamente',
                                'categories' => Category::all()
                            ];
                } catch(\Exception $e) {
                    $respuesta = ['result' => -2, 'message' => $e];
                }
             return view('admin.main');
            }
        return view('admin.main');//con error
        //HAY QUE CONTROLAR LOS NULL
    }
    
    function deleteAll() {
        try {
            $products = Product::all();
            foreach($products as $product){
                $product->delete();
            }
            $respuesta = [  
                                'result' => 1, 
                                'message' => 'Todas las categorias han sido eliminadas',
                                'products' => Product::all()
                            ];
        } catch (\Exception $e) {
            $respuesta = ['result' => -2, 'message' => $e, 'products' => Product::all()];
        }
        return response()->json($respuesta);
    }
    
    function show(Request $request){
        $products = Product::all();
        $list = [];
        $list2 = [];
        $num = 0;
        foreach($products as $product){
            $category = $product->idcategory;
            $category = Category::find($category);
            $list2 = ["product" => [ "id" => $product->id, "idcategory" => $product->idcategory, "category" => $category->name, "name" => $product->name, "price" => $product->price, "description" => $product->description, "cover" => $product->cover, "specifications" => $product->specifications]];
            $list[$num] = $list2;
            $num++;
        }
        return response()->json(['products' => $list]);
    }
    
    function showPaginate(Request $request){
        $perPage = $request->input('perPage', 12); // Obtener el valor de perPage de la solicitud, con un valor predeterminado de 10
        $page = $request->input('page', 1); // Obtener el valor de la página de la solicitud, con un valor predeterminado de 1
        $idcategory = $request->input('category', -1);
        $orderby = $request->input('orderby', 'name');
        $ordertype = $request->input('ordertype', 'asc');
        
        if($idcategory > -1){
            $products = Product::where('idcategory', 'like', '%'.$idcategory.'%')->orderBy($orderby, $ordertype)->paginate($perPage);
            $totalProducts = count(Product::where('idcategory', 'like', '%'.$idcategory.'%')->get());
        }else {
            $products = Product::orderBy($orderby, $ordertype)->paginate($perPage);
            $totalProducts = count(Product::all());
        }
        $maxPage = ceil($totalProducts/$perPage);
    
        $pagination[] = [
            "page" => $page,
            "perPage" => $perPage,
            "totalProducts" => $totalProducts,
            "maxPage" => $maxPage,
        ];
        $list = [];
    
        foreach ($products as $product) {
            $category = Category::find($product->idcategory);
            $list[] = [
                "id" => $product->id,
                "idcategory" => $product->idcategory,
                "category" => $category->name,
                "name" => $product->name,
                "price" => $product->price,
                "description" => $product->description,
                "cover" => $product->cover,
                "specifications" => $product->specifications,
            ];
        }
    
        return response()->json(['products' => $list, 'pagination' => $pagination]);
    }
    
    function store(Request $request) {
        try{
            $product = new Product($request->all());//$disk = Disk::create($request ->all());
            
            $index = 0;
            $specification = [];
            while($index < count($request->spec_name)){
                if( $request->spec_name[$index] != null && $request->spec_data[$index] != null){
                    $specification += array($request->spec_name[$index] =>  $request->spec_data[$index]);
                }
                $index++;
            }
            $specifications = json_encode($specification);
            if($request->hasFile('file') && $request->file('file')->isValid()) {
                $archivo = $request->file('file');
                $path = $archivo->storeAs('public/images', $archivo->getClientOriginalName());
                $mime = $archivo->getMimeType();
                $path = $archivo->getRealPath();
                $image = Image::make($path)->resize(null,245, function($constrain) {
                    $constrain->aspectRatio();
                });
                $canvas = Image::canvas(245,245);
                $canvas->insert($image, 'center');
                $canvas->save('temporal');
                $imagen = file_get_contents('temporal');
                $product->cover = base64_encode($imagen);
            }
            $product->specifications = $specifications;
            $product->save();
                    $respuesta = [  
                                'result' => 1, 
                                'message' => 'Producto insertado correctamente',
                                'categories' => Product::all(),
                                'prueba' => $request->hasFile('file'),
                                'prueba2' => $request->all(),
                                
                            ];
        } catch(\Exception $e) {
            $respuesta = ['result' => -2, 'message' => $e, 'categories' => Category::all(), 'prueba' => $request->all()];
        }
        return view('admin.main', ['respuesta' => $respuesta]);
    }
    
    function create(Request $request) {
        $categories = Category::all();
        if($categories == null){
            return back();///Decir que primero debe haber categorias creadas
        }
        return view('admin.create', ['categories' => $categories]);
    }
    
    function edit(Request $request, $id) {
        $categories = Category::all();
        $product = Product::find($id);
        if($categories == null){
            return back();///Decir que primero debe haber categorias creadas
        }
        return view('admin.editProduct', ['product' => $product, 'categories' => $categories]);
    }
    
    function view(Request $request, $id) {
        $categories = Category::all();
        $product = Product::find($id);
        if($categories == null){
            return back();///Decir que primero debe haber categorias creadas
        }
        $category = Category::find($product->idcategory);
        return view('shop.detail', ['product' => $product, 'category' => $category->name]);
    }
    
    function viewResume(Request $request) {
        $products = Product::all();
        if (count($products) > 12) {
            // Obtener 9 productos aleatorios
            $randomProducts = $products->shuffle()->take(12);
        } else {
        //     // Si hay 9 o menos productos, toma todos los productos
            $randomProducts = $products;
        }
        return response()->json(['products' => $randomProducts]);
    }
    
    
}