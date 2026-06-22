import {
    Clapperboard,
    Lightbulb,
    Sparkles,
    Trophy,
    Users,
} from 'lucide-react';
import TransText from '@/components/TransText';
import { TililaContainer, TililaSection } from '@/pages/user/tilila/partials/TililaUi';

const BENEFITS = [
    {
        icon: Lightbulb,
        fr: 'Développer ses compétences créatives',
        en: 'Develop creative skills',
        ar: 'تطوير المهارات الإبداعية',
    },
    {
        icon: Users,
        fr: 'Être accompagné par des professionnels',
        en: 'Be mentored by professionals',
        ar: 'المرافقة من قبل محترفين',
    },
    {
        icon: Sparkles,
        fr: 'Participer à une expérience immersive unique',
        en: 'Take part in a unique immersive experience',
        ar: 'المشاركة في تجربة غامرة فريدة',
    },
    {
        icon: Clapperboard,
        fr: 'Produire une œuvre audiovisuelle originale',
        en: 'Produce an original audiovisual work',
        ar: 'إنتاج عمل سمعي بصري أصلي',
    },
    {
        icon: Trophy,
        fr: 'Gagner en visibilité auprès des médias et professionnels du secteur',
        en: 'Gain visibility with media and industry professionals',
        ar: 'اكتساب الظهور لدى الإعلام ومحترفي القطاع',
    },
];

export default function TililabStatsBenefitsSection() {
    return (
        <TililaSection id="why-participate" className="bg-twhite">
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
                        className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-turquoise"
                        aria-hidden
                    />
                </div>

                <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
                    {BENEFITS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.fr}
                                className="flex flex-col items-center text-center"
                            >
                                <span className="inline-flex size-14 items-center justify-center rounded-full border border-beta-turquoise/25 bg-alpha-blue text-beta-turquoise">
                                    <Icon
                                        className="size-6 stroke-[1.5]"
                                        aria-hidden
                                    />
                                </span>
                                <p className="mt-4 text-sm leading-snug font-semibold text-beta-blue">
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
