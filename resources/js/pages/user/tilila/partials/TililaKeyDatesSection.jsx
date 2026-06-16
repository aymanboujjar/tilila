import {
    Calendar,
    Gavel,
    Megaphone,
    Trophy,
    Users,
} from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
    TililaTealText,
} from '@/pages/user/tilila/partials/TililaUi';

const KEY_DATES = [
    {
        icon: Megaphone,
        date: '15 mai 2026',
        fr: 'Ouverture des candidatures',
        en: 'Applications open',
        ar: 'فتح باب الترشح',
    },
    {
        icon: Users,
        date: '15 juillet 2026',
        fr: 'Pré-sélection',
        en: 'Pre-selection',
        ar: 'الفرز الأولي',
    },
    {
        icon: Gavel,
        date: '15 septembre 2026',
        fr: 'Délibération du jury',
        en: 'Jury deliberation',
        ar: 'مداولة لجنة التحكيم',
    },
    {
        icon: Calendar,
        date: '15 octobre 2026',
        fr: 'Annonce des lauréats',
        en: 'Winners announcement',
        ar: 'إعلان الفائزين',
    },
    {
        icon: Trophy,
        date: '15 novembre 2026',
        fr: 'Cérémonie de remise des prix',
        en: 'Awards ceremony',
        ar: 'حفل توزيع الجوائز',
    },
];

export default function TililaKeyDatesSection() {
    return (
        <TililaSection id="calendar" className="border-t border-border/60 bg-beta-white">
            <TililaContainer>
                <TililaSectionHeading
                    centered
                    className="mx-auto"
                    title={
                        <TransText
                            en="Key dates 2026"
                            fr="Dates clés 2026"
                            ar="التواريخ الرئيسية 2026"
                        />
                    }
                />

                <div className="relative mt-14">
                    <div
                        className="absolute top-9 right-[10%] left-[10%] hidden border-t-2 border-dashed border-beta-blue/25 lg:block"
                        aria-hidden
                    />
                    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
                        {KEY_DATES.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={item.en}
                                    className="relative flex flex-col items-center text-center"
                                >
                                    <div className="relative z-10 flex size-[4.5rem] items-center justify-center rounded-full border-2 border-beta-blue/20 bg-twhite text-beta-blue shadow-sm">
                                        <Icon className="size-6 stroke-[1.5]" aria-hidden />
                                    </div>
                                    <h3 className="mt-5 text-xs font-bold tracking-wide text-beta-blue uppercase">
                                        <TransText
                                            en={item.en}
                                            fr={item.fr}
                                            ar={item.ar}
                                        />
                                    </h3>
                                    <p className="mt-2 text-sm">
                                        <TililaTealText>{item.date}</TililaTealText>
                                    </p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
