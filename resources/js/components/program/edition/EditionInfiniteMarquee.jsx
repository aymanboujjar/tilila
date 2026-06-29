import { useMemo } from 'react';

import { useTranslation } from '@/contexts/TranslationContext';
import { cn } from '@/lib/utils';

function buildLoop(items, minItems = 4) {
    if (items.length === 0) {
        return [];
    }

    let loop = [...items];
    while (loop.length < minItems) {
        loop = [...loop, ...items];
    }

    return loop;
}

export default function EditionInfiniteMarquee({
    items = [],
    renderItem,
    ariaLabel = 'Carousel',
    slideClassName = 'w-[17rem] shrink-0 sm:w-[18rem]',
    minItems = 4,
    durationMultiplier = 4.5,
    fadeFrom = 'from-twhite',
    gapClassName = 'gap-4',
}) {
    const { locale } = useTranslation();
    const isRtl = locale === 'ar';

    const loopItems = useMemo(
        () => buildLoop(items, minItems),
        [items, minItems],
    );

    const track = useMemo(
        () => [...loopItems, ...loopItems],
        [loopItems],
    );

    const durationSec = Math.max(26, loopItems.length * durationMultiplier);

    if (items.length === 0) {
        return null;
    }

    return (
        <div
            className="partner-marquee group/marquee relative overflow-hidden py-1"
            aria-label={ariaLabel}
        >
            <div
                className={`pointer-events-none absolute inset-y-0 start-0 z-10 w-12 bg-linear-to-e ${fadeFrom} to-transparent`}
                aria-hidden
            />
            <div
                className={`pointer-events-none absolute inset-y-0 end-0 z-10 w-12 bg-linear-to-l ${fadeFrom} to-transparent`}
                aria-hidden
            />

            <div
                className={cn(
                    'partner-marquee-track flex w-max',
                    gapClassName,
                    isRtl && 'partner-marquee-track-rtl',
                )}
                style={{
                    '--marquee-duration': `${durationSec}s`,
                }}
            >
                {track.map((item, index) => (
                    <div
                        key={`${index}-${typeof item === 'string' ? item : item?.full_name ?? index}`}
                        className={slideClassName}
                    >
                        {renderItem(item, index % loopItems.length)}
                    </div>
                ))}
            </div>
        </div>
    );
}
