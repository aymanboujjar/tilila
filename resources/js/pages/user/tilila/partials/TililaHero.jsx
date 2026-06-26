import { Link } from '@inertiajs/react';
import { ArrowRight, Eye } from 'lucide-react';
import TransText from '@/components/TransText';
import { HERO_UNDER_NAV, TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const HERO_BG = '/assets/homehero.jpg';

const heroCtaClassName =
    'inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-xs font-bold tracking-[0.08em] uppercase transition sm:w-auto sm:shrink-0 sm:whitespace-nowrap sm:px-6 sm:py-4 sm:text-sm';

const heroSectionClassName = `${HERO_UNDER_NAV} flex min-h-[460px] flex-col justify-center overflow-x-hidden pb-12 pt-[calc(72px+2.75rem)] sm:min-h-[520px] sm:pt-[calc(72px+3.25rem)] lg:min-h-[560px] lg:pt-[calc(72px+3rem)]`;

export default function TililaHero() {
    return (
        <section id="hero" className={heroSectionClassName}>
            <img
                src={HERO_BG}
                alt=""
                className="home-hero-bg pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_75%]"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
            />
            <div
                className="absolute inset-0 bg-linear-to-b from-tblack/95 via-tblack/80 to-tblack/60 sm:bg-linear-to-r sm:from-tblack/90 sm:via-tblack/75 sm:to-tblack/40"
                aria-hidden
            />

            <TililaContainer className="relative z-10 w-full py-9 sm:py-11">
                <div
                    className="home-hero-copy w-full min-w-0 max-w-2xl"
                    id="candidature"
                >
                    <p className="text-xs font-bold tracking-[0.24em] text-twhite/80 uppercase">
                        Tilila Awards
                    </p>
                    <h1 className="mt-3 text-2xl leading-[1.25] font-extrabold tracking-tight text-twhite sm:text-3xl lg:text-[1.85rem]">
                        <TransText
                            en="Rewarding campaigns that transform perceptions and reshape representations."
                            fr="Récompenser les campagnes qui font évoluer les représentations"
                            ar="تكريم الحملات التي تُسهم في تطوير وتغيير الصور النمطية والتمثلات المجتمعية."
                        />
                    </h1>

                    <div className="mt-5 space-y-3 text-sm leading-relaxed text-twhite/90 sm:mt-6 sm:text-base lg:text-lg">
                        <p>
                            <TransText
                                en="The Tilila Awards recognize advertising campaigns and individuals who contribute to transforming perceptions and promoting equity, diversity, and inclusion."
                                fr="Tilila Awards distingue les campagnes publicitaires et les personnalités qui contribuent à faire évoluer les représentations et à promouvoir l’équité, la diversité et l’inclusion."
                                ar="تيليلا أووردز يميز الحملات الإعلانية والشخصيات التي تساهم في تغيير الصور النمطية وتعزيز المساواة والتنوع والإدماج."
                            />
                        </p>
                    </div>

                    <div className="home-hero-ctas mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                        <Link
                            href="/tilila/participate"
                            className={`${heroCtaClassName} bg-beta-blue text-twhite hover:bg-brand-light-purple`}
                        >
                            <TransText
                                en="Submit application"
                                fr="Déposer une candidature"
                                ar="قدّم ترشيحك"
                            />
                            <ArrowRight className="size-4.5 shrink-0" aria-hidden />
                        </Link>
                        <a
                            href="/tilila/reglement"
                            className={`${heroCtaClassName} border-2 border-twhite bg-transparent text-twhite hover:bg-twhite/10`}
                        >
                            <Eye className="size-4.5 shrink-0" aria-hidden />
                            <TransText
                                en="Read regulations"
                                fr="Consulter le règlement"
                                ar="قراءة النظام"
                            />
                        </a>
                    </div>
                </div>
            </TililaContainer>
        </section>
    );
}
