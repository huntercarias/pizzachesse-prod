<?php

use App\Http\Controllers\AuthjwtController;
use App\Http\Controllers\CarritoComprasController;
use App\Http\Controllers\PersonasController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\TiposproductoController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\WhatsAppController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//muestra todos las personas
Route::get('getAllPersonas', [PersonasController::class, 'index']);

// Registra una persona

Route::get('getAlltipoProductos', [TiposproductoController::class, 'index']);

Route::get('getProducto', [ProductosController::class, 'show']);

Route::get('getCarritoCompras', [CarritoComprasController::class, 'show']);
// la eliminacion de carrito de compras queda libre por si hay necesidad de crear un proceso almacenado
Route::post('EliminarCarritoCompras', [CarritoComprasController::class, 'destroy']);

//muestra todos las personas
Route::get('getAllProductos', [ProductosController::class, 'index']);
//hay que eliminar este de persona por que no lo voy a usar
Route::post('RegistraPersona', [PersonasController::class, 'store']);

Route::post('enviar-mensaje', [WhatsAppController::class, 'sendMessage']);
Route::post('recuperacontrasena', [UsersController::class, 'recuperacontrasena']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',
], function ($router) {

    Route::post('login', [AuthjwtController::class, 'login']);
    Route::post('logout', [AuthjwtController::class, 'logout']);
    Route::post('refresh', [AuthjwtController::class, 'refresh']);
    Route::post('me', [AuthjwtController::class, 'me']);
    Route::post('StoreProducto', [AuthjwtController::class, 'StoreProductoCarrito']);
    Route::post('ShowDetalleCarrito', [AuthjwtController::class, 'ShowDetalleCarrito']);
    Route::post('ConsultaCarritoCompras', [AuthjwtController::class, 'ConsultaCarrito']);
    Route::post('register', [AuthjwtController::class, 'register']);

    Route::post('ConsultaDirecciones', [AuthjwtController::class, 'Muestralistadirecciones']);
    Route::post('ConsultaTelefonos', [AuthjwtController::class, 'Muestralistatelefono']);
    Route::post('RealizaPedido', [AuthjwtController::class, 'StorePedidoCarritoDireccion']);
    Route::post('ConsultaDatosPedidos', [AuthjwtController::class, 'InformacionPedidoCarrito']);
    Route::post('RealizaSolicituInicial', [AuthjwtController::class, 'SolicitudPedidoCarritoInicial']);
    Route::post('ListaPedidosRealizadosUser', [AuthjwtController::class, 'MostrarPedidoRealizados']);
    Route::post('ReporteTiposProductos', [AuthjwtController::class, 'MostrarResultadosProducto']);
    Route::post('ListaPedidosCreados', [AuthjwtController::class, 'MostrarPedidosCreados']);
    Route::post('ListaDetallePedido', [AuthjwtController::class, 'MostrarPedidosCreadosDetalle']);
    Route::post('ListaPedidoEnProceso', [AuthjwtController::class, 'MostrarPedidosEnProceso']);
    Route::post('CambioStatusPedido', [AuthjwtController::class, 'CambioStatusPedido']);
    Route::post('MostrarResultadosProductoMensual', [AuthjwtController::class, 'MostrarResultadosProductoMensual']);
    Route::post('AdminInformacionDireccionTelefono', [AuthjwtController::class, 'InformacionDireccionTelefono']);
    Route::post('MostrarResultadosProductoMensualPDF', [AuthjwtController::class, 'MostrarResultadosProductoMensualPDF']);

    // Rutas protegidas con jwt.auth
    Route::middleware(['jwt.auth'])->group(function () {
        Route::post('ADDProductos', [ProductosController::class, 'store']);
        // Registra una tipoProducto
        Route::post('ADDtipoProductos', [TiposproductoController::class, 'store']);

        Route::post('updateProducto', [ProductosController::class,     'update']);
        Route::delete('eliminaProducto', [ProductosController::class,     'destroy']);

        Route::post('creaCarritoCompras', [CarritoComprasController::class, 'store']);
        Route::post('UpdateCarritoCompras', [CarritoComprasController::class, 'update']);
        Route::delete('EliminarProductoCarrito', [AuthjwtController::class, 'EliminarProductoCarrito']);
        Route::post('GuardaDireccionTelefono', [AuthjwtController::class, 'GuardaDireccion']);
    });
});
