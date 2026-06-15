<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('program_partners') && ! Schema::hasTable('partners')) {
            Schema::rename('program_partners', 'partners');
        }

        if (! Schema::hasTable('partners')) {
            Schema::create('partners', function (Blueprint $table) {
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

        Schema::dropIfExists('program_contact_messages');
        Schema::dropIfExists('program_news');
        Schema::dropIfExists('program_testimonials');
    }

    public function down(): void
    {
        if (Schema::hasTable('partners') && ! Schema::hasTable('program_partners')) {
            Schema::rename('partners', 'program_partners');
        }

        Schema::create('program_testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('program', 32);
            $table->json('quote');
            $table->string('name', 255);
            $table->json('role')->nullable();
            $table->unsignedSmallInteger('edition_year')->nullable();
            $table->string('photo_path', 2048)->nullable();
            $table->string('video_url', 2048)->nullable();
            $table->unsignedSmallInteger('sort')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        Schema::create('program_news', function (Blueprint $table) {
            $table->id();
            $table->string('program', 32)->nullable();
            $table->json('title');
            $table->string('slug')->unique();
            $table->json('excerpt')->nullable();
            $table->json('body')->nullable();
            $table->string('cover_image_path', 2048)->nullable();
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });

        Schema::create('program_contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('program', 32)->nullable();
            $table->string('name', 255);
            $table->string('email', 255);
            $table->string('subject', 255)->nullable();
            $table->text('message');
            $table->string('locale', 8)->nullable();
            $table->ipAddress('ip')->nullable();
            $table->timestamps();
        });
    }
};
