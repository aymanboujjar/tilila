import { Play } from 'lucide-react';
import {
    archiveImageFitClass,
    isLogoLikeArchiveImage,
    isTrophyFallback,
} from '@/pages/user/tilila/utils/archivesImageUtils';
import TililaHorizontalCarousel from '@/pages/user/tilila/partials/TililaHorizontalCarousel';

const GALLERY_PHOTO_FRAME =
    'relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-alpha-blue shadow-[0_4px_20px_rgba(26,35,126,0.08)]';

const GALLERY_VIDEO_FRAME =
    'relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-beta-blue/20 bg-twhite shadow-[0_6px_28px_rgba(68,25,168,0.1)] ring-1 ring-border/50';

function galleryVideoThumbClass(src) {
    if (isLogoLikeArchiveImage(src) || isTrophyFallback(src)) {
        return 'h-full w-full object-contain object-center p-6 sm:p-8';
    }

    return 'h-full w-full object-cover object-center';
}

export function ArchivesPhotoSlide({ src, href, className = '' }) {
    const content = (
        <div
            className={`aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-alpha-blue shadow-sm ${className}`}
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

export function ArchivesGallerySlide({ item }) {
    const isVideo = item.type === 'video';
    const isTrophy = isTrophyFallback(item.src);
    const fitClass = isVideo
        ? galleryVideoThumbClass(item.src)
        : archiveImageFitClass({ isTrophy });
    const frameClass = isVideo ? GALLERY_VIDEO_FRAME : GALLERY_PHOTO_FRAME;

    const inner = (
        <div className={frameClass}>
            <img
                src={item.src}
                alt=""
                className={`transition duration-500 group-hover:scale-[1.01] ${fitClass}`}
                loading="lazy"
                decoding="async"
            />
            {isVideo ? (
                <>
                    <span
                        className="pointer-events-none absolute inset-2 rounded-xl border border-beta-blue/10 sm:inset-2.5"
                        aria-hidden
                    />
                    <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-beta-blue/10 transition group-hover:bg-beta-blue/15">
                        <span className="flex size-11 items-center justify-center rounded-full border border-beta-blue/15 bg-twhite text-beta-blue shadow-lg sm:size-12">
                            <Play
                                className="size-5 fill-beta-blue sm:size-5"
                                aria-hidden
                            />
                        </span>
                    </span>
                </>
            ) : null}
        </div>
    );

    if (item.type === 'photo') {
        return (
            <a
                href={item.src}
                target="_blank"
                rel="noreferrer"
                className="group relative block p-0.5"
            >
                {inner}
            </a>
        );
    }

    return (
        <a
            href={item.videoUrl || item.detailsUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative block p-0.5"
        >
            {inner}
        </a>
    );
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
