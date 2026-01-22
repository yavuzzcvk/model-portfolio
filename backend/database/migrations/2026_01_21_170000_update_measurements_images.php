<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 'image' kolonu zaten ana migrationda yok, sadece 'images' ekle
        Schema::table('measurements', function (Blueprint $table) {
            if (!Schema::hasColumn('measurements', 'images')) {
                $table->json('images')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('measurements', function (Blueprint $table) {
            if (Schema::hasColumn('measurements', 'images')) {
                $table->dropColumn('images');
            }
        });
    }
};
