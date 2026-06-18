import { cn } from '@/lib/utils';

export function PartnerLogoTile({ name, logoUrl, subtitle, tall = false }) {
    return (
        <div>
            {logoUrl && (
                <img
                    src={logoUrl}
                    alt={`${name} logo`}
                    className={cn(
                        'w-full object-contain',
                        tall ? 'max-h-25' : 'max-h-25',
                    )}
                    loading="lazy"
                    decoding="async"
                />
            )}
        </div>
    );
}

export function PartnerTier({ badge, title, description, children }) {
    return (
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm ring-1 ring-border/50">
            <p className="text-xs font-bold tracking-[0.18em] text-beta-blue uppercase">
                {badge}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-tblack">{title}</h3>
            {description ? (
                <p className="mt-2 text-sm leading-relaxed text-tgray">
                    {description}
                </p>
            ) : null}
            <div className="mt-4">{children}</div>
        </div>
    );
}
