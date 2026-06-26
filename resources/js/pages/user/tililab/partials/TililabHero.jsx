import { Link } from '@inertiajs/react';
import { ArrowRight, Clapperboard, Eye } from 'lucide-react';
import TransText from '@/components/TransText';
import { HERO_UNDER_NAV, TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const HERO_BG = '/assets/tililabhero.jpg';

const heroCtaClassName =
    'inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-[10px] font-bold tracking-[0.1em] uppercase transition sm:w-auto sm:shrink-0 sm:whitespace-nowrap sm:px-6 sm:py-3.5 sm:text-xs';

export default function TililabHero() {
    return (
        <section
            id="hero"
            className={`${HERO_UNDER_NAV} relative flex min-h-[480px] flex-col justify-start overflow-x-hidden pt-[calc(72px+2.5rem)] sm:min-h-[520px] sm:justify-center sm:pt-[calc(72px+3rem)] lg:min-h-[560px] lg:pt-[calc(72px+2.5rem)]`}
        >
            <img
                src={HERO_BG}
                alt=""
                className="home-hero-bg pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
            />
            <div
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#435b66]/85 via-[#435b66]/55 to-[#435b66]/35 sm:bg-linear-to-r sm:from-[#435b66]/55 sm:via-[#435b66]/30 sm:to-transparent"
                aria-hidden
            />

            <TililaContainer className="relative z-10 flex w-full min-w-0 items-start py-10 sm:items-center sm:py-14 lg:py-16">
                <div
                    className="home-hero-copy w-full min-w-0 max-w-2xl"
                    id="candidature"
                >
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-twhite/35 bg-twhite/10 text-twhite">
                        <Clapperboard
                            className="size-5"
                            strokeWidth={1.75}
                            aria-hidden
                        />
                    </span>

                    <p className="mt-4 text-base font-extrabold tracking-wide text-twhite uppercase sm:mt-5 sm:text-lg lg:text-xl">
                        Tililab
                    </p>
                    <h1 className="mt-3 text-xl leading-[1.2] font-extrabold text-twhite sm:text-3xl sm:leading-[1.15] lg:text-[2.35rem]">
                        <TransText
                            en="Reveal the advertisers committed to tomorrow's advertising"
                            fr="Révéler les publicitaires engagés pour demain"
                            ar="إبراز المعلنين الملتزمين لصالح الإعلان المسؤول"
                        />
                    </h1>

                    <div className="mt-4 space-y-4 text-sm leading-relaxed text-twhite/90 sm:mt-6 sm:text-base">
                        <p>
                            <TransText
                                en="Through an immersive journey, Tililab trains young content creators with values of equity, diversity and inclusion and accompanies them in producing inclusive advertising content with impact."
                                fr="À travers un parcours immersif, Tililab forme les jeunes créatrices et créateurs de contenu aux valeurs d’équité, de diversité et d’inclusion et les accompagne dans la production de contenus publicitaires inclusifs porteurs d’impact."
                                ar="من خلال مسار غامر، يتدرّب تيليلاب المبدعين الشباب إلى القيم المساواة والتنوع والإدماج ويرافقهم في إنتاج محتوى إعلاني شامل ومؤثر."
                            />
                        </p>
                    </div>

                    <div className="home-hero-ctas mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                        <Link
                            href="/tililab#apply"
                            className={`${heroCtaClassName} bg-[#00b8d9] text-twhite hover:brightness-110`}
                        >
                            <TransText
                                en="Submit application"
                                fr="Déposer une candidature"
                                ar="قدّم ترشيحك"
                            />
                            <ArrowRight className="size-4 shrink-0" aria-hidden />
                        </Link>
                        <Link
                            href="/tililab/reglement"
                            className={`${heroCtaClassName} border-2 border-twhite/80 bg-twhite/10 text-twhite backdrop-blur-sm hover:bg-twhite/20`}
                        >
                            <Eye className="size-4 shrink-0" aria-hidden />
                            <TransText
                                en="Read regulations"
                                fr="Consulter le règlement"
                                ar="قراءة النظام"
                            />
                        </Link>
                    </div>
                </div>
            </TililaContainer>
        </section>
    );
}
