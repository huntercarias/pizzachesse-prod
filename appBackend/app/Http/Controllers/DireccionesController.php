<?php

namespace App\Http\Controllers;

use App\Models\direcciones;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class DireccionesController extends Controller
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
                    'id_persona' => ['required', 'numeric', 'min:0'],
                    'nomenclatura' => ['required', 'string', 'min:3', 'max:255'],
                    'zona' => ['required', 'numeric'],
                    'ciudad' => ['required', 'string', 'min:3', 'max:255'],
                    'departamento' => ['required', 'string', 'min:3', 'max:255'],
                    'municipio' => ['required', 'string', 'min:3', 'max:255'],
                    'lote' => ['required', 'string', 'min:3', 'max:255'],
                ]);

                $personas = personas::create([
                    'id_persona' => $request['id_persona'],
                    'nomenclatura' => $request['nomenclatura'],
                    'zona' => $request['zona'],
                    'ciudad' => $request['ciudad'],
                    'departamento' => $request['departamento'],
                    'municipio' => $request['municipio'],
                    'lote' => $request['lote'],
                ]);

                return response()->json([
                    'mensaje' => 'Se Agrego Correctamente la direccion',
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
    public function show(direcciones $direcciones)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(direcciones $direcciones)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, direcciones $direcciones)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(direcciones $direcciones)
    {
        //
    }
}
