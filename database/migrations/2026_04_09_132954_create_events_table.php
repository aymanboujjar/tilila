<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('type', 32)->default('tilitalk');
            $table->string('status', 32)->default('draft'); // draft|live|upcoming|finished|archived
            $table->string('visibility', 16)->default('public'); // public|private

            $table->json('title'); // tri-lang
            $table->json('location')->nullable(); // tri-lang
            $table->json('description')->nullable(); // tri-lang (simple text for now)

            $table->date('date')->nullable();
            $table->time('time')->nullable();
            $table->string('timezone', 16)->default('GMT+1');

            $table->timestamps();

            $table->index(['status', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
