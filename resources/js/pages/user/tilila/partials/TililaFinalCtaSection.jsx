import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import TransText from '@/components/TransText';

const CTA_IMAGE = '/assets/tilila/hero-7eme-edition.png';

const BULLETS = [
    {
        fr: 'Valoriser vos campagnes engagées',
        en: 'Highlight your committed campaigns',
        ar: 'إبراز حملاتكم الملتزمة',
    },
    {
        fr: 'Bénéficier d’une visibilité nationale',
        en: 'Benefit from national visibility',
        ar: 'الاستفادة من ظهور وطني',
    },
    {
        fr: 'Rejoindre une communauté d’acteurs engagés',
        en: 'Join a community of engaged actors',
        ar: 'الانضمام إلى مجتمع من الفاعلين الملتزمين',
    },
];

export default function TililaFinalCtaSection() {
    return (
        <section className="border-t border-border/60 bg-twhite">
            <div className="grid lg:grid-cols-2">
                <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14 lg:py-16 xl:px-20">
                    <p className="text-[11px] font-bold tracking-[0.24em] text-beta-blue uppercase">
                        <TransText
                            en="Submit application"
                            fr="Déposer une candidature"
                            ar="قدّم ترشيحك"
                        />
                    </p>
                    <h2 className="mt-4 text-2xl leading-tight font-extrabold text-[#1a237e] sm:text-3xl">
                        <TransText
                            en="Apply for the 8th Tilila Awards edition"
                            fr="Candidatez à la 8e édition des Tilila Awards"
                            ar="ترشحوا للدورة الثامنة من تيليلا أووردز"
                        />
                    </h2>
                    <ul className="mt-6 space-y-3">
                        {BULLETS.map((item) => (
                            <li
                                key={item.fr}
                                className="flex items-start gap-3 text-sm text-tgray"
                            >
                                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-beta-blue" />
                                <TransText
                                    en={item.en}
                                    fr={item.fr}
                                    ar={item.ar}
                                />
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/tilila/participate"
                        className="mt-8 inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple"
                    >
                        <TransText
                            en="Submit application"
                            fr="Déposer une candidature"
                            ar="قدّم ترشيحك"
                        />
                        <ArrowRight className="size-4" aria-hidden />
                    </Link>
                </div>

                <div className="relative min-h-[280px] lg:min-h-full">
                    <img
                        src={CTA_IMAGE}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
