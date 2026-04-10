<?php

namespace Database\Seeders;

use App\Models\Expert;
use App\Models\MediaItem;
use Illuminate\Database\Seeder;

class MediaItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'slug' => 'leading-with-empathy',
                'category_id' => 'interviews',
                'badge' => ['en' => 'Tilila Replay', 'fr' => 'Replay Tilila', 'ar' => 'إعادة تيليلا'],
                'title' => [
                    'en' => 'Leading with Empathy: A Conversation with CEO Sarah Benchroun',
                    'fr' => 'Diriger avec empathie : conversation avec la PDG Sarah Benchroun',
                    'ar' => 'القيادة بالتعاطف: حوار مع الرئيسة التنفيذية سارة بنشرون',
                ],
                'excerpt' => [
                    'en' => 'Discover how emotional intelligence is reshaping leadership in media and institutions.',
                    'fr' => 'Découvrez comment l’intelligence émotionnelle transforme le leadership dans les médias et المؤسسات.',
                    'ar' => 'اكتشف كيف يُعيد الذكاء العاطفي تشكيل القيادة في الإعلام والمؤسسات.',
                ],
                'reading_label' => ['en' => '10 min read', 'fr' => 'Lecture 10 min', 'ar' => 'قراءة 10 دقائق'],
                'location_label' => ['en' => 'Casablanca', 'fr' => 'Casablanca', 'ar' => 'الدار البيضاء'],
                'image_path' => 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'slug' => '2023-diversity-index',
                'category_id' => 'impactReports',
                'badge' => ['en' => 'Impact Report', 'fr' => 'Rapport d’impact', 'ar' => 'تقرير أثر'],
                'title' => [
                    'en' => '2023 Diversity Index: Media Representation Statistics',
                    'fr' => 'Indice diversité 2023 : statistiques de représentation médiatique',
                    'ar' => 'مؤشر التنوع 2023: إحصاءات تمثيل الإعلام',
                ],
                'excerpt' => [
                    'en' => 'Our annual report highlights gender balance trends and expert visibility across platforms.',
                    'fr' => 'Notre rapport annuel met en lumière les tendances de parité et la visibilité des expertes.',
                    'ar' => 'يسلط تقريرنا السنوي الضوء على اتجاهات التوازن الجندري وظهور الخبيرات عبر المنصات.',
                ],
                'reading_label' => ['en' => 'Report • 6 min', 'fr' => 'Rapport • 6 min', 'ar' => 'تقرير • 6 دقائق'],
                'location_label' => ['en' => '', 'fr' => '', 'ar' => ''],
                'image_path' => 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'slug' => 'why-manels-are-bad',
                'category_id' => 'diversityInsights',
                'badge' => ['en' => 'Diversity Insight', 'fr' => 'Insight diversité', 'ar' => 'رؤية حول التنوع'],
                'title' => [
                    'en' => 'Why “Manels” Are Bad for Business',
                    'fr' => 'Pourquoi les “manels” nuisent aux organisations',
                    'ar' => 'لماذا تضر “لوحات الرجال فقط” بالأعمال',
                ],
                'excerpt' => [
                    'en' => 'All-male panels reduce credibility, miss talent, and weaken public trust—here’s what to do instead.',
                    'fr' => 'Les panels 100% masculins réduisent la crédibilité et la confiance—voici quoi faire à la place.',
                    'ar' => 'اللوحات التي تضم رجالًا فقط تقلل المصداقية وتفوت المواهب وتضعف الثقة—وهذه بدائل عملية.',
                ],
                'reading_label' => ['en' => 'Insight • 4 min', 'fr' => 'Insight • 4 min', 'ar' => 'رؤية • 4 دقائق'],
                'location_label' => ['en' => '', 'fr' => '', 'ar' => ''],
                'image_path' => 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'slug' => 'faces-of-innovation',
                'category_id' => 'expertProfiles',
                'badge' => ['en' => 'Expert Spotlight', 'fr' => 'À la une', 'ar' => 'تسليط الضوء'],
                'title' => [
                    'en' => 'Faces of Innovation: Episode 4',
                    'fr' => 'Visages de l’innovation : épisode 4',
                    'ar' => 'وجوه الابتكار: الحلقة 4',
                ],
                'excerpt' => [
                    'en' => 'Listen to women experts building future-ready solutions across Africa.',
                    'fr' => 'Écoutez des expertes qui construisent des solutions d’avenir à travers l’Afrique.',
                    'ar' => 'استمع إلى خبيرات يطوّرن حلولًا للمستقبل في أنحاء إفريقيا.',
                ],
                'reading_label' => ['en' => 'Video • 12 min', 'fr' => 'Vidéo • 12 min', 'ar' => 'فيديو • 12 دقيقة'],
                'location_label' => ['en' => '', 'fr' => '', 'ar' => ''],
                'image_path' => 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
            ],
        ];

        $sidebarForDetail = [
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
        ];

        $featuredExpertId = Expert::query()
            ->where('status', 'published')
            ->orderBy('id')
            ->value('id');

        foreach ($items as $idx => $row) {
            $payload = [
                ...$row,
                'cta' => MediaItem::defaultCta(),
                'status' => 'published',
                'visibility' => 'public',
            ];

            if ($idx === 0) {
                $payload = array_merge($payload, $sidebarForDetail);
                if ($featuredExpertId !== null) {
                    $payload['featured_expert_id'] = (int) $featuredExpertId;
                }
            }

            MediaItem::query()->updateOrCreate(
                ['slug' => $row['slug']],
                $payload,
            );
        }
    }
}
