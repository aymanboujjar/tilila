import { Link } from '@inertiajs/react';
import { ArrowRight, Clapperboard, Eye } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    HERO_UNDER_NAV,
    TililaContainer,
    TILILA_HERO_BTN,
    TILILA_HERO_CTA_ROW,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_BG = '/assets/tililabhero.jpg';

export default function TililabHero() {
    return (
        <section
            id="hero"
            className={`${HERO_UNDER_NAV} relative min-h-[480px] overflow-hidden sm:min-h-[520px] lg:min-h-[560px]`}
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
                className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#435b66]/55 via-[#435b66]/30 to-transparent"
                aria-hidden
            />

            <TililaContainer className="relative z-10 flex min-h-[480px] items-center py-14 sm:min-h-[520px] sm:py-16 lg:min-h-[560px]">
                <div className="home-hero-copy max-w-2xl" id="candidature">
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-twhite/35 bg-twhite/10 text-twhite">
                        <Clapperboard
                            className="size-5"
                            strokeWidth={1.75}
                            aria-hidden
                        />
                    </span>

                    <p className="mt-5 text-lg font-extrabold tracking-wide text-twhite uppercase sm:text-xl">
                        Tililab
                    </p>
                    <h1 className="mt-3 text-2xl leading-[1.15] font-extrabold text-twhite sm:text-3xl lg:text-[2.35rem]">
                        <TransText
                            en="Reveal the advertisers committed to tomorrow's advertising"
                            fr="Révéler les publicitaires engagés pour demain"
                            ar="إبراز المعلنين الملتزمين لصالح الإعلان المسؤول"
                        />
                    </h1>

                    <div className="mt-6 space-y-4 text-sm leading-relaxed text-twhite/90 sm:text-base">
                        <p>
                            <TransText
                                en="Through an immersive journey, Tililab trains young content creators with values of equity, diversity and inclusion and accompanies them in producing inclusive advertising content with impact."
                                fr="À travers un parcours immersif, Tililab forme les jeunes créatrices et créateurs de contenu aux valeurs d’équité, de diversité et d’inclusion et les accompagne dans la production de contenus publicitaires inclusifs porteurs d’impact."
                                ar="من خلال مسار غامر، يتدرّب تيليلاب المبدعين الشباب إلى القيم المساواة والتنوع والإدماج ويرافقهم في إنتاج محتوى إعلاني شامل ومؤثر."
                            />
                        </p>
                    
                    </div>

                    <div className={`mt-8 ${TILILA_HERO_CTA_ROW}`}>
                        <Link
                            href="/tililab#apply"
                            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#00b8d9] px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:brightness-110 ${TILILA_HERO_BTN}`}
                        >
                            <TransText
                                en="Submit application"
                                fr="Déposer une candidature"
                                ar="قدّم ترشيحك"
                            />
                            <ArrowRight className="size-4" aria-hidden />
                        </Link>
                        <Link
                            href="/tililab/reglement"
                            className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 border-twhite/80 bg-twhite/10 px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase backdrop-blur-sm transition hover:bg-twhite/20 ${TILILA_HERO_BTN}`}
                        >
                            <Eye className="size-4" aria-hidden />
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
