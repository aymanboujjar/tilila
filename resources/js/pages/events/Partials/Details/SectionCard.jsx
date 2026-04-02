import React from 'react';

export default function SectionCard({ title, children, right }) {
    return (
        <section className="rounded-2xl bg-card shadow-sm ring-1 ring-border">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
                <div className="text-sm font-extrabold text-foreground">{title}</div>
                {right ? <div className="text-xs text-muted-foreground">{right}</div> : null}
            </div>
            <div className="px-5 py-5">{children}</div>
        </section>
    );
}

