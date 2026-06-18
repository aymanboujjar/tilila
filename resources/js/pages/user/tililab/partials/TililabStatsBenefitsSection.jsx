import {
    Clapperboard,
    GraduationCap,
    Sparkles,
    Trophy,
    Users,
} from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaIconBadge,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

const STATS = [
    {
        icon: Trophy,
        value: '5',
        labelFr: 'éditions',
        labelEn: 'editions',
        labelAr: 'دورات',
    },
    {
        icon: Users,
        value: '30+',
        labelFr: 'jeunes créateurs accompagnés',
        labelEn: 'young creators supported',
        labelAr: 'مبدع شاب مرافق',
    },
    {
        icon: Clapperboard,
        value: '30+',
        labelFr: 'projets produits',
        labelEn: 'projects produced',
        labelAr: 'مشروع منتج',
    },
    {
        icon: GraduationCap,
        value: '100+',
        labelFr: 'heures de formation',
        labelEn: 'hours of training',
        labelAr: 'ساعة تدريب',
    },
];

const BENEFITS = [
    {
        icon: Sparkles,
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
        icon: Clapperboard,
        fr: 'Produire une œuvre audiovisuelle originale',
        en: 'Produce an original audiovisual work',
        ar: 'إنتاج عمل سمعي بصري أصلي',
    },
    {
        icon: Trophy,
        fr: 'Gagner en visibilité auprès des médias',
        en: 'Gain visibility with media professionals',
        ar: 'اكتساب الظهور لدى الإعلام',
    },
];

export default function TililabStatsBenefitsSection() {
    return (
        <TililaSection
            id="stats"
            className="border-t border-border/60 bg-beta-white"
        >
            <TililaContainer>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Tililab in numbers"
                                    fr="Tililab en chiffres"
                                    ar="تيليلاب بالأرقام"
                                />
                            }
                        />
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {STATS.map((item) => (
                                <div
                                    key={item.labelEn}
                                    className="flex flex-col items-center rounded-xl border border-border/70 bg-twhite px-3 py-5 text-center shadow-sm"
                                >
                                    <TililaIconBadge icon={item.icon} />
                                    <p className="mt-3 text-xl font-extrabold text-beta-blue">
                                        {item.value}
                                    </p>
                                    <p className="mt-1 text-xs leading-snug text-tgray">
                                        <TransText
                                            en={item.labelEn}
                                            fr={item.labelFr}
                                            ar={item.labelAr}
                                        />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="why-participate">
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Why participate?"
                                    fr="Pourquoi participer ?"
                                    ar="لماذا المشاركة؟"
                                />
                            }
                        />
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {BENEFITS.map((item) => (
                                <div
                                    key={item.en}
                                    className="flex flex-col items-center rounded-xl border border-border/70 bg-twhite px-4 py-5 text-center shadow-sm"
                                >
                                    <TililaIconBadge icon={item.icon} />
                                    <p className="mt-3 text-sm leading-relaxed text-tgray">
                                        <TransText
                                            en={item.en}
                                            fr={item.fr}
                                            ar={item.ar}
                                        />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
