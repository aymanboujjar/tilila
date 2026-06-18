import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';
import ArchivesMediaCarousel, {
    ArchivesGallerySlide,
    ArchivesPhotoSlide,
} from '@/pages/user/tilila/archives/components/ArchivesMediaCarousel';
import { useTranslation } from '@/contexts/TranslationContext';

export function ArchivesLaureatsSection({
    cards,
    year,
    program,
    detailsUrl,
    previewCount = 4,
}) {
    const { t } = useTranslation();
    const preview = cards.slice(0, previewCount);
    const programLabel = program === 'tililab' ? 'TILILAB' : 'TILILA AWARDS';
    const yearLabel = year === 'all' ? '' : year;

    if (!cards.length) {
        return (
            <section id="laureats" className="scroll-mt-28">
                <h2 className="text-lg font-extrabold tracking-wide text-beta-blue uppercase sm:text-xl">
                    {t('tilila.archives.hub.laureatsTitle')} {programLabel}{' '}
                    {yearLabel}
                </h2>
                <p className="mt-6 rounded-xl border border-dashed border-border bg-beta-white p-8 text-center text-sm text-tgray">
                    {t('tilila.archives.hub.noLaureats')}
                </p>
            </section>
        );
    }

    return (
        <section id="laureats" className="scroll-mt-28">
            <h2 className="text-lg font-extrabold tracking-wide text-beta-blue uppercase sm:text-xl">
                {t('tilila.archives.hub.laureatsTitle')} {programLabel}{' '}
                {yearLabel}
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
                {preview.map((card) => (
                    <Link
                        key={card.id}
                        href={card.detailsUrl}
                        className="group overflow-hidden rounded-lg border border-border/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden bg-beta-white">
                            <img
                                src={card.photoSrc}
                                alt=""
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                loading="lazy"
                            />
                        </div>
                        <div className="space-y-1 p-3 sm:p-4">
                            {card.trophy ? (
                                <p className="text-[11px] leading-snug font-semibold text-tgray uppercase sm:text-xs">
                                    {card.trophy}
                                </p>
                            ) : null}
                            <p className="text-sm font-extrabold text-tblack sm:text-base">
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
            </div>

            {cards.length > previewCount ? (
                <Link
                    href={`${detailsUrl}#winners`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-twhite uppercase transition hover:bg-brand-light-purple sm:mt-8"
                >
                    {t('tilila.archives.hub.seeAllLaureats')}
                    <span aria-hidden>&gt;</span>
                </Link>
            ) : null}
        </section>
    );
}

export function ArchivesGallerySection({
    items,
    year,
    filter,
    onFilterChange,
    detailsUrl,
}) {
    const { t } = useTranslation();
    const yearLabel = year === 'all' ? '' : year;

    const filters = [
        { id: 'all', label: t('tilila.archives.hub.galleryAll') },
        { id: 'photos', label: t('tilila.archives.hub.galleryPhotos') },
        { id: 'videos', label: t('tilila.archives.hub.galleryVideos') },
    ];

    return (
        <section id="galerie" className="scroll-mt-28">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-lg font-extrabold tracking-wide text-beta-blue uppercase sm:text-xl">
                    {t('tilila.archives.hub.galleryTitle')} {yearLabel}
                </h2>
                <div className="flex gap-4 text-sm">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            onClick={() => onFilterChange(f.id)}
                            className={`font-semibold transition ${
                                filter === f.id
                                    ? 'text-beta-blue underline decoration-2 underline-offset-4'
                                    : 'text-tgray hover:text-beta-blue'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {!items.length ? (
                <p className="mt-6 rounded-xl border border-dashed border-border bg-beta-white p-8 text-center text-sm text-tgray">
                    {t('tilila.archives.hub.noGallery')}
                </p>
            ) : (
                <div className="mt-6">
                    <ArchivesMediaCarousel ariaLabel="Gallery">
                        {items.map((item) => (
                            <ArchivesGallerySlide key={item.id} item={item} />
                        ))}
                    </ArchivesMediaCarousel>
                </div>
            )}

            {items.length > 0 ? (
                <Link
                    href={`${detailsUrl}#gallery`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-twhite uppercase transition hover:bg-brand-light-purple sm:mt-8"
                >
                    {t('tilila.archives.hub.seeAllGallery')}
                    <span aria-hidden>&gt;</span>
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
