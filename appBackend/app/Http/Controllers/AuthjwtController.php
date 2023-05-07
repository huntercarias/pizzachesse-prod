<?php

namespace App\Http\Controllers;

use App\Models\carritoCompras;
use App\Models\detalleCarrito;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthjwtController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string  $token
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }

    public function register(Request $request)
    {
         try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|min:6',
                'rol' => 'required|string|min:6',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $user = User::create(array_merge(
                $validator->validate(),
                ['password' => bcrypt($request->password)]
            ));

            return response()->json([
                'message' => '¡Usuario registrado exitosamente!',
                'user' => $user,
            ], 201);
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
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function StoreProductoCarrito(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            $request->validate([
                'id_productos' => ['required', 'numeric'],
                'total' => ['required', 'numeric'],
                'cantidad' => ['required', 'numeric'],
            ]);
            $cabeceraCarrito = carritoCompras::where('id_usuario', $user->id)->first(); // Busca la cabecera del carrito para el usuario autenticado
            if (! $cabeceraCarrito) {
                $cabeceraCarrito = carritoCompras::create([
                    'id_usuario' => $user->id,
                    'total' => 0.00,
                ]);
            }

            $detalleCarrito = detalleCarrito::where('id_carrito_compras', $cabeceraCarrito->id)
                             ->where('id_productos', $request['id_productos'])
                             ->first();

            if (! $detalleCarrito) {
                 $data = detalleCarrito::create([
                     'id_carrito_compras' => $cabeceraCarrito->id,
                     'id_productos' => $request['id_productos'],
                     'cantidad' => $request['cantidad'],
                     'total' => $request['total'],
                 ]);
            } else {
                $data = detalleCarrito::findOrFail($detalleCarrito->id);
                $data->cantidad = $data->cantidad + $request['cantidad'];
                $data->total = $data->total + $request['total'];
                $data->save();
            }

            $data->totales = $detalleCarritoSumatoria = detalleCarrito::where('id_carrito_compras', $cabeceraCarrito->id)->sum('total');

            $cabeceraCarritototales = carritoCompras::findOrFail($cabeceraCarrito->id);

            // Actualizar los campos del modelo
            $cabeceraCarritototales->total = $data->totales;

            // Guardar los cambios en la base de datos
            $cabeceraCarritototales->save();

            return response()->json([
                'mensaje' => 'Producto cargado',
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
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function ShowDetalleCarrito()
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            $cabeceraCarrito = carritoCompras::where('id_usuario', $user->id)->first(); // Busca la cabecera del carrito para el usuario autenticado
            if (! $cabeceraCarrito) {
                $cabeceraCarrito = carritoCompras::create([
                    'id_usuario' => $user->id,
                    'total' => 0.00,
                ]);
            }

            $detalleCarrito = detalleCarrito::where('id_carrito_compras', $cabeceraCarrito->id)->get();
            $detalleCarritoContar = 0;
            $detalleCarritoContar = detalleCarrito::where('id_carrito_compras', $cabeceraCarrito->id)->count();
            if ($detalleCarritoContar == 0) {
                return response()->json(['mensaje' => 'Carrito Vacio'], 404);
            }

            $cabeceraCarritototales = carritoCompras::findOrFail($cabeceraCarrito->id);

            // Actualizar los campos del modelo
            $cabeceraCarritototales->total = $detalleCarritoSumatoria = detalleCarrito::where('id_carrito_compras', $cabeceraCarrito->id)->sum('total');

            // Guardar los cambios en la base de datos
            $cabeceraCarritototales->save();

            return response()->json([
                'mensaje' => 'Detalle Carrito Compras',
                'data' => $detalleCarrito,
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
}
