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
        Schema::create('pedido_encabezados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id-usuario');
            $table->foreign('id-usuario')->references('id')->on('users');
            $table->string('status-pedido');
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
        Schema::dropIfExists('pedido_encabezados');
    }
};
