<?php

namespace App\Http\Controllers;

use App\Models\carritoCompras;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class CarritoComprasController extends Controller
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
                    'id_usuario' => ['required', 'numeric', 'min:0', 'exists:carrito_compras,id_usuario'],
                    'total' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
                ]);

                $cabeceraCarrito = carritoCompras::create([
                    'id_usuario' => $request['id_usuario'],
                    'total' => $request['total'],
                ]);

                return response()->json([
                    'mensaje' => 'Se Agrego Correctamente el producto',
                    'data' => $cabeceraCarrito,
                ]);

            } catch (ValidationException $exception) {
                return response()->json([
                    'mensaje' => 'Error en informacion ingresada',
                    'data' => $exception->errors()]
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
    public function show(Request $request)
    {
        try {
            $id_Usuario = $request->input('idusuario');
            $cabeceraCarrito = carritoCompras::where('id_usuario', $id_Usuario)->first();
            if (! $cabeceraCarrito) {
                return response()->json(['mensaje' => 'Producto no encontrado'], 404);
            }
            $data = [
                'id' => $cabeceraCarrito->id,
                'id_usuario' => $cabeceraCarrito->id_usuario,
                'total' => $cabeceraCarrito->total,
                'deleted_at' => $cabeceraCarrito->deleted_at,
            ];

            return response()->json([
                'mensaje' => 'Producto encontrado',
                'data' => $data,
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'mensaje' => 'Error al crear el registro en la base de datos.',
                'data' => $exception->errors(),
            ]);
        } catch (QueryException $e) {
            // Manejo de excepciones de consulta a la base de datos
            return response()->json([
                'mensaje' => 'Error al crear el registro en la base de datos.',
                'data' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Manejo de excepciones generales
            return response()->json([
                'mensaje' => 'Error general al intentar adicionar registro',
                'data' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(carritoCompras $carritoCompras)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, carritoCompras $carritoCompras)
    {
        try {
            //Validación
            $request->validate([
                'id' => ['required', 'numeric', 'min:0'],
                'total' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            ]);

            $cabeceraCarrito = carritoCompras::findOrFail($request->input('id'));

            // Actualizar los campos del modelo
            $cabeceraCarrito->total = $request->input('total');

            // Guardar los cambios en la base de datos
            $cabeceraCarrito->save();

            return response()->json([
                'mensaje' => 'Se actualizó correctamente el producto',
                'data' => $cabeceraCarrito,
            ]);

        } catch (ValidationException $exception) {
            return response()->json([
                'mensaje' => 'Error en información ingresada',
                'data' => $exception->errors(),
            ], 400);
        } catch (QueryException $e) {
            // Manejo de excepciones de consulta a la base de datos
            return response()->json([
                'mensaje' => 'Error al actualizar el registro en la base de datos.',
                'data' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Manejo de excepciones generales
            return response()->json([
                'mensaje' => 'Error general al intentar actualizar registro',
                'data' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        try {
            $cabeceraCarrito = carritoCompras::findOrFail($request->input('id'));
            $cabeceraCarrito->delete();

            return response()->json([
                'mensaje' => 'Se eliminó correctamente el producto',
                'data' => $cabeceraCarrito,
            ]);

        } catch (QueryException $e) {
            // Manejo de excepciones de consulta a la base de datos
            return response()->json([
                'mensaje' => 'Error al eliminar el registro de la base de datos',
                'data' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Manejo de excepciones generales
            return response()->json([
                'mensaje' => 'Error general al intentar eliminar el registro',
                'data' => $e->getMessage(),
            ]);
        }
    }
}
