<?php

namespace App\Http\Controllers;

use App\Models\promociones;
use Illuminate\Http\Request;

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
                //Validación
                $request->validate([
                    'id-producto' => ['required'],
                    'id-tiposproducto' => ['required'],
                    'porcentaje-descuento' => ['required'],
                    'cantidad' => ['required'],
                    'activo-inactivo' => ['required'],
                ]);

                $personas = personas::create([
                    'id-producto' => $request['id-producto'],
                    'id-tiposproducto' => $request['id-tiposproducto'],
                    'porcentaje-descuento' => $request['porcentaje-descuento'],
                    'cantidad' => $request['cantidad'],
                    'activo-inactivo' => $request['activo-inactivo'],
                ]);

                return response()->json([
                    'mensaje' => 'Se Agrego Correctamente la direccion',
                    'data' => $personas,
                ]);
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
