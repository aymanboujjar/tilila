import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Children, useEffect, useRef, useState } from 'react';

export default function TililaHorizontalCarousel({
    children,
    ariaLabel = 'Carousel',
    slideClassName = 'w-[min(100%,300px)] shrink-0 snap-start sm:w-[48%] lg:w-[32%]',
    fadeFrom = 'from-twhite',
    autoAdvanceMs = 4800,
    className = '',
    navClassName = '',
}) {
    const trackRef = useRef(null);
    const [paused, setPaused] = useState(false);
    const lastInteractionAtRef = useRef(0);
    const autoTimerRef = useRef(null);

    const slides = Children.toArray(children).filter(Boolean);
    const hasMultiple = slides.length > 1;

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
            {hasMultiple ? (
                <div
                    className={`mb-4 flex items-center justify-end gap-2 ${navClassName}`}
                >
                    <button
                        type="button"
                        onClick={() => scrollLoop(-1)}
                        className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-twhite text-tblack shadow-sm transition hover:border-beta-blue hover:text-beta-blue"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollLoop(1)}
                        className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-twhite text-tblack shadow-sm transition hover:border-beta-blue hover:text-beta-blue"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            ) : null}

            <div className="relative">
                {hasMultiple ? (
                    <>
                        <div
                            className={`pointer-events-none absolute inset-y-0 start-0 z-10 w-8 bg-linear-to-e ${fadeFrom} to-transparent`}
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
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    aria-label={ariaLabel}
                >
                    {slides.map((slide, index) => (
                        <div key={slide.key ?? index} className={slideClassName}>
                            {slide}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
