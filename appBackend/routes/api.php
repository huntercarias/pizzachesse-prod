<?php

use App\Http\Controllers\AuthjwtController;
use App\Http\Controllers\PersonasController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\TiposproductoController;
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

// Registra una tipoProducto
Route::post('ADDtipoProductos', [TiposproductoController::class, 'store']);

Route::get('getAlltipoProductos', [TiposproductoController::class, 'index']);

//muestra todos las personas
Route::get('getAllProductos', [ProductosController::class, 'index']);

// Registra una producto
Route::post('ADDProductos', [ProductosController::class, 'store']);

// Registra una producto
//Route::post('register', [AuthController::class, 'register']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',
], function ($router) {
    Route::post('login', [AuthjwtController::class, 'login']);
    Route::post('logout', [AuthjwtController::class, 'logout']);
    Route::post('refresh', [AuthjwtController::class, 'refresh']);
    Route::post('me', [AuthjwtController::class, 'me']);
    Route::post('register', [AuthjwtController::class, 'register']);
    Route::post('RegistraPersona', [PersonasController::class, 'store']);
});
