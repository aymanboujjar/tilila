import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import TransText from '@/components/TransText';
import ArchivesMediaCarousel, {
    ArchivesGallerySlide,
    ArchivesPhotoSlide,
} from '@/pages/user/tilila/archives/components/ArchivesMediaCarousel';
import { useTranslation } from '@/contexts/TranslationContext';

const VISIBLE_LAUREATS = 4;
const VISIBLE_GALLERY = 4;

export function ArchivesLaureatsSection({
    cards,
    year,
    program,
    detailsUrl,
}) {
    const { t } = useTranslation();
    const programLabel = program === 'tililab' ? 'TILILAB' : 'TILILA AWARDS';
    const yearLabel = year === 'all' ? '' : year;
    const title = `${t('tilila.archives.hub.laureatsTitle')} ${programLabel} ${yearLabel}`.trim();

    if (!cards.length) {
        return (
            <section id="laureats" className="scroll-mt-28">
                <h2 className="text-base font-extrabold tracking-wide text-beta-blue uppercase sm:text-lg">
                    {title}
                </h2>
                <p className="mt-6 rounded-xl border border-dashed border-border bg-beta-white p-8 text-center text-sm text-tgray">
                    {t('tilila.archives.hub.noLaureats')}
                </p>
            </section>
        );
    }

    return (
        <section id="laureats" className="scroll-mt-28">
            <ArchivesMediaCarousel
                ariaLabel="Laureates"
                visibleCount={VISIBLE_LAUREATS}
                showFade={cards.length > VISIBLE_LAUREATS}
                headerRow={(nav) => (
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="text-base font-extrabold tracking-wide text-beta-blue uppercase sm:text-lg">
                            {title}
                        </h2>
                        {nav}
                    </div>
                )}
            >
                {cards.map((card) => (
                    <Link
                        key={card.id}
                        href={card.detailsUrl}
                        className="group block"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border/50 bg-beta-white shadow-sm">
                            <img
                                src={card.photoSrc}
                                alt=""
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-3 space-y-1">
                            {card.trophy ? (
                                <p className="text-[10px] leading-snug font-extrabold tracking-wide text-beta-blue uppercase sm:text-[11px]">
                                    {card.trophy}
                                </p>
                            ) : null}
                            <p className="text-sm font-extrabold text-beta-blue sm:text-[15px]">
                                {card.name}
                            </p>
                            {card.agency ? (
                                <p className="text-xs text-tgray">
                                    {t('tilila.archives.hub.agency')}:{' '}
                                    {card.agency}
                                </p>
                            ) : null}
                        </div>
                    </Link>
                ))}
            </ArchivesMediaCarousel>

            <Link
                href={`${detailsUrl}#winners`}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-twhite uppercase transition hover:bg-brand-light-purple"
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
    compact = false,
}) {
    const { t } = useTranslation();
    const yearLabel = year === 'all' ? '' : year;
    const programLabel = program === 'tililab' ? 'TILILAB' : 'TILILA AWARDS';
    const title = compact
        ? `${t('tilila.archives.hub.galleryTitle')} ${programLabel}`
        : `${t('tilila.archives.hub.galleryTitle')} ${programLabel} ${yearLabel}`.trim();

    const filters = [
        { id: 'all', label: t('tilila.archives.hub.galleryAll') },
        { id: 'photos', label: t('tilila.archives.hub.galleryPhotos') },
        { id: 'videos', label: t('tilila.archives.hub.galleryVideos') },
    ];

    const filterPills = (
        <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
                <button
                    key={f.id}
                    type="button"
                    onClick={() => onFilterChange(f.id)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition sm:text-sm ${
                        filter === f.id
                            ? 'bg-beta-blue text-twhite'
                            : 'border border-beta-blue/50 bg-white text-beta-blue hover:bg-beta-blue/5'
                    }`}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );

    return (
        <section
            id="galerie"
            className={`scroll-mt-28 ${compact ? 'flex h-full flex-col' : ''}`}
        >
            {compact ? (
                <>
                    <h2 className="text-base font-extrabold tracking-wide text-beta-blue uppercase sm:text-lg">
                        {title}
                    </h2>
                    <div className="mt-3">{filterPills}</div>
                </>
            ) : (
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2 className="text-base font-extrabold tracking-wide text-beta-blue uppercase sm:text-lg">
                        {title}
                    </h2>
                    {filterPills}
                </div>
            )}

            {!items.length ? (
                <p className="mt-6 rounded-xl border border-dashed border-border bg-beta-white p-6 text-center text-sm text-tgray">
                    {t('tilila.archives.hub.noGallery')}
                </p>
            ) : (
                <div className="mt-5 flex-1">
                    <ArchivesMediaCarousel
                        ariaLabel="Gallery"
                        visibleCount={compact ? VISIBLE_GALLERY : null}
                        showFade={compact && items.length > VISIBLE_GALLERY}
                        navOverlay={compact}
                        trackGapClassName={compact ? 'gap-2.5' : 'gap-4'}
                        slideClassName={
                            compact
                                ? undefined
                                : 'w-[min(100%,200px)] shrink-0 snap-start sm:w-[42%] md:w-[30%] lg:w-[22%]'
                        }
                    >
                        {items.map((item) => (
                            <ArchivesGallerySlide
                                key={item.id}
                                item={item}
                                compact={compact}
                            />
                        ))}
                    </ArchivesMediaCarousel>
                </div>
            )}

            {items.length > 0 ? (
                <Link
                    href={`${detailsUrl}#gallery`}
                    className={`flex w-full items-center justify-center gap-2 rounded-md bg-beta-blue px-4 py-3 text-[11px] font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple sm:text-xs ${
                        compact ? 'mt-6' : 'mt-6'
                    }`}
                >
                    {t('tilila.archives.hub.seeAllGallery')}
                    <ArrowRight className="size-3.5" aria-hidden />
                </Link>
            ) : null}
        </section>
    );
}

export function ArchivesPhotosSection({ photos = [], year }) {
    const yearLabel = year === 'all' ? '' : ` ${year}`;

    return (
        <section id="photos" className="scroll-mt-28">
            <h3 className="text-base font-extrabold tracking-wide text-beta-blue uppercase sm:text-lg">
                <TransText
                    en={`Photos${yearLabel}`}
                    fr={`Photos${yearLabel}`}
                    ar={`الصور${yearLabel}`}
                />
            </h3>

            {!photos.length ? (
                <p className="mt-4 text-sm text-tgray">
                    <TransText
                        en="No photos for this selection."
                        fr="Aucune photo pour cette sélection."
                        ar="لا توجد صور لهذا الاختيار."
                    />
                </p>
            ) : (
                <div className="mt-4">
                    <ArchivesMediaCarousel ariaLabel="Photos">
                        {photos.map((photo, index) => (
                            <ArchivesPhotoSlide
                                key={`${photo.src}-${index}`}
                                src={photo.src}
                                href={photo.src}
                            />
                        ))}
                    </ArchivesMediaCarousel>
                </div>
            )}
        </section>
    );
}
