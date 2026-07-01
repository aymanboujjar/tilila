<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'test.admin@example.com'],
            [
                'name' => 'Test Admin',
                'password' => 'password',
                'password_set_at' => now(),
                'role' => 'admin',
                'email_verified_at' => now(),
            ],
        );
    }
}
