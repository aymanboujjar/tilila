import { motion } from 'framer-motion';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';

export default function ArchivesTimeline({ years, activeYear, onYearSelect }) {
    const { t } = useTranslation();

    if (!years.length) return null;

    return (
        <section
            aria-label={t('tilila.archives.timelineAria')}
            className="border-b border-border/40 bg-white/50 py-6 dark:border-white/10 dark:bg-white/[0.02]"
        >
            <TililaContainer>
                <p className="mb-4 text-xs font-bold tracking-[0.24em] text-beta-blue uppercase dark:text-beta-turquoise">
                    {t('tilila.archives.timelineLabel')}
                </p>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-3 start-0 end-0 hidden h-px bg-linear-to-r from-transparent via-beta-blue/25 to-transparent sm:block dark:via-beta-turquoise/25" />
                    <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {years.map((year, index) => {
                            const isActive = String(activeYear) === String(year);

                            return (
                                <motion.button
                                    key={year}
                                    type="button"
                                    onClick={() => onYearSelect(year)}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`relative shrink-0 snap-start rounded-full border px-5 py-2.5 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-beta-blue/40 ${
                                        isActive
                                            ? 'border-beta-blue bg-beta-blue text-twhite shadow-lg dark:border-beta-turquoise dark:bg-beta-turquoise dark:text-tblack'
                                            : 'border-border/60 bg-white text-tblack hover:border-beta-blue/40 hover:text-beta-blue dark:border-white/10 dark:bg-white/5 dark:text-twhite dark:hover:border-beta-turquoise/40'
                                    }`}
                                    aria-current={isActive ? 'true' : undefined}
                                >
                                    {year}
                                    {index < years.length - 1 ? (
                                        <span
                                            className="pointer-events-none absolute -end-3 top-1/2 hidden size-1.5 -translate-y-1/2 rounded-full bg-beta-blue/30 sm:block dark:bg-beta-turquoise/30"
                                            aria-hidden
                                        />
                                    ) : null}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </TililaContainer>
        </section>
    );
}
