<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_partners', function (Blueprint $table) {
            $table->id();
            $table->string('program', 32);
            $table->string('group', 32);
            $table->string('name', 255);
            $table->json('subtitle')->nullable();
            $table->json('meta')->nullable();
            $table->string('logo_path', 2048)->nullable();
            $table->string('url', 2048)->nullable();
            $table->unsignedSmallInteger('sort')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();

            $table->index(['program', 'group', 'is_published', 'sort']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_partners');
    }
};
