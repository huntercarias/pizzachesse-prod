<?php

namespace App\Http\Controllers;

use App\Models\caracteristicas_produtos;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class CaracteristicasProdutosController extends Controller
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
                    'descripcion' => ['required', 'string', 'min:3', 'max:255'],
                ]);

                $personas = personas::create([
                    'id-producto' => $request['id-producto'],
                    'descripcion' => $request['descripcion'],
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
    public function show(caracteristicas_produtos $caracteristicas_produtos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(caracteristicas_produtos $caracteristicas_produtos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, caracteristicas_produtos $caracteristicas_produtos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(caracteristicas_produtos $caracteristicas_produtos)
    {
        //
    }
}
