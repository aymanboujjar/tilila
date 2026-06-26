/** @param {{ kicker?: import('react').ReactNode, title: import('react').ReactNode, subtitle?: import('react').ReactNode, action?: import('react').ReactNode, className?: string }} props */
export default function ArchivesSectionHeading({
    kicker,
    title,
    subtitle,
    action,
    className = '',
}) {
    return (
        <div
            className={`flex flex-wrap items-end justify-between gap-4 ${className}`}
        >
            <div className="max-w-2xl">
                {kicker ? (
                    <p className="text-[11px] font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                        {kicker}
                    </p>
                ) : null}
                <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-beta-blue sm:text-2xl">
                    {title}
                </h2>
                {subtitle ? (
                    <p className="mt-2 text-sm leading-relaxed text-tgray">
                        {subtitle}
                    </p>
                ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
        </div>
    );
}
