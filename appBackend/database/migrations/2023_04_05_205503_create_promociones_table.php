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
        Schema::create('promociones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id-producto');
            $table->foreign('id-producto')->references('id')->on('productos');
            $table->unsignedBigInteger('id-tiposproducto');
            $table->foreign('id-tiposproducto')->references('id')->on('tiposproductos');
            $table->integer('porcentaje-descuento');
            $table->integer('cantidad');
            $table->string('activo-inactivo');
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
        Schema::dropIfExists('promociones');
    }
};
