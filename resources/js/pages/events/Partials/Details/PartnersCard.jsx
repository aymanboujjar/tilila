import React from 'react';
import SectionCard from '@/pages/events/Partials/Details/SectionCard';

function PartnerPill({ name }) {
    return (
        <div className="flex items-center justify-center rounded-xl bg-background px-4 py-3 text-xs font-extrabold text-foreground ring-1 ring-border">
            {name}
        </div>
    );
}

export default function PartnersCard({ title = 'Partners', items = [] }) {
    return (
        <SectionCard title={title}>
            <div className="grid grid-cols-2 gap-3">
                {items.map((name) => (
                    <PartnerPill key={name} name={name} />
                ))}
            </div>
        </SectionCard>
    );
}

