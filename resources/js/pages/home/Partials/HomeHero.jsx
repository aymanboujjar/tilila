import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { FadeInText, SlideIn } from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_BACKGROUND = '/assets/homehero.jpg';
const HERO_VIDEO = '/assets/Cérémonie Tilila 2025.mp4';

const HEADLINES = [
    {
        en: 'Transforming perspectives, inspiring change.',
        fr: 'Transformer les regards, inspirer le changement.',
        ar: 'تحويل النظرات، تشجيع التغيير.',
    },
];

const HeroCta = memo(function HeroCta({ href, className, children }) {
    return (
        <Link
            href={href}
            className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-[10px] font-bold tracking-[0.08em] text-twhite uppercase transition sm:w-auto sm:shrink-0 sm:whitespace-nowrap sm:px-5 sm:py-2.5 sm:text-[11px] lg:px-6 lg:text-xs ${className}`}
        >
            {children}
            <ArrowRight className="size-4 shrink-0" aria-hidden />
        </Link>
    );
});

function HeroVideo() {
    return (
        <div
            className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-twhite/10 transition hover:ring-twhite/25 sm:rounded-2xl sm:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]"
        >
            <video
                className="aspect-video w-full max-h-[220px] object-cover brightness-[0.88] sm:max-h-[320px] lg:max-h-[400px]"
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
            className="relative -mt-[72px] flex min-h-dvh flex-col justify-start overflow-x-hidden pb-12 text-twhite pt-[calc(72px+3.5rem)] sm:justify-center sm:pb-10 sm:pt-[calc(72px+4rem)] lg:pt-[calc(72px+3rem)]"
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
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-tblack/95 via-tblack/80 to-tblack/65 sm:bg-linear-to-r sm:from-tblack/92 sm:via-tblack/78 sm:to-tblack/50"
                aria-hidden
            />

            <TililaContainer className="relative z-10 w-full pt-2 sm:pt-0">
                <div className="grid w-full items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-8">
                    <SlideIn direction="left" delay={0.1}>
                        <div className="w-full max-w-none lg:max-w-xl">
                            <div className="text-base leading-[1.35] font-extrabold tracking-tight sm:text-xl sm:leading-[1.5] lg:text-[1.5rem] xl:text-[2.1rem]">
                                {HEADLINES.map((line, index) => (
                                    <p key={line.en}>
                                        <FadeInText
                                            {...line}
                                            delay={0.2 + index * 0.15}
                                        />
                                    </p>
                                ))}
                            </div>

                            <div className="home-hero-copy mt-4 space-y-3 text-sm leading-relaxed text-twhite/85 sm:mt-5 sm:text-base lg:text-lg">
                                <p>
                                    <TransText
                                        en="Becoming references in the Moroccan advertising landscape, Tilila Awards and Tililab contribute to fighting against gender stereotypes, to valorizing the image of people with disabilities and to promoting an inclusive culture in advertising."
                                        fr="Devenus des références dans le paysage publicitaire marocain, Tilila Awards et Tililab contribuent à lutter contre les stéréotypes féminins, à valoriser l’image des personnes en situation de handicap et à promouvoir une culture de l’inclusion dans la publicité.."
                                        ar="أصبحت تيليلا أووردز وتيليلاب مراجعًا في ساحة الإعلان المغربي، وتساهم في مكافحة القوالب النمطية النسائية وتقدير الصور الشخصيات المعاقة، وتشجع الثقافة الشاملة في الإعلان."
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

                            <div className="home-hero-ctas mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
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
                        <div className="relative w-full max-w-none sm:mx-auto sm:max-w-lg lg:max-w-xl lg:justify-self-end xl:max-w-2xl">
                            <HeroVideo />
                        </div>
                    </SlideIn>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
