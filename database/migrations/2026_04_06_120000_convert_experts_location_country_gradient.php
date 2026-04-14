<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('experts')) {
            return;
        }

        if (Schema::hasColumn('experts', 'gradient')) {
            Schema::table('experts', function (Blueprint $table) {
                $table->dropColumn('gradient');
            });
        }

        foreach (['ma' => 'Morocco', 'sn' => 'Senegal'] as $code => $name) {
            DB::table('experts')->where('country', $code)->update(['country' => $name]);
        }

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE experts MODIFY country VARCHAR(255) NOT NULL DEFAULT \'Morocco\'');
        }

        if (! Schema::hasColumn('experts', 'location')) {
            return;
        }

        Schema::table('experts', function (Blueprint $table) {
            $table->text('location_temp')->nullable();
        });

        foreach (DB::table('experts')->select('id', 'location')->cursor() as $row) {
            $text = $this->locationToPlainString($row->location);
            DB::table('experts')->where('id', $row->id)->update(['location_temp' => $text]);
        }

        Schema::table('experts', function (Blueprint $table) {
            $table->dropColumn('location');
        });

        Schema::table('experts', function (Blueprint $table) {
            $table->text('location')->nullable();
        });

        foreach (DB::table('experts')->select('id', 'location_temp')->cursor() as $row) {
            DB::table('experts')->where('id', $row->id)->update([
                'location' => $row->location_temp,
            ]);
        }

        Schema::table('experts', function (Blueprint $table) {
            $table->dropColumn('location_temp');
        });
    }

    private function locationToPlainString(mixed $raw): string
    {
        if ($raw === null || $raw === '') {
            return '';
        }

        if (is_string($raw) && str_starts_with(ltrim($raw), '{')) {
            $decoded = json_decode($raw, true);

            return is_array($decoded)
                ? (string) ($decoded['en'] ?? $decoded['fr'] ?? $decoded['ar'] ?? '')
                : '';
        }

        return (string) $raw;
    }
};
