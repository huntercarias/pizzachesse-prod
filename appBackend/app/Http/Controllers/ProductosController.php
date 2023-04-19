<?php

namespace App\Http\Controllers;

use App\Models\productos;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $productos = productos::get();
            $data = $productos->map(function ($producto) {
                $path = storage_path('app/'.$producto->ruta_imagen);
                $file = File::get($path);
                $type = File::mimeType($path);

                return [
                    'id' => $producto->id,
                    'nombre' => $producto->nombre,
                    'imagenes' => base64_encode($file),
                ];
            });

            return response()->json([
                'mensaje' => 'Listado de personas disponibles',
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
                'id-tiposproducto' => ['required', 'numeric', 'min:0'],
                'descripcion' => ['required', 'string', 'min:3', 'max:255', 'unique:productos'],
                'ruta-imagen' => ['required', 'mimes:,jpg,png,jpeg', 'max:2048'],
                'monto' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
                'cantidad' => ['required', 'numeric', 'min:0'],
            ]);

            // validacion para ver si no trae archivo envia mensaje
            if (! $request->hasFile('ruta-imagen')) {
                return response()->json([
                    'mensaje' => 'Debe seleccionar un archivo para cargar.',
                ], 400);
            }

            // Obtener el nombre original del archivo cargado
            $nombreArchivo = $request->file('ruta-imagen')->getClientOriginalName();

            // Guardar el archivo en una carpeta con su nombre real
            //$path = $request->file('archivo')->storeAs('public', $nombreArchivo);
            $path = $request->file('ruta-imagen')->storeAs($nombreArchivo);

            $productos = productos::create([
                'id-tiposproducto' => $request['id-tiposproducto'],
                'descripcion' => $request['descripcion'],
                'ruta-imagen' => $path,
                'monto' => $request['monto'],
                'cantidad' => $request['cantidad'],
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
    public function show(productos $productos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(productos $productos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, productos $productos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(productos $productos)
    {
        //
    }
}
