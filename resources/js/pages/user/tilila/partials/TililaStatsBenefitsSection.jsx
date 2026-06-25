import { Award, Heart, Megaphone, Sparkles, Star, Users } from 'lucide-react';
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
        titleFr: 'Rejoindre une communauté d\'acteurs engagés pour le changement',
        titleEn: 'Join a community of engaged actors for change',
        titleAr: 'الانضمام إلى مجتمع من الفاعلين الملتزمين بالتغيير',
        descFr:
            'Mettre en lumière les initiatives qui portent des valeurs responsables.',
        descEn: 'Spotlight initiatives that carry responsible values.',
        descAr: 'إبراز المبادرات التي تحمل قيماً مسؤولة.',
    },

    {
        icon: Award,
        titleFr: 'Valoriser votre engagement en faveur de l\'inclusion',
        titleEn: 'Showcase your commitment to inclusion',
        titleAr: 'إبراز التزامكم لصالح الإدماج',
        descFr:
            "Bénéficier de l'évaluation d'experts issus des médias, de la création et de la société civile.",
        descEn:
            'Benefit from evaluation by experts from media, creative fields and civil society.',
        descAr: 'الاستفادة من تقييم خبراء من الإعلام والإبداع والمجتمع المدني.',
    },
    {
        icon: Megaphone,
        titleFr: "Un jury d'expert.e.s indépendant",
        titleEn: 'Benefit from national visibility',
        titleAr: 'الاستفادة من ظهور وطني',
        descFr:
            "Profiter d'une exposition médiatique auprès d'un large public.",
        descEn: 'Gain media exposure to a wide audience.',
        descAr: 'الاستفادة من ظهور إعلامي أمام جمهور واسع.',
    },
    {
        icon: Star,
        titleFr: 'Gagner en visibilité à l’échelle nationale',
        titleEn: 'Gain visibility on a national scale',
        titleAr: 'اكتساب ظهور على المستوى الوطني',
        descFr:
            "Participer à l'évolution des représentations dans la publicité.",
        descEn: 'Help evolve representations in advertising.',
        descAr: 'المساهمة في تطور التمثيلات في الإعلان.',
    },
    {
        icon: Users,
        titleFr: "Participer à l’évolution des représentations dans la publicité",
        titleEn: 'Participate in evolving representations in advertising',
        titleAr: 'المساهمة في تطور التمثيلات في الإعلان',
        descFr:
            'Intégrer un réseau de marques et de créateurs engagés pour le changement.',
        descEn: 'Join a network of brands and creators committed to change.',
        descAr: 'الانضمام إلى شبكة من العلامات والمبدعين الملتزمين بالتغيير.',
    },
];

const BenefitCard = memo(function BenefitCard({ item, index }) {
    const Icon = item.icon;
    const number = String(index + 1).padStart(2, '0');
    const featured = item.featured;

    return (
        <StaggerItem
            className={cn(featured && 'sm:col-span-2 lg:col-span-2 lg:row-span-2')}
        >
            <article
                className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-3xl border transition duration-200',
                    featured
                        ? 'min-h-[280px] border-brand-primary/20 bg-linear-to-br from-brand-primary via-[#5a2fc4] to-[#2a0f6e] p-6 text-twhite shadow-xl shadow-brand-primary/20 sm:p-8'
                        : 'border-brand-primary/10 bg-twhite p-5 shadow-sm hover:-translate-y-0.5 hover:border-brand-primary/25 hover:shadow-md sm:p-6',
                )}
            >
                {!featured ? (
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
                )}

                <span
                    className={cn(
                        'mt-4 inline-flex size-12 items-center justify-center rounded-2xl border shadow-sm',
                        featured
                            ? 'border-twhite/20 bg-twhite/15 text-twhite'
                            : 'border-brand-primary/15 bg-linear-to-br from-alpha-blue to-beta-purple text-brand-primary',
                    )}
                >
                    <Icon className="size-5 stroke-[1.75]" aria-hidden />
                </span>

                <h3
                    className={cn(
                        'mt-4 font-extrabold leading-snug tracking-tight',
                        featured
                            ? 'text-lg sm:text-xl lg:text-2xl'
                            : 'text-sm text-brand-primary sm:text-[0.95rem]',
                    )}
                >
                    <TransText
                        en={item.titleEn}
                        fr={item.titleFr}
                        ar={item.titleAr}
                    />
                </h3>

       

                {featured ? (
                    <div
                        className="mt-6 h-1 w-16 rounded-full bg-linear-to-r from-twhite/80 to-twhite/20"
                        aria-hidden
                    />
                ) : null}
            </article>
        </StaggerItem>
    );
});

export default function TililaStatsBenefitsSection() {
    return (
        <TililaSection
            id="why-participate"
            className="border-t border-brand-primary/10 bg-linear-to-b from-alpha-blue/50 via-twhite to-beta-purple/30 py-16 sm:py-20"
        >
            <TililaContainer>
                <RevealOnScroll className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-twhite px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-brand-primary uppercase shadow-sm">
                        <Sparkles className="size-3.5" aria-hidden />
                        Tilila Awards
                    </span>

                    <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-brand-primary sm:text-3xl lg:text-[2.35rem]">
                        <TransText
                            en="Why participate?"
                            fr="Pourquoi participer ?"
                            ar="لماذا المشاركة؟"
                        />
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-tgray sm:text-base">
                        <TransText
                            en="Five compelling reasons to put your campaigns forward and join a movement that reshapes advertising."
                            fr="Cinq raisons de mettre vos campagnes en avant et de rejoindre un mouvement qui transforme la publicité."
                            ar="خمسة أسباب مقنعة لتقديم حملاتكم والانضمام إلى حركة تعيد تشكيل الإعلان."
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
                    className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5"
                    stagger={0.06}
                    delayChildren={0.08}
                >
                    {BENEFITS.map((item, index) => (
                        <BenefitCard key={item.titleEn} item={item} index={index} />
                    ))}
                </StaggerReveal>
            </TililaContainer>
        </TililaSection>
    );
}
