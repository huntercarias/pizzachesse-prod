<?php

namespace App\Http\Controllers;

use App\Models\productos;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Intervention\Image\Facades\Image;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $tipoproducto = $request->input('tipoproducto');
            //$productos = productos::get();
            $productos = productos::where('id_tiposproducto', $tipoproducto)
                ->orderBy('created_at', 'desc')
                ->paginate(12);
            $data = $productos->map(function ($producto) {
                $path = storage_path('app/'.$producto->ruta_imagen);
                $file = File::get($path);
                $type = File::mimeType($path);

                return [
                    'id' => $producto->id,
                    'id_tiposproducto' => $producto->id_tiposproducto,
                    'descripcion' => $producto->descripcion,
                    'ruta_imagen' => base64_encode($file),
                    'monto' => $producto->monto,
                    'cantidad' => $producto->cantidad,
                    'created_at' => $producto->created_at,
                    'updated_at' => $producto->updated_at,
                    'deleted_at' => $producto->deleted_at,
                ];
            });

            return response()->json([
                'mensaje' => 'Listado de productos disponibles',
                'data' => $data,
            ])->header('Content-Type', 'application/json');
        } catch (FileNotFoundException $e) {
            // Manejar la excepción aquí
            return response()->json(['mensaje' => 'El archivo no existe'], 404);
        } catch (ValidationException $exception) {
            return response()->json([
                'mensaje' => 'Error al crear el registro en la base de datos.',
                'data' => $exception->errors(),
            ]);
        } catch (QueryException $e) {
            // Manejo de excepciones de consulta a la base de datos
            return response()->json([
                'mensaje' => 'Error al crear el registro en la base de datos.',
                'data' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Manejo de excepciones generales
            return response()->json([
                'mensaje' => 'Error general al intentar adicionar registro',
                'data' => $e->getMessage(),
            ]);
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            //Validación
            $request->validate([
                'id_tiposproducto' => ['required', 'numeric', 'min:0'],
                'descripcion' => ['required', 'string', 'min:3', 'max:255', 'unique:productos'],
                'ruta_imagen' => ['required', 'mimes:jpg,png,jpeg', 'max:2048'],
                'monto' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            ]);

            // validacion para ver si no trae archivo envia mensaje
            if (! $request->hasFile('ruta_imagen')) {
                return response()->json([
                    'mensaje' => 'Debe seleccionar un archivo para cargar.',
                ], 400);
            }

            // Obtener el nombre original del archivo cargado
            //$nombreArchivo = $request->file('ruta_imagen')->getClientOriginalName();

            // Obtener el archivo cargado
            $archivo = $request->file('ruta_imagen');

            // Generar un nombre único para el archivo
            $nombreArchivo = time().'_'.$archivo->getClientOriginalName();

            // Guardar el archivo en una carpeta con su nombre real
            //$path = $request->file('archivo')->storeAs('public', $nombreArchivo);
            $path = $request->file('ruta_imagen')->storeAs($nombreArchivo);
            //$path = $request->file('ruta_imagen')->storeAs('public/storage', $nombreArchivo);
            // Comprimir y guardar la imagen
            Image::make($archivo)
                ->encode(null, 75) // Especifica el formato y la calidad de compresión (75 en este caso)
                ->save($path);

            $productos = productos::create([
                'id_tiposproducto' => $request['id_tiposproducto'],
                'descripcion' => $request['descripcion'],
                'ruta_imagen' => $path,
                'monto' => $request['monto'],
                'cantidad' => '1',
            ]);

            return response()->json([
                'mensaje' => 'Se Agrego Correctamente el producto',
                'data' => $productos,
            ]);

        } catch (ValidationException $exception) {
            return response()->json([
                'mensaje' => 'Error en informacion ingresada',
                'data' => $exception->errors()]
            );
        } catch (QueryException $e) {
            // Manejo de excepciones de consulta a la base de datos
            return response()->json([
                'mensaje' => 'Error al crear el registro en la base de datos.',
                'data' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Manejo de excepciones generales
            return response()->json([
                'mensaje' => 'Error general intentar adicionar registro',
                'data' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        try {
            $idproducto = $request->input('id');
            $productos = productos::find($idproducto);
            if (! $productos) {
                return response()->json(['mensaje' => 'Producto no encontrado'], 404);
            }
            $path = storage_path('app/'.$productos->ruta_imagen);
            $file = File::get($path);
            $type = File::mimeType($path);
            $data = [
                'id' => $productos->id,
                'id_tiposproducto' => $productos->id_tiposproducto,
                'descripcion' => $productos->descripcion,
                'ruta_imagen' => base64_encode($file),
                'monto' => $productos->monto,
                'cantidad' => '1',
                'created_at' => $productos->created_at,
                'updated_at' => $productos->updated_at,
                'deleted_at' => $productos->deleted_at,
            ];

            return response()->json([
                'mensaje' => 'Producto encontrado',
                'data' => $data,
            ])->header('Content-Type', 'application/json');
        } catch (FileNotFoundException $e) {
            // Manejar la excepción aquí
            return response()->json(['mensaje' => 'El archivo no existe'], 404);
        } catch (ValidationException $exception) {
            return response()->json([
                'mensaje' => 'Error al crear el registro en la base de datos.',
                'data' => $exception->errors(),
            ]);
        } catch (QueryException $e) {
            // Manejo de excepciones de consulta a la base de datos
            return response()->json([
                'mensaje' => 'Error al crear el registro en la base de datos.',
                'data' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Manejo de excepciones generales
            return response()->json([
                'mensaje' => 'Error general al intentar adicionar registro',
                'data' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function update(Request $request)
    {
        try {
            //Validación
            $request->validate([
                'id' => ['required', 'numeric', 'min:0'],
                'id_tiposproducto' => ['required', 'numeric', 'min:0'],
                'descripcion' => ['required', 'string', 'min:3', 'max:255'],

                'monto' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            ]);

            $producto = productos::findOrFail($request->input('id'));

            // Actualizar los campos del modelo
            $producto->id_tiposproducto = $request->input('id_tiposproducto');
            $producto->descripcion = $request->input('descripcion');
            $producto->monto = $request->input('monto');
            /*
                        // Si se proporciona un archivo, actualizar la ruta de la imagen
                        if ($request->hasFile('ruta_imagen')) {
                            // Obtener el nombre original del archivo cargado
                            $nombreArchivo = $request->file('ruta_imagen')->getClientOriginalName();
                            // Guardar el archivo en una carpeta con su nombre real
                            $path = $request->file('ruta_imagen')->storeAs($nombreArchivo);
                            $producto->ruta_imagen = $path;
                        }
            */
            // Guardar los cambios en la base de datos
            $producto->save();

            return response()->json([
                'mensaje' => 'Se actualizó correctamente el producto',
                'data' => $producto,
            ]);
        } catch (FileNotFoundException $e) {
            // Manejar la excepción aquí
            return response()->json(['mensaje' => 'El archivo no existe'], 404);

        } catch (ValidationException $exception) {
            return response()->json([
                'mensaje' => 'Error en información ingresada',
                'data' => $exception->errors(),
            ], 400);
        } catch (QueryException $e) {
            // Manejo de excepciones de consulta a la base de datos
            return response()->json([
                'mensaje' => 'Error al actualizar el registro en la base de datos.',
                'data' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Manejo de excepciones generales
            return response()->json([
                'mensaje' => 'Error general al intentar actualizar registro',
                'data' => $e->getMessage(),
            ]);
        }
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        try {
            $producto = productos::findOrFail($request->input('id'));
            $producto->delete();

            return response()->json([
                'mensaje' => 'Se eliminó correctamente el producto',
            ]);

        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'mensaje' => 'El producto que intenta eliminar no existe',
            ], 404);
        } catch (QueryException $e) {
            // Manejo de excepciones de consulta a la base de datos
            return response()->json([
                'mensaje' => 'Error al eliminar el registro de la base de datos',
                'data' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Manejo de excepciones generales
            return response()->json([
                'mensaje' => 'Error general al intentar eliminar el registro',
                'data' => $e->getMessage(),
            ]);
        }
    }
}
