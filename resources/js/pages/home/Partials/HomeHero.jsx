import { Link } from '@inertiajs/react';
import { ArrowRight, Play } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { FadeInText, SlideIn } from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TILILA_HERO_BTN,
    TILILA_HERO_CTA_ROW,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_BACKGROUND = '/assets/homehero.jpg';
const HERO_VIDEO = '/assets/Cérémonie Tilila 2025.mp4';

const HEADLINES = [
    {
        en: 'Every creation tells a story.',
        fr: 'Chaque création raconte une histoire.',
        ar: 'كل إبداع يحكي قصة.',
    },
    {
        en: 'Every story shapes a perspective.',
        fr: 'Chaque histoire façonne un regard.',
        ar: 'كل قصة تشكّل نظرة.',
    },
];

const HeroCta = memo(function HeroCta({ href, className, children }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-[9px] font-bold tracking-[0.1em] text-twhite uppercase transition sm:px-5 sm:py-2.5 sm:text-[10px] ${TILILA_HERO_BTN} ${className}`}
        >
            {children}
            <ArrowRight className="size-4" aria-hidden />
        </Link>
    );
});

function HeroVideo() {
    const [playVideo, setPlayVideo] = useState(false);

    const startVideo = useCallback(() => {
        setPlayVideo(true);
    }, []);

    return (
        <div
            className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-twhite/10 transition hover:ring-twhite/25"
            style={{ clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)' }}
        >
            <video
                className="aspect-video w-full max-h-[300px] object-cover brightness-[0.88] sm:max-h-[360px] lg:max-h-[400px]"
                src={HERO_VIDEO}
                poster={HERO_BACKGROUND}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="metadata"
            />
        </div>
    );
}

export default function HomeHero() {
    return (
        <TililaSection
            id="hero"
            className="relative -mt-[72px] flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-[72px] py-8 text-twhite sm:py-10"
        >
            <img
                src={HERO_BACKGROUND}
                alt=""
                className="home-hero-bg pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
            />
            <div
                className="pointer-events-none absolute inset-0 bg-linear-to-r from-tblack/92 via-tblack/78 to-tblack/50"
                aria-hidden
            />

            <TililaContainer className="relative z-10">
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
                    <SlideIn direction="left" delay={0.1}>
                        <div className="max-w-lg lg:max-w-xl">
                            <div className="space-y-0.5 text-lg leading-[1.6] font-extrabold tracking-tight sm:text-xl lg:text-[1.5rem] xl:text-[2.1rem]">
                                {HEADLINES.map((line, index) => (
                                    <p key={line.en}>
                                        <FadeInText {...line} delay={0.2 + index * 0.15} />
                                    </p>
                                ))}
                            </div>

                            <div className="home-hero-copy mt-4 space-y-3 text-xs leading-snug text-twhite/85 sm:text-lg">
                                <p>
                                    <TransText
                                        en="Through Tilila Awards and Tililab, SOREAD 2M celebrates those who choose to put creativity at the service of change."
                                        fr="À travers les Tilila Awards et Tililab, SOREAD 2M célèbre celles et ceux qui choisissent de mettre la créativité au service du changement."
                                        ar="عبر تيليلا أووردز وتيليلاب، تحتفي SOREAD 2M بمن يختارون وضع الإبداع في خدمة التغيير."
                                    />
                                </p>
                                <p>
                                    <TransText
                                        en="Far more than a competition, Tilila is a space for recognition, support and innovation in the service of responsible communication and impactful creativity."
                                        fr="Bien plus qu'un concours, Tilila est un espace de reconnaissance, d'accompagnement et d'innovation au service d'une communication responsable et d'une créativité à impact."
                                        ar="أكثر بكثير من مسابقة، تيليلا فضاء للتقدير والمرافقة والابتكار في خدمة تواصل مسؤول وإبداع مؤثر."
                                    />
                                </p>
                            </div>

                            <div className={`home-hero-ctas mt-5 ${TILILA_HERO_CTA_ROW}`}>
                                <HeroCta
                                    href="/tilila"
                                    className="bg-beta-blue hover:bg-brand-light-purple"
                                >
                                    <TransText
                                        en="Discover Tilila Awards"
                                        fr="Découvrir Tilila Awards"
                                        ar="اكتشف تيليلا أووردز"
                                    />
                                </HeroCta>
                                <HeroCta
                                    href="/tililab"
                                    className="bg-beta-turquoise hover:brightness-110"
                                >
                                    <TransText
                                        en="Discover Tililab"
                                        fr="Découvrir Tililab"
                                        ar="اكتشف تيليلاب"
                                    />
                                </HeroCta>
                            </div>
                        </div>
                    </SlideIn>

                    <SlideIn direction="right" delay={0.2}>
                        <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl lg:justify-self-end">
                            <HeroVideo />
                        </div>
                    </SlideIn>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
