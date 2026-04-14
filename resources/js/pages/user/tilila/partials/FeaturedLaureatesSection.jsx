import { ArrowRight } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';

function firstEditionWithWinners(editions) {
    if (!Array.isArray(editions)) return null;
    return (
        editions.find((e) => Array.isArray(e?.winners) && e.winners.length > 0) ||
        editions[0] ||
        null
    );
}

export default function FeaturedLaureatesSection() {
    const { locale } = useTranslation();
    const { editions } = usePage().props;

    const edition = firstEditionWithWinners(editions);
    const winners = Array.isArray(edition?.winners) ? edition.winners : [];
    const featured = winners.slice(0, 3);

    return (
        <section id="featured" className="mx-auto max-w-7xl px-4 pt-8 pb-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="text-xs font-semibold tracking-widest text-tgray">
                        <TransText en="FEATURED" fr="À LA UNE" ar="مميّز" />
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-tblack">
                        <TransText
                            en="Featured Laureates"
                            fr="Lauréats à la une"
                            ar="فائزون مميزون"
                        />
                    </h2>
                </div>
                <a
                    href="/tilila#archive"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-beta-blue hover:opacity-80"
                >
                    <span>
                        <TransText
                            en="View all editions"
                            fr="Voir toutes les éditions"
                            ar="عرض جميع الدورات"
                        />
                    </span>{' '}
                    <ArrowRight className="size-4" />
                </a>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {featured.length === 0 ? (
                    <div className="rounded-3xl border border-border bg-background p-10 text-center text-sm text-tgray lg:col-span-3">
                        <TransText
                            en="No winners have been added yet."
                            fr="Aucun lauréat n’a encore été ajouté."
                            ar="لم تتم إضافة فائزين بعد."
                        />
                    </div>
                ) : (
                    featured.map((person, idx) => {
                        const imageUrl = person?.photo_path
                            ? `/storage/${person.photo_path}`
                            : '';
                        const title =
                            locale === 'ar'
                                ? person?.full_name
                                : locale === 'fr'
                                  ? person?.full_name
                                  : person?.full_name;

                        return (
                    <article
                        key={`${person?.full_name ?? 'winner'}-${idx}`}
                        className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm"
                    >
                        <div className="relative">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={title ?? ''}
                                    className="aspect-4/3 w-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ) : (
                                <div className="aspect-4/3 w-full bg-muted" />
                            )}
                            <span className="absolute top-4 left-4 rounded-full bg-background px-3 py-1 text-xs font-semibold text-tblack">
                                {edition?.year ?? ''}
                            </span>
                        </div>
                        <div className="p-5">
                            <h3 className="text-sm font-semibold text-tblack">
                                {person?.full_name ?? '—'}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-tgray">
                                <TransText
                                    en={person?.bio?.en ?? ''}
                                    fr={person?.bio?.fr ?? ''}
                                    ar={person?.bio?.ar ?? ''}
                                />
                            </p>
                        </div>
                    </article>
                        );
                    })
                )}
            </div>
        </section>
    );
}
