import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    HOME_EASE,
    SlideIn,
    TypewriterText,
} from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import {
    TililaContainer,
    TILILA_HERO_BTN,
    TILILA_HERO_CTA_ROW,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_BACKGROUND = '/assets/homehero.jpg';
const HERO_BG = '/assets/homehero.jpg';
const FALLBACK_VIDEO = '/assets/Cérémonie Tilila 2025.mp4';

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
    // {
    //     en: 'Every new perspective can help society evolve.',
    //     fr: 'Chaque nouveau regard peut faire évoluer une société.',
    //     ar: 'وكل نظرة جديدة يمكن أن تساهم في تطور المجتمع.',
    // },
];

function HeroCtaPrimary({ href, children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: HOME_EASE }}
        >
            <Link
                href={href}
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-beta-blue px-4 py-2 text-[9px] font-bold tracking-[0.1em] text-twhite uppercase transition hover:bg-brand-light-purple sm:px-5 sm:py-2.5 sm:text-[10px] ${TILILA_HERO_BTN}`}
            >
                {children}
                <ArrowRight className="size-4" aria-hidden />
            </Link>
        </motion.div>
    );
}

function HeroCtaTurquoise({ href, children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: HOME_EASE }}
        >
            <Link
                href={href}
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-beta-turquoise px-4 py-2 text-[9px] font-bold tracking-[0.1em] text-twhite uppercase transition hover:brightness-110 sm:px-5 sm:py-2.5 sm:text-[10px] ${TILILA_HERO_BTN}`}
            >
                {children}
                <ArrowRight className="size-4" aria-hidden />
            </Link>
        </motion.div>
    );
}

export default function HomeHero() {
    const videoRef = useRef(null);
    const videoSrc = FALLBACK_VIDEO;
    const { locale } = useTranslation();
    const [activeLine, setActiveLine] = useState(0);
    const [typingDone, setTypingDone] = useState(false);

    useEffect(() => {
        setActiveLine(0);
        setTypingDone(false);
    }, [locale]);

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        el.muted = true;
        void el.play().catch(() => {});
    }, [videoSrc]);

    return (
        <TililaSection
            id="hero"
            className="relative -mt-[72px] flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-[72px] py-8 text-twhite sm:py-10"
        >
            <motion.div
                className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: HOME_EASE }}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute inset-0 bg-linear-to-r from-tblack/92 via-tblack/78 to-tblack/50"
                aria-hidden
            />

            <TililaContainer className="relative z-10">
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
                    <SlideIn direction="left" delay={0.15}>
                        <div className="max-w-lg lg:max-w-xl">
                            <div className="space-y-0.5 text-lg leading-[1.6] font-extrabold tracking-tight sm:text-xl lg:text-[1.5rem] xl:text-[2.1rem]">
                                {HEADLINES.map((line, index) => (
                                    <p key={line.en}>
                                        <TypewriterText
                                            {...line}
                                            active={activeLine === index}
                                            done={activeLine > index}
                                            delay={index === 0 ? 500 : 0}
                                            speed={28}
                                            onComplete={() =>
                                                setActiveLine((current) =>
                                                    Math.max(current, index + 1),
                                                )
                                            }
                                        />
                                    </p>
                                ))}
                            </div>

                            <motion.div
                                className="mt-4 space-y-3 text-xs leading-snug text-twhite/85 sm:text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={
                                    activeLine >= HEADLINES.length
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 20 }
                                }
                                transition={{ duration: 0.65, ease: HOME_EASE }}
                                onAnimationComplete={() => {
                                    if (activeLine >= HEADLINES.length) {
                                        setTypingDone(true);
                                    }
                                }}
                            >
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
                            </motion.div>

                            <div className={`mt-5 ${TILILA_HERO_CTA_ROW}`}>
                                {typingDone || activeLine >= HEADLINES.length ? (
                                    <>
                                        <HeroCtaPrimary href="/tilila" delay={0.1}>
                                            <TransText
                                                en="Discover Tilila Awards"
                                                fr="Découvrir Tilila Awards"
                                                ar="اكتشف تيليلا أووردز"
                                            />
                                        </HeroCtaPrimary>
                                        <HeroCtaTurquoise
                                            href="/tililab"
                                            delay={0.22}
                                        >
                                            <TransText
                                                en="Discover Tililab"
                                                fr="Découvrir Tililab"
                                                ar="اكتشف تيليلاب"
                                            />
                                        </HeroCtaTurquoise>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </SlideIn>

                    <SlideIn direction="right" delay={0.35}>
                        <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl lg:justify-self-end">
                            <motion.div
                                className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-twhite/10"
                                style={{
                                    clipPath:
                                        'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
                                }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.35, ease: HOME_EASE }}
                            >
                                <video
                                    ref={videoRef}
                                    className="aspect-video w-full max-h-[300px] object-cover brightness-[0.88] sm:max-h-[360px] lg:max-h-[400px]"
                                    src={videoSrc}
                                    poster={HERO_BG}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls={false}
                                    preload="auto"
                                />

                                <div
                                    className="pointer-events-none absolute inset-0 bg-tblack/20"
                                    aria-hidden
                                />
                            </motion.div>
                        </div>
                    </SlideIn>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
