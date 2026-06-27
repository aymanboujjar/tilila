import { motion, useReducedMotion } from 'framer-motion';

import { HOME_EASE, RevealOnScroll } from '@/components/motion/home-motion';

export function EditionMotionSection({ children, className = '', id }) {
    return (
        <RevealOnScroll
            as={motion.section}
            id={id}
            className={`scroll-mt-36 ${className}`}
            y={40}
        >
            {children}
        </RevealOnScroll>
    );
}

export function MotionCard({ children, className = '' }) {
    const reduced = useReducedMotion();

    if (reduced) {
        return <article className={className}>{children}</article>;
    }

    return (
        <motion.article
            className={className}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.28, ease: HOME_EASE }}
        >
            {children}
        </motion.article>
    );
}
