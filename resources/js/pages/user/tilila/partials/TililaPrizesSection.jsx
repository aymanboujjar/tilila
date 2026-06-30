import { Crown, Medal, Trophy } from 'lucide-react';
import { memo, useState } from 'react';
import {
    RevealOnScroll,
    StaggerItem,
    StaggerReveal,
} from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import { cn } from '@/lib/utils';
import { getTililaPrizeDetails } from '@/pages/user/tilila/data/tilila-prizes-content';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const PRIZES = [
    {
        id: 'jury',
        fr: 'Prix du Jury',
        en: 'Jury Prize',
        ar: 'جائزة لجنة التحكيم',
        icon: Trophy,
        tone: 'from-brand-primary to-[#2a0f6e]',
        ring: 'ring-brand-primary/30',
        ribbon: 'bg-brand-primary',
    },
    {
        id: 'honneur',
        fr: "Prix d'Honneur",
        en: 'Honour Prize',
        ar: 'جائزة الشرف',
        icon: Medal,
        tone: 'from-[#5a2fc4] to-brand-primary',
        ring: 'ring-brand-light-purple/35',
        ribbon: 'bg-[#5a2fc4]',
    },
    {
        id: 'online',
        fr: 'Prix Communication Engagée – ONLINE',
        en: 'Engaged Communication – ONLINE',
        ar: 'جائزة التواصل الملتزم – ONLINE',
        icon: Trophy,
        tone: 'from-[#3d1f8c] to-[#4419a8]',
        ring: 'ring-brand-primary/25',
        ribbon: 'bg-[#3d1f8c]',
    },
    {
        id: 'offline',
        fr: 'Prix Communication Engagée – OFFLINE',
        en: 'Engaged Communication – OFFLINE',
        ar: 'جائزة التواصل الملتزم – OFFLINE',
        icon: Trophy,
        tone: 'from-brand-light-purple to-[#4419a8]',
        ring: 'ring-brand-light-purple/30',
        ribbon: 'bg-brand-light-purple',
    },
    {
        id: 'hommage',
        fr: 'Hommage Tilila',
        en: 'Hommage Tilila',
        ar: 'تكريم تيليلا',
        icon: Crown,
        honorary: true,
        tone: 'from-[#2a0f6e] via-brand-primary to-[#5a2fc4]',
        ring: 'ring-gold/40',
        ribbon: 'bg-linear-to-r from-gold/90 to-[#c29d57]',
    },
];

const DEFAULT_PRIZE_ID = PRIZES[0].id;

const PrizeMedal = memo(function PrizeMedal({
    prize,
    index,
    isSelected,
    onSelect,
}) {
    const Icon = prize.icon;

    return (
        <StaggerItem className="flex justify-center">
            <button
                type="button"
                onClick={() => onSelect(prize.id)}
                aria-pressed={isSelected}
                className={cn(
                    'group relative flex w-full max-w-[220px] flex-col items-center rounded-2xl text-start transition duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:outline-none',
                    prize.honorary && 'max-w-[240px]',
                    isSelected
                        ? '-translate-y-1 scale-[1.02]'
                        : 'hover:-translate-y-0.5 opacity-90 hover:opacity-100',
                )}
            >
                <div
                    className={cn(
                        'relative flex size-[4.5rem] items-center justify-center rounded-full bg-linear-to-br shadow-lg ring-4 sm:size-20',
                        prize.tone,
                        prize.ring,
                        isSelected
                            ? 'ring-brand-primary ring-offset-4'
                            : prize.honorary
                              ? 'shadow-gold/20 ring-offset-2 ring-offset-beta-white'
                              : 'shadow-brand-primary/25 ring-offset-2 ring-offset-beta-white',
                    )}
                >
                    <Icon
                        className={cn(
                            'size-7 stroke-[1.5] sm:size-8',
                            prize.honorary ? 'text-gold' : 'text-twhite',
                        )}
                        aria-hidden
                    />
                    <span
                        className="absolute -bottom-1 left-1/2 flex size-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-beta-white bg-brand-primary text-[9px] font-black text-twhite"
                        aria-hidden
                    >
                        {index + 1}
                    </span>
                </div>

                <div
                    className={cn(
                        'relative -mt-3 w-full overflow-hidden rounded-t-lg rounded-b-2xl border bg-twhite px-3 pt-5 pb-4 shadow-md transition sm:px-4 sm:pt-6 sm:pb-5',
                        isSelected
                            ? 'border-brand-primary/40 shadow-lg'
                            : 'border-brand-primary/10 group-hover:border-brand-primary/25 group-hover:shadow-lg',
                        prize.honorary && 'border-gold/25',
                    )}
                >
                    <div
                        className={cn(
                            'absolute top-0 left-0 h-1.5 w-full',
                            prize.ribbon,
                        )}
                        aria-hidden
                    />

                    <div
                        className="pointer-events-none absolute -top-px left-1/2 h-3 w-8 -translate-x-1/2 bg-twhite"
                        style={{
                            clipPath:
                                'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
                        }}
                        aria-hidden
                    />

                    <h3 className="text-center text-[10px] leading-snug font-extrabold tracking-wide text-brand-primary uppercase sm:text-[11px]">
                        <TransText en={prize.en} fr={prize.fr} ar={prize.ar} />
                    </h3>
                </div>
            </button>
        </StaggerItem>
    );
});

function PrizeDetailPanel({ prize, locale }) {
    const { description, reward } = getTililaPrizeDetails(locale, prize.id);

    return (
        <RevealOnScroll
            key={prize.id}
            className="mx-auto mt-10 max-w-3xl rounded-2xl border border-brand-primary/15 bg-twhite p-6 shadow-[0_8px_30px_rgba(68,25,168,0.08)] sm:mt-12 sm:p-8"
            delay={0.04}
            y={16}
        >
           
            <h3 className="mt-2 text-lg font-extrabold text-brand-primary sm:text-xl">
                <TransText en={prize.en} fr={prize.fr} ar={prize.ar} />
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-tgray sm:text-base">
                {description}
            </p>
    
        </RevealOnScroll>
    );
}

export default function TililaPrizesSection() {
    const { locale } = useTranslation();
    const [selectedId, setSelectedId] = useState(DEFAULT_PRIZE_ID);
    const selectedPrize =
        PRIZES.find((prize) => prize.id === selectedId) ?? PRIZES[0];

    return (
        <TililaSection
            id="prizes"
            className="relative overflow-hidden bg-beta-white py-0 sm:py-0"
        >
            <div className="relative bg-brand-primary py-14 sm:py-16">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '28px 28px',
                    }}
                    aria-hidden
                />

                <TililaContainer className="relative">
                    <RevealOnScroll className="text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-twhite/20 bg-twhite/10 px-4 py-1.5 text-[15px] font-bold tracking-[0.22em] text-twhite/90 uppercase">
                            <Trophy className="size-5" aria-hidden />
                            <TransText
                                en="5 distinctions"
                                fr="5 distinctions"
                                ar="5 جوائز"
                            />
                        </span>

                     
                    </RevealOnScroll>
                </TililaContainer>
            </div>

            <div className="relative -mt-8 pb-14 sm:-mt-10 sm:pb-16">
                <TililaContainer>
                    <StaggerReveal
                        className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-5 lg:gap-x-5"
                        stagger={0.05}
                        delayChildren={0.06}
                    >
                        {PRIZES.map((prize, index) => (
                            <PrizeMedal
                                key={prize.id}
                                prize={prize}
                                index={index}
                                isSelected={selectedId === prize.id}
                                onSelect={setSelectedId}
                            />
                        ))}
                    </StaggerReveal>

                    <PrizeDetailPanel prize={selectedPrize} locale={locale} />
                </TililaContainer>
            </div>
        </TililaSection>
    );
}
