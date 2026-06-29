import { ArrowRight, Crown, Medal, Trophy } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { memo } from 'react';
import {
    RevealOnScroll,
    StaggerItem,
    StaggerReveal,
} from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
import { cn } from '@/lib/utils';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const PRIZES = [
    {
        fr: 'Prix du Jury',
        en: 'Jury Prize',
        ar: 'جائزة لجنة التحكيم',
        icon: Trophy,
        tone: 'from-brand-primary to-[#2a0f6e]',
        ring: 'ring-brand-primary/30',
        ribbon: 'bg-brand-primary',
        liftClass: '',
    },
    {
        fr: "Prix d'Honneur",
        en: 'Honour Prize',
        ar: 'جائزة الشرف',
        icon: Medal,
        tone: 'from-[#5a2fc4] to-brand-primary',
        ring: 'ring-brand-light-purple/35',
        ribbon: 'bg-[#5a2fc4]',
        liftClass: 'lg:mt-7',
    },
    {
        fr: 'Prix Communication Engagée – ONLINE',
        en: 'Engaged Communication – ONLINE',
        ar: 'جائزة التواصل الملتزم – ONLINE',
        icon: Trophy,
        tone: 'from-[#3d1f8c] to-[#4419a8]',
        ring: 'ring-brand-primary/25',
        ribbon: 'bg-[#3d1f8c]',
        liftClass: 'lg:mt-14',
    },
    {
        fr: 'Prix Communication Engagée – OFFLINE',
        en: 'Engaged Communication – OFFLINE',
        ar: 'جائزة التواصل الملتزم – OFFLINE',
        icon: Trophy,
        tone: 'from-brand-light-purple to-[#4419a8]',
        ring: 'ring-brand-light-purple/30',
        ribbon: 'bg-brand-light-purple',
        liftClass: 'lg:mt-7',
    },
    {
        fr: 'Hommage Tilila',
        en: 'Hommage Tilila',
        ar: 'تكريم تيليلا',
        icon: Crown,
        honorary: true,
        tone: 'from-[#2a0f6e] via-brand-primary to-[#5a2fc4]',
        ring: 'ring-gold/40',
        ribbon: 'bg-linear-to-r from-gold/90 to-[#c29d57]',
        liftClass: '',
    },
];

const PrizeMedal = memo(function PrizeMedal({ prize, index }) {
    const Icon = prize.icon;

    return (
        <StaggerItem className="flex justify-center">
            <article
                className={cn(
                    'group relative flex w-full max-w-[220px] flex-col items-center transition duration-200 hover:-translate-y-1',
                    prize.honorary && 'max-w-[240px]',
                    prize.liftClass,
                )}
            >
                <div
                    className={cn(
                        'relative flex size-[4.5rem] items-center justify-center rounded-full bg-linear-to-br shadow-lg ring-4 sm:size-20',
                        prize.tone,
                        prize.ring,
                        prize.honorary
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
                        'relative -mt-3 w-full overflow-hidden rounded-t-lg rounded-b-2xl border border-brand-primary/10 bg-twhite px-3 pt-5 pb-4 shadow-md transition group-hover:border-brand-primary/25 group-hover:shadow-lg sm:px-4 sm:pt-6 sm:pb-5',
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
            </article>
        </StaggerItem>
    );
});

export default function TililaPrizesSection() {
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
                        <span className="inline-flex items-center gap-2 rounded-full border border-twhite/20 bg-twhite/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] text-twhite/90 uppercase">
                            <Trophy className="size-3.5" aria-hidden />
                            <TransText
                                en="5 distinctions"
                                fr="5 distinctions"
                                ar="5 جوائز"
                            />
                        </span>

                        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-twhite sm:text-3xl lg:text-[2.35rem]">
                            <TransText
                                en="Rewards"
                                fr="Les récompenses"
                                ar="المكافآت"
                            />
                        </h2>
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
                                key={prize.fr}
                                prize={prize}
                                index={index}
                            />
                        ))}
                    </StaggerReveal>

                    {/* <RevealOnScroll className="mt-14 text-center sm:mt-16" delay={0.1} y={20}>
                        <Link
                            href="/tilila/reglement"
                            className="group inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-brand-primary bg-brand-primary px-7 py-3.5 text-xs font-bold tracking-[0.14em] text-twhite uppercase transition hover:bg-[#361388] hover:shadow-lg hover:shadow-brand-primary/25"
                        >
                            <TransText
                                en="View full regulations"
                                fr="Consulter le règlement intégral"
                                ar="اطلع على النظام الكامل"
                            />
                            <ArrowRight
                                className="size-4 transition group-hover:translate-x-0.5"
                                aria-hidden
                            />
                        </Link>
                    </RevealOnScroll> */}
                </TililaContainer>
            </div>
        </TililaSection>
    );
}
