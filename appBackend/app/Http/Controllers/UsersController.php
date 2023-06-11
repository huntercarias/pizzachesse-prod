<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UsersController extends Controller
{
    public function recuperacontrasena(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:100|exists:users',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $longitud = 8;
            // Generar una secuencia de bytes aleatorios
            $bytes = random_bytes($longitud);

            // Convertir los bytes en una cadena legible
            $contrasena = bin2hex($bytes);

            return response()->json([
                'message' => '¡Contraseña restaurada exitosamente!',

            ], 201);
            $user = User::where('email', $request->email)->first();

            if (! $user) {
                // El usuario no existe, manejar el error
                return response()->json(['error' => 'No se encontró ningún usuario con ese correo electrónico.'], 404);
            }
            $user->password = bcrypt($contrasena);
            $user->save();

            $details = [
                'title' => 'Correo: '.$request->email,
                'body' => 'Contraseña: '.$contrasena,
                'mensaje' => 'Contraseña restablecida',
            ];
            \Mail::to('huntercarias@hotmail.com')->send(new \App\Mail\sendPost($details));

            return response()->json([
                'message' => '¡Contraseña restaurada exitosamente!',
                'user' => $user,
            ], 201);
        } catch (ValidationException $exception) {
            return response()->json([
                'mensaje' => 'Error en la información ingresada',
                'errores' => $exception->errors(),
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
                'mensaje' => 'Error general al intentar restaurar la contraseña.',
                'data' => $e->getMessage(),
            ]);
        }
    }
}
