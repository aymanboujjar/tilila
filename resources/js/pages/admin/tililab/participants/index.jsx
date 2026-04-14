import { Head, Link, router } from '@inertiajs/react';
import { Download, ExternalLink, Search, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

function KpiCard({ icon: Icon, label, value }) {
    return (
        <div className="rounded-xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {label}
                    </div>
                    <div className="mt-2 text-3xl font-bold text-foreground">{value ?? 0}</div>
                </div>
                {Icon ? (
                    <div className="text-muted-foreground rounded-lg border border-border bg-muted p-2">
                        <Icon className="size-5" />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default function AdminTililabParticipantsIndex({ participants, filters, kpis }) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const data = participants?.data ?? [];
    const links = participants?.links ?? [];

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(
            '/admin/tililab/participants',
            { search },
            { preserveState: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Tililab Participants" />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">
                            Tililab Connect
                        </p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            Participant Management
                        </h1>
                        <p className="text-tgray mt-1 max-w-2xl text-sm">
                            Review and manage Tililab participant inscriptions.
                            Videos are stored as external links.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="gap-2"
                            onClick={() => {
                                const params = new URLSearchParams();
                                if (search?.trim()) params.set('search', search.trim());
                                const qs = params.toString();
                                window.location.href = `/admin/tililab/participants/export.csv${
                                    qs ? `?${qs}` : ''
                                }`;
                            }}
                        >
                            <Download className="size-4" />
                            Export CSV
                        </Button>
                        <Button asChild variant="secondary" className="gap-2">
                            <Link href="/admin/tililab/analytics">
                                View analytics
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <KpiCard icon={Users} label="Total participants" value={kpis?.total ?? 0} />
                    <KpiCard label="New (last 7 days)" value={kpis?.last7Days ?? 0} />
                    <KpiCard label="Current results" value={participants?.total ?? 0} />
                </div>

                <form
                    onSubmit={submitSearch}
                    className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-4"
                >
                    <div className="relative min-w-0 flex-1">
                        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, email, org, country…"
                            className="h-10 pl-10"
                            name="search"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button type="submit" variant="secondary">
                            Search
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setSearch('');
                                router.get('/admin/tililab/participants', { search: '' });
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </form>

                <div className="border-border/70 overflow-hidden rounded-xl border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-tgray w-[32%] py-3 uppercase sm:px-3">
                                    Participant
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Organization
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Country
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Submitted
                                </TableHead>
                                <TableHead className="text-tgray py-3 text-right uppercase sm:px-3">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-tgray px-4 py-14 text-center text-sm sm:px-6"
                                    >
                                        No participants found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="py-4 sm:px-3">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-muted text-muted-foreground grid size-10 shrink-0 place-items-center rounded-full border border-border text-xs font-semibold">
                                                    {`${p.first_name ?? ''} ${p.last_name ?? ''}`
                                                        .trim()
                                                        .split(/\s+/)
                                                        .filter(Boolean)
                                                        .map((w) => w[0])
                                                        .join('')
                                                        .slice(0, 2)
                                                        .toUpperCase() || '—'}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-tblack truncate font-semibold">
                                                        {p.first_name} {p.last_name}
                                                    </div>
                                                    <div className="text-tgray truncate text-xs">
                                                        {p.email ?? '—'}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 sm:px-3">
                                            <div className="text-sm text-foreground">
                                                {p.organization ?? '—'}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {p.job_title ?? ''}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 sm:px-3 text-sm text-foreground">
                                            {p.country ?? '—'}
                                        </TableCell>
                                        <TableCell className="py-4 sm:px-3 text-sm text-foreground">
                                            {p.created_at
                                                ? new Date(p.created_at).toLocaleString()
                                                : '—'}
                                        </TableCell>
                                        <TableCell className="py-4 text-right sm:px-3">
                                            <div className="inline-flex items-center justify-end gap-2">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={`/admin/tililab/participants/${p.id}`}>
                                                        Details
                                                    </Link>
                                                </Button>
                                                {p.original_video_link ? (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-2"
                                                        onClick={() =>
                                                            window.open(
                                                                p.original_video_link,
                                                                '_blank',
                                                                'noopener,noreferrer',
                                                            )
                                                        }
                                                    >
                                                        <ExternalLink className="size-4" />
                                                        Video link
                                                    </Button>
                                                ) : null}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-alpha-danger"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Delete this participant? This cannot be undone.',
                                                            )
                                                        ) {
                                                            router.delete(
                                                                `/admin/tililab/participants/${p.id}`,
                                                                { preserveScroll: true },
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {participants && participants.last_page > 1 ? (
                    <div className="text-tgray flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                        <p>
                            Showing {participants.from ?? 0} to {participants.to ?? 0}{' '}
                            of {participants.total} results
                        </p>
                        <nav className="flex flex-wrap items-center gap-1" aria-label="Pagination">
                            {links.map((link, i) =>
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={[
                                            'border-border hover:bg-muted inline-flex min-w-9 items-center justify-center rounded-md border bg-card px-3 py-1.5 text-xs font-medium shadow-sm',
                                            link.active
                                                ? 'bg-beta-blue border-beta-blue text-twhite'
                                                : '',
                                        ].join(' ')}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className={[
                                            'inline-flex min-w-9 items-center justify-center px-3 py-1.5 text-xs',
                                            link.active
                                                ? 'border-beta-blue text-beta-blue font-semibold'
                                                : '',
                                        ].join(' ')}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ),
                            )}
                        </nav>
                    </div>
                ) : null}
            </div>
        </>
    );
}

AdminTililabParticipantsIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

