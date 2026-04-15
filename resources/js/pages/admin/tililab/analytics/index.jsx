import { Head, Link } from '@inertiajs/react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

function KpiCard({ label, value }) {
    return (
        <div className="rounded-xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {label}
            </div>
            <div className="mt-2 text-3xl font-bold text-foreground">
                {value ?? 0}
            </div>
        </div>
    );
}

export default function AdminTililabAnalytics({ kpis, byCountry, daily }) {
    const countries = byCountry ?? [];
    const days = daily ?? [];

    return (
        <>
            <Head title="Tililab Analytics" />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-3 border-b border-border/60 pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-tgray">
                            Tililab Connect
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-tblack">
                            Analytics
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-tgray">
                            High-level KPIs and recent submission trends.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button asChild variant="outline">
                            <Link href="/admin/tililab/participants">
                                Participants
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <KpiCard
                        label="Total participants"
                        value={kpis?.total ?? 0}
                    />
                    <KpiCard
                        label="New (last 7 days)"
                        value={kpis?.last7Days ?? 0}
                    />
                    <KpiCard
                        label="Countries (top 12)"
                        value={countries.length}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm sm:p-6">
                        <div className="text-sm font-bold text-foreground">
                            Submissions by day (last 30 days)
                        </div>
                        <div className="mt-4 h-64">
                            {days.length === 0 ? (
                                <div className="grid h-full place-items-center text-sm text-muted-foreground">
                                    No submissions in the last 30 days.
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={days}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            opacity={0.25}
                                        />
                                        <XAxis
                                            dataKey="day"
                                            tick={{ fontSize: 12 }}
                                            interval="preserveStartEnd"
                                        />
                                        <YAxis
                                            allowDecimals={false}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#0ea5e9"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm sm:p-6">
                        <div className="text-sm font-bold text-foreground">
                            Top countries
                        </div>
                        <div className="mt-4 h-64">
                            {countries.length === 0 ? (
                                <div className="grid h-full place-items-center text-sm text-muted-foreground">
                                    No data yet.
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[...countries].reverse()}
                                        layout="vertical"
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            opacity={0.25}
                                        />
                                        <XAxis
                                            type="number"
                                            allowDecimals={false}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            type="category"
                                            dataKey="country"
                                            width={70}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Tooltip />
                                        <Bar
                                            dataKey="count"
                                            fill="#22c55e"
                                            radius={[6, 6, 6, 6]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminTililabAnalytics.layout = (page) => <AppLayout>{page}</AppLayout>;
