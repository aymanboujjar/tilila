import { Download, FileSpreadsheet, FileText } from 'lucide-react';

import { cn } from '@/lib/utils';

const modules = [
    {
        name: 'Tilitalks',
        label: 'Engagement',
        pct: 83,
        barClass: 'bg-alpha-purple',
    },
    {
        name: 'Trophée',
        label: 'Participation',
        pct: 62,
        barClass: 'bg-alpha-yellow',
    },
    {
        name: 'Tililab',
        label: 'Completion',
        pct: 94,
        barClass: 'bg-beta-blue',
    },
    {
        name: 'Other Initiatives',
        label: 'Reach',
        pct: 40,
        barClass: 'bg-tgray',
    },
] as const;

const reports = [
    {
        title: 'Global ESG Report',
        meta: 'PDF · 4.2 MB',
        icon: FileText,
        iconClass: 'text-alpha-green bg-beta-green',
    },
    {
        title: 'Diversity Metrics',
        meta: 'XLSX · 1.6 MB',
        icon: FileSpreadsheet,
        iconClass: 'text-beta-blue bg-alpha-blue',
    },
    {
        title: 'Media Impact Summary',
        meta: 'PDF · 2.1 MB',
        icon: FileText,
        iconClass: 'text-alpha-yellow bg-beta-yellow',
    },
] as const;

export function DashboardRightColumn() {
    return (
        <div className="flex flex-col gap-6">
            <div className="border-border/70 space-y-4 rounded-xl border bg-card p-5 shadow-sm">
                <h2 className="text-tblack text-base font-semibold">
                    Module Performance
                </h2>
                <div className="flex items-end justify-between gap-2 sm:gap-3">
                    {modules.map((m) => (
                        <div
                            key={m.name}
                            className="flex min-w-0 flex-1 flex-col items-center gap-2"
                        >
                            <div className="bg-muted/80 flex h-36 w-full max-w-[3rem] flex-col justify-end rounded-md sm:h-40 sm:max-w-[3.5rem]">
                                <div
                                    className={cn(
                                        'w-full rounded-md transition-all',
                                        m.barClass,
                                    )}
                                    style={{ height: `${m.pct}%` }}
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-tblack truncate text-xs font-semibold">
                                    {m.name}
                                </p>
                                <p className="text-tgray text-[0.65rem] leading-tight">
                                    {m.pct}% {m.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-beta-blue/25 bg-alpha-blue/80 rounded-xl border px-4 py-3">
                <p className="text-tblack text-sm leading-relaxed">
                    <span className="text-beta-blue font-semibold">
                        Insight:
                    </span>{' '}
                    Tililab shows the highest completion rate, suggesting strong
                    expert commitment to upskilling programs.
                </p>
            </div>

            <div className="bg-tblack text-twhite space-y-4 rounded-xl p-5 shadow-md">
                <h2 className="text-base font-semibold tracking-tight">
                    ESG / RSE Reports
                </h2>
                <ul className="space-y-3">
                    {reports.map((r) => {
                        const Icon = r.icon;

                        return (
                            <li key={r.title}>
                                <button
                                    type="button"
                                    className="hover:bg-twhite/8 flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors"
                                >
                                    <span
                                        className={cn(
                                            'flex size-10 shrink-0 items-center justify-center rounded-lg',
                                            r.iconClass,
                                        )}
                                    >
                                        <Icon className="size-5" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-sm font-medium">
                                            {r.title}
                                        </span>
                                        <span className="text-twhite/65 text-xs">
                                            {r.meta}
                                        </span>
                                    </span>
                                    <Download className="text-twhite/80 size-4 shrink-0" />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
