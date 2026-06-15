import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaBtnOutline,
    TililaBtnPrimary,
    TililaContainer,
    TililaDeadlinePill,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_FALLBACK = '/assets/tilila/hero-7eme-edition.png';

export default function TililaHero({ videoUrl }) {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const handlePlay = () => {
        const el = videoRef.current;
        if (!el) return;
        el.controls = true;
        el.muted = false;
        void el.play();
        setPlaying(true);
    };

    return (
        <TililaSection id="hero" className="bg-twhite pt-10 pb-12 sm:pt-14 sm:pb-16">
            <TililaContainer>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div id="candidature">
                        <p className="text-xs font-bold tracking-[0.22em] text-beta-blue uppercase">
                            <TransText en="8th edition" fr="8e édition" ar="الدورة الثامنة" />
                        </p>
                        <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-beta-blue sm:text-5xl lg:text-[3.25rem]">
                            TILILA AWARDS
                            <span className="mt-1 block text-tblack">2026</span>
                        </h1>

                        <div className="mt-6 space-y-1 text-base font-medium leading-snug text-tblack/90">
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

                        <div className="mt-8 flex flex-wrap gap-3">
                            <TililaBtnPrimary href="/tilila/participate">
                                <TransText
                                    en="Submit application"
                                    fr="Déposer une candidature"
                                    ar="قدّم ترشيحك"
                                />
                            </TililaBtnPrimary>
                            <TililaBtnOutline href="/tilila/reglement/download">
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
                                <>
                                    <video
                                        ref={videoRef}
                                        className="aspect-[4/3] w-full object-cover brightness-[0.65] sm:aspect-video"
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        poster={HERO_FALLBACK}
                                    >
                                        <source src={videoUrl} type="video/mp4" />
                                    </video>
                                    {!playing ? (
                                        <button
                                            type="button"
                                            onClick={handlePlay}
                                            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-tblack/25 transition hover:bg-tblack/35"
                                        >
                                            <span className="flex size-14 items-center justify-center rounded-full border-2 border-twhite/80 bg-twhite/15 backdrop-blur-sm">
                                                <Play
                                                    className="size-6 fill-twhite text-twhite"
                                                    aria-hidden
                                                />
                                            </span>
                                            <span className="max-w-[220px] text-center text-[11px] font-bold tracking-[0.14em] text-twhite uppercase">
                                                <TransText
                                                    en="Watch the Best Of from past editions"
                                                    fr="Voir le Best-Of des éditions précédentes"
                                                    ar="شاهد أفضل لحظات الدورات السابقة"
                                                />
                                            </span>
                                        </button>
                                    ) : null}
                                </>
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
