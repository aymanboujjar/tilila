import WinnerPosterVideo from '@/pages/user/tilila/archives/components/WinnerPosterVideo';
import TililaHorizontalCarousel from '@/pages/user/tilila/partials/TililaHorizontalCarousel';

const GALLERY_MEDIA_FRAME =
    'relative aspect-video w-full overflow-hidden rounded-2xl border border-border/40 shadow-[0_8px_30px_rgba(26,35,126,0.08)]';

export function ArchivesPhotoSlide({ src, href, className = '' }) {
    const content = (
        <div
            className={`${GALLERY_MEDIA_FRAME} bg-alpha-blue ${className}`}
        >
            <img
                src={src}
                alt=""
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
            />
        </div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noreferrer" className="block">
                {content}
            </a>
        );
    }

    return content;
}

function GalleryWinnerLabel({ label }) {
    if (!label) {
        return null;
    }

    return (
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-3 pt-10 pb-3 text-sm font-extrabold text-twhite">
            {label}
        </p>
    );
}

function GalleryInlineVideo({ item }) {
    const isWinner = item.videoKind === 'winner';

    return (
        <div className="h-full w-full min-w-0">
            <div className={`${GALLERY_MEDIA_FRAME} bg-[#0a1028]`}>
                <div className="absolute inset-0">
                    <WinnerPosterVideo
                        uploadSrc={item.videoUploadSrc ?? null}
                        youtubeUrl={
                            item.videoYoutubeUrl ?? item.videoUrl ?? null
                        }
                        posterSrc={item.src}
                        brand={item.label}
                    />
                </div>
                {isWinner ? <GalleryWinnerLabel label={item.label} /> : null}
            </div>
        </div>
    );
}

export function ArchivesGallerySlide({ item }) {
    if (item.type === 'photo') {
        return (
            <a
                href={item.src}
                target="_blank"
                rel="noreferrer"
                className="group block h-full w-full min-w-0"
            >
                <div className={`${GALLERY_MEDIA_FRAME} bg-alpha-blue`}>
                    <img
                        src={item.src}
                        alt=""
                        className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </a>
        );
    }

    return <GalleryInlineVideo item={item} />;
}

export default function ArchivesMediaCarousel({
    ariaLabel,
    slideClassName = 'w-[min(100%,340px)] shrink-0 snap-start sm:w-[48%] lg:w-[32%]',
    visibleCount = null,
    headerRow = null,
    showFade = true,
    navOverlay = false,
    trackGapClassName = 'gap-4',
    autoAdvanceMs = 5200,
    children,
}) {
    return (
        <TililaHorizontalCarousel
            ariaLabel={ariaLabel}
            slideClassName={slideClassName}
            visibleCount={visibleCount}
            headerRow={headerRow}
            showFade={showFade}
            navOverlay={navOverlay}
            trackGapClassName={trackGapClassName}
            fadeFrom="from-twhite"
            autoAdvanceMs={autoAdvanceMs}
        >
            {children}
        </TililaHorizontalCarousel>
    );
}
