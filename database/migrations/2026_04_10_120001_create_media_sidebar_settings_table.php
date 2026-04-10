<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_sidebar_settings', function (Blueprint $table) {
            $table->id();
            $table->json('trending_topics');
            $table->json('resource_links');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_sidebar_settings');
    }
};
