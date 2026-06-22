import { Play } from 'lucide-react';
import TililaHorizontalCarousel from '@/pages/user/tilila/partials/TililaHorizontalCarousel';

export function ArchivesPhotoSlide({ src, href, className = '' }) {
    const content = (
        <div
            className={`aspect-[4/3] overflow-hidden rounded-xl border border-border/70 bg-beta-white shadow-sm ${className}`}
        >
            <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                loading="lazy"
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

export function ArchivesGallerySlide({ item, compact = false }) {
    const inner = (
        <>
            <div
                className={`overflow-hidden border border-border/50 bg-beta-white shadow-sm ${
                    compact
                        ? 'aspect-[3/8] rounded-xl'
                        : 'aspect-[3/2] rounded-xl'
                }`}
            >
                <img
                    src={item.src}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                />
            </div>
            {item.type === 'video' ? (
                <span
                    className={`absolute inset-0 flex items-center justify-center bg-tblack/20 ${
                        compact ? 'rounded-xl' : 'rounded-xl'
                    }`}
                >
                    <span className="flex size-9 items-center justify-center rounded-full bg-white/95 text-beta-blue shadow sm:size-10">
                        <Play
                            className="size-4 fill-beta-blue sm:size-5"
                            aria-hidden
                        />
                    </span>
                </span>
            ) : null}
        </>
    );

    return (
        <a href={item.detailsUrl} className="group relative block">
            {inner}
        </a>
    );
}

export default function ArchivesMediaCarousel({
    ariaLabel,
    slideClassName = 'w-[min(100%,220px)] shrink-0 snap-start sm:w-[42%] md:w-[30%] lg:w-[22%] xl:w-[18%]',
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
            fadeFrom="from-white"
            autoAdvanceMs={autoAdvanceMs}
        >
            {children}
        </TililaHorizontalCarousel>
    );
}
