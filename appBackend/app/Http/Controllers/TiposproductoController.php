<?php

namespace App\Http\Controllers;

use App\Models\tiposproducto;
use Illuminate\Http\Request;

class TiposproductoController extends Controller
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
                    'descripcion' => ['required'],
                    'ruta-imagen' => ['required'],
                ]);

                $personas = personas::create([
                    'descripcion' => $request['descripcion'],
                    'ruta-imagen' => $request['ruta-imagen'],
                ]);

                return response()->json([
                    'mensaje' => 'Se Agrego Correctamente la direccion',
                    'data' => $personas,
                ]);
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
