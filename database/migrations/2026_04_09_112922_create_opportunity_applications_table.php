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
        Schema::create('opportunity_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('opportunity_id')->constrained()->cascadeOnDelete();

            $table->string('full_name', 255);
            $table->string('email', 255);
            $table->string('phone', 64)->nullable();
            $table->string('country', 32)->nullable();
            $table->string('current_role', 255)->nullable();
            $table->string('organization', 255)->nullable();
            $table->string('years_experience', 32)->nullable();
            $table->text('motivation')->nullable();

            $table->string('resume_path')->nullable();
            $table->string('portfolio_path')->nullable();

            $table->string('locale', 8)->nullable();
            $table->ipAddress('ip')->nullable();
            $table->text('user_agent')->nullable();

            $table->timestamps();

            $table->index(['opportunity_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opportunity_applications');
    }
};
