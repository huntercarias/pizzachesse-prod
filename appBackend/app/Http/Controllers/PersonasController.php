<?php

namespace App\Http\Controllers;

use App\Models\personas;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class PersonasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $personas = personas::get();

        $data = $personas->map(function ($personas) {
            return [
                'id' => $personas->id,
                'nombre' => $personas->nombre,
                'apellido' => $personas->apellido,
                'correo' => $personas->correo,
                'sexo' => $personas->sexo,
                'fechaNacimiento' => $personas->fechaNacimiento,
                'created_at' => $personas->created_at,
                'updated_at' => $personas->updated_at,
                'deleted_at' => $personas->deleted_at,
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
        try {

                //Validación
                $request->validate([
                    'nombre' => ['required', 'string', 'min:3', 'max:255'],
                    'apellido' => ['required', 'string', 'min:3', 'max:255'],
                    'correo' => ['required', 'email', 'unique:personas'],
                    'sexo' => ['required', 'string', 'in:masculino,femenino', 'min:3', 'max:255'],
                    'fechaNacimiento' => ['required', 'date', 'date_format:Y-m-d'],
                ]);

                $personas = personas::create([
                    'nombre' => $request['nombre'],
                    'apellido' => $request['apellido'],
                    'correo' => $request['correo'],
                    'sexo' => $request['sexo'],
                    'fechaNacimiento' => $request['fechaNacimiento'],
                ]);

                return response()->json([
                    'mensaje' => 'Se Agrego Correctamente la persona',
                    'data' => $personas,
                ]);
            } catch (ValidationException $exception) {
                return response()->json([
                    'mensaje' => 'Error en informacion ingresada',
                    'errores' => $exception->errors()]
                );
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
