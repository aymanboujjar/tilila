import React from 'react';
import SectionCard from '@/pages/events/Partials/Details/SectionCard';

function PartnerPill({ name, url, logo }) {
    const inner = (
        <div className="flex min-h-[4.5rem] flex-col items-center justify-center gap-2 px-3 py-3 text-center">
            {logo ? (
                <img
                    src={logo}
                    alt=""
                    className="max-h-10 max-w-[90%] object-contain"
                />
            ) : null}
            <span className="text-xs font-extrabold text-foreground">{name}</span>
        </div>
    );

    if (url) {
        return (
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex rounded-xl bg-background ring-1 ring-border transition hover:bg-accent/40"
            >
                {inner}
            </a>
        );
    }

    return (
        <div className="rounded-xl bg-background ring-1 ring-border">{inner}</div>
    );
}

export default function PartnersCard({ title = 'Partners', items = [] }) {
    return (
        <SectionCard title={title}>
            <div className="grid grid-cols-2 gap-3">
                {items.map((item, idx) => {
                    const isObj = item && typeof item === 'object';
                    const name = isObj ? item.name : item;
                    const url = isObj ? item.url : null;
                    const logo = isObj ? item.logo : null;
                    return (
                        <PartnerPill
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

