<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call(ExpertSeeder::class);
        $this->call(OpportunitySeeder::class);
        $this->call(EventSeeder::class);
        $this->call(MediaItemSeeder::class);
        $this->call(MediaSidebarSettingSeeder::class);
    }
}
