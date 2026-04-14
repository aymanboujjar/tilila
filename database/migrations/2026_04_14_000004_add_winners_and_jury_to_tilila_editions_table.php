<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tilila_editions', function (Blueprint $table) {
            $table->json('winners')->nullable()->after('theme');
            $table->json('jury')->nullable()->after('winners');
        });
    }

    public function down(): void
    {
        Schema::table('tilila_editions', function (Blueprint $table) {
            $table->dropColumn(['winners', 'jury']);
        });
    }
};

