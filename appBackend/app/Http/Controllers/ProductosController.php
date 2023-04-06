<?php

namespace App\Http\Controllers;

use App\Models\productos;
use Illuminate\Http\Request;

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
                //Validación
                $request->validate([
                    'id-tiposproducto' => ['required'],
                    'descripcion' => ['required'],
                    'ruta-imagen' => ['required'],
                    'monto' => ['required'],
                    'cantidad' => ['required'],
                ]);

                $personas = personas::create([
                    'id-tiposproducto' => $request['id-tiposproducto'],
                    'descripcion' => $request['descripcion'],
                    'ruta-imagen' => $request['ruta-imagen'],
                    'monto' => $request['monto'],
                    'cantidad' => $request['cantidad'],
                ]);

                return response()->json([
                    'mensaje' => 'Se Agrego Correctamente la direccion',
                    'data' => $personas,
                ]);
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
