<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class PartnerSeeder extends Seeder
{
    public function run(): void
    {
        Partner::query()->delete();

        foreach ($this->partners() as $row) {
            if (! Storage::disk('public')->exists($row['logo_path'])) {
                $this->command?->warn("Missing partner logo: {$row['logo_path']}");

                continue;
            }

            Partner::query()->create([
                'program' => $row['program'],
                'group' => $row['groups'][0],
                'groups' => $row['groups'],
                'name' => $row['name'],
                'subtitle' => $row['subtitle'] ?? null,
                'meta' => $row['meta'] ?? null,
                'logo_path' => $row['logo_path'],
                'sort' => $row['sort'],
                'is_published' => true,
            ]);
        }
    }

    /** @return list<array<string, mixed>> */
    private function partners(): array
    {
        return [
            [
                'program' => 'both',
                'groups' => ['featured', 'institutional', 'media'],
                'name' => 'Les Impériales',
                'logo_path' => 'partners/Logo-Les-Imperiales-Black-01-300x143.png',
                'sort' => 1,
            ],
            [
                'program' => 'tilila',
                'groups' => ['featured', 'institutional'],
                'name' => 'UACC',
                'subtitle' => $this->triple(
                    'Union des Agences Conseil en Communication',
                    'Union des Agences Conseil en Communication',
                    'اتحاد وكالات الاستشارة في الاتصال',
                ),
                'logo_path' => 'partners/Logo-UACC-01-200x200.png',
                'sort' => 2,
            ],
            [
                'program' => 'tilila',
                'groups' => ['featured', 'institutional'],
                'name' => 'GAM',
                'subtitle' => $this->triple(
                    'Groupement des Annonceurs du Maroc',
                    'Groupement des Annonceurs du Maroc',
                    'تجمع المعلنين في المغرب',
                ),
                'logo_path' => 'partners/Logo-GAM-01-200x200.png',
                'sort' => 3,
            ],
            [
                'program' => 'tilila',
                'groups' => ['media'],
                'name' => 'MFM Radio / Radio 2M',
                'logo_path' => 'partners/Logo-radio2M-01-182x100.png',
                'sort' => 4,
            ],
            [
                'program' => 'both',
                'groups' => ['media', 'strip', 'program'],
                'name' => 'Jooj',
                'subtitle' => $this->triple(
                    'Tiqqa d’Or',
                    'Tiqqa d’Or',
                    'تيقا الذهبية',
                ),
                'meta' => [
                    'role' => $this->triple(
                        'Incubation program for the winner',
                        'Programme d’incubation pour le lauréat',
                        'برنامج احتضان للفائز',
                    ),
                ],
                'logo_path' => 'partners/JOOJ-MASTERBRAND-STRAWBERRY-91x100.png',
                'sort' => 5,
            ],
            [
                'program' => 'both',
                'groups' => ['media'],
                'name' => 'SNRT',
                'meta' => [
                    'role' => $this->triple(
                        'Media partner',
                        'Partenaire média',
                        'شريك إعلامي',
                    ),
                ],
                'logo_path' => 'partners/Logo-snrtnews-141x100.png',
                'sort' => 6,
            ],
            [
                'program' => 'both',
                'groups' => ['media'],
                'name' => 'Médias24',
                'meta' => [
                    'role' => $this->triple(
                        'Media partner',
                        'Partenaire média',
                        'شريك إعلامي',
                    ),
                ],
                'logo_path' => 'partners/medias24-200x55.png',
                'sort' => 7,
            ],
            [
                'program' => 'tilila',
                'groups' => ['media'],
                'name' => 'Le Site Info',
                'logo_path' => 'partners/Lesiteinfo-Logo-Vector_page-0001-200x74.jpg',
                'sort' => 8,
            ],
            [
                'program' => 'both',
                'groups' => ['media'],
                'name' => 'U Radio',
                'meta' => [
                    'role' => $this->triple(
                        'Media partner',
                        'Partenaire média',
                        'شريك إعلامي',
                    ),
                ],
                'logo_path' => 'partners/Logo-URadio-def-3-01-1-141x100.png',
                'sort' => 9,
            ],
            [
                'program' => 'both',
                'groups' => ['media'],
                'name' => 'Media Marketing',
                'logo_path' => 'partners/Logo-Media-Marketing-200x76.png',
                'sort' => 10,
            ],
            [
                'program' => 'tilila',
                'groups' => ['strip'],
                'name' => '2M.ma',
                'logo_path' => 'partners/logo-2m.ma-1-200x100.png',
                'sort' => 11,
            ],
            [
                'program' => 'tilila',
                'groups' => ['strip'],
                'name' => 'Euro Media',
                'logo_path' => 'partners/Logo-EURO-MEDIA-200x100.png',
                'sort' => 12,
            ],
            [
                'program' => 'tililab',
                'groups' => ['organiser'],
                'name' => '2M',
                'meta' => [
                    'role' => $this->triple(
                        'Organizer — creative bootcamp alongside Tilila Awards',
                        'Organisateur — bootcamp créatif en marge des Tilila Awards',
                        'المنظم — معسكر إبداعي إلى جانب تيليلا أووردز',
                    ),
                ],
                'logo_path' => 'partners/organizer-logo.png',
                'sort' => 1,
            ],
            [
                'program' => 'tililab',
                'groups' => ['program'],
                'name' => 'Lionsgeek',
                'meta' => [
                    'role' => $this->triple(
                        'Host of Pre-Bootcamp',
                        'Hôte du pré-bootcamp',
                        'مضيف ما قبل المعسكر',
                    ),
                    'edition' => $this->triple(
                        '5th Edition (2025)',
                        '5e édition (2025)',
                        'الدورة الخامسة (2025)',
                    ),
                ],
                'logo_path' => 'partners/lionsgeek-logo.png',
                'sort' => 2,
            ],
        ];
    }

    /** @return array{en: string, fr: string, ar: string} */
    private function triple(string $en, string $fr, string $ar): array
    {
        return compact('en', 'fr', 'ar');
    }
}
