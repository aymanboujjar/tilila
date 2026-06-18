import { useEffect, useRef } from 'react';
import TransText from '@/components/TransText';
import {
    TililaBtnOutline,
    TililaBtnPrimary,
    TililaContainer,
    TILILA_HERO_BTN,
    TILILA_HERO_CTA_ROW,
    TililaDeadlinePill,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_FALLBACK = '/assets/tilila/hero-7eme-edition.png';

export default function TililaHero({ videoUrl }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const el = videoRef.current;
        if (!el || !videoUrl) return;
        el.muted = true;
        void el.play().catch(() => {});
    }, [videoUrl]);

    return (
        <TililaSection
            id="hero"
            className="bg-twhite pt-10 pb-12 sm:pt-14 sm:pb-16"
        >
            <TililaContainer>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div id="candidature">
                        <p className="text-xs font-bold tracking-[0.22em] text-beta-blue uppercase">
                            <TransText
                                en="8th edition"
                                fr="8e édition"
                                ar="الدورة الثامنة"
                            />
                        </p>
                        <h1 className="mt-3 text-4xl leading-[1.05] font-extrabold tracking-tight text-beta-blue sm:text-5xl lg:text-[3.25rem]">
                            TILILA AWARDS
                            <span className="mt-1 block text-tblack">2026</span>
                        </h1>

                        <div className="mt-6 space-y-1 text-base leading-snug font-medium text-tblack/90">
                            <p>
                                <TransText
                                    en="Every creation tells a story."
                                    fr="Chaque création raconte une histoire."
                                    ar="كل إبداع يحكي قصة."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Every story shapes a perspective."
                                    fr="Chaque histoire façonne un regard."
                                    ar="كل قصة تشكّل نظرة."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Every new perspective can help society evolve."
                                    fr="Chaque nouveau regard peut faire évoluer une société."
                                    ar="وكل نظرة جديدة يمكن أن تساهم في تطور المجتمع."
                                />
                            </p>
                        </div>

                        <p className="mt-5 max-w-lg text-sm leading-relaxed text-tgray sm:text-base">
                            <TransText
                                en="Tilila Awards rewards campaigns, brands and talents that put creativity at the service of equality, diversity and inclusion."
                                fr="Tilila Awards récompense les campagnes, les marques et les talents qui mettent la créativité au service de l'égalité, de la diversité et de l'inclusion."
                                ar="تكرّم تيليلا أووردز الحملات والعلامات والمواهب التي تضع الإبداع في خدمة المساواة والتنوع والإدماج."
                            />
                        </p>

                        <div className="mt-6">
                            <TililaDeadlinePill deadline="31 août 2026" />
                        </div>

                        <div className={`mt-8 ${TILILA_HERO_CTA_ROW}`}>
                            <TililaBtnPrimary
                                href="/tilila/participate"
                                className={TILILA_HERO_BTN}
                            >
                                <TransText
                                    en="Submit application"
                                    fr="Déposer une candidature"
                                    ar="قدّم ترشيحك"
                                />
                            </TililaBtnPrimary>
                            <TililaBtnOutline
                                href="/tilila/reglement/download"
                                className={TILILA_HERO_BTN}
                            >
                                <TransText
                                    en="Download regulations"
                                    fr="Télécharger le règlement"
                                    ar="تحميل النظام"
                                />
                            </TililaBtnOutline>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                        <div
                            className="relative overflow-hidden shadow-xl"
                            style={{
                                clipPath:
                                    'polygon(12% 0, 100% 0, 100% 100%, 0 100%)',
                            }}
                        >
                            {videoUrl ? (
                                <video
                                    ref={videoRef}
                                    className="aspect-[4/3] w-full object-cover sm:aspect-video"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    poster={HERO_FALLBACK}
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={HERO_FALLBACK}
                                    alt=""
                                    className="aspect-[4/3] w-full object-cover brightness-[0.85] sm:aspect-video"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
