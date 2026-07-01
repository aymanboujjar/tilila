<?php

namespace Database\Seeders;

use App\Models\CommitteeMember;
use Illuminate\Database\Seeder;

class CommitteeMemberSeeder extends Seeder
{
    public function run(): void
    {
        CommitteeMember::query()->delete();

        foreach ($this->members() as $sort => $row) {
            CommitteeMember::query()->create([
                'name' => $row['name'],
                'bio' => [
                    'fr' => $row['fr'],
                    'en' => $row['en'],
                    'ar' => $row['ar'],
                ],
                'photo_path' => $row['photo'],
                'sort' => $sort + 1,
                'is_published' => true,
            ]);
        }
    }

    /** @return list<array{name: string, photo: ?string, fr: string, en: string, ar: string}> */
    private function members(): array
    {
        return [
            ['name' => 'Ghizlane Gabari', 'photo' => '/assets/cpd/Ghizlane%20Gabari.jpeg', 'fr' => 'Journaliste et Rédactrice en chef Adjointe', 'en' => 'Journalist and Deputy Editor-in-Chief', 'ar' => 'صحفية ونائبة رئيسة التحرير'],
            ['name' => 'Ibtissame Koutaibi', 'photo' => '/assets/cpd/Ibtissam%20Koutaibi.jpeg', 'fr' => 'Animatrice TV', 'en' => 'TV Presenter', 'ar' => 'مقدمة تلفزيونية'],
            ['name' => 'Ihssane Benbel', 'photo' => '/assets/cpd/Ihssane%20Benbel.jpeg', 'fr' => 'Journaliste et Rédactrice en chef principale', 'en' => 'Journalist and Principal Editor-in-Chief', 'ar' => 'صحفية ورئيسة التحرير الرئيسية'],
            ['name' => 'Malika Nait Youssef', 'photo' => null, 'fr' => 'Directrice adjointe en charge du Département Personnel et Affaires Sociales', 'en' => 'Deputy Director in charge of Personnel and Social Affairs', 'ar' => 'المديرة المساعدة المكلفة بقسم الموارد البشرية والشؤون الاجتماعية'],
            ['name' => 'Meryem Bouriki', 'photo' => '/assets/cpd/Meryem%20Bouriki.jpeg', 'fr' => 'Assistante de Direction', 'en' => 'Executive Assistant', 'ar' => 'مساعدة الإدارة'],
            ['name' => 'Nadia Hammouchi', 'photo' => '/assets/cpd/nadia-hammouchi.png', 'fr' => 'Directrice Adjointe en charge du Digital 2m.ma', 'en' => 'Deputy Director in charge of Digital 2m.ma', 'ar' => 'المديرة المساعدة المكلفة بالرقمنة 2m.ma'],
            ['name' => 'Sanaâ Rahimi', 'photo' => '/assets/cpd/sanaa-rahimi.jpeg', 'fr' => 'Journaliste et Rédactrice en chef principale', 'en' => 'Journalist and Principal Editor-in-Chief', 'ar' => 'صحفية ورئيسة التحرير الرئيسية'],
            ['name' => 'Sara Faiq', 'photo' => '/assets/cpd/Sara%20Faiq.jpeg', 'fr' => 'Rédactrice en chef Adjointe', 'en' => 'Deputy Editor-in-Chief', 'ar' => 'نائبة رئيسة التحرير'],
            ['name' => 'Abderrahmane Amezlloug', 'photo' => '/assets/cpd/abderrahmane-amzelloug.png', 'fr' => 'Directeur Adjoint en charge de la Fiction', 'en' => 'Deputy Director in charge of Fiction', 'ar' => 'المدير المساعد المكلف بالدراما'],
            ['name' => 'Adil Chquiry', 'photo' => '/assets/cpd/adil-chquiry.png', 'fr' => 'Directeur des Programmes et Marketing des Programmes', 'en' => 'Director of Programmes and Programme Marketing', 'ar' => 'مدير البرامج وتسويق البرامج'],
            ['name' => 'Adil Maazouz', 'photo' => '/assets/cpd/adil-maazouz.png', 'fr' => 'Directeur Juridique et Ressources Humaines', 'en' => 'Legal Director and Human Resources', 'ar' => 'المدير القانوني والموارد البشرية'],
            ['name' => 'Hassan Louhmadi', 'photo' => '/assets/cpd/Hassan%20Louhmadi.jpeg', 'fr' => 'Rédacteur en chef terrain', 'en' => 'Field Editor-in-Chief', 'ar' => 'رئيس التحرير الميداني'],
            ['name' => 'Jamaâ Goulahsen', 'photo' => '/assets/cpd/jamaa-goulahsen.png', 'fr' => 'Direction Magazines Information & Documentaires', 'en' => 'News Magazines & Documentaries Division', 'ar' => 'إدارة مجلات الأخبار والوثائقيات'],
            ['name' => 'Mohamed El Wafy', 'photo' => '/assets/cpd/Mohamed%20El%20Wafy.jpeg', 'fr' => 'Directeur Production', 'en' => 'Director of Production', 'ar' => 'مدير الإنتاج'],
            ['name' => 'Samid Ghailane', 'photo' => '/assets/cpd/Samid%20Ghailan.jpeg', 'fr' => 'Rédacteur en chef', 'en' => 'Editor-in-Chief', 'ar' => 'رئيس التحرير'],
            ['name' => 'Zakaria Ait Abdelmajid', 'photo' => '/assets/cpd/zakaria-ait-abdelmajid.jpeg', 'fr' => 'Chef de la Rubrique politique étrangère', 'en' => 'Head of Foreign Politics Section', 'ar' => 'رئيس قسم السياسة الخارجية'],
        ];
    }
}
