import { Link } from '@inertiajs/react';
import { ArrowRight, Download, Eye } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TILILA_HERO_BTN,
    TILILA_HERO_CTA_ROW,
    TililaContainer,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_BG = '/assets/homehero.jpg';

export default function TililaHero() {
    return (
        <section
            id="hero"
            className="relative min-h-[420px] overflow-hidden sm:min-h-[480px] lg:min-h-[540px]"
        >
            <img
                src={HERO_BG}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-bottom"
                loading="eager"
            />
            <div
                className="absolute inset-0 bg-linear-to-r from-tblack/90 via-tblack/75 to-tblack/40"
                aria-hidden
            />

            <TililaContainer className="relative z-10 flex min-h-[420px] items-center py-14 sm:min-h-[480px] sm:py-16 lg:min-h-[540px]">
                <div className="max-w-2xl" id="candidature">
                    <p className="text-[11px] font-bold tracking-[0.24em] text-twhite/80 uppercase">
                        Tilila Awards
                    </p>
                    <h1 className="mt-4 text-2xl leading-[1.12] font-extrabold text-twhite sm:text-3xl lg:text-[2.35rem]">
                        <TransText
                            en="Reward campaigns that evolve representations"
                            fr="Récompenser les campagnes qui font évoluer les représentations"
                            ar="مكافأة الحملات التي تطور التمثيلات"
                        />
                    </h1>

                    <div className="mt-6 space-y-4 text-sm leading-relaxed text-twhite/90 sm:text-base">
                        <p>
                            <TransText
                                en="Tilila Awards rewards advertising campaigns, brands and personalities that help promote equity, diversity and inclusion."
                                fr="Tilila Awards récompense les campagnes publicitaires, les marques et les personnalités qui contribuent à promouvoir l'équité, la diversité et l'inclusion."
                                ar="تكرّم تيليلا أووردز الحملات الإعلانية والعلامات والشخصيات التي تساهم في تعزيز المساواة والتنوع والإدماج."
                            />
                        </p>
                        <p>
                            <TransText
                                en="These Awards distinguish initiatives that foster balanced representation of women and men, value inclusion of people with disabilities and help fight stereotypes in public space."
                                fr="Ces Awards distinguent les initiatives qui favorisent une représentation équilibrée des femmes et des hommes, valorisent l'inclusion des personnes en situation de handicap et contribuent à lutter contre les stéréotypes dans l'espace public."
                                ar="تميّز هذه الجوائز المبادرات التي تعزز تمثيلاً متوازناً للنساء والرجال، وتُقدّر إدماج الأشخاص في وضعية إعاقة، وتساهم في مكافحة الصور النمطية في الفضاء العام."
                            />
                        </p>
                    </div>

                    <div className={`mt-8 ${TILILA_HERO_CTA_ROW}`}>
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
