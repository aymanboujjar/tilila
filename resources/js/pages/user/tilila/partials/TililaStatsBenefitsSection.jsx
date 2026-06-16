import {
    Award,
    Heart,
    Megaphone,
    Star,
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
        value: '7',
        labelFr: 'éditions',
        labelEn: 'editions',
        labelAr: 'دورات',
    },
    {
        icon: Megaphone,
        value: '250+',
        labelFr: 'campagnes candidates',
        labelEn: 'candidate campaigns',
        labelAr: 'حملة مرشحة',
    },
    {
        icon: Star,
        value: '50+',
        labelFr: 'campagnes shortlistées',
        labelEn: 'shortlisted campaigns',
        labelAr: 'حملة في القائمة القصيرة',
    },
    {
        icon: Award,
        value: '13',
        labelFr: 'campagnes primées',
        labelEn: 'awarded campaigns',
        labelAr: 'حملة فائزة',
    },
    {
        icon: Users,
        value: '26',
        labelFr: 'membres de jury mobilisés',
        labelEn: 'jury members mobilized',
        labelAr: 'عضوًا في لجنة التحكيم',
    },
    {
        icon: Trophy,
        value: '7',
        labelFr: 'Hommages Tilila décernés',
        labelEn: 'Hommage Tilila awards',
        labelAr: 'تكريمات تيليلا',
    },
];

const BENEFITS = [
    {
        icon: Heart,
        fr: 'Valoriser son engagement sociétal',
        en: 'Highlight your societal commitment',
        ar: 'إبراز الالتزام المجتمعي',
    },
    {
        icon: Award,
        fr: 'Faire reconnaître ses campagnes par un jury indépendant',
        en: 'Gain recognition from an independent jury',
        ar: 'الحصول على اعتراف من لجنة تحكيم مستقلة',
    },
    {
        icon: Megaphone,
        fr: "Bénéficier d'une visibilité nationale",
        en: 'Benefit from national visibility',
        ar: 'الاستفادة من ظهور وطني',
    },
    {
        icon: Star,
        fr: 'Contribuer à une communication responsable',
        en: 'Contribute to responsible communication',
        ar: 'المساهمة في تواصل مسؤول',
    },
    // {
    //     icon: Users,
    //     fr: "Rejoindre une communauté d'acteurs engagés",
    //     en: 'Join a community of engaged actors',
    //     ar: 'الانضمام إلى مجتمع من الفاعلين الملتزمين',
    // },
];

export default function TililaStatsBenefitsSection() {
    return (
        <TililaSection id="stats" className="border-t border-border/60 bg-beta-white">
            <TililaContainer>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Tilila Awards in numbers"
                                    fr="Tilila Awards en chiffres"
                                    ar="تيليلا أووردز بالأرقام"
                                />
                            }
                        />
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
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
