<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('media_items', function (Blueprint $table) {
            $table->foreignId('featured_expert_id')
                ->nullable()
                ->after('location_label')
                ->constrained('experts')
                ->nullOnDelete();
            $table->json('trending_topics')->nullable()->after('featured_expert_id');
            $table->json('resource_links')->nullable()->after('trending_topics');
        });
    }

    public function down(): void
    {
        Schema::table('media_items', function (Blueprint $table) {
            $table->dropForeign(['featured_expert_id']);
            $table->dropColumn(['featured_expert_id', 'trending_topics', 'resource_links']);
        });
    }
};
