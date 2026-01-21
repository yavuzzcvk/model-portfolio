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
        Schema::create('measurements', function (Blueprint $table) {
            $table->id();
            // Temel ölçüler
            $table->unsignedSmallInteger('height_cm');
            $table->unsignedSmallInteger('weight_kg')->nullable();

            // Vücut ölçüleri (inch)
            $table->unsignedSmallInteger('chest_in');
            $table->unsignedSmallInteger('waist_in');
            $table->unsignedSmallInteger('hips_in')->nullable();

            // Beden / numara
            $table->decimal('shoe_size', 3, 1);
            $table->string('shoe_region')->default('TR');

            $table->string('suit_size')->nullable();
            $table->string('jacket_size')->nullable();

            // Fiziksel özellikler
            $table->string('eye_color')->default('Kahverengi');
            $table->string('hair_color')->default('Koyu Kahverengi');
            $table->string('hair_length')->default('Kısa');
            $table->string('skin_tone')->default('Buğday');
            $table->string('body_type')->nullable(); // Athletic, Slim

            // Ayırt edici
            $table->string('tattoos')->default('Yok');
            $table->string('piercings')->default('Yok');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('measurements');
    }
};
