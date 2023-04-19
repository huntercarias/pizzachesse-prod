<?php

namespace App\Http\Controllers;

use App\Models\tiposproducto;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class TiposproductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $tiposproducto = tiposproducto::get();
            $data = $tiposproducto->map(function ($tiposproducto) {
                $path = storage_path('app/'.$tiposproducto->ruta_imagen);
                $file = File::get($path);
                $type = File::mimeType($path);

                return [
                    'id' => $tiposproducto->id,
                    'descripcion' => $tiposproducto->descripcion,
                    'ruta_imagen' => base64_encode($file),
                    'created_at' => $tiposproducto->created_at,
                    'updated_at' => $tiposproducto->updated_at,
                    'deleted_at' => $tiposproducto->deleted_at,
                ];
            });

            return response()->json([
                'mensaje' => 'Listado de tipo de productos disponibles',
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
                'descripcion' => ['required', 'string', 'min:3', 'max:255', 'unique:tiposproductos'],
                'ruta_imagen' => ['required', 'mimes:jpg,png,jpeg', 'max:2048'],
            ]);

            // validacion para ver si no trae archivo envia mensaje
            if (! $request->hasFile('ruta_imagen')) {
                return response()->json([
                    'mensaje' => 'Debe seleccionar un archivo para cargar.',
                ], 400);
            }

            // Obtener el nombre original del archivo cargado
            $nombreArchivo = $request->file('ruta_imagen')->getClientOriginalName();

            // Guardar el archivo en una carpeta con su nombre real
            $path = $request->file('ruta_imagen')->storeAs($nombreArchivo);

            $tiposproducto = tiposproducto::create([
                'descripcion' => $request['descripcion'],
                'ruta_imagen' => $path,
            ]);

            return response()->json([
                'mensaje' => 'Se Agrego correctamente el tipo de producto',
                'data' => $tiposproducto,
            ])->header('Content-Type', 'application/json');
        } catch (ValidationException $exception) {
            return response()->json([
                'mensaje' => 'Error en informacion ingresada',
                'data' => $exception->errors(),
            ]);
        } catch (QueryException $e) {
            // Manejo de excepciones de consulta a la base de datos
            return response()->json([
                'mensaje' => 'Error al crear el registro en la base de datos.',
                'data' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Manejo de excepciones
            return response()->json([
                'mensaje' => 'Error al crear el registro en la base de datos.',
                'data' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(tiposproducto $tiposproducto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(tiposproducto $tiposproducto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, tiposproducto $tiposproducto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(tiposproducto $tiposproducto)
    {
        //
    }
}
