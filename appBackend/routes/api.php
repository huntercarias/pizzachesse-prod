<?php

use App\Http\Controllers\PersonasController;
use App\Http\Controllers\ProductosController;
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
Route::post('RegistraPersona', [PersonasController::class, 'store']);

// Registra una producto
Route::post('ADDProductos', [ProductosController::class, 'store']);

// Registra una tipoProducto
Route::post('ADDProductos', [ProductosController::class, 'store']);
