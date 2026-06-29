import { Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import TransText from '@/components/TransText';
import { HOME_EASE } from '@/components/motion/home-motion';
import {
    HERO_UNDER_NAV,
    TililaContainer,
} from '@/pages/user/tilila/partials/TililaUi';

const heroItem = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: HOME_EASE },
    }),
};

export default function EditionPageHeroBand({
    year,
    label,
    theme,
    coverSrc,
    backHref,
    backLabel,
    programName,
    isCurrent,
    currentBadge,
}) {
    const reduced = useReducedMotion();

    return (
        <section
            className={`${HERO_UNDER_NAV} min-h-[340px] overflow-hidden sm:min-h-[400px] lg:min-h-[440px]`}
        >
            {coverSrc ? (
                reduced ? (
                    <img
                        src={coverSrc}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading="eager"
                        decoding="async"
                    />
                ) : (
                    <motion.img
                        src={coverSrc}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading="eager"
                        decoding="async"
                        initial={{ scale: 1.12 }}
                        animate={{ scale: [1.12, 1.06, 1.12] }}
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                )
            ) : (
                <div className="absolute inset-0 bg-beta-blue" aria-hidden />
            )}

            <div className="absolute inset-0 bg-linear-to-br from-beta-blue/95 via-brand-light-purple/88 to-beta-blue/75" />

            {!reduced ? (
                <>
                    <motion.div
                        className="pointer-events-none absolute -end-20 top-1/4 size-64 rounded-full bg-beta-turquoise/20 blur-3xl"
                        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.15, 1] }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className="pointer-events-none absolute -start-16 bottom-0 size-72 rounded-full bg-brand-light-purple/25 blur-3xl"
                        animate={{ opacity: [0.25, 0.5, 0.25], y: [0, -18, 0] }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </>
            ) : null}

            <TililaContainer className="relative flex min-h-[inherit] flex-col justify-end pb-12 pt-8 sm:pb-14 lg:pb-16">
                <motion.div
                    initial={reduced ? false : 'hidden'}
                    animate="visible"
                    custom={0.05}
                    variants={heroItem}
                >
                    <Link
                        href={backHref}
                        className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-twhite/25 bg-twhite/10 px-4 py-2 text-xs font-bold tracking-wide text-twhite uppercase backdrop-blur-sm transition hover:bg-twhite/20"
                    >
                        <ChevronLeft className="size-4" aria-hidden />
                        <TransText
                            en={backLabel.en}
                            fr={backLabel.fr}
                            ar={backLabel.ar}
                        />
                    </Link>
                </motion.div>

                <div className="max-w-3xl">
                    <motion.p
                        className="text-[11px] font-bold tracking-[0.28em] text-beta-turquoise uppercase"
                        initial={reduced ? false : 'hidden'}
                        animate="visible"
                        custom={0.12}
                        variants={heroItem}
                    >
                        <TransText
                            en={programName.en}
                            fr={programName.fr}
                            ar={programName.ar}
                        />
                    </motion.p>

                    <motion.div
                        className="mt-3 flex flex-wrap items-end gap-3"
                        initial={reduced ? false : 'hidden'}
                        animate="visible"
                        custom={0.2}
                        variants={heroItem}
                    >
                        <h1 className="text-5xl font-extrabold tracking-tight text-beta-turquoise sm:text-6xl lg:text-7xl">
                            {year}
                        </h1>
                        {isCurrent ? (
                            <motion.span
                                className="mb-2 inline-flex rounded-full border border-twhite/30 bg-twhite/15 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-twhite uppercase backdrop-blur-sm"
                                animate={
                                    reduced
                                        ? undefined
                                        : { scale: [1, 1.04, 1] }
                                }
                                transition={{
                                    duration: 2.8,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                <TransText
                                    en={currentBadge.en}
                                    fr={currentBadge.fr}
                                    ar={currentBadge.ar}
                                />
                            </motion.span>
                        ) : null}
                    </motion.div>

                    {label ? (
                        <motion.p
                            className="mt-3 text-lg font-bold text-twhite sm:text-xl"
                            initial={reduced ? false : 'hidden'}
                            animate="visible"
                            custom={0.28}
                            variants={heroItem}
                        >
                            {label}
                        </motion.p>
                    ) : null}

                    {theme ? (
                        <motion.p
                            className="mt-3 max-w-2xl text-sm leading-relaxed text-twhite/90 sm:text-base"
                            initial={reduced ? false : 'hidden'}
                            animate="visible"
                            custom={0.36}
                            variants={heroItem}
                        >
                            {theme}
                        </motion.p>
                    ) : null}
                </div>
            </TililaContainer>
        </section>
    );
}
