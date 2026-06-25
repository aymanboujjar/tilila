import { motion } from 'framer-motion';
import { Award, Heart, Megaphone, Sparkles, Star, Users } from 'lucide-react';
import {
    HOME_EASE,
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
        titleFr: 'Valoriser son engagement sociétal',
        titleEn: 'Highlight your societal commitment',
        titleAr: 'إبراز الالتزام المجتمعي',
        descFr:
            'Mettre en lumière les initiatives qui portent des valeurs responsables.',
        descEn: 'Spotlight initiatives that carry responsible values.',
        descAr: 'إبراز المبادرات التي تحمل قيماً مسؤولة.',
    },
    {
        icon: Award,
        titleFr: 'Faire reconnaître ses campagnes par un jury indépendant',
        titleEn: 'Gain recognition from an independent jury',
        titleAr: 'الحصول على اعتراف من لجنة تحكيم مستقلة',
        descFr:
            'Bénéficier de l’évaluation d’experts issus des médias, de la création et de la société civile.',
        descEn:
            'Benefit from evaluation by experts from media, creative fields and civil society.',
        descAr: 'الاستفادة من تقييم خبراء من الإعلام والإبداع والمجتمع المدني.',
    },
    {
        icon: Megaphone,
        titleFr: "Bénéficier d'une visibilité nationale",
        titleEn: 'Benefit from national visibility',
        titleAr: 'الاستفادة من ظهور وطني',
        descFr:
            'Profiter d’une exposition médiatique auprès d’un large public.',
        descEn: 'Gain media exposure to a wide audience.',
        descAr: 'الاستفادة من ظهور إعلامي أمام جمهور واسع.',
    },
    {
        icon: Star,
        titleFr: 'Contribuer à une communication responsable',
        titleEn: 'Contribute to responsible communication',
        titleAr: 'المساهمة في تواصل مسؤول',
        descFr:
            'Participer à l’évolution des représentations dans la publicité.',
        descEn: 'Help evolve representations in advertising.',
        descAr: 'المساهمة في تطور التمثيلات في الإعلان.',
    },
    {
        icon: Users,
        titleFr: "Rejoindre une communauté d'acteurs engagés",
        titleEn: 'Join a community of engaged actors',
        titleAr: 'الانضمام إلى مجتمع من الفاعلين الملتزمين',
        descFr:
            'Intégrer un réseau de marques et de créateurs engagés pour le changement.',
        descEn: 'Join a network of brands and creators committed to change.',
        descAr: 'الانضمام إلى شبكة من العلامات والمبدعين الملتزمين بالتغيير.',
    },
];

function BenefitCard({ item, index }) {
    const Icon = item.icon;
    const number = String(index + 1).padStart(2, '0');
    const featured = item.featured;

    return (
        <StaggerItem
            className={cn(featured && 'sm:col-span-2 lg:col-span-2 lg:row-span-2')}
        >
            <motion.article
                className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-3xl border transition duration-300',
                    featured
                        ? 'min-h-[280px] border-brand-primary/20 bg-linear-to-br from-brand-primary via-[#5a2fc4] to-[#2a0f6e] p-6 text-twhite shadow-xl shadow-brand-primary/25 sm:p-8'
                        : 'border-brand-primary/10 bg-twhite/95 p-5 shadow-sm backdrop-blur-sm hover:border-brand-primary/25 hover:shadow-lg hover:shadow-brand-primary/10 sm:p-6',
                )}
                whileHover={{ y: -4, scale: featured ? 1.01 : 1.02 }}
                transition={{ duration: 0.28, ease: HOME_EASE }}
            >
                {!featured ? (
                    <span
                        className="pointer-events-none absolute -top-6 -right-2 text-[5.5rem] leading-none font-black text-brand-primary/6 select-none"
                        aria-hidden
                    >
                        {number}
                    </span>
                ) : null}

                {featured ? (
                    <>
                        <div
                            className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-twhite/10 blur-2xl"
                            aria-hidden
                        />
                        <div
                            className="pointer-events-none absolute -bottom-10 -left-10 size-36 rounded-full bg-brand-light-purple/30 blur-2xl"
                            aria-hidden
                        />
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-twhite/20 bg-twhite/10 px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm">
                            <Sparkles className="size-3" aria-hidden />
                            <TransText
                                en="Top reason"
                                fr="Raison n°1"
                                ar="السبب الأول"
                            />
                        </span>
                    </>
                ) : (
                    <span className="text-[10px] font-bold tracking-[0.2em] text-brand-primary/50 uppercase">
                        {number}
                    </span>
                )}

                <motion.span
                    className={cn(
                        'mt-4 inline-flex size-12 items-center justify-center rounded-2xl border shadow-sm',
                        featured
                            ? 'border-twhite/20 bg-twhite/15 text-twhite'
                            : 'border-brand-primary/15 bg-linear-to-br from-alpha-blue to-beta-purple text-brand-primary',
                    )}
                    whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                >
                    <Icon className="size-5 stroke-[1.75]" aria-hidden />
                </motion.span>

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

                <p
                    className={cn(
                        'mt-2 flex-1 text-sm leading-relaxed',
                        featured ? 'text-twhite/85' : 'text-tgray',
                    )}
                >
                    <TransText
                        en={item.descEn}
                        fr={item.descFr}
                        ar={item.descAr}
                    />
                </p>

                {featured ? (
                    <div
                        className="mt-6 h-1 w-16 rounded-full bg-linear-to-r from-twhite/80 to-twhite/20"
                        aria-hidden
                    />
                ) : (
                    <div
                        className="mt-4 h-0.5 w-10 rounded-full bg-linear-to-r from-brand-primary/60 to-brand-primary/10 opacity-0 transition group-hover:opacity-100"
                        aria-hidden
                    />
                )}
            </motion.article>
        </StaggerItem>
    );
}

export default function TililaStatsBenefitsSection() {
    return (
        <TililaSection
            id="why-participate"
            className="relative overflow-hidden border-t border-brand-primary/10 bg-linear-to-b from-alpha-blue/50 via-twhite to-beta-purple/40 py-16 sm:py-20"
        >
            <div
                className="pointer-events-none absolute -top-24 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-brand-primary/8 blur-3xl"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute right-0 bottom-0 size-72 translate-x-1/3 translate-y-1/3 rounded-full bg-brand-light-purple/15 blur-3xl"
                aria-hidden
            />

            <TililaContainer className="relative">
                <RevealOnScroll className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-twhite/80 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-brand-primary uppercase shadow-sm backdrop-blur-sm">
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
                    stagger={0.08}
                    delayChildren={0.12}
                >
                    {BENEFITS.map((item, index) => (
                        <BenefitCard key={item.titleEn} item={item} index={index} />
                    ))}
                </StaggerReveal>
            </TililaContainer>
        </TililaSection>
    );
}
