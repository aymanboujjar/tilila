import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar } from 'lucide-react';
import TransText from '@/components/TransText';
import ActualitesSectionHeading from '@/pages/user/actualites/partials/ActualitesSectionHeading';
import { FEATURED_NEWS } from '@/pages/user/actualites/data/fallbackNews';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import TililaHorizontalCarousel from '@/pages/user/tilila/partials/TililaHorizontalCarousel';
import { useTranslation } from '@/contexts/TranslationContext';

function formatDate(iso, locale) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
    if (!y || !m || !d) return iso;
    const date = new Date(Date.UTC(y, m - 1, d));
    const tag = locale === 'ar' ? 'ar' : locale === 'fr' ? 'fr-FR' : 'en-US';
    try {
        return date.toLocaleDateString(tag, {
            day: 'numeric',
            month: 'long',
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

function mergeFeatured(apiNews = []) {
    if (!apiNews.length) return FEATURED_NEWS;

    const fromApi = apiNews.slice(0, 3).map((item) => ({
        id: item.id,
        href: item.href || `/events/${item.id}`,
        date: item.date,
        title: item.title,
        excerpt: item.excerpt,
        cover_image_url:
            item.cover_image_url || '/assets/tilila/editions/edition-2025.png',
    }));

    return fromApi.length >= 3
        ? fromApi
        : [...fromApi, ...FEATURED_NEWS].slice(0, 3);
}

function FeaturedCard({ item, locale }) {
    return (
        <article className="flex h-full flex-col">
            <Link href={item.href} className="group block">
                <div className="aspect-[16/10] overflow-hidden rounded-xl border border-border/50 bg-beta-white shadow-sm">
                    <img
                        src={item.cover_image_url}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                    />
                </div>
            </Link>

            <div className="flex flex-1 flex-col pt-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-beta-turquoise">
                    <Calendar className="size-3.5 shrink-0" aria-hidden />
                    <time dateTime={item.date}>
                        {formatDate(item.date, locale)}
                    </time>
                </p>

                <h3 className="mt-2 text-base font-extrabold leading-snug text-tblack sm:text-lg">
                    <Link
                        href={item.href}
                        className="transition hover:text-beta-blue"
                    >
                        {textFor(item.title, locale)}
                    </Link>
                </h3>

                {textFor(item.excerpt, locale) ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-tgray">
                        {textFor(item.excerpt, locale)}
                    </p>
                ) : null}

                <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-beta-blue transition hover:gap-2"
                >
                    <TransText
                        fr="Lire la suite"
                        en="Read more"
                        ar="اقرأ المزيد"
                    />
                    <ArrowRight className="size-4" aria-hidden />
                </Link>
            </div>
        </article>
    );
}

export default function ActualitesFeaturedSection({ news = [] }) {
    const { locale } = useTranslation();
    const items = mergeFeatured(news);

    return (
        <section className="bg-twhite py-12 sm:py-14">
            <TililaContainer>
                <TililaHorizontalCarousel
                    ariaLabel="Featured news"
                    visibleCount={3}
                    showFade={items.length > 3}
                    trackGapClassName="gap-6"
                    fadeFrom="from-white"
                    headerRow={(nav) => (
                        <div className="mb-8 flex items-end justify-between gap-4">
                            <ActualitesSectionHeading>
                                <TransText
                                    fr="À la une"
                                    en="Featured"
                                    ar="في الواجهة"
                                />
                            </ActualitesSectionHeading>
                            {nav}
                        </div>
                    )}
                >
                    {items.map((item) => (
                        <FeaturedCard
                            key={item.id}
                            item={item}
                            locale={locale}
                        />
                    ))}
                </TililaHorizontalCarousel>
            </TililaContainer>
        </section>
    );
}
