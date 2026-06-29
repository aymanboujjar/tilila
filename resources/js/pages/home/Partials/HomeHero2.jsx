import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { HOME_EASE } from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
import { cn } from '@/lib/utils';

const IMAGE_AUTOPLAY_MS = 5500;
const VIDEO_AUTOPLAY_MS = 16000;
const HERO_POSTER = '/assets/homehero.jpg';
const HERO_VIDEO = '/assets/Cérémonie Tilila 2025.mp4';

const SLIDE_TRANSITION = {
    duration: 0.9,
    ease: HOME_EASE,
};

const MEDIA_SLIDES = [
    {
        id: 'ceremony-video',
        type: 'video',
        src: HERO_VIDEO,
        poster: HERO_POSTER,
        thumb: HERO_POSTER,
        fit: 'cover',
        durationMs: VIDEO_AUTOPLAY_MS,
        isPrimary: true,
    },
    {
        id: 'ceremony-photo',
        type: 'image',
        src: HERO_POSTER,
        alt: 'Tilila Awards ceremony',
        thumb: HERO_POSTER,
        fit: 'cover',
        durationMs: IMAGE_AUTOPLAY_MS,
    },
    {
        id: 'edition-2025',
        type: 'image',
        src: '/assets/tilila/editions/edition-2025.png',
        alt: 'Tilila Awards 2025',
        thumb: '/assets/tilila/editions/edition-2025.png',
        fit: 'contain',
        durationMs: IMAGE_AUTOPLAY_MS,
    },
    {
        id: 'hero-edition',
        type: 'image',
        src: '/assets/tilila/hero-7eme-edition.png',
        alt: '7ème édition Tilila Awards',
        thumb: '/assets/tilila/hero-7eme-edition.png',
        fit: 'contain',
        durationMs: IMAGE_AUTOPLAY_MS,
    },
];

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '5%' : '-5%',
        opacity: 0,
        scale: 1.03,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction) => ({
        x: direction > 0 ? '-4%' : '4%',
        opacity: 0,
        scale: 0.99,
    }),
};

function getThumbSrc(slide) {
    return slide.thumb ?? slide.poster ?? slide.src;
}

function getSlideDuration(slide) {
    return slide.durationMs ?? IMAGE_AUTOPLAY_MS;
}

const CarouselMedia = memo(function CarouselMedia({
    slide,
    isActive,
    reducedMotion,
}) {
    const videoRef = useRef(null);
    const isCover = slide.fit === 'cover';
    const isVideo = slide.type === 'video';

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isVideo) return undefined;

        if (isActive) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        } else {
            video.pause();
            video.currentTime = 0;
        }

        return undefined;
    }, [isActive, isVideo]);

    if (isVideo) {
        return (
            <motion.div
                className="absolute inset-0 overflow-hidden"
                animate={
                    reducedMotion || !isActive ? { scale: 1 } : { scale: 1.06 }
                }
                transition={{ duration: 24, ease: 'easeOut' }}
            >
                <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    src={slide.src}
                    poster={slide.poster}
                    muted
                    loop
                    playsInline
                    autoPlay
                    controls={false}
                    preload="auto"
                />
            </motion.div>
        );
    }

    if (isCover) {
        return (
            <motion.div
                className="absolute inset-0 overflow-hidden"
                animate={
                    reducedMotion || !isActive ? { scale: 1 } : { scale: 1.05 }
                }
                transition={{ duration: 16, ease: 'easeOut' }}
            >
                <img
                    src={slide.src}
                    alt={slide.alt ?? ''}
                    className="h-full w-full object-cover"
                    loading={isActive ? 'eager' : 'lazy'}
                    decoding="async"
                />
            </motion.div>
        );
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center px-8 py-16 sm:px-14 sm:py-20">
            <div
                className="pointer-events-none absolute inset-[20%] rounded-full bg-beta-blue/20 blur-3xl"
                aria-hidden
            />
            <motion.img
                src={slide.src}
                alt={slide.alt ?? ''}
                className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_28px_70px_rgba(68,25,168,0.4)]"
                loading={isActive ? 'eager' : 'lazy'}
                decoding="async"
                initial={
                    reducedMotion ? false : { opacity: 0, scale: 0.94, y: 20 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65, ease: HOME_EASE }}
            />
        </div>
    );
});

function ExploreMore() {
    return (
        <motion.a
            href="#programs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: HOME_EASE }}
            className="group/explore inline-flex flex-col items-center gap-2 text-twhite transition"
            aria-label="Explore more"
        >
            <span className="rounded-full border border-twhite/20 bg-tblack/35 px-5 py-2.5 text-[10px] font-bold tracking-[0.22em] uppercase backdrop-blur-md transition group-hover/explore:border-brand-light-purple/50 group-hover/explore:bg-beta-blue/25 sm:text-xs">
                <TransText
                    en="Explore more"
                    fr="Explorer plus"
                    ar="اكتشف المزيد"
                />
            </span>
            <ChevronDown
                className="size-5 animate-bounce text-twhite/80 transition group-hover/explore:text-twhite motion-reduce:animate-none"
                aria-hidden
            />
        </motion.a>
    );
}

function CarouselNavButton({ direction, onClick }) {
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ scale: 1.08, x: direction === 'prev' ? -2 : 2 }}
            whileTap={{ scale: 0.94 }}
            className="inline-flex size-11 items-center justify-center rounded-full border border-twhite/20 bg-tblack/30 text-twhite opacity-80 shadow-lg backdrop-blur-md transition-opacity duration-300 hover:border-brand-light-purple/50 hover:bg-beta-blue/25 sm:size-12 sm:opacity-0 sm:group-hover/hero:opacity-100"
            aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
        >
            <Icon className="size-5 sm:size-6" aria-hidden />
        </motion.button>
    );
}

function ThumbnailStrip({ slides, activeIndex, onSelect }) {
    return (
        <div className="flex items-center gap-2">
            {slides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                    <motion.button
                        key={slide.id}
                        type="button"
                        onClick={() => onSelect(index)}
                        whileHover={{ y: -3, scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className={cn(
                            'relative overflow-hidden rounded-md border transition-all duration-300',
                            slide.isPrimary
                                ? 'h-12 w-[4.25rem] sm:h-14 sm:w-20'
                                : 'h-10 w-14 sm:h-11 sm:w-16',
                            isActive
                                ? 'border-brand-light-purple/80 shadow-[0_0_20px_rgba(99,95,170,0.45)]'
                                : 'border-twhite/15 opacity-50 hover:opacity-90',
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={isActive ? 'true' : undefined}
                    >
                        <img
                            src={getThumbSrc(slide)}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                        {slide.isPrimary ? (
                            <span className="absolute inset-0 flex items-center justify-center bg-tblack/35">
                                <Play
                                    className="size-3.5 fill-twhite text-twhite sm:size-4"
                                    aria-hidden
                                />
                            </span>
                        ) : (
                            <div className="absolute inset-0 bg-linear-to-t from-tblack/50 to-transparent" />
                        )}
                        {isActive ? (
                            <motion.span
                                layoutId="hero-thumb-active"
                                className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-linear-to-r from-beta-blue to-beta-turquoise"
                            />
                        ) : null}
                    </motion.button>
                );
            })}
        </div>
    );
}

function HeroMediaCarousel() {
    const reducedMotion = useReducedMotion();
    const slideCount = MEDIA_SLIDES.length;
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const touchStartX = useRef(null);
    const paused = isHovered;

    const safeIndex =
        slideCount > 0
            ? ((activeIndex % slideCount) + slideCount) % slideCount
            : 0;

    const activeSlide = MEDIA_SLIDES[safeIndex];
    const activeDuration = getSlideDuration(activeSlide);
    const isVideoSlide = activeSlide.type === 'video';

    const goTo = useCallback(
        (index) => {
            if (index === safeIndex) return;
            setDirection(index > safeIndex ? 1 : -1);
            setActiveIndex(index);
        },
        [safeIndex],
    );

    const goPrev = useCallback(() => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
    }, [slideCount]);

    const goNext = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % slideCount);
    }, [slideCount]);

    useEffect(() => {
        if (slideCount <= 1 || paused || reducedMotion) return undefined;

        const id = window.setInterval(goNext, activeDuration);
        return () => window.clearInterval(id);
    }, [slideCount, paused, goNext, reducedMotion, safeIndex, activeDuration]);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'ArrowLeft') goPrev();
            if (event.key === 'ArrowRight') goNext();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [goPrev, goNext]);

    const onTouchStart = (event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
    };

    const onTouchEnd = (event) => {
        if (touchStartX.current === null) return;

        const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const delta = touchStartX.current - endX;

        if (Math.abs(delta) > 48) {
            if (delta > 0) goNext();
            else goPrev();
        }

        touchStartX.current = null;
    };

    return (
        <div
            className="group/hero relative h-full w-full touch-pan-y"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocusCapture={() => setIsHovered(true)}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsHovered(false);
                }
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div
                role="region"
                aria-roledescription="carousel"
                aria-label="Tilila highlights"
                className="relative h-full w-full overflow-hidden bg-tblack"
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={activeSlide.id}
                        custom={direction}
                        variants={reducedMotion ? undefined : slideVariants}
                        initial={reducedMotion ? false : 'enter'}
                        animate="center"
                        exit={reducedMotion ? undefined : 'exit'}
                        transition={SLIDE_TRANSITION}
                        className="absolute inset-0"
                    >
                        <div
                            className={cn(
                                'absolute inset-0',
                                activeSlide.fit === 'contain'
                                    ? 'bg-linear-to-br from-[#06030c] via-[#0f0a1c] to-[#061018]'
                                    : 'bg-tblack',
                            )}
                        />
                        <CarouselMedia
                            slide={activeSlide}
                            isActive
                            reducedMotion={reducedMotion}
                        />
                    </motion.div>
                </AnimatePresence>

                <div
                    className={cn(
                        'pointer-events-none absolute inset-0 transition-opacity duration-700',
                        isVideoSlide
                            ? 'bg-linear-to-b from-tblack/35 via-transparent to-tblack/50'
                            : 'bg-linear-to-b from-tblack/60 via-tblack/10 to-tblack/75',
                    )}
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-r from-tblack/30 via-transparent to-tblack/30 rtl:bg-linear-to-l"
                    aria-hidden
                />

                {slideCount > 1 ? (
                    <>
                        <div className="absolute start-4 top-1/2 z-20 -translate-y-1/2 sm:start-6 lg:start-10">
                            <CarouselNavButton
                                direction="prev"
                                onClick={goPrev}
                            />
                        </div>

                        <div className="absolute end-4 top-1/2 z-20 -translate-y-1/2 sm:end-6 lg:end-10">
                            <CarouselNavButton
                                direction="next"
                                onClick={goNext}
                            />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-tblack/80 via-tblack/35 to-transparent px-4 pt-14 pb-6 sm:px-8 sm:pb-8">
                            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5">
                                <ThumbnailStrip
                                    slides={MEDIA_SLIDES}
                                    activeIndex={safeIndex}
                                    onSelect={goTo}
                                />
                                <ExploreMore />
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default function HomeHero2() {
    return (
        <section
            id="hero"
            className="home-hero2 relative -mt-[72px] h-dvh overflow-hidden"
        >
            <HeroMediaCarousel />
        </section>
    );
}
