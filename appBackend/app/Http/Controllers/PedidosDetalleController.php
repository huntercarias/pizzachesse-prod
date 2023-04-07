<?php

namespace App\Http\Controllers;

use App\Models\pedidos_detalle;
use Illuminate\Http\Request;

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
                //Validación
                $request->validate([
                    'id-usuario' => ['required'],
                    'id-pedidoencabezado' => ['required'],
                    'id-producto' => ['required'],
                    'cantidad' => ['required'],
                    'monto' => ['required'],
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
