import { Play } from 'lucide-react';
import {
    archiveImageFitClass,
    isTrophyFallback,
} from '@/pages/user/tilila/utils/archivesImageUtils';
import TililaHorizontalCarousel from '@/pages/user/tilila/partials/TililaHorizontalCarousel';

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
    const isTrophy = isTrophyFallback(item.src);
    const fitClass = archiveImageFitClass({ isTrophy });

    const inner = (
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-alpha-blue shadow-sm">
            <img
                src={item.src}
                alt=""
                className={`h-full w-full transition duration-500 group-hover:scale-[1.02] ${fitClass}`}
                loading="lazy"
                decoding="async"
            />
            {item.type === 'video' ? (
                <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-beta-blue/20">
                    <span className="flex size-11 items-center justify-center rounded-full bg-twhite text-beta-blue shadow-lg">
                        <Play className="size-5 fill-beta-blue" aria-hidden />
                    </span>
                </span>
            ) : null}
        </div>
    );

    if (item.type === 'photo') {
        return (
            <a
                href={item.src}
                target="_blank"
                rel="noreferrer"
                className="group relative block"
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
            className="group relative block"
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
