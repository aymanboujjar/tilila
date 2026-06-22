import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const CARDS = [
    {
        id: 'tilila',
        href: '/tilila',
        image: '/assets/tilila/trophee-tilila.png',
        imageAlt: 'Trophée Tilila Awards',
        imageClass: 'h-full w-full object-cover object-center',
        imageLayout: 'cover',
        gradient: 'from-brand-light-purple via-beta-blue to-[#3d1f6e]',
        title: 'Tilila Awards',
        descEn: 'Reward campaigns that evolve representations.',
        descFr: 'Récompenser les campagnes qui font évoluer les représentations.',
        descAr: 'مكافأة الحملات التي تطور التمثيلات.',
    },
    {
        id: 'tililab',
        href: '/tililab',
        image: '/assets/tililab/tililab-banner.png',
        imageAlt: 'Tililab',
        imageClass: 'h-full w-full object-cover object-center',
        imageLayout: 'cover',
        gradient: 'from-beta-turquoise via-[#00b4d8] to-[#0096c7]',
        title: 'Tililab',
        descEn: 'Reveal the talents who create tomorrow’s stories.',
        descFr: 'Révéler les talents qui créent les récits de demain.',
        descAr: 'إبراز المواهب التي تصنع روايات الغد.',
    },
];

function SectionTitle() {
    return (
        <div className="mb-8 text-center sm:mb-10">
            <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                <TransText
                    en="Our two programmes"
                    fr="Nos deux programmes"
                    ar="برنامجانا"
                />
            </h2>
            <div
                className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-blue/70"
                aria-hidden
            />
        </div>
    );
}

export default function HomeProgramCards() {
    return (
        <TililaSection className="bg-twhite py-10 sm:py-12">
            <TililaContainer>
                <SectionTitle />

                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                    {CARDS.map((card) => (
                        <Link
                            key={card.id}
                            href={card.href}
                            className={`group relative flex min-h-[200px] overflow-hidden rounded-2xl bg-linear-to-r ${card.gradient} shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:min-h-[240px]`}
                        >
                            <div className="relative w-[42%] shrink-0 overflow-hidden">
                                <img
                                    src={card.image}
                                    alt={card.imageAlt ?? ''}
                                    className={card.imageClass}
                                    loading="lazy"
                                />
                                <div
                                    className="absolute inset-0 bg-linear-to-r from-transparent to-black/15"
                                    aria-hidden
                                />
                            </div>

                            <div className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-7">
                                <h3 className="text-xl font-extrabold tracking-wide text-twhite sm:text-2xl">
                                    {card.title}
                                </h3>
                                <p className="mt-2 max-w-xs text-sm leading-relaxed text-twhite/90">
                                    <TransText
                                        en={card.descEn}
                                        fr={card.descFr}
                                        ar={card.descAr}
                                    />
                                </p>
                                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-twhite uppercase">
                                    <TransText
                                        en="Discover"
                                        fr="Découvrir"
                                        ar="اكتشف"
                                    />
                                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
