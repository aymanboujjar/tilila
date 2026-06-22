import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';

const FALLBACK_NEWS = [
    {
        id: 'fallback-1',
        href: '/tilila/participate',
        badge: {
            en: 'TILILA AWARDS',
            fr: 'TILILA AWARDS',
            ar: 'تيليلا أووردز',
        },
        badgeTone: 'purple',
        title: {
            en: 'Tilila Awards 2026 applications open',
            fr: 'Ouverture des candidatures Tilila Awards 2026',
            ar: 'افتتاح ترشحات تيليلا أووردز 2026',
        },
        excerpt: {
            en: 'Take part in the 8th Tilila Awards edition by showcasing campaigns that evolve representations.',
            fr: 'Participez à la 8ème édition des Tilila Awards en valorisant vos campagnes qui font évoluer les représentations.',
            ar: 'شاركوا في الدورة الثامنة من تيليلا أووردز بإبراز حملاتكم التي تطور التمثيلات.',
        },
        date: '2026-05-15',
        cover_image_url: '/assets/tilila/editions/edition-2025.png',
    },
    {
        id: 'fallback-2',
        href: '/tililab',
        badge: { en: 'TILILAB', fr: 'TILILAB', ar: 'تيليلاب' },
        badgeTone: 'turquoise',
        title: {
            en: 'Tililab 2026 call for applications',
            fr: 'Appel à candidatures Tililab 2026',
            ar: 'دعوة للترشح لتيليلاب 2026',
        },
        excerpt: {
            en: 'Young creative talents, join Tililab and benefit from tailored mentoring.',
            fr: 'Jeunes talents créatifs, rejoignez Tililab et bénéficiez d’un accompagnement sur mesure.',
            ar: 'أيها المبدعون الشباب، انضموا إلى تيليلاب واستفيدوا من مرافقة مخصصة.',
        },
        date: '2026-05-10',
        cover_image_url: '/assets/tililab/tililab-banner.png',
    },
    {
        id: 'fallback-3',
        href: '/tililab',
        badge: { en: 'TILILAB', fr: 'TILILAB', ar: 'تيليلاب' },
        badgeTone: 'turquoise',
        title: {
            en: 'Tililab Bootcamp: look back at the previous edition',
            fr: 'Bootcamp Tililab : retour sur l’édition précédente',
            ar: 'معسكر تيليلاب: العودة إلى الدورة السابقة',
        },
        excerpt: {
            en: 'Relive the highlights of Tililab Bootcamp 2025 in pictures.',
            fr: 'Revivez les temps forts du Bootcamp Tililab 2025 en images.',
            ar: 'استرجعوا أبرز لحظات معسكر تيليلاب 2025 بالصور.',
        },
        date: '2026-05-01',
        cover_image_url: '/assets/tililab/tililab-banner.png',
    },
];

const BADGE_TONES = {
    turquoise: 'bg-beta-turquoise text-twhite',
    purple: 'bg-beta-blue text-twhite',
};

function formatNewsDate(iso, locale) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
    if (!y || !m || !d) return iso;
    const date = new Date(Date.UTC(y, m - 1, d));
    const tag = locale === 'ar' ? 'ar' : locale === 'fr' ? 'fr-FR' : 'en-US';
    try {
        return date.toLocaleDateString(tag, {
            day: 'numeric',
            month: locale === 'fr' ? 'long' : 'short',
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
    const tone = BADGE_TONES[item.badgeTone] ?? BADGE_TONES.purple;
    const href = item.href || (item.slug ? `/events/${item.slug}` : '/events');

    return (
        <Link
            href={href}
            className="group flex flex-col bg-twhite transition hover:-translate-y-0.5"
        >
            <div className="relative">
                <div
                    className="absolute top-2 -left-1 h-[calc(100%-0.5rem)] w-3 rounded-sm bg-beta-blue/10 shadow-sm"
                    aria-hidden
                />
                <div className="relative ml-2 aspect-[16/10] overflow-hidden rounded-lg bg-beta-white shadow-md">
                    {item.cover_image_url ? (
                        <img
                            src={item.cover_image_url}
                            alt=""
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                        />
                    ) : null}
                </div>
            </div>

            <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
                <div className="flex items-center justify-between gap-3">
                    <span
                        className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${tone}`}
                    >
                        {textFor(item.badge, locale)}
                    </span>
                    <time
                        dateTime={item.date}
                        className="shrink-0 text-xs text-tgray"
                    >
                        {formatNewsDate(item.date, locale)}
                    </time>
                </div>

                <h3 className="mt-3 line-clamp-2 text-sm leading-snug font-extrabold text-tblack sm:text-[0.95rem]">
                    {textFor(item.title, locale)}
                </h3>

                {textFor(item.excerpt, locale) ? (
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-tgray sm:text-sm">
                        {textFor(item.excerpt, locale)}
                    </p>
                ) : null}

                <span className="mt-auto flex justify-end pt-4 text-beta-blue transition group-hover:translate-x-0.5">
                    <ArrowRight className="size-4" aria-hidden />
                </span>
            </div>
        </Link>
    );
}

export default function HomeNews({ items = [] }) {
    const { locale } = useTranslation();
    const list = (
        Array.isArray(items) && items.length ? items : FALLBACK_NEWS
    ).slice(0, 3);

    return (
        <TililaSection
            id="news"
            className="border-t border-border/60 bg-twhite py-10 sm:py-12"
        >
            <TililaContainer>
                <div className="relative mb-8 sm:mb-10">
                    <div className="text-center">
                        <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                            <TransText
                                en="News"
                                fr="Actualités"
                                ar="أخبار"
                            />
                        </h2>
                        <div
                            className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-blue/70"
                            aria-hidden
                        />
                    </div>

                    <Link
                        href="/actualites"
                        className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-wide text-beta-blue uppercase transition hover:text-brand-light-purple sm:absolute sm:top-1/2 sm:right-0 sm:mt-0 sm:-translate-y-1/2 sm:text-sm"
                    >
                        <TransText
                            en="View all news"
                            fr="Voir toutes les actualités"
                            ar="عرض كل الأخبار"
                        />
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {list.map((item) => (
                        <NewsCard
                            key={item.id}
                            item={item}
                            locale={locale}
                        />
                    ))}
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
