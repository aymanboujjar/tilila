import React from 'react';
import SectionCard from '@/pages/events/Partials/Details/SectionCard';

function PartnerRow({ name, url, logo }) {
    const content = (
        <div className="flex w-full items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-colors">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted/80 ring-1 ring-border">
                {logo ? (
                    <img
                        src={logo}
                        alt={name}
                        className="max-h-11 max-w-11 object-contain"
                    />
                ) : (
                    <span className="text-[10px] font-bold text-muted-foreground">
                        —
                    </span>
                )}
            </div>
            <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-extrabold text-foreground">
                    {name}
                </div>
                {url ? (
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">
                        {url.replace(/^https?:\/\//, '')}
                    </div>
                ) : null}
            </div>
        </div>
    );

    if (url) {
        return (
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="block outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            >
                {content}
            </a>
        );
    }

    return content;
}

export default function PartnersCard({ title = 'Partners', items = [] }) {
    return (
        <SectionCard title={title}>
            <div className="flex flex-col gap-2.5">
                {items.map((item, idx) => {
                    const isObj = item && typeof item === 'object';
                    const name = isObj ? item.name : item;
                    const url = isObj ? item.url : null;
                    const logo = isObj ? item.logo : null;
                    return (
                        <PartnerRow
                            key={`${name}-${idx}`}
                            name={name}
                            url={url}
                            logo={logo}
                        />
                    );
                })}
            </div>
        </SectionCard>
    );
}
