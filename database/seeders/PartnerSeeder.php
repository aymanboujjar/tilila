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
            ...$this->institutionalPartners(),
            ...$this->tililaMediaPartners(),
            ...$this->tililabMediaPartners(),
        ];
    }

    /** @return list<array<string, mixed>> */
    private function institutionalPartners(): array
    {
        return [
            [
                'program' => 'both',
                'groups' => ['institutional'],
                'name' => 'UACC',
                'subtitle' => $this->triple(
                    'Union des Agences Conseil en Communication',
                    'Union des Agences Conseil en Communication',
                    'اتحاد وكالات الاستشارة في الاتصال',
                ),
                'logo_path' => 'partners/Logo-UACC-01-200x200.png',
                'sort' => 1,
            ],
            [
                'program' => 'both',
                'groups' => ['institutional'],
                'name' => 'GAM',
                'subtitle' => $this->triple(
                    'Groupement des Annonceurs du Maroc',
                    'Groupement des Annonceurs du Maroc',
                    'تجمع المعلنين في المغرب',
                ),
                'logo_path' => 'partners/Logo-GAM-01-200x200.png',
                'sort' => 2,
            ],
            [
                'program' => 'both',
                'groups' => ['institutional'],
                'name' => 'Les Impériales',
                'logo_path' => 'partners/Logo-Les-Imperiales-Black-01-300x143.png',
                'sort' => 3,
            ],
        ];
    }

    /** @return list<array<string, mixed>> */
    private function tililaMediaPartners(): array
    {
        return [
            $this->mediaRow('tilila', '2M.ma', 'partners/2M_TV_logo.svg.webp', 10),
            $this->mediaRow('tilila', 'Radio 2M', 'partners/Logo-radio2M-01-182x100.png', 11),
            $this->mediaRow('tilila', 'SNRT News', 'partners/Logo-snrtnews-141x100.png', 12),
            $this->mediaRow('tilila', 'Le Site Info', 'partners/Lesiteinfo-Logo-Vector_page-0001-200x74.jpg', 13),
            $this->mediaRow('tilila', 'Les Éco', 'partners/Logo éco.ma-01.png', 14),
            $this->mediaRow('tilila', 'Médias24', 'partners/medias24-200x55.png', 15),
            $this->mediaRow('tilila', 'U Radio', 'partners/Logo-URadio-def-3-01-1-141x100.png', 16),
            $this->mediaRow('tilila', 'Media Marketing', 'partners/Logo-Media-Marketing-200x76.png', 17),
        ];
    }

    /** @return list<array<string, mixed>> */
    private function tililabMediaPartners(): array
    {
        return [
            $this->mediaRow('tililab', '2M.ma', 'partners/2M_TV_logo.svg.webp', 10),
            $this->mediaRow('tililab', 'Radio 2M', 'partners/Logo-radio2M-01-182x100.png', 11),
            [
                'program' => 'tililab',
                'groups' => ['media'],
                'name' => 'Jooj Media',
                'subtitle' => $this->triple('Tiqqa d’Or', 'Tiqqa d’Or', 'تيقا الذهبية'),
                'logo_path' => 'partners/JOOJ-MASTERBRAND-STRAWBERRY-91x100.png',
                'sort' => 12,
            ],
            [
                'program' => 'tililab',
                'groups' => ['media'],
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
                'sort' => 13,
            ],
            $this->mediaRow('tililab', 'SNRT News', 'partners/Logo-snrtnews-141x100.png', 14),
            $this->mediaRow('tililab', 'Le Site Info', 'partners/Lesiteinfo-Logo-Vector_page-0001-200x74.jpg', 15),
            $this->mediaRow('tililab', 'Les Éco', 'partners/Logo éco.ma-01.png', 16),
            $this->mediaRow('tililab', 'Médias24', 'partners/medias24-200x55.png', 17),
            $this->mediaRow('tililab', 'U Radio', 'partners/Logo-URadio-def-3-01-1-141x100.png', 18),
            $this->mediaRow('tililab', 'Media Marketing', 'partners/Logo-Media-Marketing-200x76.png', 19),
        ];
    }

    /** @return array<string, mixed> */
    private function mediaRow(string $program, string $name, string $logoPath, int $sort): array
    {
        return [
            'program' => $program,
            'groups' => ['media'],
            'name' => $name,
            'logo_path' => $logoPath,
            'sort' => $sort,
        ];
    }

    /** @return array{en: string, fr: string, ar: string} */
    private function triple(string $en, string $fr, string $ar): array
    {
        return compact('en', 'fr', 'ar');
    }
}
