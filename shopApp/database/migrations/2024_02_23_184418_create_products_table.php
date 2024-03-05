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
        
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            //definir el campo que hace de clave foránea
            $table->foreignId('idcategory');
            $table->string('name', 100);
            $table->float('price', 8, 2);
            $table->string('description', 500)->nullable();
            $table->json('specifications')->nullable();
            $table->binary('cover');
            $table->timestamps();
            //definir la clave foránea
            $table->foreign('idcategory')->references('id')->on('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
