<?php

namespace App\Http\Controllers;

use App\Models\productos;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
                'ruta-imagen' => ['required', 'mimes:,jpg,png'],
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
            $nombreArchivo = $request->file('archivo')->getClientOriginalName();

            // Guardar el archivo en una carpeta con su nombre real
            $path = $request->file('archivo')->storeAs('public', $nombreArchivo);

            $personas = personas::create([
                'id-tiposproducto' => $request['id-tiposproducto'],
                'descripcion' => $request['descripcion'],
                'ruta-imagen' => $path,
                'monto' => $request['monto'],
                'cantidad' => $request['cantidad'],
            ]);

            return response()->json([
                'mensaje' => 'Se Agrego Correctamente el producto',
                'data' => $personas,
            ]);

        } catch (ValidationException $exception) {
            return response()->json(['errores' => $exception->errors()]);
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
