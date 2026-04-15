import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import { HERO_CAROUSEL_SLIDES } from '@/pages/home/Partials/hero-carousel-data';

const AUTOPLAY_MS = 4000;

function pickLocalizedTriple(obj, locale) {
    return (
        (locale === 'ar' ? obj.ar : locale === 'fr' ? obj.fr : obj.en) ??
        obj.en ??
        ''
    );
}

export default function Hero({
    imageSrc: fallbackImageSrc = '/assets/hero.png',
}) {
    const { t, locale } = useTranslation();
    const [index, setIndex] = useState(0);
    const slideCount = HERO_CAROUSEL_SLIDES.length;
    const slideCountRef = useRef(slideCount);
    slideCountRef.current = slideCount;

    const go = useCallback((delta) => {
        const n = slideCountRef.current;
        if (n <= 0) return;
        setIndex((i) => (i + delta + n) % n);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || slideCountRef.current <= 0)
            return undefined;
        const id = window.setInterval(() => {
            setIndex((i) => {
                const n = slideCountRef.current;
                if (n <= 0) return 0;
                return (i + 1) % n;
            });
        }, AUTOPLAY_MS);
        return () => window.clearInterval(id);
    }, [slideCount]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === 'ArrowRight') go(1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [go]);

    const safeIndex =
        slideCount > 0 ? Math.min(Math.max(0, index), slideCount - 1) : 0;
    const slide = HERO_CAROUSEL_SLIDES[safeIndex];
    if (!slide) {
        return null;
    }

    const imgSrc = slide.imageSrc ?? fallbackImageSrc;
    const imgAlt = pickLocalizedTriple(slide.imageAlt, locale);
    const slideLabel = `${String(safeIndex + 1).padStart(2, '0')} · ${String(slideCount).padStart(2, '0')}`;

    return (
        <section className="relative overflow-hidden bg-background">
            <div className="relative mx-auto w-full max-w-[min(100%,1920px)] px-3 py-10 sm:px-5 sm:py-12 lg:px-10">
                <div
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={t('home.heroCarouselAria')}
                    className="focus-within:outline-none"
                >
                    <div className="overflow-hidden rounded-3xl border border-border shadow-[0_24px_60px_-12px_rgba(15,23,42,0.25)] ring-1 ring-tblack/10">
                        <div
                            className="flex h-1 w-full gap-px bg-tblack/30"
                            aria-hidden
                        >
                            {HERO_CAROUSEL_SLIDES.map((s, i) => (
                                <div
                                    key={s.key}
                                    className={`h-full flex-1 transition-colors duration-300 ${
                                        i === safeIndex
                                            ? 'bg-beta-blue'
                                            : 'bg-twhite/20'
                                    }`}
                                />
                            ))}
                        </div>

                        <div
                            className={`relative min-h-[min(30rem,82vh)] sm:min-h-[34rem] lg:min-h-[38rem] ${slide.imageContain ? 'bg-muted' : 'bg-tblack'}`}
                        >
                            <img
                                key={slide.key}
                                src={imgSrc}
                                alt={imgAlt}
                                className={`absolute inset-0 h-full w-full ${
                                    slide.imageContain
                                        ? 'object-contain p-10 sm:p-14'
                                        : 'object-cover object-center'
                                }`}
                                loading={safeIndex === 0 ? 'eager' : 'lazy'}
                            />

                            {/* Darker toward bottom where copy sits */}
                            <div
                                className="pointer-events-none absolute inset-0 bg-linear-to-t from-tblack/92 via-tblack/50 to-tblack/20"
                                aria-hidden
                            />
                            {slide.imageTint ? (
                                <div
                                    className={`pointer-events-none absolute inset-0 bg-linear-to-br ${slide.imageTint} to-transparent opacity-35 mix-blend-soft-light`}
                                    aria-hidden
                                />
                            ) : null}

                            <div className="absolute end-4 top-4 z-20 sm:end-6 sm:top-5">
                                <span className="rounded-full bg-tblack/55 px-2.5 py-1 font-mono text-[0.65rem] font-medium text-twhite/90 tabular-nums backdrop-blur-sm sm:text-[0.7rem]">
                                    {slideLabel}
                                </span>
                            </div>

                            <div className="relative z-10 flex min-h-[inherit] flex-col justify-end">
                                <div className="px-5 pt-8 pb-10 text-start sm:px-8 sm:pt-10 sm:pb-12 lg:px-12 lg:pb-14">
                                    <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
                                        <TransText
                                            tag="p"
                                            className="text-[0.65rem] font-bold tracking-[0.2em] text-alpha-blue uppercase"
                                            {...slide.cardKicker}
                                        />
                                        <span
                                            className="text-twhite/35"
                                            aria-hidden
                                        >
                                            ·
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-twhite/25 bg-tblack/40 px-2.5 py-1 text-xs font-semibold text-twhite backdrop-blur-sm">
                                            <span
                                                className="size-1.5 rounded-full bg-beta-blue shadow-[0_0_8px_rgba(0,151,170,0.8)]"
                                                aria-hidden
                                            />
                                            <TransText {...slide.badge} />
                                        </span>
                                    </div>

                                    <div key={slide.key} className="max-w-4xl">
                                        <h1 className="text-2xl font-bold tracking-tight text-balance text-twhite sm:text-3xl lg:text-4xl lg:leading-tight xl:text-[2.75rem]">
                                            <TransText {...slide.titleBefore} />{' '}
                                            <TransText
                                                className="text-beta-blue"
                                                {...slide.titleAccent}
                                            />
                                        </h1>
                                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-twhite/88 sm:mt-4 sm:text-base lg:text-lg">
                                            <TransText {...slide.description} />
                                        </p>
                                        <p className="mt-2 max-w-xl text-xs text-twhite/65 sm:text-sm">
                                            <TransText {...slide.cardLine} />
                                        </p>

                                        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                                            {slide.primaryHref ? (
                                                <Link
                                                    href={slide.primaryHref}
                                                    className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-beta-blue px-8 text-sm font-semibold text-twhite shadow-lg shadow-tblack/30 transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-twhite sm:text-[0.9375rem]"
                                                >
                                                    <TransText
                                                        {...slide.primaryCta}
                                                    />
                                                    <ChevronRight
                                                        className="size-4 rtl:rotate-180"
                                                        strokeWidth={2.25}
                                                        aria-hidden
                                                    />
                                                </Link>
                                            ) : null}
                                            {slide.secondaryCta &&
                                            slide.secondaryHref ? (
                                                <Link
                                                    href={slide.secondaryHref}
                                                    className="inline-flex h-12 items-center justify-center rounded-full border-2 border-twhite/45 bg-twhite/10 px-8 text-sm font-semibold text-twhite backdrop-blur-sm transition hover:border-twhite hover:bg-twhite/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-twhite"
                                                >
                                                    <TransText
                                                        {...slide.secondaryCta}
                                                    />
                                                </Link>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
