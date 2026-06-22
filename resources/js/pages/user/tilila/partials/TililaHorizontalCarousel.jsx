import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Children, useEffect, useRef, useState } from 'react';

const VISIBLE_SLIDE_CLASS = {
    3: {
        'gap-4': 'w-[calc((100%-2rem)/3)] shrink-0 snap-start',
        'gap-2.5': 'w-[calc((100%-1.25rem)/3)] shrink-0 snap-start',
        'gap-6': 'w-[calc((100%-3rem)/3)] shrink-0 snap-start',
    },
    4: {
        'gap-4': 'w-[calc((100%-3rem)/4)] shrink-0 snap-start',
        'gap-2.5': 'w-[calc((100%-1.875rem)/4)] shrink-0 snap-start',
        'gap-6': 'w-[calc((100%-4.5rem)/4)] shrink-0 snap-start',
    },
};

export function CarouselNavButtons({
    onPrev,
    onNext,
    className = '',
    buttonClassName = '',
}) {
    const btnClass =
        buttonClassName ||
        'inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-twhite text-tblack shadow-sm transition hover:border-beta-blue hover:text-beta-blue';

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <button
                type="button"
                onClick={onPrev}
                className={btnClass}
                aria-label="Previous slide"
            >
                <ChevronLeft className="size-4" />
            </button>
            <button
                type="button"
                onClick={onNext}
                className={btnClass}
                aria-label="Next slide"
            >
                <ChevronRight className="size-4" />
            </button>
        </div>
    );
}

export default function TililaHorizontalCarousel({
    children,
    ariaLabel = 'Carousel',
    slideClassName = 'w-[min(100%,300px)] shrink-0 snap-start sm:w-[48%] lg:w-[32%]',
    visibleCount = null,
    fadeFrom = 'from-twhite',
    autoAdvanceMs = 4800,
    className = '',
    navClassName = '',
    headerRow = null,
    showFade = true,
    navOverlay = false,
    trackGapClassName = 'gap-4',
}) {
    const trackRef = useRef(null);
    const [paused, setPaused] = useState(false);
    const lastInteractionAtRef = useRef(0);
    const autoTimerRef = useRef(null);

    const slides = Children.toArray(children).filter(Boolean);
    const hasMultiple = slides.length > 1;
    const resolvedSlideClass =
        visibleCount && VISIBLE_SLIDE_CLASS[visibleCount]?.[trackGapClassName]
            ? VISIBLE_SLIDE_CLASS[visibleCount][trackGapClassName]
            : slideClassName;

    const overlayBtnClass =
        'inline-flex size-8 items-center justify-center rounded-full border border-border/60 bg-twhite text-tblack shadow-md transition hover:border-beta-blue hover:text-beta-blue sm:size-9';

    const nav = hasMultiple ? (
        <CarouselNavButtons
            onPrev={() => scrollLoop(-1)}
            onNext={() => scrollLoop(1)}
        />
    ) : null;

    const scrollBySlides = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        const w = el.clientWidth;
        el.scrollBy({
            left: dir * Math.max(240, Math.floor(w * 0.88)),
            behavior: 'smooth',
        });
    };

    const scrollToStart = () => {
        trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    };

    const scrollLoop = (dir) => {
        lastInteractionAtRef.current = Date.now();
        const el = trackRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        const x = el.scrollLeft;

        if (dir < 0 && x <= 8 && max > 0) {
            el.scrollTo({ left: max, behavior: 'smooth' });
            return;
        }
        if (dir > 0 && x >= max - 8 && max > 0) {
            scrollToStart();
            return;
        }
        scrollBySlides(dir);
    };

    useEffect(() => {
        const prefersReducedMotion =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

        if (
            prefersReducedMotion ||
            paused ||
            !hasMultiple ||
            autoAdvanceMs <= 0
        ) {
            if (autoTimerRef.current) {
                clearInterval(autoTimerRef.current);
                autoTimerRef.current = null;
            }
            return;
        }

        if (autoTimerRef.current) clearInterval(autoTimerRef.current);
        autoTimerRef.current = setInterval(() => {
            if (Date.now() - (lastInteractionAtRef.current || 0) < 3500) return;
            const el = trackRef.current;
            if (!el) return;
            const max = el.scrollWidth - el.clientWidth;
            const x = el.scrollLeft;
            const w = el.clientWidth;
            const step = Math.max(240, Math.floor(w * 0.88));
            if (max <= 0) return;
            if (x >= max - 8) {
                scrollToStart();
                return;
            }
            el.scrollBy({ left: step, behavior: 'smooth' });
        }, autoAdvanceMs);

        return () => {
            if (autoTimerRef.current) {
                clearInterval(autoTimerRef.current);
                autoTimerRef.current = null;
            }
        };
    }, [paused, hasMultiple, autoAdvanceMs]);

    if (!slides.length) return null;

    return (
        <div className={`relative ${className}`}>
            {headerRow
                ? headerRow(nav)
                : hasMultiple &&
                  !navOverlay && (
                      <div
                          className={`mb-4 flex items-center justify-end gap-2 ${navClassName}`}
                      >
                          {nav}
                      </div>
                  )}

            <div
                className={`relative ${navOverlay ? 'px-9 sm:px-10' : ''}`}
            >
                {navOverlay && hasMultiple ? (
                    <>
                        <button
                            type="button"
                            onClick={() => scrollLoop(-1)}
                            className={`absolute start-0 top-1/2 z-20 -translate-y-1/2 ${overlayBtnClass}`}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="size-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollLoop(1)}
                            className={`absolute end-0 top-1/2 z-20 -translate-y-1/2 ${overlayBtnClass}`}
                            aria-label="Next slide"
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </>
                ) : null}
                {hasMultiple && showFade ? (
                    <>
                        <div
                            className={`bg-linear-to-e pointer-events-none absolute inset-y-0 start-0 z-10 w-8 ${fadeFrom} to-transparent`}
                        />
                        <div
                            className={`pointer-events-none absolute inset-y-0 end-0 z-10 w-8 bg-linear-to-l ${fadeFrom} to-transparent`}
                        />
                    </>
                ) : null}
                <div
                    ref={trackRef}
                    onPointerDown={() => {
                        lastInteractionAtRef.current = Date.now();
                    }}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocusCapture={() => setPaused(true)}
                    onBlurCapture={() => setPaused(false)}
                    className={`flex snap-x snap-mandatory overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${trackGapClassName}`}
                    aria-label={ariaLabel}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={slide.key ?? index}
                            className={resolvedSlideClass}
                        >
                            {slide}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
