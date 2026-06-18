import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

function FloatingShape({ className, delay = 0 }) {
    return (
        <motion.div
            aria-hidden
            className={className}
            animate={{
                y: [0, -18, 0],
                x: [0, 10, 0],
                rotate: [0, 6, 0],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            }}
        />
    );
}

export default function ArchivesHero({
    globalStats,
    searchQuery,
    onSearchChange,
}) {
    const { t } = useTranslation();

    return (
        <section className="relative overflow-hidden border-b border-beta-blue/10 bg-linear-to-br from-[#2e1861] via-[#3d2578] to-[#120a2e] text-twhite dark:from-[#0f0824] dark:via-[#1a1045] dark:to-[#080510]">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                }}
            />
            <FloatingShape
                className="pointer-events-none absolute -top-16 end-0 size-72 rounded-full bg-beta-turquoise/25 blur-3xl"
                delay={0}
            />
            <FloatingShape
                className="pointer-events-none absolute bottom-0 start-0 size-96 rounded-full bg-beta-blue/30 blur-3xl"
                delay={2}
            />
            <FloatingShape
                className="pointer-events-none absolute top-1/3 start-1/4 size-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl"
                delay={1}
            />

            <TililaContainer className="relative py-14 sm:py-20 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link
                        href="/tilila"
                        className="inline-flex items-center gap-2 rounded-full border border-twhite/20 bg-twhite/10 px-4 py-2 text-xs font-bold tracking-wide uppercase backdrop-blur transition hover:bg-twhite/15"
                    >
                        <ChevronLeft className="size-4" />
                        {t('tilila.archives.backToTilila')}
                    </Link>

                    <p className="mt-10 text-xs font-bold tracking-[0.32em] text-beta-turquoise uppercase">
                        {t('tilila.archives.heritage')}
                    </p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                        {t('tilila.archives.title')}
                    </h1>
                    <p className="mt-6 max-w-3xl text-base leading-relaxed text-twhite/80 sm:text-lg">
                        {t('tilila.archives.subtitle')}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <div className="rounded-2xl border border-twhite/15 bg-twhite/10 px-5 py-3 backdrop-blur">
                            <p className="text-2xl font-extrabold">
                                {globalStats.editions}
                            </p>
                            <p className="text-xs font-semibold tracking-wide text-twhite/70 uppercase">
                                {t('tilila.archives.editionsCount')}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-twhite/15 bg-twhite/10 px-5 py-3 backdrop-blur">
                            <p className="text-2xl font-extrabold">
                                {globalStats.laureats}
                            </p>
                            <p className="text-xs font-semibold tracking-wide text-twhite/70 uppercase">
                                {t('tilila.archives.stats.laureats')}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-twhite/15 bg-twhite/10 px-5 py-3 backdrop-blur">
                            <p className="text-2xl font-extrabold">
                                {globalStats.campagnes}
                            </p>
                            <p className="text-xs font-semibold tracking-wide text-twhite/70 uppercase">
                                {t('tilila.archives.stats.campagnes')}
                            </p>
                        </div>
                    </div>

                    <div className="relative mt-10 max-w-xl">
                        <label htmlFor="archives-search" className="sr-only">
                            {t('tilila.archives.searchPlaceholder')}
                        </label>
                        <Search
                            className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-twhite/50"
                            aria-hidden
                        />
                        <input
                            id="archives-search"
                            type="search"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={t('tilila.archives.searchPlaceholder')}
                            className="w-full rounded-2xl border border-twhite/20 bg-twhite/10 py-4 ps-12 pe-4 text-sm text-twhite placeholder:text-twhite/50 backdrop-blur transition focus:border-beta-turquoise/50 focus:bg-twhite/15 focus:outline-none focus:ring-2 focus:ring-beta-turquoise/30"
                        />
                    </div>
                </motion.div>
            </TililaContainer>
        </section>
    );
}
