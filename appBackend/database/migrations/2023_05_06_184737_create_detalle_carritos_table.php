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
        Schema::create('detalle_carritos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_carrito_compras');
            $table->foreign('id_carrito_compras')->references('id')->on('carrito_compras');
            $table->unsignedBigInteger('id_productos');
            $table->foreign('id_productos')->references('id')->on('productos');
            $table->integer('cantidad');
            $table->integer('extra_queso');
            $table->integer('extra_jamon');
            $table->integer('extra_peperoni');
            $table->decimal('total', $precision = 8, $scale = 2);
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
        Schema::dropIfExists('detalle_carritos');
    }
};
