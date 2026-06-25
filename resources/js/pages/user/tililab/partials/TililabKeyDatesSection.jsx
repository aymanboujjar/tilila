import {
    Clapperboard,
    Filter,
    Gavel,
    GraduationCap,
    Megaphone,
    Trophy,
    Video,
} from 'lucide-react';
import TransText from '@/components/TransText';
import { TililaContainer, TililaSection } from '@/pages/user/tilila/partials/TililaUi';

const PARCOURS_STEPS = [
    {
        icon: Megaphone,
        fr: 'APPEL À CANDIDATURES',
        en: 'APPLICATIONS OPEN',
        ar: 'فتح باب الترشح',
    },
    {
        icon: Filter,
        fr: 'PRÉSÉLECTION',
        en: 'Preselection',
        ar: 'الفرز الأولي',
    },

    {
        icon: Clapperboard,
        fr: 'Bootcamp créatif',
        en: 'Creative bootcamp',
        ar: 'المعسكر الإبداعي',
    },
    {
        icon: Video,
        fr: 'Production',
        en: 'Production',
        ar: 'الإنتاج',
    },
    {
        icon: Gavel,
        fr: 'DÉLIBÉRATION DU JURY',
        en: 'JURY DELIBERATION',
        ar: 'مداولة لجنة التحكيم',
    },
    {
        icon: Trophy,
        fr: 'Tililab Trophy',
        en: 'Tililab Trophy',
        ar: 'كأس تيليلاب',
    },
];

export default function TililabKeyDatesSection() {
    return (
        <TililaSection id="parcours" className="bg-beta-white">
            <TililaContainer>
                <div className="text-center">
                    <h2 className="text-xl font-extrabold tracking-[0.12em] text-tililab-slate uppercase sm:text-2xl">
                        <TransText
                            en="The Tililab journey"
                            fr="Le parcours Tililab"
                            ar="مسار تيليلاب"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-tililab-cyan"
                        aria-hidden
                    />
                </div>

                <div className="relative mt-12 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div
                        className="absolute top-9 right-[6%] left-[6%] hidden border-t-2 border-dashed border-tililab-cyan/25 lg:block"
                        aria-hidden
                    />
                    <ol className="flex min-w-[720px] gap-3 lg:min-w-0 lg:justify-between">
                        {PARCOURS_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <li
                                    key={step.fr}
                                    className="relative flex flex-1 flex-col items-center px-1 text-center"
                                >
                                    <div className="relative">
                                        <div className="flex size-[4.25rem] items-center justify-center rounded-full border-2 border-tililab-cyan/30 bg-twhite text-tililab-slate shadow-sm sm:size-[4.5rem]">
                                            <Icon
                                                className="size-6 stroke-[1.5]"
                                                aria-hidden
                                            />
                                        </div>
                                        <span className="absolute -end-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-tililab-cyan text-[10px] font-bold text-twhite">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-[10px] leading-snug font-bold tracking-wide text-tililab-slate uppercase sm:text-[11px]">
                                        <TransText
                                            en={step.en}
                                            fr={step.fr}
                                            ar={step.ar}
                                        />
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
