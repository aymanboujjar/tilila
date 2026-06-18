import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Award,
    Briefcase,
    Building2,
    Camera,
    Gavel,
    Megaphone,
    Play,
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const METRIC_CONFIG = [
    { key: 'laureats', icon: Award },
    { key: 'campagnes', icon: Megaphone },
    { key: 'marques', icon: Building2 },
    { key: 'agences', icon: Briefcase },
    { key: 'jurys', icon: Gavel },
    { key: 'photos', icon: Camera },
    { key: 'videos', icon: Play },
];

export default function EditionCard({ edition, index = 0 }) {
    const { t } = useTranslation();
    const stats = edition.stats ?? {};

    return (
        <motion.article
            id={`edition-${edition.year}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
            className="group scroll-mt-32"
        >
            <div className="overflow-hidden rounded-3xl border border-border/50 bg-white/80 shadow-[0_12px_40px_rgba(46,24,97,0.08)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(46,24,97,0.16)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-linear-to-br from-[#2e1861] to-[#1a1045]">
                    {edition.cover_image_src ? (
                        <img
                            src={edition.cover_image_src}
                            alt=""
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : null}
                    <div className="absolute inset-0 bg-linear-to-t from-tblack/85 via-tblack/25 to-transparent" />
                    <div className="absolute start-5 top-5 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-xs font-bold tracking-widest text-twhite backdrop-blur-md">
                        {t('tilila.archives.editionLabel')} {edition.year}
                    </div>
                    <div className="absolute start-0 end-0 bottom-0 p-6 sm:p-8">
                        <p className="text-4xl leading-none font-extrabold text-twhite sm:text-5xl">
                            {edition.year}
                        </p>
                        <p className="mt-2 text-base font-semibold text-twhite/90 sm:text-lg">
                            {edition.label}
                        </p>
                    </div>
                </div>

                <div className="p-6 sm:p-8">
                    {edition.theme ? (
                        <p className="line-clamp-3 text-sm leading-relaxed text-tgray sm:text-base dark:text-twhite/70">
                            {edition.theme}
                        </p>
                    ) : null}

                    <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                        {METRIC_CONFIG.map(({ key, icon: Icon }) => {
                            const value = stats[key] ?? 0;
                            if (value === 0) return null;

                            return (
                                <li
                                    key={key}
                                    className="flex items-center gap-2 rounded-xl border border-border/40 bg-beta-white/80 px-3 py-2.5 text-xs dark:border-white/10 dark:bg-white/5"
                                >
                                    <Icon
                                        className="size-3.5 shrink-0 text-beta-blue dark:text-beta-turquoise"
                                        aria-hidden
                                    />
                                    <span className="font-bold text-tblack dark:text-twhite">
                                        {value}
                                    </span>
                                    <span className="truncate text-tgray dark:text-twhite/60">
                                        {t(`tilila.archives.stats.${key}`)}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <Link
                        href={edition.details_url}
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-twhite uppercase transition hover:bg-brand-light-purple sm:w-auto"
                    >
                        {t('tilila.archives.discoverEdition')}
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}
