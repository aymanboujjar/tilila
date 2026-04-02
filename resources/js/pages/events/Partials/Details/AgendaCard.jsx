import React from 'react';
import SectionCard from '@/pages/events/Partials/Details/SectionCard';

export default function AgendaCard({ title = 'Agenda', items = [] }) {
    return (
        <SectionCard title={title}>
            <div className="space-y-3">
                {items.map((item) => (
                    <div key={`${item.time}-${item.label}`} className="flex gap-3">
                        <div className="w-12 shrink-0 text-xs font-extrabold text-muted-foreground">
                            {item.time}
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

