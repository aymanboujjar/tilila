import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clapperboard, Trophy } from 'lucide-react';
import {
    HOME_EASE,
    RevealOnScroll,
    StaggerItem,
    StaggerReveal,
} from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const CARDS = [
    {
        id: 'tilila',
        href: '/tilila',
        icon: Trophy,
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
        icon: Clapperboard,
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
        <RevealOnScroll className="mb-8 text-center sm:mb-10">
            <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                <TransText
                    en="Our two programmes"
                    fr="Nos deux programmes"
                    ar="برنامجانا"
                />
            </h2>
            <motion.div
                className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-blue/70"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: HOME_EASE }}
                aria-hidden
            />
        </RevealOnScroll>
    );
}

function CardBackground({ variant }) {
    if (variant === 'tilila') {
        return (
            <div className="absolute inset-0" aria-hidden>
                <div className="absolute inset-0 bg-linear-to-br from-[#6b4a9a] via-[#3d2870] to-[#12081f]" />
                <div className="absolute top-[12%] left-[6%] size-28 rounded-full bg-purple-300/18 blur-3xl" />
                <div className="absolute top-[38%] left-[18%] size-20 rounded-full bg-violet-200/12 blur-2xl" />
                <div className="absolute bottom-[18%] left-[4%] size-36 rounded-full bg-indigo-400/14 blur-3xl" />
                <div className="absolute top-[22%] right-[28%] size-24 rounded-full bg-purple-500/10 blur-2xl" />
                <div className="absolute inset-y-0 left-0 w-[42%] bg-linear-to-r from-violet-500/18 to-transparent" />
            </div>
        );
    }

    return (
        <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-linear-to-br from-[#0d9488] via-[#0891b2] to-tgray" />
            <div className="absolute -top-14 -right-10 size-60 rounded-full bg-[#d9f99d]/38 blur-3xl" />
            <div className="absolute top-2 right-4 size-44 rounded-full bg-lime-200/28 blur-2xl" />
            <div className="absolute inset-0 bg-linear-to-bl from-transparent via-transparent to-slate-500/45" />
        </div>
    );
}

function ProgramCard({ card }) {
    const Icon = card.icon;

    return (
        <StaggerItem y={48}>
            <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: HOME_EASE }}
            >
                <Link
                    href={card.href}
                    className="group relative block min-h-[260px] overflow-hidden rounded-2xl shadow-lg sm:min-h-[300px]"
                >
                    <CardBackground variant={card.id} />

                    <div className="relative z-10 flex min-h-[260px] sm:min-h-[300px]">
                        <div className="flex flex-1 flex-col justify-center px-6 py-7 sm:px-8 sm:py-8">
                            <motion.span
                                className="inline-flex size-10 items-center justify-center rounded-full border border-twhite/35 bg-twhite/10 text-twhite"
                                whileHover={{ rotate: 12, scale: 1.08 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Icon
                                    className="size-5"
                                    strokeWidth={1.75}
                                    aria-hidden
                                />
                            </motion.span>

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
                                <TransText
                                    en="Discover"
                                    fr="Découvrir"
                                    ar="اكتشف"
                                />
                            </span>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </StaggerItem>
    );
}

export default function HomeProgramCards() {
    return (
        <TililaSection className="bg-twhite py-10 sm:py-12">
            <TililaContainer>
                <SectionTitle />

                <StaggerReveal
                    className="grid gap-5 md:grid-cols-2 md:gap-6"
                    stagger={0.14}
                >
                    {CARDS.map((card) => (
                        <ProgramCard key={card.id} card={card} />
                    ))}
                </StaggerReveal>
            </TililaContainer>
        </TililaSection>
    );
}
