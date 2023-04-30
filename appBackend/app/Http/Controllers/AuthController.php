<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            //Validación
            $request->validate([
                'name' => ['required', 'string', 'min:3', 'max:255'],
                'email' => ['required', 'email', 'min:3', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:3', 'max:255'],
                'rol' => ['required', 'string', 'min:3', 'max:255'],
            ]);

            $users = User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => $request['password'],
                'rol' => $request['rol'],
            ]);

            $token = $users->createToken('auth_token')->plainTextToken;

            return response()->json([
                'mensaje' => 'Se Agrego Correctamente la persona',
                'data' => $users,
                'data' => $token,
                'data' => 'Bearer',
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
}
