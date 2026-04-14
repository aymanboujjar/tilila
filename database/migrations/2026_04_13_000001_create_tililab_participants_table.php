<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('tililab_participants')) {
            return;
        }

        Schema::create('tililab_participants', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 120);
            $table->string('last_name', 120);
            $table->string('email', 255)->unique();
            $table->string('phone', 64)->nullable();
            $table->string('job_title', 255)->nullable();
            $table->string('organization', 255)->nullable();
            $table->string('city', 64)->nullable();
            $table->string('country', 16)->nullable();
            $table->string('bio', 300)->nullable();

            // Store an external link (SwissTransfer, Drive, etc.), not the uploaded file.
            $table->string('original_video_link', 2048);

            $table->string('locale', 8)->nullable();
            $table->ipAddress('ip')->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tililab_participants');
    }
};

