<?php

namespace App\Http\Controllers;

use App\Models\promociones;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class PromocionesController extends Controller
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
                    'id-producto' => ['required', 'numeric', 'min:0'],
                    'id-tiposproducto' => ['required', 'numeric', 'min:0'],
                    'porcentaje-descuento' => ['required', 'numeric'],
                    'cantidad' => ['required', 'numeric', 'min:0'],
                    'activo-inactivo' => ['required', 'string', 'min:3', 'max:255'],
                ]);

                $personas = personas::create([
                    'id-producto' => $request['id-producto'],
                    'id-tiposproducto' => $request['id-tiposproducto'],
                    'porcentaje-descuento' => $request['porcentaje-descuento'],
                    'cantidad' => $request['cantidad'],
                    'activo-inactivo' => $request['activo-inactivo'],
                ]);

                return response()->json([
                    'mensaje' => 'Se Agrego Correctamente la promocion',
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
    public function show(promociones $promociones)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(promociones $promociones)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, promociones $promociones)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(promociones $promociones)
    {
        //
    }
}
