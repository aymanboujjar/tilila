import { Link } from '@inertiajs/react';
import { ArrowRight, Eye } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    HERO_UNDER_NAV,
    TililaContainer,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_BG = '/assets/tililabhero.jpg';

const heroCtaClassName =
    'inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-xs font-bold tracking-[0.08em] uppercase transition sm:w-auto sm:shrink-0 sm:whitespace-nowrap sm:px-6 sm:py-4 sm:text-sm';

const heroSectionClassName = `${HERO_UNDER_NAV} relative flex min-h-[460px] flex-col justify-center overflow-x-hidden pb-12 pt-[calc(72px+2.75rem)] sm:min-h-[520px] sm:pt-[calc(72px+3.25rem)] lg:min-h-[560px] lg:pt-[calc(72px+3rem)]`;

export default function TililabHero() {
    return (
        <section id="hero" className={heroSectionClassName}>
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
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#15282f]/95 via-[#1e3a44]/82 to-[#243f49]/65 sm:bg-linear-to-r sm:from-[#15282f]/94 sm:via-[#1e3a44]/80 sm:to-[#243f49]/35"
                aria-hidden
            />

            <TililaContainer className="relative z-10 w-full py-9 sm:py-11">
                <div
                    className="home-hero-copy w-full max-w-2xl min-w-0 [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]"
                    id="candidature"
                >
                    <div
                        className="flex items-center gap-3 sm:gap-4"
                        aria-label="Tililab"
                    >
                        <img
                            src="/assets/tililab/tililab-logo.png"
                            alt=""
                            className="h-14 w-14 shrink-0 object-contain brightness-0 invert sm:h-16 sm:w-16"
                            width={64}
                            height={64}
                            decoding="async"
                        />
                        <span className="text-2xl font-extrabold tracking-[0.16em] text-twhite sm:text-3xl">
                            Tililab
                        </span>
                    </div>

                    <h1 className="mt-4 text-2xl leading-[1.25] font-extrabold tracking-tight text-twhite sm:mt-5 sm:text-3xl lg:text-[1.85rem]">
                        <TransText
                            en="Revealing tomorrow's storytellers."
                            fr="Révéler les storyteller.euse.s de demain."
                            ar="اكتشاف صانعي وصانعات القصص البصرية في الغد."
                        />
                    </h1>

                    <div className="mt-5 space-y-3 text-sm leading-relaxed text-twhite/90 sm:mt-6 sm:text-base lg:text-lg">
                        <p>
                            <TransText
                                en="Tililab aims to bring out new visual storytelling talent in line with the equity, diversity and inclusion values upheld by 2M. Participants are guided by a team of professionals from idea to finished content, with full support in production and post-production."
                                fr="Tililab a pour but de faire émerger les nouveaux talents de la narration visuelle en accord avec les valeurs d'équité, de diversité et d'inclusion portées par 2M. Les participant.e.s sont accompagné.e.s par une équipe de professionnel.le.s, de l'idée au contenu fini, avec un encadrement complet en production et post-production."
                                ar="يهدف تيليلاب إلى إبراز مواهب جديدة في السرد البصري، وفق قيم المساواة والتنوع والإدماج التي تتبناها 2M. يُرافق المشاركون والمشاركات فريق من المحترفين والمحترفات من الفكرة إلى المحتوى النهائي، مع إشراف كامل في مرحلتي الإنتاج وما بعد الإنتاج."
                            />
                        </p>
                    </div>

                    <div className="home-hero-ctas mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                        <Link
                            href="/tililab#apply"
                            className={`${heroCtaClassName} bg-[#00b8d9] text-twhite hover:brightness-110`}
                        >
                            <TransText
                                en="Submit application"
                                fr="Déposer une candidature"
                                ar="قدّم ترشيحك"
                            />
                            <ArrowRight
                                className="size-4.5 shrink-0"
                                aria-hidden
                            />
                        </Link>
                        <Link
                            href="/tililab/reglement"
                            className={`${heroCtaClassName} border-2 border-twhite/80 bg-twhite/10 text-twhite backdrop-blur-sm hover:bg-twhite/20`}
                        >
                            <Eye className="size-4.5 shrink-0" aria-hidden />
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
