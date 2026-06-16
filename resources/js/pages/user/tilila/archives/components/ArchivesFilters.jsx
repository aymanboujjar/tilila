import { motion } from 'framer-motion';
import { ArrowDownUp, RotateCcw } from 'lucide-react';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';

export default function ArchivesFilters({
    years,
    yearFilter,
    onYearChange,
    sort,
    onSortChange,
    resultCount,
    onReset,
    hasActiveFilters,
}) {
    const { t } = useTranslation();

    return (
        <section className="sticky top-16 z-30 border-b border-border/50 bg-twhite/90 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0618]/90 sm:top-18">
            <TililaContainer>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
                >
                    <div className="flex flex-wrap items-center gap-3">
                        <label className="sr-only" htmlFor="archives-year-filter">
                            {t('tilila.archives.filterYear')}
                        </label>
                        <select
                            id="archives-year-filter"
                            value={yearFilter}
                            onChange={(e) => onYearChange(e.target.value)}
                            className="rounded-xl border border-border/60 bg-white px-4 py-2.5 text-sm font-semibold text-tblack shadow-sm focus:border-beta-blue focus:outline-none focus:ring-2 focus:ring-beta-blue/20 dark:border-white/10 dark:bg-white/5 dark:text-twhite"
                        >
                            <option value="all">
                                {t('tilila.archives.allYears')}
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>

                        <label className="sr-only" htmlFor="archives-sort">
                            {t('tilila.archives.sortLabel')}
                        </label>
                        <div className="relative">
                            <ArrowDownUp
                                className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-tgray"
                                aria-hidden
                            />
                            <select
                                id="archives-sort"
                                value={sort}
                                onChange={(e) => onSortChange(e.target.value)}
                                className="rounded-xl border border-border/60 bg-white py-2.5 ps-10 pe-4 text-sm font-semibold text-tblack shadow-sm focus:border-beta-blue focus:outline-none focus:ring-2 focus:ring-beta-blue/20 dark:border-white/10 dark:bg-white/5 dark:text-twhite"
                            >
                                <option value="newest">
                                    {t('tilila.archives.sortNewest')}
                                </option>
                                <option value="oldest">
                                    {t('tilila.archives.sortOldest')}
                                </option>
                            </select>
                        </div>

                        {hasActiveFilters ? (
                            <button
                                type="button"
                                onClick={onReset}
                                className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-4 py-2.5 text-xs font-bold tracking-wide text-beta-blue uppercase transition hover:bg-alpha-blue dark:border-white/10 dark:text-beta-turquoise"
                            >
                                <RotateCcw className="size-3.5" />
                                {t('tilila.archives.resetFilters')}
                            </button>
                        ) : null}
                    </div>

                    <p className="text-sm text-tgray dark:text-twhite/60">
                        {t('tilila.archives.resultsCount').replace(
                            ':count',
                            String(resultCount),
                        )}
                    </p>
                </motion.div>
            </TililaContainer>
        </section>
    );
}
