<?php

namespace Database\Seeders;

use App\Models\MediaSidebarSetting;
use Illuminate\Database\Seeder;

class MediaSidebarSettingSeeder extends Seeder
{
    public function run(): void
    {
        MediaSidebarSetting::query()->firstOrCreate(
            [],
            [
                'trending_topics' => [
                    [
                        'title' => ['en' => 'Women in STEM', 'fr' => 'Femmes en STEM', 'ar' => 'النساء في STEM'],
                        'tag' => ['en' => 'April 2026', 'fr' => 'Avril 2026', 'ar' => 'أبريل 2026'],
                    ],
                    [
                        'title' => ['en' => 'Media parity', 'fr' => 'Parité dans les médias', 'ar' => 'التكافؤ في الإعلام'],
                        'tag' => ['en' => 'Trending', 'fr' => 'Tendance', 'ar' => 'الأكثر تداولًا'],
                    ],
                    [
                        'title' => ['en' => 'Mentorship', 'fr' => 'Mentorat', 'ar' => 'الإرشاد'],
                        'tag' => ['en' => 'New', 'fr' => 'Nouveau', 'ar' => 'جديد'],
                    ],
                ],
                'resource_links' => [
                    [
                        'label' => ['en' => 'Media kit (PDF)', 'fr' => 'Kit média (PDF)', 'ar' => 'حقيبة الإعلام (PDF)'],
                        'url' => null,
                    ],
                    [
                        'label' => ['en' => 'Tilila charter', 'fr' => 'Charte Tilila', 'ar' => 'ميثاق تيليلا'],
                        'url' => null,
                    ],
                    [
                        'label' => ['en' => 'Press contacts', 'fr' => 'Contacts presse', 'ar' => 'جهات اتصال الصحافة'],
                        'url' => null,
                    ],
                ],
            ],
        );
    }
}
