<?php

namespace Database\Seeders;

use App\Models\TililabEdition;
use Illuminate\Database\Seeder;

class TililabEditionSeeder extends Seeder
{
    public function run(): void
    {
        $galleryPool = [
            'tililab-editions/gallery/16tBrR0QwvY7JlhKyZnZl4W5C1XDxJUAByiLPd4i.png',
            'tililab-editions/gallery/C9RVCwTj86OmjmoC7E3YRMmUnexhpJUkmktOXudK.png',
            'tililab-editions/gallery/f9nIMw7mFfrQwO3b8OoRJYrGtddvZ2qAyfgVB4bC.png',
            'tililab-editions/gallery/nFSdTV4yORm4ORewWGaDL8IeyOuSDoSjbBHcsrl2.png',
            'tililab-editions/gallery/S0IWdY7w1eknO76CtnFtd8lr3vW7qoPjfyopDFx3.png',
            'tililab-editions/gallery/Yg8EczoAMiWAdaAunshBM90lCF4lIglG5JyeODhG.png',
        ];

        $winnerPhoto = 'tililab-editions/winners/NEGUJr2gAhxzNOoNwwMfHbhzSjSRwxL8yPvtoaQP.png';
        $juryPhoto = 'tililab-editions/jury/ywjRSrb4E6s5c526xmFXiIXxghFsfYmzpaqsGvfL.png';

        $themes = [
            2018 => ['en' => 'Build to Learn', 'fr' => 'Construire pour apprendre', 'ar' => 'نبني لنتعلم'],
            2019 => ['en' => 'Prototype & Pitch', 'fr' => 'Prototyper & pitcher', 'ar' => 'نموذج أولي وعرض'],
            2020 => ['en' => 'Digital First', 'fr' => 'Le digital d’abord', 'ar' => 'الرقمي أولاً'],
            2021 => ['en' => 'Scale with Purpose', 'fr' => 'Grandir avec sens', 'ar' => 'نموّ هادف'],
            2022 => ['en' => 'Community Powered', 'fr' => 'Propulsé par la communauté', 'ar' => 'بقوة المجتمع'],
            2023 => ['en' => 'Leadership Lab', 'fr' => 'Laboratoire de leadership', 'ar' => 'مختبر القيادة'],
            2024 => ['en' => 'AI for Good', 'fr' => 'IA pour le bien', 'ar' => 'الذكاء الاصطناعي للخير'],
            2025 => ['en' => 'Future Builders', 'fr' => 'Bâtisseuses du futur', 'ar' => 'صانعات المستقبل'],
        ];

        $idx = 0;
        foreach (range(2018, 2025) as $year) {
            $label = [
                'en' => "Tililab Edition $year",
                'fr' => "Édition Tililab $year",
                'ar' => "دورة تيليلاب $year",
            ];

            $images = [
                $galleryPool[$idx % count($galleryPool)],
                $galleryPool[($idx + 2) % count($galleryPool)],
                $galleryPool[($idx + 4) % count($galleryPool)],
            ];

            TililabEdition::query()->updateOrCreate(
                ['year' => (string) $year],
                [
                    'edition_label' => $label,
                    'theme' => $themes[$year] ?? ['en' => '', 'fr' => '', 'ar' => ''],
                    'winners' => [
                        [
                            'full_name' => 'Hiba Zayani',
                            'bio' => [
                                'en' => 'Selected for an outstanding demo day pitch.',
                                'fr' => 'Sélectionnée pour un pitch remarquable au demo day.',
                                'ar' => 'تم اختيارها لعرض متميز في يوم العروض.',
                            ],
                            'photo_path' => $winnerPhoto,
                        ],
                        [
                            'full_name' => 'Asmae Rami',
                            'bio' => [
                                'en' => 'Recognized for product clarity and traction.',
                                'fr' => 'Distinguée pour la clarté produit et la traction.',
                                'ar' => 'تم تكريمها لوضوح المنتج والزخم.',
                            ],
                            'photo_path' => $winnerPhoto,
                        ],
                    ],
                    'jury' => [
                        [
                            'full_name' => 'Youssef Amrani',
                            'bio' => [
                                'en' => 'Venture partner and program advisor.',
                                'fr' => 'Venture partner et conseiller du programme.',
                                'ar' => 'شريك استثماري ومستشار للبرنامج.',
                            ],
                            'photo_path' => $juryPhoto,
                        ],
                        [
                            'full_name' => 'Samira Oumoussa',
                            'bio' => [
                                'en' => 'Startup coach focused on sustainable growth.',
                                'fr' => 'Coach startup axée sur la croissance durable.',
                                'ar' => 'مدربة شركات ناشئة تركز على النمو المستدام.',
                            ],
                            'photo_path' => $juryPhoto,
                        ],
                    ],
                    'gallery_images' => $images,
                    'has_gallery' => true,
                    'winners_url' => null,
                    'jury_url' => null,
                    'gallery_url' => null,
                    'sort' => 0,
                ],
            );

            $idx++;
        }
    }
}

