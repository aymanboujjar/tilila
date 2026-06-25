import { Link } from '@inertiajs/react';
import { ArrowRight, Download, Eye } from 'lucide-react';
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
            className={`${HERO_UNDER_NAV} min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]`}
        >
            <img
                src={HERO_BG}
                alt=""
                className="home-hero-bg pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
            />
            <div
                className="absolute inset-0 bg-linear-to-r from-tblack/90 via-tblack/75 to-tblack/40"
                aria-hidden
            />

            <TililaContainer className="relative z-10 flex min-h-[480px] items-center py-14 sm:min-h-[520px] sm:py-16 lg:min-h-[560px]">
                <div className="home-hero-copy max-w-2xl" id="candidature">
                    <p className="text-lg font-extrabold tracking-tight text-white/90 sm:text-xl">
                        Tililab
                    </p>
                    <h1 className="mt-3 text-2xl leading-[1.15] font-extrabold text-white/90 sm:text-3xl lg:text-[2.35rem]">
                        <TransText
                            en="Reveal the talents who create tomorrow's stories"
                            fr="Révéler les talents qui créent les récits de demain"
                            ar="إبراز المواهب التي تصنع سرديات الغد"
                        />
                    </h1>

                    <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/90 sm:text-base">
                        <p>
                            <TransText
                                en="Tililab is a detection, training and mentoring program for young Moroccan creative talents."
                                fr="Tililab est un programme de détection, de formation et d'accompagnement destiné aux jeunes talents créatifs marocains."
                                ar="تيليلاب برنامج لاكتشاف وتدريب ومرافقة المواهب الإبداعية الشابة في المغرب."
                            />
                        </p>
                        <p>
                            <TransText
                                en="Through an immersive journey combining training, mentoring and audiovisual creation, Tililab supports tomorrow's creators in producing meaningful, impactful content."
                                fr="À travers un parcours immersif mêlant formation, mentorat et création audiovisuelle, Tililab accompagne les créateurs et créatrices de demain dans la réalisation de contenus porteurs de sens et d'impact."
                                ar="من خلال مسار غامر يجمع التكوين والإرشاد والإبداع السمعي البصري، ترافق تيليلاب مبدعي ومبدعات الغد في إنتاج محتوى هادف ومؤثر."
                            />
                        </p>
                    </div>

                    <div className={`mt-8 ${TILILA_HERO_CTA_ROW}`}>
                        <Link
                            href="/tililab#apply"
                            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-beta-turquoise px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:brightness-110 ${TILILA_HERO_BTN}`}
                        >
                            <TransText
                                en="Submit application"
                                fr="Déposer une candidature"
                                ar="قدّم ترشيحك"
                            />
                            <ArrowRight className="size-4" aria-hidden />
                        </Link>
                        <a
                            href="/tililab/reglement"
                            className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 border-beta-blue bg-twhite/80 px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-beta-blue uppercase transition hover:bg-twhite ${TILILA_HERO_BTN}`}
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
