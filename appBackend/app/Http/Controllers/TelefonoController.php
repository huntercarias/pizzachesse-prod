<?php

namespace App\Http\Controllers;

use App\Models\telefono;
use Illuminate\Http\Request;

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
                 //Validación
                 $request->validate([
                     'id_persona' => ['required'],
                     'numero-telefono' => ['required'],
                     'extension' => ['required'],
                     'numero-celular' => ['required'],
                     'numero de whatzap' => ['required'],
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
