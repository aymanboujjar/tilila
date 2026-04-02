import React from 'react';
import SectionCard from '@/pages/events/Partials/Details/SectionCard';

function SpeakerRow({ name, role }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-muted ring-1 ring-border" />
            <div className="min-w-0">
                <div className="truncate text-sm font-extrabold text-foreground">
                    {name}
                </div>
                {role ? (
                    <div className="truncate text-xs text-muted-foreground">
                        {role}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default function SpeakersCard({ title = 'Speakers', items = [] }) {
    return (
        <SectionCard title={title} right={<span className="font-semibold">See all</span>}>
            <div className="space-y-4">
                {items.map((s) => (
                    <SpeakerRow key={s.name} name={s.name} role={s.role} />
                ))}
            </div>
        </SectionCard>
    );
}

