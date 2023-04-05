<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos_detalles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id-usuario');
            $table->foreign('id-usuario')->references('id')->on('users');
            $table->unsignedBigInteger('id-pedidoencabezado');
            $table->foreign('id-pedidoencabezado')->references('id')->on('pedido_encabezados');
            $table->unsignedBigInteger('id-producto');
            $table->foreign('id-producto')->references('id')->on('productos');
            $table->integer('cantidad');
            $table->decimal('monto', $precision = 8, $scale = 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     * $table->decimal('amount', $precision = 8, $scale = 2);
     * $table->set('flavors', ['strawberry', 'vanilla']);
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos_detalles');
    }
};
