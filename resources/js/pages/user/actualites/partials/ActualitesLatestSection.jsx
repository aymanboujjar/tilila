import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar } from 'lucide-react';
import TransText from '@/components/TransText';
import ActualitesSectionHeading from '@/pages/user/actualites/partials/ActualitesSectionHeading';
import { LATEST_NEWS } from '@/pages/user/actualites/data/fallbackNews';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
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

function mergeLatest(apiNews = []) {
    if (!apiNews.length) return LATEST_NEWS;

    const fromApi = apiNews.slice(3, 8).map((item) => ({
        id: item.id,
        href: item.href || `/events/${item.id}`,
        date: item.date,
        title: item.title,
        cover_image_url:
            item.cover_image_url || '/assets/tilila/editions/edition-2024.png',
    }));

    if (fromApi.length >= 5) return fromApi.slice(0, 5);

    return [...fromApi, ...LATEST_NEWS].slice(0, 5);
}

function LatestCard({ item, locale }) {
    return (
        <Link
            href={item.href}
            className="group flex h-full flex-col rounded-xl border border-border/50 bg-twhite p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-4"
        >
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-beta-white">
                <img
                    src={item.cover_image_url}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                />
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-beta-turquoise">
                <Calendar className="size-3 shrink-0" aria-hidden />
                <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
            </p>

            <h3 className="mt-2 flex-1 text-sm font-extrabold leading-snug text-tblack">
                {textFor(item.title, locale)}
            </h3>

            <span className="mt-3 flex justify-end text-beta-blue transition group-hover:translate-x-0.5">
                <ArrowRight className="size-4" aria-hidden />
            </span>
        </Link>
    );
}

export default function ActualitesLatestSection({ news = [] }) {
    const { locale } = useTranslation();
    const items = mergeLatest(news);

    return (
        <section className="border-t border-border/40 bg-[#f5f6f8] py-12 sm:py-14">
            <TililaContainer>
                <ActualitesSectionHeading>
                    <TransText
                        fr="Dernières actualités"
                        en="Latest news"
                        ar="آخر الأخبار"
                    />
                </ActualitesSectionHeading>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
                    {items.map((item) => (
                        <LatestCard
                            key={item.id}
                            item={item}
                            locale={locale}
                        />
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <Link
                        href="/actualites"
                        className="inline-flex items-center gap-2 rounded-md border-2 border-beta-blue bg-twhite px-8 py-3 text-xs font-extrabold tracking-[0.12em] text-beta-blue uppercase transition hover:bg-beta-blue hover:text-twhite"
                    >
                        <TransText
                            fr="Voir toutes les actualités"
                            en="See all news"
                            ar="عرض كل الأخبار"
                        />
                        <ArrowRight className="size-4" aria-hidden />
                    </Link>
                </div>
            </TililaContainer>
        </section>
    );
}
