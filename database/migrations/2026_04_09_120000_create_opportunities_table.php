<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('type', 32);
            $table->string('status', 32)->default('open');
            $table->json('title');
            $table->json('org')->nullable();
            $table->json('location')->nullable();
            $table->json('excerpt')->nullable();
            $table->date('deadline')->nullable();
            $table->unsignedInteger('views')->default(0);
            $table->unsignedInteger('applications_count')->default(0);
            $table->unsignedInteger('applications_limit')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('opportunities');
    }
};

