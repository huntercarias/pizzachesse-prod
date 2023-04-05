<?php

namespace App\Http\Controllers;

use App\Models\personas;
use Illuminate\Http\Request;

class PersonasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $personas = Personas::get();

        $data = $personas->map(function ($personas) {
            return [
                'id' => $personas->id,
                'nombre' => $personas->nombre,
            ];
        });

        return response()->json([
            'mensaje' => 'Listado de personas disponibles',
            'data' => $data,
        ]);

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
                    'nombre' => ['required'],
                    'apellido' => ['required'],
                    'correo' => ['required'],
                    'dpi' => ['required'],
                    'sexo' => ['required'],
                    'fechaNacimiento' => ['required'],
                ]);

                $personas = personas::create([
                    'nombre' => $request['nombre'],
                    'apellido' => $request['apellido'],
                    'correo' => $request['correo'],
                    'dpi' => $request['dpi'],
                    'sexo' => $request['sexo'],
                    'fechaNacimiento' => $request['fechaNacimiento'],
                ]);

                return response()->json([
                    'mensaje' => 'Se Agrego Correctamente la persona',
                    'data' => $personas,
                ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(personas $personas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(personas $personas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, personas $personas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(personas $personas)
    {
        //
    }
}
