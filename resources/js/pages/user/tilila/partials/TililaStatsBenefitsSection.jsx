import { Award, Heart, Megaphone, Star, Users } from 'lucide-react';
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

const BENEFITS = [
    {
        icon: Heart,
        featured: true,
        titleFr:
            "Rejoindre une communauté d'acteurs engagés pour le changement",
        titleEn: 'Join a community of engaged actors for change',
        titleAr: 'الانضمام إلى مجتمع من الفاعلين الملتزمين بالتغيير',
        descFr: 'Mettre en lumière les initiatives qui portent des valeurs responsables.',
        descEn: 'Spotlight initiatives that carry responsible values.',
        descAr: 'إبراز المبادرات التي تحمل قيماً مسؤولة.',
    },

    {
        icon: Award,
        titleFr: "Valoriser votre engagement en faveur de l'inclusion",
        titleEn: 'Showcase your commitment to inclusion',
        titleAr: 'إبراز التزامكم لصالح الإدماج',
        descFr: "Bénéficier de l'évaluation d'experts issus des médias, de la création et de la société civile.",
        descEn: 'Benefit from evaluation by experts from media, creative fields and civil society.',
        descAr: 'الاستفادة من تقييم خبراء من الإعلام والإبداع والمجتمع المدني.',
    },
    {
        icon: Megaphone,
        titleFr: "Un jury d'expert.e.s indépendant",
        titleEn: 'Benefit from national visibility',
        titleAr: 'الاستفادة من ظهور وطني',
        descFr: "Profiter d'une exposition médiatique auprès d'un large public.",
        descEn: 'Gain media exposure to a wide audience.',
        descAr: 'الاستفادة من ظهور إعلامي أمام جمهور واسع.',
    },
    {
        icon: Star,
        titleFr: 'Gagner en visibilité à l’échelle nationale',
        titleEn: 'Gain visibility on a national scale',
        titleAr: 'اكتساب ظهور على المستوى الوطني',
        descFr: "Participer à l'évolution des représentations dans la publicité.",
        descEn: 'Help evolve representations in advertising.',
        descAr: 'المساهمة في تطور التمثيلات في الإعلان.',
    },
    {
        icon: Users,
        titleFr:
            'Participer à l’évolution des représentations dans la publicité',
        titleEn: 'Participate in evolving representations in advertising',
        titleAr: 'المساهمة في تطور التمثيلات في الإعلان',
        descFr: 'Intégrer un réseau de marques et de créateurs engagés pour le changement.',
        descEn: 'Join a network of brands and creators committed to change.',
        descAr: 'الانضمام إلى شبكة من العلامات والمبدعين الملتزمين بالتغيير.',
    },
];

const BenefitCard = memo(function BenefitCard({ item, index }) {
    const Icon = item.icon;
    const number = String(index + 1).padStart(2, '0');
    const featured = item.featured;

    return (
        <StaggerItem className="min-w-0">
            <article
                className={cn(
                    'group relative flex h-full min-h-[175px] flex-col overflow-hidden rounded-2xl border p-4 transition duration-200 sm:min-h-[185px] sm:p-5',
                    featured
                        ? 'border-brand-primary/20 bg-linear-to-br from-brand-primary via-[#5a2fc4] to-[#2a0f6e] text-twhite shadow-md shadow-brand-primary/15'
                        : 'border-brand-primary/10 bg-twhite shadow-sm hover:-translate-y-0.5 hover:border-brand-primary/25 hover:shadow-md',
                )}
            >
                {/* {!featured ? (
                    <>
                        <span
                            className="pointer-events-none absolute -top-6 -right-2 text-[5.5rem] leading-none font-black text-brand-primary/6 select-none"
                            aria-hidden
                        >
                            {number}
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-brand-primary/50 uppercase">
                            {number}
                        </span>
                    </>
                ) : (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-twhite/20 bg-twhite/10 px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase">
                        <Sparkles className="size-3" aria-hidden />
                        <TransText
                            en="Top reason"
                            fr="Raison n°1"
                            ar="السبب الأول"
                        />
                    </span>
                )} */}

                <span
                    className={cn(
                        'inline-flex size-10 shrink-0 items-center justify-center rounded-xl border shadow-sm',
                        featured
                            ? 'border-twhite/20 bg-twhite/15 text-twhite'
                            : 'border-brand-primary/15 bg-linear-to-br from-alpha-blue to-beta-purple text-brand-primary',
                    )}
                >
                    <Icon
                        className="size-[1.125rem] stroke-[1.75]"
                        aria-hidden
                    />
                </span>

                <h3
                    className={cn(
                        'mt-3 text-xs leading-snug font-extrabold tracking-tight sm:text-sm',
                        featured ? 'text-twhite' : 'text-brand-primary',
                    )}
                >
                    <TransText
                        en={item.titleEn}
                        fr={item.titleFr}
                        ar={item.titleAr}
                    />
                </h3>
            </article>
        </StaggerItem>
    );
});

export default function TililaStatsBenefitsSection() {
    return (
        <TililaSection
            id="why-participate"
            className="border-t border-brand-primary/10 bg-linear-to-b from-alpha-blue/50 via-twhite to-beta-purple/30 py-16 sm:py-8"
        >
            <TililaContainer>
                <RevealOnScroll className="mx-auto max-w-3xl text-center">
                    <img
                        src="/assets/tilila/LOGO Tilila Awards-01.png"
                        alt="Tilila Awards"
                        className="mx-auto h-14 w-auto object-contain sm:h-16 lg:h-[10rem]"
                        loading="lazy"
                        decoding="async"
                    />

                    <h2 className="text-2xl font-extrabold tracking-tight text-brand-primary sm:text-3xl lg:text-[2.35rem]">
                        <TransText
                            en="Why participate?"
                            fr="Pourquoi participer ?"
                            ar="لماذا المشاركة؟"
                        />
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-tgray sm:text-base">
                        <TransText
                            en="Five reasons to join a competition that is helping transform advertising."
                            fr="Cinq raisons de	rejoindre un concours qui contribue	à	transformer	la	publicité."
                            ar="خمسة أسباب للمشاركة في مسابقة تُسهم في إحداث تحول في عالم الإعلانات."
                        />
                    </p>

                    <div
                        className="mx-auto mt-5 flex items-center justify-center gap-2"
                        aria-hidden
                    >
                        <span className="h-px w-10 bg-linear-to-r from-transparent to-brand-primary/50" />
                        <span className="size-1.5 rounded-full bg-brand-primary" />
                        <span className="h-px w-10 bg-linear-to-l from-transparent to-brand-primary/50" />
                    </div>
                </RevealOnScroll>

                <StaggerReveal
                    className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
                    stagger={0.06}
                    delayChildren={0.08}
                >
                    {BENEFITS.map((item, index) => (
                        <BenefitCard
                            key={item.titleEn}
                            item={item}
                            index={index}
                        />
                    ))}
                </StaggerReveal>
            </TililaContainer>
        </TililaSection>
    );
}
