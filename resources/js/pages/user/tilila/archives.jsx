import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import TililaAwardsLayout from '@/layouts/tilila-awards-layout';
import ArchivesEmptyState from '@/pages/user/tilila/archives/components/ArchivesEmptyState';
import ArchivesFilters from '@/pages/user/tilila/archives/components/ArchivesFilters';
import ArchivesHero from '@/pages/user/tilila/archives/components/ArchivesHero';
import ArchivesStats from '@/pages/user/tilila/archives/components/ArchivesStats';
import ArchivesTimeline from '@/pages/user/tilila/archives/components/ArchivesTimeline';
import EditionCard from '@/pages/user/tilila/archives/components/EditionCard';
import { useArchivesPage } from '@/pages/user/tilila/archives/hooks/useArchivesPage';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { buildArchiveEditions } from '@/pages/user/tilila/utils/archiveEditions';
import { computeGlobalStats } from '@/pages/user/tilila/utils/archivesPageData';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililaArchives() {
    const { editions: rawEditions } = usePage().props;
    const { t, locale } = useTranslation();

    const editions = useMemo(
        () => buildArchiveEditions(rawEditions ?? []),
        [rawEditions],
    );

    const globalStats = useMemo(
        () => computeGlobalStats(editions, locale),
        [editions, locale],
    );

    const {
        query,
        setQuery,
        yearFilter,
        setYearFilter,
        sort,
        setSort,
        timelineYear,
        years,
        filtered,
        hasActiveFilters,
        resetFilters,
        scrollToYear,
    } = useArchivesPage(editions, locale);

    return (
        <>
            <Head title={t('tilila.archives.pageTitle')} />

            <div className="min-h-screen bg-twhite dark:bg-[#080510]">
                <ArchivesHero
                    globalStats={globalStats}
                    searchQuery={query}
                    onSearchChange={setQuery}
                />

                <ArchivesStats stats={globalStats} />

                <ArchivesFilters
                    years={years}
                    yearFilter={yearFilter}
                    onYearChange={setYearFilter}
                    sort={sort}
                    onSortChange={setSort}
                    resultCount={filtered.length}
                    onReset={resetFilters}
                    hasActiveFilters={hasActiveFilters}
                />

                <ArchivesTimeline
                    years={years}
                    activeYear={timelineYear ?? filtered[0]?.year}
                    onYearSelect={scrollToYear}
                />

                <section
                    id="editions"
                    className="py-14 sm:py-20"
                    aria-label={t('tilila.archives.editionsSectionAria')}
                >
                    {filtered.length === 0 ? (
                        <ArchivesEmptyState onReset={resetFilters} />
                    ) : (
                        <TililaContainer>
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-10 max-w-2xl"
                            >
                                <p className="text-xs font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                                    {t('tilila.archives.editionsKicker')}
                                </p>
                                <h2 className="mt-2 text-2xl font-bold tracking-tight text-beta-blue dark:text-twhite sm:text-3xl">
                                    {t('tilila.archives.editionsTitle')}
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-tgray dark:text-twhite/65 sm:text-base">
                                    {t('tilila.archives.editionsSubtitle')}
                                </p>
                            </motion.div>

                            <div className="grid gap-8 lg:grid-cols-2 xl:gap-10">
                                {filtered.map((edition, index) => (
                                    <EditionCard
                                        key={edition.id}
                                        edition={edition}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </TililaContainer>
                    )}
                </section>
            </div>
        </>
    );
}

TililaArchives.layout = (page) => (
    <TililaAwardsLayout>{page}</TililaAwardsLayout>
);
