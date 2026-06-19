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
        image: '/assets/logo.png',
        imageAlt: 'Tilila',
        imageClass: 'h-auto w-[88%] max-w-[9.5rem] object-contain object-center sm:max-w-[10.5rem]',
        imageLayout: 'logo',
        imagePanelClass:
            'flex items-center justify-center bg-white/95 px-3 py-4',
        gradient: 'from-brand-light-purple via-beta-blue to-[#3d1f6e]',
        title: 'TILILA AWARDS',
        descEn: 'Reward campaigns that evolve representations.',
        descFr: 'Récompenser les campagnes qui font évoluer les représentations.',
        descAr: 'مكافأة الحملات التي تطور التمثيلات.',
    },
    {
        id: 'tililab',
        href: '/tililab',
        image: '/assets/tililab/tililab-logo.png',
        imageAlt: 'Tililab',
        imageClass: 'h-auto w-[92%] max-w-full object-contain object-center',
        imageLayout: 'logo',
        imagePanelClass:
            'flex items-center justify-center bg-[#f7f4e8] px-2 py-3',
        gradient: 'from-beta-turquoise via-[#00b4d8] to-[#0096c7]',
        title: 'TILILAB',
        descEn: 'Reveal the talents who create tomorrow’s stories.',
        descFr: 'Révéler les talents qui créent les récits de demain.',
        descAr: 'إبراز المواهب التي تصنع روايات الغد.',
    },
];

export default function HomeProgramCards() {
    return (
        <TililaSection className="bg-twhite py-10 sm:py-12">
            <TililaContainer>
                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                    {CARDS.map((card) => (
                        <Link
                            key={card.id}
                            href={card.href}
                            className={`group relative flex min-h-[200px] overflow-hidden rounded-2xl bg-linear-to-r ${card.gradient} shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:min-h-[220px]`}
                        >
                            <div
                                className={`relative w-[42%] shrink-0 overflow-hidden ${
                                    card.imagePanelClass ??
                                    (card.imageLayout === 'logo'
                                        ? 'flex items-center justify-center bg-white/95'
                                        : '')
                                }`}
                            >
                                <img
                                    src={card.image}
                                    alt={card.imageAlt ?? ''}
                                    className={
                                        card.imageLayout === 'cover'
                                            ? `absolute inset-0 ${card.imageClass}`
                                            : card.imageClass
                                    }
                                    loading="lazy"
                                />
                                {card.imageLayout === 'cover' ? (
                                    <div
                                        className="absolute inset-0 bg-linear-to-r from-transparent to-black/10"
                                        aria-hidden
                                    />
                                ) : null}
                            </div>

                            <div className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-7">
                                <h2 className="text-xl font-extrabold tracking-wide text-twhite sm:text-2xl">
                                    {card.title}
                                </h2>
                                <p className="mt-2 max-w-xs text-sm leading-relaxed text-twhite/90">
                                    <TransText
                                        en={card.descEn}
                                        fr={card.descFr}
                                        ar={card.descAr}
                                    />
                                </p>
                                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-twhite uppercase">
                                    <TransText
                                        en="Apply"
                                        fr="Je candidate"
                                        ar="أترشح"
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
