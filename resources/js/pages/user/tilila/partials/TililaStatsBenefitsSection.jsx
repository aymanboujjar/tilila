import { Award, Heart, Megaphone, Star, Users } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const BENEFITS = [
    {
        icon: Heart,
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
        descEn: 'Benefit from evaluation by experts from media, creative fields and civil society.',
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

export default function TililaStatsBenefitsSection() {
    return (
        <TililaSection
            id="why-participate"
            className="border-t border-border/60 bg-twhite"
        >
            <TililaContainer>
                <div className="text-center">
                    <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                        <TransText
                            en="Why participate?"
                            fr="Pourquoi participer ?"
                            ar="لماذا المشاركة؟"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-blue/70"
                        aria-hidden
                    />
                </div>

                <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
                    {BENEFITS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.titleEn}
                                className="flex flex-col items-center text-center"
                            >
                                <span className="inline-flex size-14 items-center justify-center rounded-full border border-beta-blue/20 bg-alpha-blue text-beta-blue">
                                    <Icon
                                        className="size-6 stroke-[1.5]"
                                        aria-hidden
                                    />
                                </span>
                                <h3 className="mt-4 text-sm font-extrabold leading-snug text-beta-blue">
                                    <TransText
                                        en={item.titleEn}
                                        fr={item.titleFr}
                                        ar={item.titleAr}
                                    />
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed text-tgray">
                                    <TransText
                                        en={item.descEn}
                                        fr={item.descFr}
                                        ar={item.descAr}
                                    />
                                </p>
                            </div>
                        );
                    })}
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
