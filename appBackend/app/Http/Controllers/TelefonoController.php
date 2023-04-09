<?php

namespace App\Http\Controllers;

use App\Models\telefono;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class TelefonoController extends Controller
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
                     'numero-telefono' => ['required', 'numeric'],
                     'extension' => ['required', 'numeric'],
                     'numero-celular' => ['required', 'numeric', 'min:0'],
                     'numero de whatzap' => ['required', 'numeric'],
                 ]);

                $personas = personas::create([
                    'id_persona' => $request['id_persona'],
                    'numero-telefono' => $request['numero-telefono'],
                    'extension' => $request['extension'],
                    'numero-celular' => $request['numero-celular'],
                    'numero de whatzap' => $request['numero de whatzap'],
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
    public function show(telefono $telefono)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(telefono $telefono)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, telefono $telefono)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(telefono $telefono)
    {
        //
    }
}
