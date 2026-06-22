import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const CTA_IMAGE = '/assets/tilila/hero-7eme-edition.png';
const PANEL_BG = '#f5f6f8';

const IMAGE_FADE = `linear-gradient(to right, ${PANEL_BG} 0%, ${PANEL_BG} 6%, rgba(245, 246, 248, 0.92) 16%, rgba(245, 246, 248, 0.55) 30%, rgba(245, 246, 248, 0.15) 46%, transparent 62%)`;

const BULLETS = [
    {
        fr: 'Célébrez vos campagnes engagées.',
        en: 'Celebrate your committed campaigns.',
        ar: 'احتفوا بحملاتكم الملتزمة.',
    },
    {
        fr: 'Gagnez en visibilité.',
        en: 'Gain visibility.',
        ar: 'اكسبوا المزيد من الظهور.',
    },
    {
        fr: 'Participez au changement.',
        en: 'Be part of the change.',
        ar: 'شاركوا في التغيير.',
    },
];

export default function TililaFinalCtaSection() {
    return (
        <section className="bg-twhite py-12 sm:py-14 lg:py-16">
            <TililaContainer>
                <div className="overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(26,35,126,0.08)] lg:grid lg:grid-cols-2">
                    <div
                        className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-14"
                        style={{ backgroundColor: PANEL_BG }}
                    >
                        <p className="text-[11px] font-bold tracking-[0.22em] text-beta-blue uppercase">
                            <TransText
                                en="Submit application"
                                fr="Déposer une candidature"
                                ar="قدّم ترشيحك"
                            />
                        </p>
                        <h2 className="mt-4 text-2xl leading-tight font-extrabold text-[#1a237e] sm:text-[1.75rem] lg:text-3xl">
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
                                    className="flex items-start gap-3 text-sm text-tgray sm:text-[15px]"
                                >
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-beta-blue" />
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

                    <div className="relative min-h-[240px] sm:min-h-[280px] lg:min-h-full">
                        <img
                            src={CTA_IMAGE}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ objectPosition: 'center center' }}
                            loading="lazy"
                        />
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{ background: IMAGE_FADE }}
                            aria-hidden
                        />
                    </div>
                </div>
            </TililaContainer>
        </section>
    );
}
