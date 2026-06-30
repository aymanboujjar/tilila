import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { memo } from 'react';
import {
    CountUpStat,
    RevealOnScroll,
    StaggerItem,
    StaggerReveal,
} from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import {
    TILILAB_HOME_STATS,
    TILILA_HOME_STATS,
} from '@/pages/home/data/homeStats';
import { cn } from '@/lib/utils';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const PROGRAMS = {
    tilila: {
        title: 'Tilila Awards',
        href: '/tilila',
        logoSrc: '/assets/tilila/LOGO Tilila Awards-01.png',
        logoClassName:
            'h-[5.25rem] w-auto max-w-[12rem] shrink-0 object-contain object-left brightness-0 invert sm:h-25 -mb-7 -mt-4 -ml-15 sm:max-w-[14rem]',
        showTitle: false,
        stats: TILILA_HOME_STATS,
        gridClass: 'sm:grid-cols-2 xl:grid-cols-3',
        headerClass:
            'bg-linear-to-br from-[#6b4a9a] via-[#4419a8] to-[#2a0f6e]',
        accentText: 'text-beta-blue',
        valueClass: 'text-beta-blue',
        iconWrap:
            'border-brand-light-purple/25 bg-linear-to-br from-brand-light-purple/20 to-beta-blue/10 text-beta-blue',
        cardHover:
            'hover:border-brand-light-purple/35 hover:shadow-brand-light-purple/15',
        ringClass: 'ring-brand-light-purple/20',
    },
    tililab: {
        title: 'Tililab',
        href: '/tililab',
        logoSrc: '/assets/tililab/tililab-logo.png',
        logoClassName:
            'h-12 w-12 shrink-0 object-contain brightness-0 invert sm:h-14 sm:w-14',
        showTitle: true,
        stats: TILILAB_HOME_STATS,
        gridClass: 'sm:grid-cols-2',
        headerClass:
            'bg-linear-to-br from-[#0d9488] via-[#00a4c1] to-[#0891b2]',
        accentText: 'text-beta-turquoise',
        valueClass: 'text-[#007a94]',
        iconWrap:
            'border-beta-turquoise/25 bg-linear-to-br from-beta-turquoise/20 to-[#0891b2]/10 text-[#007a94]',
        cardHover:
            'hover:border-beta-turquoise/35 hover:shadow-beta-turquoise/15',
        ringClass: 'ring-beta-turquoise/20',
    },
};

const StatLabel = memo(function StatLabel({ item }) {
    const { locale } = useTranslation();
    const prefixKey = `labelPrefix${locale === 'ar' ? 'Ar' : locale === 'fr' ? 'Fr' : 'En'}`;
    const prefix = item[prefixKey] ?? '';

    return (
        <>
            {prefix}
            <TransText en={item.labelEn} fr={item.labelFr} ar={item.labelAr} />
        </>
    );
});

const StatCard = memo(function StatCard({ item, theme }) {
    const Icon = item.icon;
    const isCompact = item.valueSize === 'sm';

    return (
        <StaggerItem>
            <article
                className={cn(
                    'group relative flex flex-col items-center rounded-2xl border border-twhite/80 bg-twhite/95 px-3 py-5 text-center shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md',
                    theme.cardHover,
                )}
            >
                <span
                    className={cn(
                        'inline-flex size-11 items-center justify-center rounded-2xl border shadow-sm',
                        theme.iconWrap,
                    )}
                >
                    <Icon className="size-5 stroke-[1.75]" aria-hidden />
                </span>

                <p
                    className={cn(
                        'mt-3 font-extrabold tracking-tight tabular-nums',
                        theme.valueClass,
                        isCompact
                            ? 'text-sm leading-snug sm:text-[0.95rem]'
                            : 'text-2xl sm:text-[1.65rem]',
                    )}
                >
                    {isCompact ? (
                        item.value
                    ) : (
                        <CountUpStat value={item.value} />
                    )}
                </p>

                <p className="mt-1.5 max-w-[11rem] text-[11px] leading-snug font-medium text-tgray sm:text-xs">
                    <StatLabel item={item} />
                </p>
            </article>
        </StaggerItem>
    );
});

function ProgramStatsPanel({ programKey }) {
    const theme = PROGRAMS[programKey];

    return (
        <div
            className={cn(
                'relative flex min-h-full flex-col overflow-hidden rounded-3xl shadow-lg ring-1',
                theme.ringClass,
            )}
        >
            <div
                className={cn(
                    'relative flex items-start justify-between gap-4 px-5 py-5 sm:px-6 sm:py-6',
                    theme.headerClass,
                )}
            >
                <div className="min-w-0">
                    <div className="flex items-center gap-3">
                        <img
                            src={theme.logoSrc}
                            alt={theme.title}
                            className={theme.logoClassName}
                            loading="lazy"
                            decoding="async"
                        />
                        {theme.showTitle !== false ? (
                            <h3 className="text-base font-extrabold tracking-wide text-twhite uppercase sm:text-lg">
                                {theme.title}
                            </h3>
                        ) : null}
                    </div>
                    {/* <p className="mt-2 max-w-xs text-xs leading-relaxed text-twhite/80 sm:text-sm">
                        {programKey === 'tilila' ? (
                            <TransText
                                en="Campaigns, juries & awards that move representation forward."
                                fr="Campagnes, jurys et distinctions qui font avancer les représentations."
                                ar="حملات ولجان تحكيم وجوائز تدفع التمثيل إلى الأمام."
                            />
                        ) : (
                            <TransText
                                en="Training, production & mentoring for young creative talent."
                                fr="Formation, production et mentorat pour les jeunes talents créatifs."
                                ar="تدريب وإنتاج وإرشاد للمواهب الإبداعية الشابة."
                            />
                        )}
                    </p> */}
                </div>

                <Link
                    href={theme.href}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-twhite/35 bg-twhite/10 text-twhite transition hover:bg-twhite/20"
                    aria-label={`${theme.title} — discover`}
                >
                    <ArrowUpRight className="size-4" aria-hidden />
                </Link>
            </div>

            <div className="relative flex flex-1 flex-col bg-linear-to-b from-[#f4f2fa] to-twhite px-4 py-5 sm:px-5 sm:py-6">
                <StaggerReveal
                    className={cn(
                        'grid grid-cols-2 gap-3 sm:gap-4',
                        theme.gridClass,
                    )}
                    stagger={0.06}
                >
                    {theme.stats.map((item) => (
                        <StatCard
                            key={`${item.labelEn}-${item.value}`}
                            item={item}
                            theme={theme}
                        />
                    ))}
                </StaggerReveal>
            </div>
        </div>
    );
}

function SectionHeading() {
    return (
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
            {/* <span className="inline-flex items-center gap-1.5 rounded-full border border-beta-blue/15 bg-alpha-blue/60 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-beta-blue uppercase">
                <Sparkles className="size-3.5" aria-hidden />
                <TransText en="Impact" fr="Impact" ar="الأثر" />
            </span> */}

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-tblack sm:text-3xl">
                <TransText
                    en="Key figures"
                    fr="Chiffres clés"
                    ar="أرقام أساسية"
                />
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-tgray sm:text-base">
                <TransText
                    en=" One mission, and a tangible impact in support of Equity, Diversity, and Inclusion."
                    fr="Une	mission	et un impact concret en	faveur	de	l’Equité, la Diversité et l’Inclusion."
                    ar=" رسالة واحدة، وأثر ملموس من أجل تعزيز الإنصاف والتنوع والشمول."
                />
            </p>

            <div
                className="mx-auto mt-5 h-1 w-20 rounded-full bg-linear-to-r from-beta-blue via-brand-light-purple to-beta-turquoise"
                aria-hidden
            />
        </RevealOnScroll>
    );
}

export default function HomeKeyFigures() {
    return (
        <TililaSection
            id="stats"
            className="border-t border-border/40 bg-linear-to-b from-[#f8f7fc] via-twhite to-[#f0fafb]"
        >
            <TililaContainer>
                <SectionHeading />

                <div className="relative mt-10 lg:mt-14">
                    <div
                        className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-twhite bg-linear-to-br from-beta-blue to-beta-turquoise text-xs font-black text-twhite shadow-lg lg:flex"
                        aria-hidden
                    >
                        &
                    </div>

                    <div
                        className="pointer-events-none absolute top-12 bottom-12 left-1/2 hidden w-px -translate-x-1/2 bg-linear-to-b from-beta-blue/25 via-brand-light-purple/40 to-beta-turquoise/25 lg:block"
                        aria-hidden
                    />

                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                        <RevealOnScroll x={-24} delay={0.05}>
                            <ProgramStatsPanel programKey="tilila" />
                        </RevealOnScroll>
                        <RevealOnScroll x={24} delay={0.1}>
                            <ProgramStatsPanel programKey="tililab" />
                        </RevealOnScroll>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
