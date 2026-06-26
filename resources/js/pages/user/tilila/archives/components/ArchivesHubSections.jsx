import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import ArchivesLaureateCard from '@/pages/user/tilila/archives/components/ArchivesLaureateCard';
import ArchivesSectionHeading from '@/pages/user/tilila/archives/components/ArchivesSectionHeading';
import ArchivesMediaCarousel, {
    ArchivesGallerySlide,
} from '@/pages/user/tilila/archives/components/ArchivesMediaCarousel';
import { useTranslation } from '@/contexts/TranslationContext';
import TransText from '@/components/TransText';

const VISIBLE_LAUREATS = 4;

export function ArchivesLaureatsSection({
    cards,
    year,
    program,
    detailsUrl,
}) {
    const { t } = useTranslation();
    const programLabel = program === 'tililab' ? 'Tililab' : 'Tilila Awards';
    const yearLabel = year === 'all' ? '' : year;
    const title = `${t('tilila.archives.hub.laureatsTitle')} ${programLabel}${yearLabel ? ` ${yearLabel}` : ''}`;
    const showYear = year === 'all';

    if (!cards.length) {
        return (
            <section id="laureats" className="scroll-mt-32">
                <ArchivesSectionHeading title={title} />
                <p className="mt-8 rounded-2xl border border-dashed border-beta-blue/20 bg-beta-white px-6 py-12 text-center text-sm text-tgray">
                    {t('tilila.archives.hub.noLaureats')}
                </p>
            </section>
        );
    }

    const useCarousel = cards.length > 4;

    return (
        <section id="laureats" className="scroll-mt-32">
            <ArchivesSectionHeading
                kicker={
                    <TransText
                        en="Palmarès"
                        fr="Palmarès"
                        ar="الجوائز"
                    />
                }
                title={title}
            />

            {useCarousel ? (
                <div className="mt-8">
                    <ArchivesMediaCarousel
                        ariaLabel="Laureates"
                        visibleCount={VISIBLE_LAUREATS}
                        showFade={cards.length > VISIBLE_LAUREATS}
                        slideClassName="w-[calc((100%-3rem)/4)] min-w-[11rem] shrink-0 snap-start sm:min-w-[12.5rem]"
                        trackGapClassName="gap-4"
                    >
                        {cards.map((card) => (
                            <ArchivesLaureateCard
                                key={card.id}
                                card={card}
                                showYear={showYear}
                            />
                        ))}
                    </ArchivesMediaCarousel>
                </div>
            ) : (
                <div className="mt-8 grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <ArchivesLaureateCard
                            key={card.id}
                            card={card}
                            showYear={showYear}
                        />
                    ))}
                </div>
            )}

            <Link
                href={`${detailsUrl}#winners`}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-twhite uppercase transition hover:bg-brand-light-purple sm:w-auto"
            >
                {t('tilila.archives.hub.seeAllLaureats')}
                <ArrowRight className="size-4" aria-hidden />
            </Link>
        </section>
    );
}

export function ArchivesGallerySection({
    items,
    year,
    program,
    filter,
    onFilterChange,
    detailsUrl,
}) {
    const { t } = useTranslation();
    const yearLabel = year === 'all' ? '' : year;
    const programLabel = program === 'tililab' ? 'Tililab' : 'Tilila Awards';
    const title = `${t('tilila.archives.hub.galleryTitle')} — ${programLabel}${yearLabel ? ` ${yearLabel}` : ''}`;

    const filters = [
        { id: 'all', label: t('tilila.archives.hub.galleryAll') },
        { id: 'photos', label: t('tilila.archives.hub.galleryPhotos') },
        { id: 'videos', label: t('tilila.archives.hub.galleryVideos') },
    ];

    const filterPills = (
        <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((f) => (
                <button
                    key={f.id}
                    type="button"
                    onClick={() => onFilterChange(f.id)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition sm:text-sm ${
                        filter === f.id
                            ? 'bg-beta-blue text-twhite shadow-sm'
                            : 'border border-border/60 bg-beta-white text-tblack hover:border-beta-blue hover:text-beta-blue'
                    }`}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );

    return (
        <section id="galerie" className="scroll-mt-32">
            <ArchivesSectionHeading
                kicker={
                    <TransText
                        en="Media"
                        fr="Médias"
                        ar="الوسائط"
                    />
                }
                title={title}
            />
            {filterPills}

            {!items.length ? (
                <p className="mt-8 rounded-2xl border border-dashed border-beta-blue/20 bg-beta-white px-6 py-12 text-center text-sm text-tgray">
                    {t('tilila.archives.hub.noGallery')}
                </p>
            ) : (
                <div className="mt-8">
                    {items.length <= 6 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((item) => (
                                <ArchivesGallerySlide
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>
                    ) : (
                        <ArchivesMediaCarousel
                            ariaLabel="Gallery"
                            slideClassName="w-[min(100%,340px)] shrink-0 snap-start sm:w-[48%] lg:w-[32%]"
                        >
                            {items.map((item) => (
                                <ArchivesGallerySlide
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </ArchivesMediaCarousel>
                    )}
                </div>
            )}

            {items.length > 0 ? (
                <Link
                    href={`${detailsUrl}#gallery`}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-beta-blue bg-twhite px-6 py-3 text-xs font-bold tracking-[0.12em] text-beta-blue uppercase transition hover:bg-beta-blue hover:text-twhite sm:w-auto"
                >
                    {t('tilila.archives.hub.seeAllGallery')}
                    <ArrowRight className="size-3.5" aria-hidden />
                </Link>
            ) : null}
        </section>
    );
}
