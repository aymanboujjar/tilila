import React from 'react';

import TransText from '@/components/TransText';

const FALLBACK_LINKS = [
    {
        label: {
            en: 'Media kit (PDF)',
            fr: 'Kit média (PDF)',
            ar: 'حقيبة الإعلام (PDF)',
        },
        url: null,
    },
    {
        label: {
            en: 'Tilila charter',
            fr: 'Charte Tilila',
            ar: 'ميثاق تيليلا',
        },
        url: null,
    },
    {
        label: {
            en: 'Press contacts',
            fr: 'Contacts presse',
            ar: 'جهات اتصال الصحافة',
        },
        url: null,
    },
];

export default function SidebarResources({ links = null }) {
    const list =
        Array.isArray(links) && links.length > 0 ? links : FALLBACK_LINKS;

    return (
        <aside className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="text-xs font-extrabold tracking-wide text-muted-foreground uppercase">
                <TransText en="Resources" fr="Ressources" ar="الموارد" />
            </div>

            <div className="mt-4 space-y-2">
                {list.map((r, idx) => {
                    const href = r?.url?.trim() || null;
                    const key =
                        typeof r?.label?.en === 'string'
                            ? r.label.en
                            : `res-${idx}`;
                    const inner = (
                        <TransText
                            en={r?.label?.en ?? ''}
                            fr={r?.label?.fr ?? ''}
                            ar={r?.label?.ar ?? ''}
                        />
                    );
                    const className =
                        'block w-full rounded-lg bg-background px-4 py-3 text-left text-sm font-semibold text-beta-blue ring-1 ring-border hover:bg-secondary';

                    if (href) {
                        return (
                            <a
                                key={key}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className={className}
                            >
                                {inner}
                            </a>
                        );
                    }

                    return (
                        <button
                            key={key}
                            type="button"
                            className={className}
                        >
                            {inner}
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}
