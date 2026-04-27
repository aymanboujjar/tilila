<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expert_applications', function (Blueprint $table): void {
            $table->json('name_i18n')->nullable()->after('full_name');
            $table->json('title_i18n')->nullable()->after('current_title');
            $table->json('expertise_i18n')->nullable()->after('expertise');
            $table->json('bio_i18n')->nullable()->after('bio');
        });
    }

    public function down(): void
    {
        Schema::table('expert_applications', function (Blueprint $table): void {
            $table->dropColumn([
                'name_i18n',
                'title_i18n',
                'expertise_i18n',
                'bio_i18n',
            ]);
        });
    }
};
