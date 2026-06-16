import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Download } from 'lucide-react';
import TransText from '@/components/TransText';

export function TililaContainer({ children, className = '' }) {
    return (
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}

export function TililaSection({ id, children, className = '' }) {
    return (
        <section id={id} className={`py-14 sm:py-16 ${className}`}>
            {children}
        </section>
    );
}

export function TililaSectionHeading({
    title,
    subtitle,
    centered = false,
    className = '',
}) {
    const align = centered ? 'text-center mx-auto' : '';
    return (
        <div className={`max-w-3xl ${align} ${className}`}>
            <h2 className="text-2xl font-bold tracking-tight text-beta-blue sm:text-3xl lg:text-[2rem]">
                {title}
            </h2>
            {subtitle ? (
                <p className="mt-4 text-sm leading-relaxed text-tgray sm:text-base">
                    {subtitle}
                </p>
            ) : null}
        </div>
    );
}

export function TililaIconBadge({ icon: Icon, className = '' }) {
    return (
        <span
            className={`inline-flex size-11 items-center justify-center rounded-xl border border-beta-blue/15 bg-alpha-blue text-beta-blue ${className}`}
        >
            <Icon className="size-5 stroke-[1.5]" aria-hidden />
        </span>
    );
}

export function TililaTealText({ children, className = '' }) {
    return (
        <span
            className={`font-bold text-beta-turquoise ${className}`}
        >
            {children}
        </span>
    );
}

export function TililaDeadlinePill({ deadline }) {
    return (
        <p className="inline-flex items-center gap-2.5 text-sm font-semibold text-beta-turquoise">
            <Calendar className="size-5 shrink-0" aria-hidden />
            <TransText
                en={`Applications open until ${deadline}`}
                fr={`Candidatures ouvertes jusqu'au ${deadline}`}
                ar={`التقديم مفتوح حتى ${deadline}`}
            />
        </p>
    );
}

export function TililaBtnPrimary({ href, children, className = '' }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple ${className}`}
        >
            {children}
            <ArrowRight className="size-4" aria-hidden />
        </Link>
    );
}

export function TililaBtnOutline({ href, children, className = '' }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 border-beta-blue bg-transparent px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-beta-blue uppercase transition hover:bg-alpha-blue ${className}`}
        >
            <Download className="size-4" aria-hidden />
            {children}
        </Link>
    );
}

export function TililaBtnGhost({ href, children, className = '' }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border border-beta-blue px-5 py-2.5 text-xs font-bold tracking-[0.1em] text-beta-blue uppercase transition hover:bg-alpha-blue ${className}`}
        >
            {children}
            <ArrowRight className="size-4" aria-hidden />
        </Link>
    );
}

export function TililaCheckItem({ children }) {
    return (
        <li className="flex items-start gap-3 text-sm leading-relaxed text-tgray">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-beta-blue text-[10px] font-bold text-twhite">
                ✓
            </span>
            {children}
        </li>
    );
}
