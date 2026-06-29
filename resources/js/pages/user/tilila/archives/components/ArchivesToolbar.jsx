import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';

const PROGRAMS = [
    {
        id: 'tilila',
        label: {
            fr: 'Tilila Awards',
            en: 'Tilila Awards',
            ar: 'تيليلا أووردز',
        },
        accent: 'bg-beta-blue',
    },
    {
        id: 'tililab',
        label: { fr: 'Tililab', en: 'Tililab', ar: 'تيليلاب' },
        accent: 'bg-beta-turquoise',
    },
];

export default function ArchivesToolbar({
    program,
    onProgramChange,
    years,
    year,
    onYearChange,
    hideProgramToggle = false,
}) {
    const { t } = useTranslation();

    return (
        <div className="sticky top-16 z-30 border-b border-border/50 bg-twhite/95 backdrop-blur-xl sm:top-18">
            <TililaContainer className="py-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {hideProgramToggle ? null : (
                        <div
                            className="inline-flex w-fit rounded-full border border-border/60 bg-beta-white p-1 shadow-sm"
                            role="tablist"
                            aria-label="Program"
                        >
                            {PROGRAMS.map((tab) => {
                                const active = program === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={active}
                                        onClick={() => onProgramChange(tab.id)}
                                        className={`rounded-full px-5 py-2 text-xs font-extrabold tracking-[0.1em] uppercase transition sm:px-6 sm:text-sm ${
                                            active
                                                ? `${tab.accent} text-twhite shadow-sm`
                                                : 'text-tgray hover:text-beta-blue'
                                        }`}
                                    >
                                        <TransText
                                            fr={tab.label.fr}
                                            en={tab.label.en}
                                            ar={tab.label.ar}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <div
                        className={`flex flex-wrap items-center gap-2 ${hideProgramToggle ? 'w-full' : ''}`}
                    >
                        {years.map((y) => (
                            <button
                                key={y}
                                type="button"
                                onClick={() => onYearChange(y)}
                                className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition ${
                                    year === y
                                        ? 'bg-beta-blue text-twhite shadow-sm'
                                        : 'border border-border/60 bg-twhite text-tblack hover:border-beta-blue hover:text-beta-blue'
                                }`}
                            >
                                {y}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => onYearChange('all')}
                            className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition ${
                                year === 'all'
                                    ? 'bg-beta-blue text-twhite shadow-sm'
                                    : 'border border-border/60 bg-twhite text-tblack hover:border-beta-blue hover:text-beta-blue'
                            }`}
                        >
                            {t('tilila.archives.allYears')}
                        </button>
                    </div>
                </div>
            </TililaContainer>
        </div>
    );
}
