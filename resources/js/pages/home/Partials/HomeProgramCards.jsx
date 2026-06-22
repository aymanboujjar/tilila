import { Link } from '@inertiajs/react';
import { Clapperboard, Trophy } from 'lucide-react';
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
        imagePosition: 'left',
        icon: Trophy,
        overlay:
            'bg-linear-to-r from-tblack/30 via-beta-blue/88 to-[#3d1f6e]/95',
        buttonClass:
            'bg-brand-light-purple hover:bg-brand-light-purple/90',
        title: 'TILILA AWARDS',
        subtitleEn: 'Reward campaigns that evolve representations.',
        subtitleFr:
            'Récompenser les campagnes qui font évoluer les représentations.',
        subtitleAr: 'مكافأة الحملات التي تطور التمثيلات.',
        bodyEn:
            'Tilila Awards distinguishes campaigns, brands and talents that put creativity at the service of equality, diversity and inclusion.',
        bodyFr:
            'Tilila Awards distingue les campagnes, les marques et les talents qui mettent la créativité au service de l’égalité, de la diversité et de l’inclusion.',
        bodyAr:
            'تكرّم تيليلا أووردز الحملات والعلامات والمواهب التي تضع الإبداع في خدمة المساواة والتنوع والإدماج.',
    },
    {
        id: 'tililab',
        href: '/tililab',
        image: '/assets/tililab/tililab-banner.png',
        imageAlt: 'Tournage Tililab',
        imagePosition: 'right',
        icon: Clapperboard,
        overlay:
            'bg-linear-to-l from-tblack/30 via-beta-turquoise/88 to-[#007a8f]/95',
        buttonClass: 'bg-[#00b8d9] hover:bg-[#00a8c4]',
        title: 'TILILAB',
        subtitleEn: 'Reveal the talents who create tomorrow’s stories.',
        subtitleFr: 'Révéler les talents qui créent les récits de demain.',
        subtitleAr: 'إبراز المواهب التي تصنع روايات الغد.',
        bodyEn:
            'Tililab is a detection, training and mentoring programme for young Moroccan creative talents under 30.',
        bodyFr:
            'Tililab est un programme de détection, de formation et d’accompagnement destiné aux jeunes talents créatifs marocains de moins de 30 ans.',
        bodyAr:
            'تيليلاب برنامج لاكتشاف وتدريب ومرافقة المواهب الإبداعية الشابة في المغرب دون 30 سنة.',
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

function ProgramCard({ card }) {
    const Icon = card.icon;
    const imageOnRight = card.imagePosition === 'right';

    return (
        <Link
            href={card.href}
            className="group relative block min-h-[260px] overflow-hidden rounded-2xl shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:min-h-[300px]"
        >
            <img
                src={card.image}
                alt={card.imageAlt}
                className={`absolute inset-0 h-full w-full object-cover ${
                    imageOnRight ? 'object-right' : 'object-left'
                }`}
                loading="lazy"
            />
            <div
                className={`absolute inset-0 ${card.overlay}`}
                aria-hidden
            />

            <div
                className={`relative z-10 flex min-h-[260px] sm:min-h-[300px] ${
                    imageOnRight ? 'flex-row' : 'flex-row'
                }`}
            >
                {!imageOnRight ? (
                    <div
                        className="hidden w-[38%] shrink-0 sm:block"
                        aria-hidden
                    />
                ) : null}

                <div className="flex flex-1 flex-col justify-center px-6 py-7 sm:px-8 sm:py-8">
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-twhite/35 bg-twhite/10 text-twhite">
                        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>

                    <h3 className="mt-4 text-lg font-extrabold tracking-wide text-twhite uppercase sm:text-xl">
                        {card.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold leading-snug text-twhite sm:text-[0.95rem]">
                        <TransText
                            en={card.subtitleEn}
                            fr={card.subtitleFr}
                            ar={card.subtitleAr}
                        />
                    </p>

                    <p className="mt-3 max-w-sm text-xs leading-relaxed text-twhite/85 sm:text-sm">
                        <TransText
                            en={card.bodyEn}
                            fr={card.bodyFr}
                            ar={card.bodyAr}
                        />
                    </p>

                    <span
                        className={`mt-5 inline-flex w-fit items-center justify-center rounded-lg px-5 py-2.5 text-[10px] font-bold tracking-[0.14em] text-twhite uppercase transition sm:text-xs ${card.buttonClass}`}
                    >
                        <TransText en="Discover" fr="Découvrir" ar="اكتشف" />
                    </span>
                </div>

                {imageOnRight ? (
                    <div
                        className="hidden w-[38%] shrink-0 sm:block"
                        aria-hidden
                    />
                ) : null}
            </div>
        </Link>
    );
}

export default function HomeProgramCards() {
    return (
        <TililaSection className="bg-twhite py-10 sm:py-12">
            <TililaContainer>
                <SectionTitle />

                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                    {CARDS.map((card) => (
                        <ProgramCard key={card.id} card={card} />
                    ))}
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
