import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import {
    TILILAB_HOME_STATS,
    TILILA_HOME_STATS,
} from '@/pages/home/data/homeStats';
import {
    TililaContainer,
    TililaIconBadge,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

function StatLabel({ item }) {
    const { locale } = useTranslation();
    const prefixKey = `labelPrefix${locale === 'ar' ? 'Ar' : locale === 'fr' ? 'Fr' : 'En'}`;
    const prefix = item[prefixKey] ?? '';

    return (
        <>
            {prefix}
            <TransText
                en={item.labelEn}
                fr={item.labelFr}
                ar={item.labelAr}
            />
        </>
    );
}

function StatsBlock({ title, stats, accentClass = 'text-beta-blue' }) {
    return (
        <div className="min-w-0 flex-1">
            <h3
                className={`text-center text-sm font-extrabold tracking-wide uppercase sm:text-base ${accentClass}`}
            >
                {title}
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.labelEn}
                        className="flex flex-col items-center px-3 py-5 text-center"
                    >
                        <TililaIconBadge icon={item.icon} />
                        <p
                            className={`mt-3 font-extrabold text-beta-blue ${
                                item.valueSize === 'sm'
                                    ? 'text-sm leading-snug sm:text-base'
                                    : 'text-xl'
                            }`}
                        >
                            {item.value}
                        </p>
                        <p className="mt-1 text-xs leading-snug text-tgray">
                            <StatLabel item={item} />
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HomeKeyFigures() {
    return (
        <TililaSection
            id="stats"
            className="border-t border-border/60 bg-beta-white"
        >
            <TililaContainer>
                <div className="text-center">
                    <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                        <TransText
                            en="Key figures"
                            fr="Chiffres clés"
                            ar="أرقام أساسية"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-blue/70"
                        aria-hidden
                    />
                </div>

                <div className="mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:gap-0">
                    <StatsBlock
                        title="Tilila Awards"
                        stats={TILILA_HOME_STATS}
                    />
                    <div
                        className="hidden w-px shrink-0 bg-border/80 lg:mx-10 lg:block"
                        aria-hidden
                    />
                    <StatsBlock
                        title="Tililab"
                        stats={TILILAB_HOME_STATS}
                        accentClass="text-beta-turquoise"
                    />
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
