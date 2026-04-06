<?php

namespace Database\Seeders;

use App\Models\Expert;
use Illuminate\Database\Seeder;

class ExpertSeeder extends Seeder
{
    public function run(): void
    {
        $detailsPath = database_path('data/experts_details.json');
        $detailsBySlug = [];
        if (is_readable($detailsPath)) {
            $decoded = json_decode((string) file_get_contents($detailsPath), true);
            $detailsBySlug = is_array($decoded) ? $decoded : [];
        }

        $emptyDetails = [
            'headlineTags' => [],
            'bio' => [],
            'quote' => ['en' => '', 'fr' => '', 'ar' => ''],
            'expertise' => [],
            'journey' => [],
            'appearances' => [],
            'articles' => [],
        ];

        $rows = [
            [
                'slug' => 'sarah-amiami',
                'name' => ['en' => 'Dr. Sarah Amiami', 'fr' => 'Dr Sarah Amiami', 'ar' => 'د. سارة أميامي'],
                'title' => ['en' => 'Economist & Researcher', 'fr' => 'Économiste & chercheuse', 'ar' => 'اقتصادية وباحثة'],
                'tags' => [
                    ['en' => 'Economics', 'fr' => 'Économie', 'ar' => 'الاقتصاد'],
                    ['en' => 'Finance', 'fr' => 'Finance', 'ar' => 'المالية'],
                ],
                'location' => ['en' => 'Casablanca, MA', 'fr' => 'Casablanca, MA', 'ar' => 'الدار البيضاء، المغرب'],
                'country' => 'ma',
                'industries' => ['economics'],
                'languages' => ['fr', 'en', 'ar'],
                'gradient' => 'from-beta-green via-alpha-green/25 to-beta-blue/35',
                'badge' => null,
                'status' => 'published',
                'email' => 'sarah.amiami@example.org',
                'avatar' => null,
                'last_activity_at' => now()->subHours(2),
            ],
            [
                'slug' => 'yasmine-benjiloun',
                'name' => ['en' => 'Yasmine Benjiloun', 'fr' => 'Yasmine Benjiloun', 'ar' => 'ياسمين بنجلون'],
                'title' => ['en' => 'Tech Entrepreneur & AI Specialist', 'fr' => 'Entrepreneure tech & spécialiste IA', 'ar' => 'رائدة أعمال تقنية ومتخصصة في الذكاء الاصطناعي'],
                'tags' => [
                    ['en' => 'Technology', 'fr' => 'Technologie', 'ar' => 'التكنولوجيا'],
                    ['en' => 'AI', 'fr' => 'IA', 'ar' => 'الذكاء الاصطناعي'],
                ],
                'location' => ['en' => 'Rabat, MA', 'fr' => 'Rabat, MA', 'ar' => 'الرباط، المغرب'],
                'country' => 'ma',
                'industries' => ['technology'],
                'languages' => ['fr', 'en'],
                'gradient' => 'from-beta-yellow via-gold/25 to-beta-pink/25',
                'badge' => null,
                'status' => 'published',
                'email' => 'yasmine.benjiloun@example.org',
                'avatar' => null,
                'last_activity_at' => now()->subDay(),
            ],
            [
                'slug' => 'fatima-zahra-el-idrissi',
                'name' => ['en' => 'Fatima Zahra El Idrissi', 'fr' => 'Fatima Zahra El Idrissi', 'ar' => 'فاطمة الزهراء الإدريسي'],
                'title' => ['en' => 'Environmental Scientist', 'fr' => 'Scientifique de l’environnement', 'ar' => 'عالِمة بيئة'],
                'tags' => [
                    ['en' => 'Climate', 'fr' => 'Climat', 'ar' => 'المناخ'],
                    ['en' => 'Sustainability', 'fr' => 'Durabilité', 'ar' => 'الاستدامة'],
                ],
                'location' => ['en' => 'Marrakesh, MA', 'fr' => 'Marrakech, MA', 'ar' => 'مراكش، المغرب'],
                'country' => 'ma',
                'industries' => ['health'],
                'languages' => ['fr', 'en', 'ar'],
                'gradient' => 'from-beta-green via-beta-blue/25 to-alpha-blue',
                'badge' => 'Available',
                'status' => 'published',
                'email' => 'fatima.elidrissi@example.org',
                'avatar' => null,
                'last_activity_at' => now()->subMinutes(30),
            ],
            [
                'slug' => 'khadija-oukacha',
                'name' => ['en' => 'Khadija Oukacha', 'fr' => 'Khadija Oukacha', 'ar' => 'خديجة أوكاشا'],
                'title' => ['en' => 'Human Rights Lawyer', 'fr' => 'Avocate en droits humains', 'ar' => 'محامية في حقوق الإنسان'],
                'tags' => [
                    ['en' => 'Legal', 'fr' => 'Droit', 'ar' => 'القانون'],
                    ['en' => 'Human Rights', 'fr' => 'Droits humains', 'ar' => 'حقوق الإنسان'],
                ],
                'location' => ['en' => 'Casablanca, MA', 'fr' => 'Casablanca, MA', 'ar' => 'الدار البيضاء، المغرب'],
                'country' => 'ma',
                'industries' => ['legal'],
                'languages' => ['fr', 'ar'],
                'gradient' => 'from-beta-pink via-gold/20 to-beta-yellow/30',
                'badge' => null,
                'status' => 'published',
                'email' => 'khadija.oukacha@example.org',
                'avatar' => null,
                'last_activity_at' => now()->subDays(3),
            ],
            [
                'slug' => 'nadia-tazi',
                'name' => ['en' => 'Nadia Tazi', 'fr' => 'Nadia Tazi', 'ar' => 'نادية تازي'],
                'title' => ['en' => 'Journalist & Author', 'fr' => 'Journaliste & autrice', 'ar' => 'صحفية وكاتبة'],
                'tags' => [
                    ['en' => 'Media', 'fr' => 'Médias', 'ar' => 'الإعلام'],
                    ['en' => 'Literature', 'fr' => 'Littérature', 'ar' => 'الأدب'],
                ],
                'location' => ['en' => 'Tangier, MA', 'fr' => 'Tanger, MA', 'ar' => 'طنجة، المغرب'],
                'country' => 'ma',
                'industries' => ['technology'],
                'languages' => ['fr', 'ar'],
                'gradient' => 'from-alpha-blue via-beta-blue/25 to-beta-green/30',
                'badge' => null,
                'status' => 'published',
                'email' => 'nadia.tazi@example.org',
                'avatar' => null,
                'last_activity_at' => now()->subWeek(),
            ],
            [
                'slug' => 'amira-kone',
                'name' => ['en' => 'Dr. Amira Kone', 'fr' => 'Dr Amira Kone', 'ar' => 'د. أميرة كوني'],
                'title' => ['en' => 'Public Health Specialist', 'fr' => 'Spécialiste en santé publique', 'ar' => 'متخصصة في الصحة العامة'],
                'tags' => [
                    ['en' => 'Health', 'fr' => 'Santé', 'ar' => 'الصحة'],
                    ['en' => 'Policy', 'fr' => 'Politiques publiques', 'ar' => 'السياسات العامة'],
                ],
                'location' => ['en' => 'Dakar, SN', 'fr' => 'Dakar, SN', 'ar' => 'دكار، السنغال'],
                'country' => 'sn',
                'industries' => ['health'],
                'languages' => ['fr', 'en'],
                'gradient' => 'from-beta-yellow via-beta-green/25 to-alpha-blue',
                'badge' => 'Available',
                'status' => 'published',
                'email' => 'amira.kone@example.org',
                'avatar' => null,
                'last_activity_at' => now(),
            ],
            [
                'slug' => 'salma-bennani',
                'name' => ['en' => 'Salma Bennani', 'fr' => 'Salma Bennani', 'ar' => 'سلمى بناني'],
                'title' => ['en' => 'Architect / Urban Planner', 'fr' => 'Architecte / urbaniste', 'ar' => 'مهندسة معمارية / مخططة حضرية'],
                'tags' => [
                    ['en' => 'Urbanism', 'fr' => 'Urbanisme', 'ar' => 'العمران'],
                    ['en' => 'Design', 'fr' => 'Design', 'ar' => 'التصميم'],
                ],
                'location' => ['en' => 'Fes, MA', 'fr' => 'Fès, MA', 'ar' => 'فاس، المغرب'],
                'country' => 'ma',
                'industries' => ['economics'],
                'languages' => ['fr', 'ar'],
                'gradient' => 'from-beta-green via-alpha-blue/25 to-beta-purple/25',
                'badge' => null,
                'status' => 'published',
                'email' => 'salma.bennani@example.org',
                'avatar' => null,
                'last_activity_at' => now()->subHours(5),
            ],
            [
                'slug' => 'leila-chadid',
                'name' => ['en' => 'Leila Chadid', 'fr' => 'Leila Chadid', 'ar' => 'ليلى الشاذلي'],
                'title' => ['en' => 'Political Analyst', 'fr' => 'Analyste politique', 'ar' => 'محللة سياسية'],
                'tags' => [
                    ['en' => 'Politics', 'fr' => 'Politique', 'ar' => 'السياسة'],
                    ['en' => 'Governance', 'fr' => 'Gouvernance', 'ar' => 'الحوكمة'],
                ],
                'location' => ['en' => 'Rabat, MA', 'fr' => 'Rabat, MA', 'ar' => 'الرباط، المغرب'],
                'country' => 'ma',
                'industries' => ['legal'],
                'languages' => ['fr', 'en', 'ar'],
                'gradient' => 'from-beta-yellow via-beta-pink/25 to-gold/25',
                'badge' => null,
                'status' => 'published',
                'email' => 'leila.chadid@example.org',
                'avatar' => null,
                'last_activity_at' => now()->subHours(12),
            ],
        ];

        foreach ($rows as $row) {
            $slug = $row['slug'];
            $row['details'] = $detailsBySlug[$slug] ?? $emptyDetails;

            Expert::query()->updateOrCreate(
                ['slug' => $slug],
                $row
            );
        }
    }
}
