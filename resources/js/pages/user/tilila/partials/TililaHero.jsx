import { Link } from '@inertiajs/react';
import { ArrowRight, Eye } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    HERO_UNDER_NAV,
    TILILA_HERO_BTN,
    TILILA_HERO_CTA_ROW,
    TililaContainer,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_BG = '/assets/homehero.jpg';

export default function TililaHero() {
    return (
        <section
            id="hero"
            className={`${HERO_UNDER_NAV} min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]`}
        >
            <img
                src={HERO_BG}
                alt=""
                className="home-hero-bg pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
            />
            <div
                className="absolute inset-0 bg-linear-to-r from-tblack/90 via-tblack/75 to-tblack/40"
                aria-hidden
            />

            <TililaContainer className="relative z-10 flex min-h-[420px] items-center py-14 sm:min-h-[480px] sm:py-16 lg:min-h-[540px]">
                <div className="home-hero-copy max-w-2xl" id="candidature">
                    <p className="text-[11px] font-bold tracking-[0.24em] text-twhite/80 uppercase">
                        Tilila Awards
                    </p>
                    <h1 className="mt-4 text-2xl leading-[1.12] font-extrabold text-twhite sm:text-3xl lg:text-[2.35rem]">
                        <TransText
                            en="Rewarding campaigns that transform perceptions and reshape representations."
                            fr="Récompenser les campagnes qui font évoluer les représentations"
                            ar="تكريم الحملات التي تُسهم في تطوير وتغيير الصور النمطية والتمثلات المجتمعية."
                        />
                    </h1>

                    <div className="mt-6 space-y-4 text-sm leading-relaxed text-twhite/90 sm:text-base">
                        <p>
                            <TransText
                                en="The Tilila Awards recognize advertising campaigns and individuals who contribute to transforming perceptions and promoting equity, diversity, and inclusion."
                                fr="Tilila Awards distingue les campagnes publicitaires et les personnalités qui contribuent à faire évoluer les représentations et à promouvoir l’équité, la diversité et l’inclusion."
                                ar="تيليلا أووردز يميز الحملات الإعلانية والشخصيات التي تساهم في تغيير الصور النمطية وتعزيز المساواة والتنوع والإدماج."
                            />
                        </p>
                     
                    </div>

                    <div className={`home-hero-ctas mt-8 ${TILILA_HERO_CTA_ROW}`}>
                        <Link
                            href="/tilila/participate"
                            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple ${TILILA_HERO_BTN}`}
                        >
                            <TransText
                                en="Submit application"
                                fr="Déposer une candidature"
                                ar="قدّم ترشيحك"
                            />
                            <ArrowRight className="size-4" aria-hidden />
                        </Link>
                        <a
                            href="/tilila/reglement"
                            className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 border-twhite bg-transparent px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-twhite/10 ${TILILA_HERO_BTN}`}
                        >
                            <Eye className="size-4" aria-hidden />
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
