<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('media_items', function (Blueprint $table) {
            $table->dropColumn(['reading_label', 'location_label']);
        });
    }

    public function down(): void
    {
        Schema::table('media_items', function (Blueprint $table) {
            $table->json('reading_label')->nullable()->after('excerpt');
            $table->json('location_label')->nullable()->after('reading_label');
        });
    }
};
