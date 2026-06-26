import { motion } from 'framer-motion';
import { ARCHIVE_CATEGORY_ICONS } from '@/pages/user/tilila/utils/archiveCategories';
import { useTranslation } from '@/contexts/TranslationContext';

const GRADIENTS = {
    laureats: 'from-amber-500/15 via-amber-400/5 to-transparent',
    campagnes: 'from-violet-500/15 via-violet-400/5 to-transparent',
    marques: 'from-sky-500/15 via-sky-400/5 to-transparent',
    agences: 'from-emerald-500/15 via-emerald-400/5 to-transparent',
    jurys: 'from-rose-500/15 via-rose-400/5 to-transparent',
    photos: 'from-fuchsia-500/15 via-fuchsia-400/5 to-transparent',
    videos: 'from-indigo-500/15 via-indigo-400/5 to-transparent',
};

export default function StatisticCard({ categoryId, count, index = 0 }) {
    const { t } = useTranslation();
    const Icon = ARCHIVE_CATEGORY_ICONS[categoryId];
    const gradient = GRADIENTS[categoryId] ?? GRADIENTS.laureats;

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-beta-white p-5 shadow-sm transition hover:shadow-md"
        >
            <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${gradient}`}
            />
            <div className="relative flex items-start justify-between gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-beta-blue/10 bg-twhite text-beta-blue shadow-sm">
                    <Icon className="size-4.5" aria-hidden />
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-beta-blue">
                    {count}
                </span>
            </div>
            <p className="relative mt-3 text-sm font-bold text-tblack">
                {t(`tilila.archives.stats.${categoryId}`)}
            </p>
            <p className="relative mt-1 line-clamp-2 text-xs leading-relaxed text-tgray">
                {t(`tilila.archives.statsHint.${categoryId}`)}
            </p>
        </motion.article>
    );
}
