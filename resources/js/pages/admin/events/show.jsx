import { Head, Link } from '@inertiajs/react';
import {
    ChevronLeft,
    Download,
    Printer,
    Search,
    SlidersHorizontal,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

function formatRegistrationDate(value) {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    // DD Mon YYYY, HH:MM (24h)
    return d.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function MetricCard({ title, value, helper, badge }) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="text-sm font-semibold text-muted-foreground">
                        {title}
                    </div>
                    <div className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
                        {value}
                    </div>
                    {helper ? (
                        <div className="mt-1 text-xs text-muted-foreground">
                            {helper}
                        </div>
                    ) : null}
                </div>
                {badge ? (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                        {badge}
                    </span>
                ) : null}
            </div>
        </div>
    );
}

export default function AdminEventsShow({ event, stats }) {
    const [query, setQuery] = useState('');
    const participants = event?.participants ?? [];

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return participants;
        return participants.filter((p) => {
            const hay = [p.full_name, p.email, p.phone]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return hay.includes(q);
        });
    }, [participants, query]);

    return (
        <>
            <Head title={event?.title?.en ?? 'Event'} />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <Button asChild variant="outline" className="gap-2">
                            <Link href="/admin/events">
                                <ChevronLeft className="size-4" />
                                Back
                            </Link>
                        </Button>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="gap-2"
                            >
                                <Printer className="size-4" />
                                Print
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="gap-2"
                            >
                                <Download className="size-4" />
                                Export List
                            </Button>
                            <Button
                                asChild
                                className="gap-2 bg-beta-blue text-twhite hover:bg-beta-blue/90"
                            >
                                <Link
                                    href={`/admin/events/${encodeURIComponent(
                                        event.slug ?? '',
                                    )}/edit`}
                                >
                                    Configure
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>Events</span>
                            <span aria-hidden="true">›</span>
                            <span className="font-semibold text-foreground">
                                {event.title?.en ?? 'Event'}
                            </span>
                            {event.status ? (
                                <Badge
                                    variant="secondary"
                                    className="ml-2 font-normal"
                                >
                                    {event.status}
                                </Badge>
                            ) : null}
                        </div>
                        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">
                            Registrations & Analytics
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Real-time overview of attendee statistics and
                            registration data.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <MetricCard
                        title="Total Attendees"
                        value={stats?.total_attendees ?? 0}
                        helper="Target: 400 attendees"
                    />
                    <MetricCard
                        title="Capacity Filled"
                        value={`${stats?.capacity_filled ?? 0}%`}
                        badge="Almost Full"
                    />
                    <MetricCard
                        title="Confirmed"
                        value={stats?.confirmed ?? 0}
                        helper={`Pending ${stats?.pending ?? 0}`}
                    />
                    <MetricCard
                        title="Ticket Revenue"
                        value={stats?.ticket_revenue?.label ?? 'FREE'}
                        helper={stats?.ticket_revenue?.note ?? ''}
                        badge="Early Bird Ended"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="relative w-full lg:max-w-xl">
                                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Search by name or email…"
                                        className="h-10 pl-10"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="gap-2"
                                    >
                                        <SlidersHorizontal className="size-4" />
                                        Filter
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="gap-2"
                                    >
                                        Sort
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-5 overflow-x-auto">
                                <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                                    <thead className="text-xs tracking-wide text-muted-foreground uppercase">
                                        <tr className="border-b border-border">
                                            <th className="px-3 py-3">
                                                Attendee name
                                            </th>
                                            <th className="px-3 py-3">Email</th>
                                            <th className="px-3 py-3">Phone</th>
                                            <th className="px-3 py-3">
                                                Registration date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {filtered.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-3 py-12 text-center text-muted-foreground"
                                                >
                                                    No participants found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filtered.map((p) => (
                                                <tr key={p.id}>
                                                    <td className="px-3 py-4 font-semibold text-foreground">
                                                        {p.full_name}
                                                    </td>
                                                    <td className="px-3 py-4">
                                                        <a
                                                            className="text-beta-blue hover:underline"
                                                            href={`mailto:${p.email}`}
                                                        >
                                                            {p.email}
                                                        </a>
                                                    </td>
                                                    <td className="px-3 py-4 text-muted-foreground">
                                                        {p.phone ?? '—'}
                                                    </td>
                                                    <td className="px-3 py-4 text-muted-foreground">
                                                        {formatRegistrationDate(
                                                            p.created_at,
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 lg:col-span-4">
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <div className="text-sm font-extrabold text-foreground">
                                Registration Trend
                            </div>
                            <div className="mt-4 h-44 rounded-xl border border-border bg-background" />
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-extrabold text-foreground">
                                    Attendee Sectors
                                </div>
                                <button
                                    type="button"
                                    className="text-sm font-semibold text-beta-blue hover:underline"
                                >
                                    View Details
                                </button>
                            </div>
                            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                                <div className="flex items-center justify-between">
                                    <span>Academic & Research</span>
                                    <span>45%</span>
                                </div>
                                <div className="h-2 rounded-full bg-muted">
                                    <div className="h-2 w-[45%] rounded-full bg-beta-blue" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Technology</span>
                                    <span>28%</span>
                                </div>
                                <div className="h-2 rounded-full bg-muted">
                                    <div className="h-2 w-[28%] rounded-full bg-beta-yellow" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Government</span>
                                    <span>15%</span>
                                </div>
                                <div className="h-2 rounded-full bg-muted">
                                    <div className="h-2 w-[15%] rounded-full bg-beta-green" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Media</span>
                                    <span>12%</span>
                                </div>
                                <div className="h-2 rounded-full bg-muted">
                                    <div className="h-2 w-[12%] rounded-full bg-beta-danger" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-extrabold text-foreground">
                                    Boost attendance
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-muted-foreground">
                                Share the registration link and promote the
                                event to increase sign-ups.
                            </div>
                            <div className="mt-4">
                                <Button className="w-full bg-beta-blue text-twhite hover:bg-beta-blue/90">
                                    Boost attendance
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminEventsShow.layout = (page) => <AppLayout>{page}</AppLayout>;
