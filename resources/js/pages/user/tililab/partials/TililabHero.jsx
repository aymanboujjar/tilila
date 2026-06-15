import TransText from '@/components/TransText';
import {
    ProgramApplyButton,
    ProgramDeadlineBadge,
    ProgramRegulationButton,
} from '@/components/program/ProgramCtaButtons';

export default function TililabHero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_right,#f0ebfa_0%,#ffffff_50%,#f8f5ff_100%)] py-12 sm:py-16"
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    <div>
                        <p className="text-xs font-bold tracking-[0.28em] text-beta-blue uppercase">
                            Tililab 2026
                        </p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-tblack sm:text-4xl">
                            <TransText
                                en="Reveal the talents who create tomorrow's stories"
                                fr="Révéler les talents qui créent les récits de demain"
                                ar="إبراز المواهب التي تصنع سرديات الغد"
                            />
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-tgray">
                            <TransText
                                en="Tililab is a detection, training and mentoring program for young Moroccan creative talents."
                                fr="Tililab est un programme de détection, de formation et d'accompagnement destiné aux jeunes talents créatifs marocains."
                                ar="تيليلاب برنامج لاكتشاف وتدريب ومرافقة المواهب الإبداعية الشابة في المغرب."
                            />
                        </p>
                        <p className="mt-4 max-w-xl text-base leading-relaxed text-tgray">
                            <TransText
                                en="Through an immersive journey combining training, mentoring and audiovisual creation, Tililab supports tomorrow's creators in producing meaningful, impactful content."
                                fr="À travers un parcours immersif mêlant formation, mentorat et création audiovisuelle, Tililab accompagne les créateurs et créatrices de demain dans la réalisation de contenus porteurs de sens et d'impact."
                                ar="عبر مسار غامر يجمع التدريب والإرشاد والإبداع السمعي البصري، يرافق تيليلاب مبدعي ومبدعات الغد في إنتاج محتوى ذي معنى وأثر."
                            />
                        </p>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-border shadow-lg">
                        <img
                            src="/assets/tililab/tililab-banner.png"
                            alt=""
                            className="aspect-[4/3] w-full object-cover"
                            loading="eager"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-beta-blue/20" aria-hidden />
                    </div>
                </div>
            </div>
        </section>
    );
}
