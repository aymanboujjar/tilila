import { motion } from 'framer-motion';
import { RotateCcw, Trophy } from 'lucide-react';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';

export default function ArchivesEmptyState({ onReset }) {
    const { t } = useTranslation();

    return (
        <TililaContainer className="py-20 sm:py-28">
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-lg rounded-3xl border border-dashed border-beta-blue/25 bg-white/70 p-10 text-center shadow-[0_20px_60px_rgba(46,24,97,0.08)] backdrop-blur-xl dark:border-white/15 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
                <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-linear-to-br from-beta-blue/15 to-beta-turquoise/15 text-beta-blue dark:text-beta-turquoise">
                    <Trophy className="size-9" aria-hidden />
                </div>
                <h3 className="mt-6 text-xl font-bold text-beta-blue dark:text-twhite">
                    {t('tilila.archives.empty.title')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-tgray dark:text-twhite/65">
                    {t('tilila.archives.empty.message')}
                </p>
                <button
                    type="button"
                    onClick={onReset}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-beta-blue px-6 py-3 text-xs font-bold tracking-wide text-twhite uppercase transition hover:bg-brand-light-purple"
                >
                    <RotateCcw className="size-4" />
                    {t('tilila.archives.resetFilters')}
                </button>
            </motion.div>
        </TililaContainer>
    );
}
