import { motion } from 'framer-motion';
import { ARCHIVE_STAT_KEYS } from '@/pages/user/tilila/utils/archivesPageData';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';
import StatisticCard from '@/pages/user/tilila/archives/components/StatisticCard';

export default function ArchivesStats({ stats }) {
    const { t } = useTranslation();

    return (
        <section
            id="statistics"
            className="relative border-b border-border/40 bg-linear-to-b from-beta-white to-twhite py-14 dark:from-[#0c0618] dark:to-[#120a22] sm:py-16"
        >
            <TililaContainer>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                >
                    <p className="text-xs font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                        {t('tilila.archives.statsSection.kicker')}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-beta-blue dark:text-twhite sm:text-3xl">
                        {t('tilila.archives.statsSection.title')}
                    </h2>
                </motion.div>

                <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
                    {ARCHIVE_STAT_KEYS.map((key, index) => (
                        <StatisticCard
                            key={key}
                            categoryId={key}
                            count={stats[key] ?? 0}
                            index={index}
                        />
                    ))}
                </div>

                <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
                    {ARCHIVE_STAT_KEYS.map((key, index) => (
                        <div
                            key={key}
                            className="w-[min(100%,260px)] shrink-0 snap-start"
                        >
                            <StatisticCard
                                categoryId={key}
                                count={stats[key] ?? 0}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </TililaContainer>
        </section>
    );
}
