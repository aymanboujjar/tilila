<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expert_applications', function (Blueprint $table): void {
            $table->json('industries')->nullable()->after('city');
            $table->json('languages')->nullable()->after('industries');
            $table->json('quote_i18n')->nullable()->after('bio_i18n');
            $table->json('socials')->nullable()->after('quote_i18n');
        });
    }

    public function down(): void
    {
        Schema::table('expert_applications', function (Blueprint $table): void {
            $table->dropColumn([
                'industries',
                'languages',
                'quote_i18n',
                'socials',
            ]);
        });
    }
};
