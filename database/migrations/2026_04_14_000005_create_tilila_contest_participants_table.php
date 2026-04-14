<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tilila_contest_participants', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 120);
            $table->string('last_name', 120);
            $table->string('email', 255);
            $table->string('phone', 64)->nullable();
            $table->string('organization', 255)->nullable();
            $table->string('job_title', 255)->nullable();
            $table->string('city', 64)->nullable();
            $table->string('country', 16)->nullable();

            $table->string('submission_title', 255)->nullable();
            $table->text('submission_description')->nullable();
            // External link (Drive/WeTransfer/etc.) to submission assets.
            $table->string('submission_link', 2048)->nullable();

            $table->boolean('accepted_rules')->default(false);
            $table->string('locale', 8)->nullable();
            $table->ipAddress('ip')->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['created_at']);
            $table->index(['email']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tilila_contest_participants');
    }
};

