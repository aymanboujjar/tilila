<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::hasTable('tililab_editions')) {
            return;
        }

        Schema::create('tililab_editions', function (Blueprint $table) {
            $table->id();
            $table->string('year', 8);
            $table->json('edition_label');
            $table->json('theme')->nullable();

            $table->json('winners')->nullable();
            $table->json('jury')->nullable();
            $table->string('winners_url')->nullable();
            $table->string('jury_url')->nullable();
            $table->string('gallery_url')->nullable();
            $table->json('gallery_images')->nullable();
            $table->boolean('has_gallery')->default(false);

            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tililab_editions');
    }
};

