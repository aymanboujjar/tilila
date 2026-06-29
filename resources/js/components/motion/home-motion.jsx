import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

export const HOME_EASE = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, margin: '-48px', amount: 0.15 };

export function RevealOnScroll({
    children,
    className,
    delay = 0,
    y = 24,
    x = 0,
    scale = 1,
    duration = 0.5,
    once = true,
    as: Component = motion.div,
}) {
    const reduced = useReducedMotion();

    if (reduced) {
        return <div className={className}>{children}</div>;
    }

    return (
        <Component
            className={className}
            initial={{
                opacity: 0,
                y,
                x,
                scale: scale === 1 ? 1 : scale * 0.98,
            }}
            whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            viewport={once ? VIEWPORT : { ...VIEWPORT, once: false }}
            transition={{ duration, delay, ease: HOME_EASE }}
            style={{ willChange: 'opacity, transform' }}
        >
            {children}
        </Component>
    );
}

export function StaggerReveal({
    children,
    className,
    stagger = 0.08,
    delayChildren = 0.04,
}) {
    const reduced = useReducedMotion();

    if (reduced) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: stagger, delayChildren },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className, y = 20 }) {
    const reduced = useReducedMotion();

    if (reduced) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: HOME_EASE },
                },
            }}
            style={{ willChange: 'opacity, transform' }}
        >
            {children}
        </motion.div>
    );
}

export function FadeInText({ en, fr, ar, className, delay = 0 }) {
    const { locale } = useTranslation();
    const reduced = useReducedMotion();
    const text = locale === 'ar' ? ar : locale === 'fr' ? fr : en;

    if (reduced) {
        return <span className={className}>{text}</span>;
    }

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay, ease: HOME_EASE }}
        >
            {text}
        </motion.span>
    );
}

function parseNumericStat(value) {
    if (typeof value !== 'string') {
        return null;
    }

    const match = value.match(/^(\+?)(\d+)(\+?)$/);

    if (!match) {
        return null;
    }

    return {
        prefix: match[1],
        number: Number.parseInt(match[2], 10),
        suffix: match[3],
    };
}

export function CountUpStat({ value, className }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-32px' });
    const reduced = useReducedMotion();
    const parsed = useMemo(() => parseNumericStat(value), [value]);
    const [display, setDisplay] = useState(value);

    useEffect(() => {
        if (!parsed) {
            setDisplay(value);
            return undefined;
        }

        if (reduced) {
            setDisplay(value);
            return undefined;
        }

        if (!inView) {
            return undefined;
        }

        const duration = 700;
        const start = performance.now();
        let frameId = 0;
        const target = parsed.number;

        const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const current = Math.round(target * progress);
            setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);

            if (progress < 1) {
                frameId = requestAnimationFrame(tick);
            }
        };

        frameId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frameId);
    }, [inView, reduced, parsed, value]);

    return (
        <span ref={ref} className={className}>
            {display}
        </span>
    );
}

export function SlideIn({
    children,
    className,
    direction = 'left',
    delay = 0,
}) {
    const reduced = useReducedMotion();
    const offset =
        direction === 'right'
            ? 32
            : direction === 'left'
              ? -32
              : direction === 'up'
                ? 24
                : -24;

    if (reduced) {
        return <div className={className}>{children}</div>;
    }

    const initial =
        direction === 'up' || direction === 'down'
            ? { opacity: 0, y: offset }
            : { opacity: 0, x: offset };

    return (
        <motion.div
            className={className}
            initial={initial}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.55, delay, ease: HOME_EASE }}
            style={{ willChange: 'opacity, transform' }}
        >
            {children}
        </motion.div>
    );
}
