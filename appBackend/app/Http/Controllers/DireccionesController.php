<?php

namespace App\Http\Controllers;

use App\Models\direcciones;
use Illuminate\Http\Request;

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
                //Validación
                $request->validate([
                    'id_persona' => ['required'],
                    'nomenclatura' => ['required'],
                    'zona' => ['required'],
                    'ciudad' => ['required'],
                    'departamento' => ['required'],
                    'municipio' => ['required'],
                    'lote' => ['required'],
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
