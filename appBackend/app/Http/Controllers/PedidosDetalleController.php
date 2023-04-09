<?php

namespace App\Http\Controllers;

use App\Models\pedidos_detalle;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class PedidosDetalleController extends Controller
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
                    'id-usuario' => ['required', 'numeric', 'min:0'],
                    'id-pedidoencabezado' => ['required', 'numeric', 'min:0'],
                    'id-producto' => ['required', 'numeric', 'min:0'],
                    'cantidad' => ['required', 'numeric'],
                    'monto' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
                ]);

                $personas = personas::create([
                    'id-usuario' => $request['id-usuario'],
                    'id-pedidoencabezado' => $request['id-pedidoencabezado'],
                    'id-producto' => $request['id-producto'],
                    'cantidad' => $request['cantidad'],
                    'monto' => $request['monto'],
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
    public function show(pedidos_detalle $pedidos_detalle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(pedidos_detalle $pedidos_detalle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, pedidos_detalle $pedidos_detalle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(pedidos_detalle $pedidos_detalle)
    {
        //
    }
}
