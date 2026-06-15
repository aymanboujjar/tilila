import TransText from '@/components/TransText';
import {
    TililaBtnOutline,
    TililaBtnPrimary,
    TililaContainer,
    TililaDeadlinePill,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const HERO_IMAGE = '/assets/tililab/tililab-banner.png';

export default function TililabHero() {
    return (
        <TililaSection id="hero" className="bg-twhite pt-10 pb-12 sm:pt-14 sm:pb-16">
            <TililaContainer>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div id="candidature">
                        <p className="text-xs font-bold tracking-[0.22em] text-beta-blue uppercase">
                            <TransText
                                en="6th edition"
                                fr="6e édition"
                                ar="الدورة السادسة"
                            />
                        </p>
                        <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-beta-blue sm:text-5xl lg:text-[3.25rem]">
                            TILILAB
                            <span className="mt-1 block text-tblack">2026</span>
                        </h1>

                        <div className="mt-6 space-y-1 text-base font-medium leading-snug text-tblack/90">
                            <p>
                                <TransText
                                    en="Reveal the talents who create tomorrow's stories."
                                    fr="Révéler les talents qui créent les récits de demain."
                                    ar="إبراز المواهب التي تصنع سرديات الغد."
                                />
                            </p>
                        </div>

                        <p className="mt-5 max-w-lg text-sm leading-relaxed text-tgray sm:text-base">
                            <TransText
                                en="Tililab is a detection, training and mentoring program for young Moroccan creative talents under 30."
                                fr="Tililab est un programme de détection, de formation et d'accompagnement destiné aux jeunes talents créatifs marocains de moins de 30 ans."
                                ar="تيليلاب برنامج لاكتشاف وتدريب ومرافقة المواهب الإبداعية الشابة في المغرب دون 30 سنة."
                            />
                        </p>

                        <div className="mt-6">
                            <TililaDeadlinePill deadline="31 août 2026" />
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <TililaBtnPrimary href="/tililab/form">
                                <TransText
                                    en="Submit application"
                                    fr="Déposer une candidature"
                                    ar="قدّم ترشيحك"
                                />
                            </TililaBtnPrimary>
                            <TililaBtnOutline href="/tililab/reglement/download">
                                <TransText
                                    en="Download regulations"
                                    fr="Télécharger le règlement"
                                    ar="تحميل النظام"
                                />
                            </TililaBtnOutline>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                        <div
                            className="relative overflow-hidden shadow-xl"
                            style={{
                                clipPath:
                                    'polygon(12% 0, 100% 0, 100% 100%, 0 100%)',
                            }}
                        >
                            <img
                                src={HERO_IMAGE}
                                alt=""
                                className="aspect-[4/3] w-full object-cover brightness-[0.92] sm:aspect-video"
                                loading="eager"
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
