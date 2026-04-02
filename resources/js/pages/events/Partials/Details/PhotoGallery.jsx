import React from 'react';

function Tile({ label, isMore }) {
    return (
        <div
            className={[
                'relative overflow-hidden rounded-2xl bg-muted ring-1 ring-border',
                isMore ? 'flex items-center justify-center' : '',
            ].join(' ')}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-tblack/15 via-transparent to-transparent" />
            {isMore ? (
                <div className="relative text-sm font-extrabold text-foreground">
                    {label}
                </div>
            ) : (
                <div className="relative p-4 text-[11px] font-semibold text-muted-foreground">
                    {label}
                </div>
            )}
        </div>
    );
}

export default function PhotoGallery({ title = 'Photo Gallery', items = [] }) {
    return (
        <section>
            <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-foreground">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-alpha-blue text-beta-blue ring-1 ring-border">
                    ✦
                </span>
                {title}
            </div>
            <div className="grid grid-cols-3 gap-4">
                {items.map((img) => (
                    <div key={img.label} className="aspect-square">
                        <Tile label={img.label} isMore={Boolean(img.isMore)} />
                    </div>
                ))}
            </div>
        </section>
    );
}

