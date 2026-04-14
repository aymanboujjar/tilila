<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tilila_editions', function (Blueprint $table) {
            $table->id();
            $table->string('year', 8);
            $table->json('edition_label');
            $table->json('theme')->nullable();

            $table->string('winners_url', 2048)->nullable();
            $table->string('jury_url', 2048)->nullable();
            $table->string('gallery_url', 2048)->nullable();
            $table->boolean('has_gallery')->default(false);

            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();

            $table->index(['year']);
            $table->index(['sort']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tilila_editions');
    }
};

