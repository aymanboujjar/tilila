import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TILILA_HERO_BTN,
    TILILA_HERO_CTA_ROW,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_BACKGROUND = '/assets/homehero.jpg';
const HERO_BG = '/assets/homehero.jpg';
const TROPHY = '/assets/tilila/trophee-tilila.png';
const FALLBACK_VIDEO = '/storage/tilila/media/teaser-2022.mp4';

function HeroCtaPrimary({ href, children }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-beta-blue px-4 py-2 text-[9px] font-bold tracking-[0.1em] text-twhite uppercase transition hover:bg-brand-light-purple sm:px-5 sm:py-2.5 sm:text-[10px] ${TILILA_HERO_BTN}`}
        >
            {children}
            <ArrowRight className="size-4" aria-hidden />
        </Link>
    );
}

function HeroCtaTurquoise({ href, children }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-beta-turquoise px-4 py-2 text-[9px] font-bold tracking-[0.1em] text-twhite uppercase transition hover:brightness-110 sm:px-5 sm:py-2.5 sm:text-[10px] ${TILILA_HERO_BTN}`}
        >
            {children}
            <ArrowRight className="size-4" aria-hidden />
        </Link>
    );
}

export default function HomeHero() {
    const { bestOfVideoUrl } = usePage().props;
    const videoRef = useRef(null);
    const videoSrc = bestOfVideoUrl || FALLBACK_VIDEO;

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        el.muted = true;
        void el.play().catch(() => {});
    }, [videoSrc]);

    return (
        <TililaSection
            id="hero"
            className="relative overflow-hidden py-8 text-twhite sm:py-10"
        >
            <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute inset-0 bg-linear-to-r from-tblack/92 via-tblack/78 to-tblack/50"
                aria-hidden
            />

            <TililaContainer className="relative z-10">
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
                    <div className="max-w-lg lg:max-w-xl">
                        <div className="space-y-0.5 text-lg leading-[1.2] font-extrabold tracking-tight sm:text-xl lg:text-[1.5rem] xl:text-[1.65rem]">
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

                        <div className="mt-4 space-y-2.5 text-xs leading-snug text-twhite/85 sm:text-sm">
                            <p>
                                <TransText
                                    en="Through Tilila Awards and Tililab, SOREAD 2M celebrates those who choose to put creativity at the service of change."
                                    fr="À travers les Tilila Awards et Tililab, SOREAD 2M célèbre celles et ceux qui choisissent de mettre la créativité au service du changement."
                                    ar="عبر تيليلا أووردز وتيليلاب، تحتفي SOREAD 2M بمن يختارون وضع الإبداع في خدمة التغيير."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Advertising creations that challenge stereotypes. Ideas that open new perspectives. Talents who imagine fairer, more representative and more inclusive stories."
                                    fr="Des créations publicitaires qui bousculent les stéréotypes. Des idées qui ouvrent de nouvelles perspectives. Des talents qui imaginent des récits plus justes, plus représentatifs et plus inclusifs."
                                    ar="إبداعات إعلانية تتحدى الصور النمطية. أفكار تفتح آفاقًا جديدة. مواهب تتخيل سرديات أكثر عدلاً وتمثيلاً وشمولاً."
                                />
                            </p>
                            <p>
                                <TransText
                                    en="Whether distinguishing brands that evolve representations or supporting tomorrow's advertising creators, Tilila honours the power of ideas, images and words to inspire, unite and move society forward."
                                    fr="Qu'il s'agisse de distinguer les marques qui font évoluer les représentations ou d'accompagner les créateurs et créatrices publicitaires de demain, Tilila met à l'honneur le pouvoir des idées, des images et des mots pour inspirer, rassembler et faire progresser la société."
                                    ar="سواء تمييز العلامات التي تطور التمثيلات أو مرافقة صنّاع الإعلان في الغد، تكرّم تيليلا قوة الأفكار والصور والكلمات للإلهام والتجميع ودفع المجتمع قدمًا."
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

                        <div className={`mt-5 ${TILILA_HERO_CTA_ROW}`}>
                            <HeroCtaPrimary href="/tilila">
                                <TransText
                                    en="Discover Tilila Awards"
                                    fr="Découvrir Tilila Awards"
                                    ar="اكتشف تيليلا أووردز"
                                />
                            </HeroCtaPrimary>
                            <HeroCtaTurquoise href="/tililab">
                                <TransText
                                    en="Discover Tililab"
                                    fr="Découvrir Tililab"
                                    ar="اكتشف تيليلاب"
                                />
                            </HeroCtaTurquoise>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none lg:justify-self-end">
                        <div
                            className="relative overflow-hidden rounded-xl shadow-xl ring-1 ring-twhite/10"
                            style={{
                                clipPath:
                                    'polygon(10% 0, 100% 0, 100% 100%, 0 100%)',
                            }}
                        >
                            <video
                                ref={videoRef}
                                className="aspect-video w-full max-h-[220px] object-cover brightness-[0.88] sm:max-h-[240px] lg:max-h-[260px]"
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
                        </div>

                        <img
                            src={TROPHY}
                            alt=""
                            className="pointer-events-none absolute -right-1 -bottom-3 z-10 h-16 w-auto drop-shadow-2xl sm:-right-2 sm:-bottom-4 sm:h-20 lg:h-24"
                            loading="lazy"
                            aria-hidden
                        />
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
