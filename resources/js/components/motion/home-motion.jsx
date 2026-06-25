import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

export const HOME_EASE = [0.22, 1, 0.36, 1];

export function RevealOnScroll({
    children,
    className,
    delay = 0,
    y = 40,
    x = 0,
    scale = 1,
    duration = 0.65,
    once = true,
    as: Component = motion.div,
}) {
    const reduced = useReducedMotion();

    return (
        <Component
            className={className}
            initial={
                reduced ? false : { opacity: 0, y, x, scale: scale === 1 ? undefined : scale * 0.96 }
            }
            whileInView={reduced ? undefined : { opacity: 1, y: 0, x: 0, scale: 1 }}
            viewport={{ once, margin: '-72px' }}
            transition={{ duration, delay, ease: HOME_EASE }}
        >
            {children}
        </Component>
    );
}

export function StaggerReveal({
    children,
    className,
    stagger = 0.1,
    delayChildren = 0.05,
}) {
    const reduced = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-64px' }}
            variants={
                reduced
                    ? undefined
                    : {
                          hidden: {},
                          visible: {
                              transition: { staggerChildren: stagger, delayChildren },
                          },
                      }
            }
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className, y = 36 }) {
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
                    transition: { duration: 0.55, ease: HOME_EASE },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function TypewriterText({
    en,
    fr,
    ar,
    className,
    delay = 0,
    speed = 32,
    onComplete,
    active = true,
    done = false,
}) {
    const { locale } = useTranslation();
    const reduced = useReducedMotion();
    const text = locale === 'ar' ? ar : locale === 'fr' ? fr : en;
    const [displayed, setDisplayed] = useState(done || reduced ? text : '');

    useEffect(() => {
        if (done || reduced) {
            setDisplayed(text);
            return undefined;
        }

        if (!active) {
            setDisplayed('');
            return undefined;
        }

        setDisplayed('');
        let index = 0;
        let intervalId;

        const timeoutId = window.setTimeout(() => {
            intervalId = window.setInterval(() => {
                index += 1;
                setDisplayed(text.slice(0, index));

                if (index >= text.length) {
                    window.clearInterval(intervalId);
                    onComplete?.();
                }
            }, speed);
        }, delay);

        return () => {
            window.clearTimeout(timeoutId);
            if (intervalId) {
                window.clearInterval(intervalId);
            }
        };
    }, [active, done, reduced, text, delay, speed, onComplete]);

    const showCursor =
        !reduced && active && !done && displayed.length < text.length;

    return (
        <span className={className}>
            {displayed}
            {showCursor ? (
                <motion.span
                    className="ms-0.5 inline-block text-beta-turquoise"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 0.75, repeat: Infinity }}
                    aria-hidden
                >
                    |
                </motion.span>
            ) : null}
        </span>
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
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const reduced = useReducedMotion();
    const parsed = parseNumericStat(value);

    const motionValue = useMotionValue(0);
    const spring = useSpring(motionValue, { stiffness: 55, damping: 20, mass: 0.8 });
    const output = useTransform(spring, (current) => {
        if (!parsed) {
            return value;
        }

        return `${parsed.prefix}${Math.round(current)}${parsed.suffix}`;
    });

    useEffect(() => {
        if (!parsed) {
            return;
        }

        if (inView || reduced) {
            motionValue.set(parsed.number);
        }
    }, [inView, reduced, parsed, motionValue]);

    if (!parsed || reduced) {
        return (
            <span ref={ref} className={className}>
                {value}
            </span>
        );
    }

    return (
        <motion.span ref={ref} className={className}>
            {output}
        </motion.span>
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
        direction === 'right' ? 56 : direction === 'left' ? -56 : direction === 'up' ? 40 : -40;

    const initial =
        direction === 'up' || direction === 'down'
            ? { opacity: 0, y: offset }
            : { opacity: 0, x: offset };

    const animate =
        direction === 'up' || direction === 'down'
            ? { opacity: 1, y: 0 }
            : { opacity: 1, x: 0 };

    return (
        <motion.div
            className={className}
            initial={reduced ? false : initial}
            animate={reduced ? undefined : animate}
            transition={{ duration: 0.8, delay, ease: HOME_EASE }}
        >
            {children}
        </motion.div>
    );
}
