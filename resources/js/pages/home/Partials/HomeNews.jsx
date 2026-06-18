import { Link } from '@inertiajs/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import TransText from '@/components/TransText';
import { TililaContainer, TililaSection } from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';

const FALLBACK_NEWS = [
    {
        id: 'fallback-1',
        href: '/tilila/participate',
        badge: { en: 'OPENING', fr: 'OUVERTURE', ar: 'الافتتاح' },
        badgeTone: 'turquoise',
        title: {
            en: 'Applications open for 2026',
            fr: 'Ouverture des candidatures 2026',
            ar: 'افتتاح الترشحات 2026',
        },
        date: '2026-05-01',
        cover_image_url: '/assets/tilila/editions/edition-2025.png',
    },
    {
        id: 'fallback-2',
        href: '/tilila#jury',
        badge: { en: 'NEWS', fr: 'NEWS', ar: 'أخبار' },
        badgeTone: 'purple',
        title: {
            en: '2026 jury announced',
            fr: 'Composition du jury 2026',
            ar: 'تشكيلة لجنة التحكيم 2026',
        },
        date: '2026-06-03',
        cover_image_url: '/assets/tilila/hero-7eme-edition.png',
    },
    {
        id: 'fallback-3',
        href: '/tilila/archives',
        badge: { en: 'NEWS', fr: 'NEWS', ar: 'أخبار' },
        badgeTone: 'purple',
        title: {
            en: 'Tililab 2025 winners published',
            fr: 'Palmarès Tililab 2025 publié',
            ar: 'نشر قائمة فائزي تيليلاب 2025',
        },
        date: '2025-11-12',
        cover_image_url: '/assets/tililab/tililab-banner.png',
    },
    {
        id: 'fallback-4',
        href: '/tilila/archives',
        badge: { en: 'CEREMONY', fr: 'CÉRÉMONIE', ar: 'الحفل' },
        badgeTone: 'turquoise',
        title: {
            en: '7th Tilila Awards ceremony',
            fr: 'Cérémonie des 7e Tilila Awards',
            ar: 'حفل تيليلا أووردز السابع',
        },
        date: '2024-12-14',
        cover_image_url: '/assets/tilila/editions/edition-2024.png',
    },
];

const BADGE_TONES = {
    turquoise: 'bg-beta-turquoise/15 text-beta-turquoise',
    purple: 'bg-brand-light-purple/15 text-brand-light-purple',
};

function formatNewsDate(iso, locale) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
    if (!y || !m || !d) return iso;
    const date = new Date(Date.UTC(y, m - 1, d));
    const tag = locale === 'ar' ? 'ar' : locale === 'fr' ? 'fr-FR' : 'en-US';
    try {
        return date.toLocaleDateString(tag, {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
        });
    } catch {
        return iso;
    }
}

function textFor(obj, locale) {
    return obj?.[locale] || obj?.fr || obj?.en || obj?.ar || '';
}

function NewsCard({ item, locale }) {
    const tone =
        BADGE_TONES[item.badgeTone] ?? BADGE_TONES.purple;
    const href = item.href || (item.slug ? `/events/${item.slug}` : '/events');

    return (
        <Link
            href={href}
            className="group flex w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border/70 bg-twhite shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:w-[280px]"
        >
            <div className="aspect-[16/10] overflow-hidden bg-beta-white">
                {item.cover_image_url ? (
                    <img
                        src={item.cover_image_url}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                ) : null}
            </div>
            <div className="flex flex-1 flex-col p-4">
                <span
                    className={`inline-flex w-fit rounded px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${tone}`}
                >
                    {textFor(item.badge, locale)}
                </span>
                <h3 className="mt-3 line-clamp-2 text-sm font-extrabold leading-snug text-tblack">
                    {textFor(item.title, locale)}
                </h3>
                <p className="mt-auto pt-3 text-xs text-tgray">
                    {formatNewsDate(item.date, locale)}
                </p>
            </div>
        </Link>
    );
}

export default function HomeNews({ items = [] }) {
    const { locale } = useTranslation();
    const scrollerRef = useRef(null);
    const list = (Array.isArray(items) && items.length ? items : FALLBACK_NEWS).slice(
        0,
        8,
    );

    const scrollNext = () => {
        scrollerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <TililaSection id="news" className="border-t border-border/60 bg-twhite pb-16">
            <TililaContainer>
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2 className="text-2xl font-extrabold tracking-tight text-beta-blue sm:text-3xl">
                        <TransText en="News" fr="Actualités" ar="أخبار" />
                    </h2>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-bold text-beta-blue transition hover:text-brand-light-purple"
                    >
                        <TransText
                            en="View all news"
                            fr="Voir toutes les actualités"
                            ar="عرض كل الأخبار"
                        />
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <div className="relative mt-8">
                    <div
                        ref={scrollerRef}
                        className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
                    >
                        {list.map((item) => (
                            <NewsCard
                                key={item.id}
                                item={item}
                                locale={locale}
                            />
                        ))}
                    </div>

                    {list.length > 4 ? (
                        <button
                            type="button"
                            onClick={scrollNext}
                            className="absolute top-1/2 -right-1 hidden -translate-y-1/2 rounded-full border border-border bg-twhite p-2 text-beta-blue shadow-md transition hover:bg-alpha-blue lg:inline-flex"
                            aria-label="Next"
                        >
                            <ChevronRight className="size-5" />
                        </button>
                    ) : null}
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
