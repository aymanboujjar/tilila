import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';

function normalizeEdition(raw) {
    if (!raw) return null;
    const galleryImages = Array.isArray(raw.gallery_images) ? raw.gallery_images : [];
    const winners = Array.isArray(raw.winners) ? raw.winners : [];
    const primaryWinner = winners[0] ?? null;

    const cover =
        (galleryImages[0] ? `/storage/${galleryImages[0]}` : '') ||
        (primaryWinner?.photo_path ? `/storage/${primaryWinner.photo_path}` : '');

    return {
        id: raw.id,
        year: String(raw.year ?? ''),
        edition_label: raw.edition_label ?? { en: '', fr: '', ar: '' },
        theme: raw.theme ?? { en: '', fr: '', ar: '' },
        cover,
        details_url: raw.id ? `/tililab/editions/${raw.id}` : '/tililab',
    };
}

export default function PastWinnersSection({ editions = [] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const { locale, t } = useTranslation();

    const winners = Array.isArray(editions)
        ? editions.map(normalizeEdition).filter(Boolean)
        : [];

    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.matchMedia('(min-width: 1024px)').matches) {
                setCardsPerView(3);
                return;
            }

            if (window.matchMedia('(min-width: 640px)').matches) {
                setCardsPerView(2);
                return;
            }

            setCardsPerView(1);
        };

        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    const totalWinners = winners.length;
    const safeCardsPerView =
        totalWinners === 0 ? 1 : Math.min(cardsPerView, totalWinners);
    const canNavigate = totalWinners > safeCardsPerView;

    const visibleWinners = useMemo(() => {
        if (totalWinners === 0) return [];

        return Array.from({ length: safeCardsPerView }, (_, offset) => {
            const winnerIndex = (activeIndex + offset) % totalWinners;
            return { ...winners[winnerIndex], _carouselIndex: winnerIndex };
        });
    }, [activeIndex, safeCardsPerView, totalWinners]);

    const goPrevious = () => {
        if (!canNavigate) return;
        setActiveIndex(
            (currentIndex) => (currentIndex - 1 + totalWinners) % totalWinners,
        );
    };

    const goNext = () => {
        if (!canNavigate) return;
        setActiveIndex((currentIndex) => (currentIndex + 1) % totalWinners);
    };

    return (
        <section className="mx-auto max-w-7xl px-4 pt-4 pb-16">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="text-xs font-semibold tracking-widest text-tgray">
                        <TransText
                            en="PAST Edtions"
                            fr="Editions PRÉCÉDENTS"
                            ar="الدورة  السابقة"
                        />
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-tblack">
                        <TransText
                            en="Past Edtions"
                            fr="Editions précédents"
                            ar="الدورة  السابقة"
                        />
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-tgray">
                        <TransText
                            en="Discover the inspiring projects that have shaped previous editions of Tililab."
                            fr="Découvrez les projets inspirants qui ont marqué les éditions précédentes de Tililab."
                            ar="اكتشف المشاريع الملهمة التي شكّلت الدورات السابقة من تيليلاب."
                        />
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={goPrevious}
                        disabled={!canNavigate}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-tgray transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={t('tililab.pastWinners.prevAria')}
                    >
                        <ArrowLeft className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        disabled={!canNavigate}
                        className="inline-flex size-10 items-center justify-center rounded-full bg-beta-blue text-twhite transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={t('tililab.pastWinners.nextAria')}
                    >
                        <ArrowRight className="size-4" />
                    </button>
                </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleWinners.map((winner) => (
                    <a
                        href={winner.details_url}
                        key={`${winner.year}-${winner._carouselIndex}`}
                        className="overflow-hidden rounded-2xl border border-border bg-background"
                    >
                        <div className="relative">
                            {winner.cover ? (
                                <img
                                    src={winner.cover}
                                    alt=""
                                    className="aspect-4/3 w-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ) : (
                                <div className="aspect-4/3 w-full bg-muted" />
                            )}
                            <span className="absolute top-4 left-4 rounded-full bg-background px-3 py-1 text-xs font-semibold text-tblack">
                                <TransText
                                    en={`${winner.year} Winner`}
                                    fr={`Lauréat ${winner.year}`}
                                    ar={`فائز ${winner.year}`}
                                />
                            </span>
                        </div>

                        <div className="p-5">
                            <h3 className="text-sm font-semibold text-tblack">
                                <TransText
                                    en={winner.edition_label?.en ?? ''}
                                    fr={winner.edition_label?.fr ?? ''}
                                    ar={winner.edition_label?.ar ?? ''}
                                />
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-tgray">
                                <TransText
                                    en={winner.theme?.en ?? ''}
                                    fr={winner.theme?.fr ?? ''}
                                    ar={winner.theme?.ar ?? ''}
                                />
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
