<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('experts') && Schema::hasColumn('experts', 'avatar')) {
            Schema::table('experts', function (Blueprint $table) {
                $table->renameColumn('avatar', 'image');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('experts') && Schema::hasColumn('experts', 'image')) {
            Schema::table('experts', function (Blueprint $table) {
                $table->renameColumn('image', 'avatar');
            });
        }
    }
};
