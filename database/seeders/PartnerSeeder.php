<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedTilila();
        $this->seedTililab();
    }

    private function seedTilila(): void
    {
        $rows = [
            [
                'program' => 'tilila',
                'group' => 'featured',
                'name' => 'Les Impériales',
                'logo_path' => '/assets/PartenairesInstitutionnels/Logo-Les-Imperiales-Black-01-300x143.png',
                'sort' => 1,
            ],
            [
                'program' => 'tilila',
                'group' => 'featured',
                'name' => 'UACC',
                'subtitle' => [
                    'en' => 'Union des Agences Conseil en Communication',
                    'fr' => 'Union des Agences Conseil en Communication',
                    'ar' => 'اتحاد وكالات الاستشارة في الاتصال',
                ],
                'logo_path' => '/assets/PartenairesInstitutionnels/Logo-UACC-01-200x200.png',
                'sort' => 2,
            ],
            [
                'program' => 'tilila',
                'group' => 'featured',
                'name' => 'GAM',
                'subtitle' => [
                    'en' => 'Groupement des Annonceurs du Maroc',
                    'fr' => 'Groupement des Annonceurs du Maroc',
                    'ar' => 'تجمع المعلنين في المغرب',
                ],
                'logo_path' => '/assets/PartenairesInstitutionnels/Logo-GAM-01-200x200.png',
                'sort' => 3,
            ],
            [
                'program' => 'tilila',
                'group' => 'institutional',
                'name' => 'UACC',
                'subtitle' => [
                    'en' => 'Union des Agences Conseil en Communication',
                    'fr' => 'Union des Agences Conseil en Communication',
                    'ar' => 'اتحاد وكالات الاستشارة في الاتصال',
                ],
                'logo_path' => '/assets/PartenairesInstitutionnels/Logo-UACC-01-200x200.png',
                'sort' => 1,
            ],
            [
                'program' => 'tilila',
                'group' => 'institutional',
                'name' => 'GAM',
                'subtitle' => [
                    'en' => 'Groupement des Annonceurs du Maroc',
                    'fr' => 'Groupement des Annonceurs du Maroc',
                    'ar' => 'تجمع المعلنين في المغرب',
                ],
                'logo_path' => '/assets/PartenairesInstitutionnels/Logo-GAM-01-200x200.png',
                'sort' => 2,
            ],
            [
                'program' => 'tilila',
                'group' => 'media',
                'name' => 'Les Impériales',
                'logo_path' => '/assets/PartenairesInstitutionnels/Logo-Les-Imperiales-Black-01-300x143.png',
                'sort' => 1,
            ],
            [
                'program' => 'tilila',
                'group' => 'media',
                'name' => 'MFM Radio / Radio 2M',
                'logo_path' => '/assets/partenairesMedia/Logo-radio2M-01-182x100.png',
                'sort' => 2,
            ],
            [
                'program' => 'tilila',
                'group' => 'media',
                'name' => 'Tiqqa (Tiqqa d’Or)',
                'logo_path' => '/assets/partenairesMedia/JOOJ-MASTERBRAND-STRAWBERRY-91x100.png',
                'sort' => 3,
            ],
            [
                'program' => 'tilila',
                'group' => 'media',
                'name' => 'SNRT',
                'logo_path' => '/assets/partenairesMedia/Logo-snrtnews-141x100.png',
                'sort' => 4,
            ],
            [
                'program' => 'tilila',
                'group' => 'media',
                'name' => 'Médias24',
                'logo_path' => '/assets/partenairesMedia/medias24-200x55.png',
                'sort' => 5,
            ],
            [
                'program' => 'tilila',
                'group' => 'media',
                'name' => 'Le Site Info',
                'logo_path' => '/assets/partenairesMedia/Lesiteinfo-Logo-Vector_page-0001-200x74.jpg',
                'sort' => 6,
            ],
            [
                'program' => 'tilila',
                'group' => 'media',
                'name' => 'U Radio',
                'logo_path' => '/assets/partenairesMedia/Logo-URadio-def-3-01-1-141x100.png',
                'sort' => 7,
            ],
            [
                'program' => 'tilila',
                'group' => 'media',
                'name' => 'Media Marketing Magazine',
                'logo_path' => '/assets/partenairesMedia/Logo-Media-Marketing-200x76.png',
                'sort' => 8,
            ],
            [
                'program' => 'tilila',
                'group' => 'strip',
                'name' => '2M',
                'logo_path' => '/assets/partenairesMedia/JOOJ-MASTERBRAND-STRAWBERRY-91x100.png',
                'sort' => 4,
            ],
            [
                'program' => 'tilila',
                'group' => 'strip',
                'name' => '2M.ma',
                'logo_path' => '/assets/partenairesMedia/logo-2m.ma-1-200x100.png',
                'sort' => 5,
            ],
            [
                'program' => 'tilila',
                'group' => 'strip',
                'name' => 'Euro Media',
                'logo_path' => '/assets/partenairesMedia/Logo-EURO-MEDIA-200x100.png',
                'sort' => 7,
            ],
        ];

        foreach ($rows as $row) {
            Partner::query()->updateOrCreate(
                [
                    'program' => $row['program'],
                    'group' => $row['group'],
                    'name' => $row['name'],
                ],
                array_merge($row, ['is_published' => true]),
            );
        }
    }

    private function seedTililab(): void
    {
        $rows = [
            [
                'program' => 'tililab',
                'group' => 'organiser',
                'name' => '2M',
                'logo_path' => '/assets/organizer-logo.png',
                'meta' => [
                    'role' => [
                        'en' => 'Organizer — creative bootcamp alongside Tilila Awards',
                        'fr' => 'Organisateur — bootcamp créatif en marge des Tilila Awards',
                        'ar' => 'المنظم — معسكر إبداعي إلى جانب تيليلا أووردز',
                    ],
                ],
                'sort' => 1,
            ],
            [
                'program' => 'tililab',
                'group' => 'program',
                'name' => 'Lionsgeek',
                'logo_path' => '/assets/tililab/lionsgeek-logo.png',
                'meta' => [
                    'role' => [
                        'en' => 'Host of Pre-Bootcamp',
                        'fr' => 'Hôte du pré-bootcamp',
                        'ar' => 'مضيف ما قبل المعسكر',
                    ],
                    'edition' => [
                        'en' => '5th Edition (2025)',
                        'fr' => '5e édition (2025)',
                        'ar' => 'الدورة الخامسة (2025)',
                    ],
                ],
                'sort' => 1,
            ],
            [
                'program' => 'tililab',
                'group' => 'program',
                'name' => 'Jooj',
                'logo_path' => '/assets/partenairesMedia/JOOJ-MASTERBRAND-STRAWBERRY-91x100.png',
                'meta' => [
                    'role' => [
                        'en' => 'Incubation program for the winner',
                        'fr' => 'Programme d’incubation pour le lauréat',
                        'ar' => 'برنامج احتضان للفائز',
                    ],
                    'edition' => [
                        'en' => 'All recent editions',
                        'fr' => 'Toutes les éditions récentes',
                        'ar' => 'جميع الدورات الأخيرة',
                    ],
                ],
                'sort' => 2,
            ],
            [
                'program' => 'tililab',
                'group' => 'media',
                'name' => 'Les Impériales',
                'logo_path' => '/assets/PartenairesInstitutionnels/Logo-Les-Imperiales-Black-01-300x143.png',
                'meta' => [
                    'role' => [
                        'en' => 'Media / Communication partner',
                        'fr' => 'Partenaire média / communication',
                        'ar' => 'شريك إعلام / اتصال',
                    ],
                    'edition' => [
                        'en' => 'Regular',
                        'fr' => 'Régulier',
                        'ar' => 'منتظم',
                    ],
                ],
                'sort' => 1,
            ],
            [
                'program' => 'tililab',
                'group' => 'media',
                'name' => 'Médias24',
                'logo_path' => '/assets/partenairesMedia/medias24-200x55.png',
                'meta' => [
                    'role' => [
                        'en' => 'Media partner',
                        'fr' => 'Partenaire média',
                        'ar' => 'شريك إعلامي',
                    ],
                    'edition' => [
                        'en' => 'Regular',
                        'fr' => 'Régulier',
                        'ar' => 'منتظم',
                    ],
                ],
                'sort' => 2,
            ],
            [
                'program' => 'tililab',
                'group' => 'media',
                'name' => 'U Radio',
                'logo_path' => '/assets/partenairesMedia/Logo-URadio-def-3-01-1-141x100.png',
                'meta' => [
                    'role' => [
                        'en' => 'Media partner',
                        'fr' => 'Partenaire média',
                        'ar' => 'شريك إعلامي',
                    ],
                    'edition' => [
                        'en' => 'Regular',
                        'fr' => 'Régulier',
                        'ar' => 'منتظم',
                    ],
                ],
                'sort' => 3,
            ],
            [
                'program' => 'tililab',
                'group' => 'media',
                'name' => 'SNRT',
                'logo_path' => '/assets/partenairesMedia/Logo-snrtnews-141x100.png',
                'meta' => [
                    'role' => [
                        'en' => 'Media partner',
                        'fr' => 'Partenaire média',
                        'ar' => 'شريك إعلامي',
                    ],
                    'edition' => [
                        'en' => 'Occasional',
                        'fr' => 'Occasionnel',
                        'ar' => 'عرضي',
                    ],
                ],
                'sort' => 4,
            ],
            [
                'program' => 'tililab',
                'group' => 'media',
                'name' => 'Media Marketing',
                'logo_path' => '/assets/partenairesMedia/Logo-Media-Marketing-200x76.png',
                'meta' => [
                    'role' => [
                        'en' => 'Media partner',
                        'fr' => 'Partenaire média',
                        'ar' => 'شريك إعلامي',
                    ],
                    'edition' => [
                        'en' => 'Regular',
                        'fr' => 'Régulier',
                        'ar' => 'منتظم',
                    ],
                ],
                'sort' => 5,
            ],
        ];

        foreach ($rows as $row) {
            Partner::query()->updateOrCreate(
                [
                    'program' => $row['program'],
                    'group' => $row['group'],
                    'name' => $row['name'],
                ],
                array_merge($row, ['is_published' => true]),
            );
        }
    }
}
