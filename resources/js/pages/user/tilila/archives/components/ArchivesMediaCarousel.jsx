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

export function ArchivesGallerySlide({ item }) {
    const inner = (
        <>
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border/70 bg-beta-white shadow-sm">
                <img
                    src={item.src}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                />
            </div>
            {item.type === 'video' ? (
                <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-tblack/25">
                    <span className="flex size-10 items-center justify-center rounded-full bg-white/90 text-beta-blue shadow">
                        <Play className="size-5 fill-beta-blue" aria-hidden />
                    </span>
                </span>
            ) : null}
        </>
    );

    return (
        <a
            href={item.detailsUrl}
            className="group relative block"
        >
            {inner}
        </a>
    );
}

export default function ArchivesMediaCarousel({
    ariaLabel,
    slideClassName = 'w-[min(100%,220px)] shrink-0 snap-start sm:w-[42%] md:w-[30%] lg:w-[22%] xl:w-[18%]',
    children,
}) {
    return (
        <TililaHorizontalCarousel
            ariaLabel={ariaLabel}
            slideClassName={slideClassName}
            fadeFrom="from-twhite"
            autoAdvanceMs={5200}
        >
            {children}
        </TililaHorizontalCarousel>
    );
}
