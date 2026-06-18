import TransText from '@/components/TransText';
import {
    TILILAB_HOME_STATS,
    TILILA_HOME_STATS,
} from '@/pages/home/data/homeStats';
import {
    TililaContainer,
    TililaIconBadge,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

function StatsBlock({ title, stats }) {
    return (
        <div className="min-w-0 flex-1">
            <h3 className="text-center text-sm font-extrabold tracking-wide text-beta-blue uppercase sm:text-base">
                {title}
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.labelEn}
                        className="flex flex-col items-center rounded-xl border border-border/60 bg-twhite px-3 py-5 text-center"
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
    );
}

export default function HomeKeyFigures() {
    return (
        <TililaSection id="stats" className="border-t border-border/60 bg-beta-white">
            <TililaContainer>
                <h2 className="text-center text-2xl font-extrabold tracking-tight text-beta-blue sm:text-3xl">
                    <TransText
                        en="Key figures"
                        fr="Nos chiffres clés"
                        ar="أرقامنا الأساسية"
                    />
                </h2>

                <div className="mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:gap-0">
                    <StatsBlock
                        title="Tilila Awards"
                        stats={TILILA_HOME_STATS}
                    />
                    <div
                        className="hidden w-px shrink-0 bg-border/80 lg:mx-10 lg:block"
                        aria-hidden
                    />
                    <StatsBlock title="Tililab" stats={TILILAB_HOME_STATS} />
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
