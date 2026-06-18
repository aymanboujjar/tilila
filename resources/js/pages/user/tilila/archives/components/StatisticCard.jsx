import { motion } from 'framer-motion';
import { ARCHIVE_CATEGORY_ICONS } from '@/pages/user/tilila/utils/archiveCategories';
import { useTranslation } from '@/contexts/TranslationContext';

const GRADIENTS = {
    laureats: 'from-amber-500/20 via-amber-400/10 to-transparent dark:from-amber-400/25',
    campagnes: 'from-violet-500/20 via-violet-400/10 to-transparent dark:from-violet-400/25',
    marques: 'from-sky-500/20 via-sky-400/10 to-transparent dark:from-sky-400/25',
    agences: 'from-emerald-500/20 via-emerald-400/10 to-transparent dark:from-emerald-400/25',
    jurys: 'from-rose-500/20 via-rose-400/10 to-transparent dark:from-rose-400/25',
    photos: 'from-fuchsia-500/20 via-fuchsia-400/10 to-transparent dark:from-fuchsia-400/25',
    videos: 'from-indigo-500/20 via-indigo-400/10 to-transparent dark:from-indigo-400/25',
};

export default function StatisticCard({ categoryId, count, index = 0 }) {
    const { t } = useTranslation();
    const Icon = ARCHIVE_CATEGORY_ICONS[categoryId];
    const gradient = GRADIENTS[categoryId] ?? GRADIENTS.laureats;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-5 shadow-[0_8px_32px_rgba(46,24,97,0.08)] backdrop-blur-xl transition-shadow hover:shadow-[0_16px_48px_rgba(46,24,97,0.14)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]`}
        >
            <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${gradient} opacity-80 transition-opacity group-hover:opacity-100`}
            />
            <div className="relative flex items-start justify-between gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-beta-blue/10 bg-white/80 text-beta-blue shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-beta-turquoise">
                    <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-3xl font-extrabold tracking-tight text-beta-blue dark:text-twhite">
                    {count}
                </span>
            </div>
            <p className="relative mt-4 text-sm font-bold text-tblack dark:text-twhite">
                {t(`tilila.archives.stats.${categoryId}`)}
            </p>
            <p className="relative mt-1 line-clamp-2 text-xs leading-relaxed text-tgray dark:text-twhite/60">
                {t(`tilila.archives.statsHint.${categoryId}`)}
            </p>
        </motion.article>
    );
}
