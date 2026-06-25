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
                            en="Reveal the talents who create tomorrow's stories"
                            fr="Révéler les talents qui créent les récits de demain"
                            ar="إبراز المواهب التي تصنع سرديات الغد"
                        />
                    </h1>

                    <div className="mt-6 space-y-4 text-sm leading-relaxed text-twhite/90 sm:text-base">
                        <p>
                            <TransText
                                en="Tililab is a detection, training and mentoring program for young Moroccan creative talents under 30."
                                fr="Tililab est un programme de détection, de formation et d'accompagnement destiné aux jeunes talents créatifs marocains de moins de 30 ans."
                                ar="تيليلاب برنامج لاكتشاف وتدريب ومرافقة المواهب الإبداعية الشابة في المغرب دون 30 سنة."
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
