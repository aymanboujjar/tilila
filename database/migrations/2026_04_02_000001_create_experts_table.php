<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experts', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('name');
            $table->json('title');
            $table->json('tags')->nullable();
            $table->text('location')->nullable();
            $table->string('country', 255)->default('Morocco');
            $table->json('industries')->nullable();
            $table->json('languages')->nullable();
            $table->string('badge')->nullable();
            $table->string('status')->default('draft');
            $table->string('email')->nullable();
            $table->string('image')->nullable();
            $table->json('details')->nullable();
            $table->timestamp('last_activity_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experts');
    }
};
