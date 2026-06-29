import {
    Clapperboard,
    Filter,
    Gavel,
    Megaphone,
    Trophy,
    Video,
} from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

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

function ParcoursStepIcon({ step, index }) {
    const Icon = step.icon;

    return (
        <div className="relative shrink-0">
            <div className="flex size-14 items-center justify-center rounded-full border-2 border-tililab-cyan/30 bg-twhite text-tililab-slate shadow-sm sm:size-[4.5rem]">
                <Icon className="size-6 stroke-[1.5]" aria-hidden />
            </div>
            <span className="absolute -end-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-tililab-cyan text-[10px] font-bold text-twhite">
                {index + 1}
            </span>
        </div>
    );
}

function ParcoursStepLabel({ step }) {
    return (
        <p className="text-xs leading-snug font-bold tracking-wide text-tililab-slate uppercase sm:text-[11px] lg:text-center">
            <TransText en={step.en} fr={step.fr} ar={step.ar} />
        </p>
    );
}

export default function TililabKeyDatesSection() {
    const lastIndex = PARCOURS_STEPS.length - 1;

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

                <ol className="relative mt-10 space-y-0 border-s-2 border-tililab-cyan/25 ps-6 sm:ps-8 lg:hidden">
                    {PARCOURS_STEPS.map((step, index) => (
                        <li
                            key={step.fr}
                            className={`relative flex items-start gap-4 pb-8 ${index === lastIndex ? 'pb-0' : ''}`}
                        >
                            <span
                                className="absolute -start-[calc(1.5rem+7px)] top-7 size-3 rounded-full bg-tililab-cyan ring-4 ring-beta-white sm:-start-[calc(2rem+7px)]"
                                aria-hidden
                            />
                            <ParcoursStepIcon step={step} index={index} />
                            <div className="min-w-0 flex-1 pt-3">
                                <ParcoursStepLabel step={step} />
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="relative mt-12 hidden lg:block">
                    <div
                        className="absolute top-9 right-[6%] left-[6%] border-t-2 border-dashed border-tililab-cyan/25"
                        aria-hidden
                    />
                    <ol className="flex justify-between gap-3">
                        {PARCOURS_STEPS.map((step, index) => (
                            <li
                                key={step.fr}
                                className="relative flex flex-1 flex-col items-center px-1 text-center"
                            >
                                <ParcoursStepIcon step={step} index={index} />
                                <div className="mt-4">
                                    <ParcoursStepLabel step={step} />
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
