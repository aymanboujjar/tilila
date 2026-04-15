import React from 'react';

import TransText from '@/components/TransText';

const FALLBACK_TOPICS = [
    {
        title: {
            en: 'Women in STEM',
            fr: 'Femmes en STEM',
            ar: 'النساء في STEM',
        },
        tag: { en: 'April 2026', fr: 'Avril 2026', ar: 'أبريل 2026' },
    },
    {
        title: {
            en: 'Media parity',
            fr: 'Parité dans les médias',
            ar: 'التكافؤ في الإعلام',
        },
        tag: { en: 'Trending', fr: 'Tendance', ar: 'الأكثر تداولًا' },
    },
    {
        title: { en: 'Mentorship', fr: 'Mentorat', ar: 'الإرشاد' },
        tag: { en: 'New', fr: 'Nouveau', ar: 'جديد' },
    },
];

export default function SidebarTrendingTopics({ topics = null }) {
    const list =
        Array.isArray(topics) && topics.length > 0 ? topics : FALLBACK_TOPICS;

    return (
        <aside className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="text-xs font-extrabold tracking-wide text-muted-foreground uppercase">
                <TransText
                    en="Trending topics"
                    fr="Sujets tendance"
                    ar="مواضيع رائجة"
                />
            </div>

            <div className="mt-4 space-y-3">
                {list.map((t, idx) => (
                    <button
                        key={
                            typeof t?.title?.en === 'string'
                                ? t.title.en
                                : `topic-${idx}`
                        }
                        type="button"
                        className="flex w-full items-center justify-between gap-3 rounded-xl bg-background px-4 py-3 text-left ring-1 ring-border hover:bg-secondary"
                    >
                        <div className="text-sm font-semibold text-foreground">
                            <TransText
                                en={t?.title?.en ?? ''}
                                fr={t?.title?.fr ?? ''}
                                ar={t?.title?.ar ?? ''}
                            />
                        </div>
                        <div className="text-xs font-semibold text-muted-foreground">
                            <TransText
                                en={t?.tag?.en ?? ''}
                                fr={t?.tag?.fr ?? ''}
                                ar={t?.tag?.ar ?? ''}
                            />
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    );
}
