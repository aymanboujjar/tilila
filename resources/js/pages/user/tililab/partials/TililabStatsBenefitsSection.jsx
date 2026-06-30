import { Clapperboard, Lightbulb, Sparkles, Trophy, Users } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const BENEFITS = [
    {
        icon: Lightbulb,
        fr: 'Développer votre créativité',
        en: 'Develop your creativity',
        ar: 'تطوير الإبداع',
    },
    {
        icon: Users,
        fr: 'Maîtriser les enjeux d’équité, de diversité et d’inclusion dans la publicité',
        en: 'Master the issues of equity, diversity and inclusion in advertising',
        ar: 'المساواة والتنوع والإدماج في الإعلان',
    },
    {
        icon: Sparkles,
        fr: 'Bénéficier de l’accompagnement de professionnels',
        en: 'Benefit from the accompaniment of professionals',
        ar: 'الاستفادة من المرافقة من قبل محترفين',
    },
    {
        icon: Clapperboard,
        fr: 'Vivre une expérience immersive unique',
        en: 'Live a unique immersive experience',
        ar: 'تجربة غامرة فريدة',
    },
    {
        icon: Trophy,
        fr: 'Réaliser une création audiovisuelle originale',
        en: 'Produce an original audiovisual work',
        ar: 'إنتاج عمل سمعي بصري أصلي',
    },
    {
        icon: Sparkles,
        fr: 'Gagner en visibilité auprès des professionnels du secteur',
        en: 'Gain visibility with media and industry professionals',
        ar: 'اكتساب الظهور لدى الإعلام ومحترفي القطاع',
    },
];

export default function TililabStatsBenefitsSection() {
    return (
        <TililaSection id="why-participate" className="bg-twhite">
            <TililaContainer>
                <div className="text-center">
                    <img
                        src="/assets/tililab/tililab-logo.png"
                        alt="Tililab logo"
                        className="mx-auto mb-6 h-16 w-auto"
                        loading="lazy"
                    />

                    <h2 className="text-xl font-extrabold tracking-[0.12em] text-tililab-slate uppercase sm:text-2xl">
                        <TransText
                            en="Why participate?"
                            fr="Pourquoi participer ?"
                            ar="لماذا المشاركة؟"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-tililab-cyan"
                        aria-hidden
                    />
                </div>

                <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
                    {BENEFITS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.fr}
                                className="flex flex-col items-center text-center"
                            >
                                <span className="inline-flex size-14 items-center justify-center rounded-full border border-tililab-cyan/25 bg-alpha-tililab text-tililab-cyan">
                                    <Icon
                                        className="size-6 stroke-[1.5]"
                                        aria-hidden
                                    />
                                </span>
                                <p className="mt-4 text-sm leading-snug font-semibold text-tililab-slate">
                                    <TransText
                                        en={item.en}
                                        fr={item.fr}
                                        ar={item.ar}
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
