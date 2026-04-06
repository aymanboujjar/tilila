import { useMemo, useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
] as const;

/** Normalized 0–100 sample series for the 12-month chart */
const EXPERT_VISIBILITY = [
    42, 48, 45, 52, 58, 62, 68, 65, 70, 74, 72, 78,
];
const MEDIA_PLACEMENTS = [
    28, 32, 30, 36, 38, 41, 45, 44, 48, 50, 52, 55,
];

function buildPath(values: number[], width: number, height: number): string {
    const padX = 8;
    const padY = 8;
    const innerW = width - padX * 2;
    const innerH = height - padY * 2;
    const step = innerW / (values.length - 1);

    return values
        .map((v, i) => {
            const x = padX + i * step;
            const y = padY + innerH - (v / 100) * innerH;

            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        })
        .join(' ');
}

export function ImpactOverviewChart() {
    const [hoverIndex, setHoverIndex] = useState<number | null>(6);

    const vbW = 400;
    const vbH = 160;

    const expertPath = useMemo(
        () => buildPath(EXPERT_VISIBILITY, vbW, vbH),
        [],
    );
    const mediaPath = useMemo(
        () => buildPath(MEDIA_PLACEMENTS, vbW, vbH),
        [],
    );

    const activeIndex = hoverIndex ?? 6;
    const padX = 8;
    const step =
        (vbW - padX * 2) / (EXPERT_VISIBILITY.length - 1);
    const cx = padX + activeIndex * step;

    return (
        <Card className="border-border/70 shadow-sm">
            <CardHeader>
                <CardTitle className="text-tblack text-lg">
                    Impact Overview (12 Months)
                </CardTitle>
                <CardDescription>
                    Comparing expert visibility vs. media placements.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-beta-white relative rounded-lg border border-border/50 p-4">
                    <svg
                        viewBox={`0 0 ${vbW} ${vbH}`}
                        className="h-auto w-full max-h-48"
                        role="img"
                        aria-label="Line chart of expert visibility and media placements by month"
                    >
                        <title>Impact overview — 12 months</title>
                        {/* Grid lines */}
                        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                            <line
                                key={t}
                                x1={0}
                                x2={vbW}
                                y1={8 + t * (vbH - 16)}
                                y2={8 + t * (vbH - 16)}
                                className="stroke-border/60"
                                strokeWidth={1}
                            />
                        ))}
                        <path
                            d={expertPath}
                            fill="none"
                            className="stroke-beta-blue"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d={mediaPath}
                            fill="none"
                            className="stroke-alpha-purple"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {MONTHS.map((monthLabel, i) => {
                            const x = padX + i * step;

                            return (
                                <circle
                                    key={monthLabel}
                                    cx={x}
                                    cy={
                                        8 +
                                        (vbH - 16) -
                                        (EXPERT_VISIBILITY[i] / 100) *
                                            (vbH - 16)
                                    }
                                    r={hoverIndex === i ? 5 : 3}
                                    className={cn(
                                        'fill-beta-blue cursor-pointer transition-all',
                                        hoverIndex === i && 'stroke-twhite stroke-2',
                                    )}
                                    onMouseEnter={() => setHoverIndex(i)}
                                    onFocus={() => setHoverIndex(i)}
                                    tabIndex={0}
                                />
                            );
                        })}
                    </svg>
                    {hoverIndex !== null && (
                        <div
                            className="bg-card text-tblack border-border absolute z-10 max-w-[220px] rounded-lg border px-3 py-2 text-sm shadow-md"
                            style={{
                                left: `calc(${((cx / vbW) * 100).toFixed(1)}% - 90px)`,
                                top: '8px',
                            }}
                        >
                            <p className="text-tgray text-xs font-medium">
                                {MONTHS[activeIndex]}
                            </p>
                            <p className="text-tblack font-medium">
                                {EXPERT_VISIBILITY[activeIndex]} Experts /{' '}
                                {MEDIA_PLACEMENTS[activeIndex]} Placements
                            </p>
                        </div>
                    )}
                </div>
                <div className="text-tgray flex flex-wrap items-center justify-center gap-6 text-sm">
                    <span className="flex items-center gap-2">
                        <span className="bg-beta-blue size-3 rounded-full" />
                        Expert Visibility
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="bg-alpha-purple size-3 rounded-full" />
                        Media Placements
                    </span>
                </div>
                <div className="text-tgray flex flex-wrap justify-between gap-1 border-t border-border/50 pt-3 text-xs">
                    {MONTHS.map((m, i) => (
                        <button
                            key={m}
                            type="button"
                            onMouseEnter={() => setHoverIndex(i)}
                            onClick={() => setHoverIndex(i)}
                            className={cn(
                                'hover:text-tblack min-w-7 rounded px-0.5 transition-colors',
                                hoverIndex === i &&
                                    'text-beta-blue font-semibold',
                            )}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
