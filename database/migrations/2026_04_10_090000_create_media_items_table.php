<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_items', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 190)->unique();
            $table->string('category_id', 64)->index();
            $table->string('status', 32)->default('draft')->index();
            $table->string('visibility', 16)->default('public')->index();

            $table->json('badge')->nullable();
            $table->json('title');
            $table->json('excerpt')->nullable();
            $table->json('meta')->nullable();
            $table->json('cta')->nullable();

            $table->string('image_path', 500)->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_items');
    }
};

