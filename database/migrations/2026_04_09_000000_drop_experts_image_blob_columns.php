<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('experts')) {
            return;
        }

        Schema::table('experts', function (Blueprint $table) {
            if (Schema::hasColumn('experts', 'image_blob')) {
                $table->dropColumn(['image_blob', 'image_mime']);
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('experts')) {
            return;
        }

        Schema::table('experts', function (Blueprint $table) {
            if (! Schema::hasColumn('experts', 'image_blob')) {
                $table->binary('image_blob')->nullable();
                $table->string('image_mime', 127)->nullable();
            }
        });
    }
};
