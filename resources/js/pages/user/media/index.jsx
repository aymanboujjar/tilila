import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';

import FeaturedHero from '@/pages/user/media/partials/FeaturedHero';
import MediaTabs from '@/pages/user/media/partials/MediaTabs';
import MediaCard from '@/pages/user/media/partials/MediaCard';
import SidebarNewsletter from '@/pages/user/media/partials/SidebarNewsletter';
import SidebarTrendingTopics from '@/pages/user/media/partials/SidebarTrendingTopics';
import SidebarExpertSpotlight from '@/pages/user/media/partials/SidebarExpertSpotlight';
import SidebarResources from '@/pages/user/media/partials/SidebarResources';

const TABS = [
    { id: 'all' },
    { id: 'interviews' },
    { id: 'tililaReplay' },
    { id: 'impactReports' },
    { id: 'diversityInsights' },
    { id: 'expertProfiles' },
];

const MEDIA_ITEMS = [
    {
        id: 'leading-with-empathy',
        categoryId: 'interviews',
        badge: { en: 'Tilila Replay', fr: 'Replay Tilila', ar: 'إعادة تيليلا' },
        title: {
            en: 'Leading with Empathy: A Conversation with CEO Sarah Benchroun',
            fr: 'Diriger avec empathie : conversation avec la PDG Sarah Benchroun',
            ar: 'القيادة بالتعاطف: حوار مع الرئيسة التنفيذية سارة بنشرون',
        },
        excerpt: {
            en: 'Discover how emotional intelligence is reshaping leadership in media and institutions.',
            fr: 'Découvrez comment l’intelligence émotionnelle transforme le leadership dans les médias et المؤسسات.',
            ar: 'اكتشف كيف يُعيد الذكاء العاطفي تشكيل القيادة في الإعلام والمؤسسات.',
        },
        meta: { en: '10 min read • Casablanca', fr: 'Lecture 10 min • Casablanca', ar: 'قراءة 10 دقائق • الدار البيضاء' },
        cta: { en: 'Watch replay →', fr: 'Voir le replay →', ar: 'شاهد الإعادة →' },
        imageSrc:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: '2023-diversity-index',
        categoryId: 'impactReports',
        badge: { en: 'Impact Report', fr: 'Rapport d’impact', ar: 'تقرير أثر' },
        title: {
            en: '2023 Diversity Index: Media Representation Statistics',
            fr: 'Indice diversité 2023 : statistiques de représentation médiatique',
            ar: 'مؤشر التنوع 2023: إحصاءات تمثيل الإعلام',
        },
        excerpt: {
            en: 'Our annual report highlights gender balance trends and expert visibility across platforms.',
            fr: 'Notre rapport annuel met en lumière les tendances de parité et la visibilité des expertes.',
            ar: 'يسلط تقريرنا السنوي الضوء على اتجاهات التوازن الجندري وظهور الخبيرات عبر المنصات.',
        },
        meta: { en: 'Report • 6 min', fr: 'Rapport • 6 min', ar: 'تقرير • 6 دقائق' },
        cta: { en: 'Read report →', fr: 'Lire le rapport →', ar: 'اقرأ التقرير →' },
        imageSrc:
            'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'why-manels-are-bad',
        categoryId: 'diversityInsights',
        badge: { en: 'Diversity Insight', fr: 'Insight diversité', ar: 'رؤية حول التنوع' },
        title: {
            en: 'Why “Manels” Are Bad for Business',
            fr: 'Pourquoi les “manels” nuisent aux organisations',
            ar: 'لماذا تضر “لوحات الرجال فقط” بالأعمال',
        },
        excerpt: {
            en: 'All-male panels reduce credibility, miss talent, and weaken public trust—here’s what to do instead.',
            fr: 'Les panels 100% masculins réduisent la crédibilité et la confiance—voici quoi faire à la place.',
            ar: 'اللوحات التي تضم رجالًا فقط تقلل المصداقية وتفوت المواهب وتضعف الثقة—وهذه بدائل عملية.',
        },
        meta: { en: 'Insight • 4 min', fr: 'Insight • 4 min', ar: 'رؤية • 4 دقائق' },
        cta: { en: 'Read insight →', fr: 'Lire l’insight →', ar: 'اقرأ الرؤية →' },
        imageSrc:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'faces-of-innovation',
        categoryId: 'expertProfiles',
        badge: { en: 'Expert Spotlight', fr: 'À la une', ar: 'تسليط الضوء' },
        title: {
            en: 'Faces of Innovation: Episode 4',
            fr: 'Visages de l’innovation : épisode 4',
            ar: 'وجوه الابتكار: الحلقة 4',
        },
        excerpt: {
            en: 'Listen to women experts building future-ready solutions across Africa.',
            fr: 'Écoutez des expertes qui construisent des solutions d’avenir à travers l’Afrique.',
            ar: 'استمع إلى خبيرات يطوّرن حلولًا للمستقبل في أنحاء إفريقيا.',
        },
        meta: { en: 'Video • 12 min', fr: 'Vidéo • 12 min', ar: 'فيديو • 12 دقيقة' },
        cta: { en: 'Watch episode →', fr: 'Regarder →', ar: 'شاهد الحلقة →' },
        imageSrc:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    },
];

export default function MediaIndex() {
    const { locale, t } = useTranslation();
    const [activeTabId, setActiveTabId] = useState('all');

    const items = useMemo(() => {
        if (activeTabId === 'all') return MEDIA_ITEMS;
        return MEDIA_ITEMS.filter((x) => x.categoryId === activeTabId);
    }, [activeTabId]);

    return (
        <>
            <Head title={t('media.headTitle')} />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <FeaturedHero />

                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <MediaTabs
                                tabs={TABS}
                                activeTabId={activeTabId}
                                setActiveTabId={setActiveTabId}
                            />

                            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {items.map((item) => (
                                    <MediaCard key={item.id} item={item} locale={locale} />
                                ))}
                            </div>

                            <div className="mt-10 flex justify-center">
                                <button
                                    type="button"
                                    className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground shadow-sm hover:text-foreground"
                                >
                                    {t('media.actions.loadMore')}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6 lg:col-span-4">
                            <SidebarNewsletter />
                            <SidebarTrendingTopics />
                            <SidebarExpertSpotlight />
                            <SidebarResources />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

MediaIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

