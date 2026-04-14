import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2,
    ChevronLeft,
    Download,
    Eye,
    Filter,
    Search,
    ThumbsDown,
    ThumbsUp,
    UserRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';

function statusBadgeClass(status) {
    switch (status) {
        case 'new':
            return 'bg-beta-blue/10 text-beta-blue border-beta-blue/30';
        case 'shortlisted':
            return 'bg-beta-yellow text-alpha-yellow border-alpha-yellow/30';
        case 'selected':
            return 'bg-beta-green text-alpha-green border-alpha-green/30';
        case 'rejected':
            return 'bg-beta-danger text-alpha-danger border-alpha-danger/30';
        default:
            return 'bg-muted text-muted-foreground border-border';
    }
}

function StatCard({ title, value, icon: Icon, helper }) {
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
                <div className="rounded-xl border border-border bg-background p-2 text-muted-foreground">
                    <Icon className="size-5" />
                </div>
            </div>
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-3">
            <div className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">
                {label}
            </div>
            <div className="sm:col-span-2">
                <div className="text-sm font-semibold text-foreground">
                    {value || '—'}
                </div>
            </div>
        </div>
    );
}

export default function AdminOpportunitiesShow({ opportunity, stats }) {
    const [query, setQuery] = useState('');
    const [tab, setTab] = useState('all');
    const [selected, setSelected] = useState(null);

    const applications = opportunity?.applications ?? [];

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = applications;

        // We don't yet have per-application status in DB, so treat everything as "new".
        // Tab UI is here to match the design and can be wired later.
        if (tab !== 'all') {
            list = [];
        }

        if (!q) return list;
        return list.filter((a) => {
            const hay = [
                a.full_name,
                a.email,
                a.phone,
                a.country,
                a.current_role,
                a.organization,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return hay.includes(q);
        });
    }, [applications, query, tab]);

    return (
        <>
            <Head title={opportunity?.title?.en ?? 'Opportunity'} />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <Button asChild variant="outline" className="gap-2">
                            <Link href="/admin/opportunities">
                                <ChevronLeft className="size-4" />
                                Back
                            </Link>
                        </Button>

                        <div className="flex flex-wrap gap-2">
                            <Button type="button" variant="outline" className="gap-2">
                                <Download className="size-4" />
                                Export Candidates
                            </Button>
                            <Button
                                asChild
                                className="bg-beta-blue hover:bg-beta-blue/90 text-twhite gap-2"
                            >
                                <Link
                                    href={`/admin/opportunities/${encodeURIComponent(
                                        opportunity.slug ?? '',
                                    )}/edit`}
                                >
                                    Edit Opportunity
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="secondary" className="font-normal">
                                {opportunity.type}
                            </Badge>
                            <span aria-hidden="true">•</span>
                            <span>Posted</span>
                        </div>
                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
                            {opportunity.title?.en ?? 'Opportunity'}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Review and manage expert applications for this opportunity.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <StatCard
                        title="Total Applicants"
                        value={stats?.total ?? applications.length}
                        icon={UserRound}
                        helper=""
                    />
                    <StatCard
                        title="Pending Review"
                        value={stats?.pending ?? applications.length}
                        icon={ThumbsUp}
                    />
                    <StatCard
                        title="Shortlisted"
                        value={stats?.shortlisted ?? 0}
                        icon={CheckCircle2}
                    />
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full lg:max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name or keyword…"
                                className="h-10 pl-10"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Button type="button" variant="outline" className="gap-2">
                                <Filter className="size-4" />
                                Filters
                            </Button>
                            <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-background p-1">
                                {[
                                    { id: 'all', label: `All Candidates (${applications.length})` },
                                    { id: 'new', label: 'New (0)' },
                                    { id: 'shortlisted', label: 'Shortlisted (0)' },
                                    { id: 'selected', label: 'Selected (0)' },
                                    { id: 'rejected', label: 'Rejected (0)' },
                                ].map((x) => (
                                    <button
                                        key={x.id}
                                        type="button"
                                        onClick={() => setTab(x.id)}
                                        className={cn(
                                            'rounded-lg px-3 py-2 text-xs font-semibold',
                                            tab === x.id
                                                ? 'bg-beta-blue text-white'
                                                : 'text-muted-foreground hover:text-foreground',
                                        )}
                                    >
                                        {x.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 overflow-x-auto">
                        <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
                            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                                <tr className="border-b border-border">
                                    <th className="px-3 py-3">Expert name</th>
                                    <th className="px-3 py-3">Expertise</th>
                                    <th className="px-3 py-3">Applied date</th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-3 py-12 text-center text-muted-foreground"
                                        >
                                            No candidates found.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((a) => (
                                        <tr key={a.id} className="align-top">
                                            <td className="px-3 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
                                                        {(a.full_name ?? 'A')
                                                            .trim()
                                                            .slice(0, 1)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <button
                                                            type="button"
                                                            className="truncate text-left font-semibold text-foreground hover:underline"
                                                            onClick={() =>
                                                                setSelected(a)
                                                            }
                                                        >
                                                            {a.full_name}
                                                        </button>
                                                        <div className="truncate text-xs text-muted-foreground">
                                                            {a.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-4 text-muted-foreground">
                                                <div className="font-semibold text-foreground/80">
                                                    {a.current_role ?? '—'}
                                                </div>
                                                <div className="mt-0.5 text-xs">
                                                    {a.years_experience
                                                        ? `${a.years_experience} yrs exp`
                                                        : ''}
                                                </div>
                                            </td>
                                            <td className="px-3 py-4 text-muted-foreground">
                                                {a.created_at ?? '—'}
                                            </td>
                                            <td className="px-3 py-4">
                                                <span
                                                    className={cn(
                                                        'inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold',
                                                        statusBadgeClass('new'),
                                                    )}
                                                >
                                                    New
                                                </span>
                                            </td>
                                            <td className="px-3 py-4">
                                                <div className="flex justify-end gap-3 text-muted-foreground">
                                                    <button
                                                        type="button"
                                                        className="hover:text-foreground"
                                                        title="Shortlist"
                                                    >
                                                        <ThumbsUp className="size-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="hover:text-foreground"
                                                        title="Reject"
                                                    >
                                                        <ThumbsDown className="size-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="hover:text-foreground"
                                                        title="View"
                                                        onClick={() =>
                                                            setSelected(a)
                                                        }
                                                    >
                                                        <Eye className="size-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Dialog
                open={Boolean(selected)}
                onOpenChange={(open) => !open && setSelected(null)}
            >
                <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-2xl font-extrabold tracking-tight">
                            {selected?.full_name ?? 'Candidate'}
                        </DialogTitle>
                        <DialogDescription className="text-sm">
                            Application details for this opportunity.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-2 space-y-5">
                        <div className="rounded-2xl border border-border bg-card p-5">
                            <div className="text-sm font-extrabold text-beta-blue">
                                Contact
                            </div>
                            <div className="mt-4 space-y-3">
                                <DetailRow
                                    label="Email"
                                    value={
                                        selected?.email ? (
                                            <a
                                                className="text-beta-blue hover:underline"
                                                href={`mailto:${selected.email}`}
                                            >
                                                {selected.email}
                                            </a>
                                        ) : (
                                            '—'
                                        )
                                    }
                                />
                                <DetailRow
                                    label="Phone"
                                    value={selected?.phone}
                                />
                                <DetailRow
                                    label="Country"
                                    value={selected?.country}
                                />
                            </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-5">
                            <div className="text-sm font-extrabold text-beta-blue">
                                Profile
                            </div>
                            <div className="mt-4 space-y-3">
                                <DetailRow
                                    label="Current role"
                                    value={selected?.current_role}
                                />
                                <DetailRow
                                    label="Organization"
                                    value={selected?.organization}
                                />
                                <DetailRow
                                    label="Experience"
                                    value={selected?.years_experience}
                                />
                                <DetailRow
                                    label="Submitted"
                                    value={selected?.created_at}
                                />
                            </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-5">
                            <div className="text-sm font-extrabold text-beta-blue">
                                Attachments
                            </div>
                            <div className="mt-4 space-y-3">
                                <DetailRow
                                    label="CV/Resume"
                                    value={
                                        selected?.resume_url ? (
                                            <a
                                                className="text-beta-blue hover:underline"
                                                href={selected.resume_url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Download
                                            </a>
                                        ) : (
                                            '—'
                                        )
                                    }
                                />
                                <DetailRow
                                    label="Portfolio"
                                    value={
                                        selected?.portfolio_link ? (
                                            <a
                                                className="text-beta-blue hover:underline"
                                                href={selected.portfolio_link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Open link
                                            </a>
                                        ) : (
                                            '—'
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-5">
                            <div className="text-sm font-extrabold text-beta-blue">
                                Motivation
                            </div>
                            <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                                {selected?.motivation || '—'}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setSelected(null)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

AdminOpportunitiesShow.layout = (page) => <AppLayout>{page}</AppLayout>;

