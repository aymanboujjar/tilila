import { Link } from '@inertiajs/react';
import { ArrowUpRight, Clapperboard, Sparkles, Trophy } from 'lucide-react';
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
        icon: Trophy,
        stats: TILILA_HOME_STATS,
        gridClass: 'sm:grid-cols-2 xl:grid-cols-3',
        headerClass:
            'bg-linear-to-br from-[#6b4a9a] via-[#4419a8] to-[#2a0f6e]',
        glowClass: 'bg-brand-light-purple/25',
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
        icon: Clapperboard,
        stats: TILILAB_HOME_STATS,
        gridClass: 'sm:grid-cols-2',
        headerClass:
            'bg-linear-to-br from-[#0d9488] via-[#00a4c1] to-[#0891b2]',
        glowClass: 'bg-beta-turquoise/30',
        accentText: 'text-beta-turquoise',
        valueClass: 'text-[#007a94]',
        iconWrap:
            'border-beta-turquoise/25 bg-linear-to-br from-beta-turquoise/20 to-[#0891b2]/10 text-[#007a94]',
        cardHover: 'hover:border-beta-turquoise/35 hover:shadow-beta-turquoise/15',
        ringClass: 'ring-beta-turquoise/20',
    },
};

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

function StatCard({ item, theme, index }) {
    const Icon = item.icon;
    const isCompact = item.valueSize === 'sm';

    return (
        <article
            className={cn(
                'group relative flex flex-col items-center rounded-2xl border border-twhite/80 bg-twhite/95 px-3 py-5 text-center shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg',
                theme.cardHover,
            )}
            style={{ animationDelay: `${index * 60}ms` }}
        >
            <span
                className={cn(
                    'inline-flex size-11 items-center justify-center rounded-2xl border shadow-sm transition duration-300 group-hover:scale-110',
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
                {item.value}
            </p>

            <p className="mt-1.5 max-w-[11rem] text-[11px] leading-snug font-medium text-tgray sm:text-xs">
                <StatLabel item={item} />
            </p>

            <div
                className={cn(
                    'pointer-events-none absolute inset-x-4 bottom-0 h-px bg-linear-to-r from-transparent via-current to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-20',
                    theme.accentText,
                )}
                aria-hidden
            />
        </article>
    );
}

function ProgramStatsPanel({ programKey }) {
    const theme = PROGRAMS[programKey];
    const HeaderIcon = theme.icon;

    return (
        <div
            className={cn(
                'relative flex min-h-full flex-col overflow-hidden rounded-3xl shadow-lg ring-1',
                theme.ringClass,
            )}
        >
            <div
                className={cn(
                    'pointer-events-none absolute -top-10 -right-10 size-40 rounded-full blur-3xl',
                    theme.glowClass,
                )}
                aria-hidden
            />
            <div
                className={cn(
                    'pointer-events-none absolute -bottom-16 -left-12 size-48 rounded-full blur-3xl opacity-60',
                    theme.glowClass,
                )}
                aria-hidden
            />

            <div
                className={cn(
                    'relative flex items-start justify-between gap-4 px-5 py-5 sm:px-6 sm:py-6',
                    theme.headerClass,
                )}
            >
                <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-twhite/30 bg-twhite/15 text-twhite">
                            <HeaderIcon
                                className="size-4"
                                strokeWidth={1.75}
                                aria-hidden
                            />
                        </span>
                        <h3 className="text-base font-extrabold tracking-wide text-twhite uppercase sm:text-lg">
                            {theme.title}
                        </h3>
                    </div>
                    <p className="mt-2 max-w-xs text-xs leading-relaxed text-twhite/80 sm:text-sm">
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
                    </p>
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
                <div
                    className={cn(
                        'grid grid-cols-2 gap-3 sm:gap-4',
                        theme.gridClass,
                    )}
                >
                    {theme.stats.map((item, index) => (
                        <StatCard
                            key={`${item.labelEn}-${item.value}`}
                            item={item}
                            theme={theme}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function SectionHeading() {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-beta-blue/15 bg-alpha-blue/60 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-beta-blue uppercase">
                <Sparkles className="size-3.5" aria-hidden />
                <TransText en="Impact" fr="Impact" ar="الأثر" />
            </span>

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-tblack sm:text-3xl">
                <TransText
                    en="Key figures"
                    fr="Chiffres clés"
                    ar="أرقام أساسية"
                />
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-tgray sm:text-base">
                <TransText
                    en="Two programmes, one mission — measurable momentum for equality, diversity and creative talent in Morocco."
                    fr="Deux programmes, une mission — un impact concret pour l’égalité, la diversité et les talents créatifs au Maroc."
                    ar="برنامجان، مهمة واحدة — زخم ملموس للمساواة والتنوع والمواهب الإبداعية في المغرب."
                />
            </p>

            <div
                className="mx-auto mt-5 h-1 w-20 rounded-full bg-linear-to-r from-beta-blue via-brand-light-purple to-beta-turquoise"
                aria-hidden
            />
        </div>
    );
}

export default function HomeKeyFigures() {
    return (
        <TililaSection
            id="stats"
            className="relative overflow-hidden border-t border-border/40 bg-linear-to-b from-[#f8f7fc] via-twhite to-[#f0fafb]"
        >
            <div
                className="pointer-events-none absolute top-0 left-1/4 size-72 rounded-full bg-brand-light-purple/10 blur-3xl"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute right-1/4 bottom-0 size-80 rounded-full bg-beta-turquoise/10 blur-3xl"
                aria-hidden
            />

            <TililaContainer className="relative">
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
                        <ProgramStatsPanel programKey="tilila" />
                        <ProgramStatsPanel programKey="tililab" />
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
