<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tilila_editions', function (Blueprint $table) {
            $table->json('gallery_images')->nullable()->after('gallery_url');
        });
    }

    public function down(): void
    {
        Schema::table('tilila_editions', function (Blueprint $table) {
            $table->dropColumn('gallery_images');
        });
    }
};

