import { motion, useReducedMotion } from 'framer-motion';
import TransText from '@/components/TransText';
import { HOME_EASE } from '@/components/motion/home-motion';

function NavLink({ href, children, delay = 0 }) {
    const reduced = useReducedMotion();

    return (
        <motion.a
            href={href}
            className="inline-flex shrink-0 items-center rounded-full border border-border/60 bg-twhite px-4 py-2 text-xs font-bold tracking-wide text-beta-blue uppercase shadow-sm transition-colors hover:border-beta-blue/40 hover:bg-alpha-blue"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: HOME_EASE }}
            whileHover={reduced ? undefined : { scale: 1.05, y: -2 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
        >
            {children}
        </motion.a>
    );
}

export default function EditionPageSectionNav({
    isCurrent,
    showVideo,
    showBootcamp = false,
}) {
    const reduced = useReducedMotion();
    let delay = 0.05;

    const nextDelay = () => {
        const value = delay;
        delay += 0.07;
        return value;
    };

    return (
        <motion.nav
            className="sticky top-[72px] z-30 -mx-4 border-b border-border/50 bg-twhite/92 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            aria-label="Edition sections"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: HOME_EASE }}
        >
            <div className="flex flex-wrap gap-2">
                {!isCurrent ? (
                    <NavLink href="#winners" delay={nextDelay()}>
                        <TransText en="Winners" fr="Lauréats" ar="الفائزون" />
                    </NavLink>
                ) : null}
                <NavLink href="#jury" delay={nextDelay()}>
                    <TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />
                </NavLink>
                {showBootcamp ? (
                    <NavLink href="#bootcamp" delay={nextDelay()}>
                        <TransText en="Bootcamp" fr="Bootcamp" ar="المعسكر" />
                    </NavLink>
                ) : null}
                <NavLink href="#gallery" delay={nextDelay()}>
                    <TransText en="Gallery" fr="Galerie" ar="المعرض" />
                </NavLink>
                {showVideo ? (
                    <NavLink href="#edition-hero" delay={nextDelay()}>
                        <TransText en="Video" fr="Vidéo" ar="فيديو" />
                    </NavLink>
                ) : null}
            </div>
        </motion.nav>
    );
}
