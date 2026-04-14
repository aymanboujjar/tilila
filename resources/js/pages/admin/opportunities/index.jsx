import { Head, Link, router } from '@inertiajs/react';
import { Download, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
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
import { cn } from '@/lib/utils';

/** Admin routes resolve `Opportunity` by `slug`, not numeric `id`. */
function opportunityRouteKey(opp) {
    return encodeURIComponent(opp.slug ?? '');
}

function statusBadgeClass(status) {
    switch (status) {
        case 'open':
            return 'border-alpha-green/40 bg-beta-green text-alpha-green';
        case 'closing_soon':
            return 'border-alpha-yellow/50 bg-beta-yellow text-alpha-yellow';
        case 'filled':
            return 'border-beta-blue/40 bg-beta-blue/10 text-beta-blue';
        case 'closed':
            return 'border-alpha-danger/40 bg-beta-danger text-alpha-danger';
        default:
            return 'border-border bg-muted text-muted-foreground';
    }
}

export default function AdminOpportunitiesIndex({
    opportunities,
    filters,
    types = [],
    statuses = [],
}) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(
            '/admin/opportunities',
            {
                search,
                type: filters?.type,
                status: filters?.status,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const data = opportunities?.data ?? [];

    return (
        <>
            <Head title="Opportunities Management" />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">
                            Opportunities
                        </p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            Opportunities Management
                        </h1>
                        <p className="text-tgray mt-1 max-w-2xl text-sm">
                            Manage panels, media calls, and grants.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="gap-2"
                            onClick={() => {
                                const params = new URLSearchParams();
                                if (search?.trim())
                                    params.set('search', search.trim());
                                if (filters?.type) params.set('type', filters.type);
                                if (filters?.status)
                                    params.set('status', filters.status);
                                const qs = params.toString();
                                window.location.href = `/admin/opportunities/export.csv${
                                    qs ? `?${qs}` : ''
                                }`;
                            }}
                        >
                            <Download className="size-4" />
                            Export CSV
                        </Button>
                        <Button
                            asChild
                            className="bg-beta-blue hover:bg-beta-blue/90 text-twhite gap-2"
                        >
                            <Link href="/admin/opportunities/create">
                                <Plus className="size-4" />
                                Create New Opportunity
                            </Link>
                        </Button>
                    </div>
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
                            placeholder="Search opportunities…"
                            className="h-10 pl-10"
                            name="search"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <select
                            value={filters?.type ?? ''}
                            onChange={(e) =>
                                router.get(
                                    '/admin/opportunities',
                                    {
                                        search,
                                        type: e.target.value,
                                        status: filters?.status,
                                    },
                                    { preserveState: true, replace: true },
                                )
                            }
                            className={cn(
                                'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                            )}
                        >
                            <option value="">All types</option>
                            {types.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filters?.status ?? ''}
                            onChange={(e) =>
                                router.get(
                                    '/admin/opportunities',
                                    {
                                        search,
                                        type: filters?.type,
                                        status: e.target.value,
                                    },
                                    { preserveState: true, replace: true },
                                )
                            }
                            className={cn(
                                'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                            )}
                        >
                            <option value="">All statuses</option>
                            {statuses.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>

                        <Button type="submit" variant="secondary">
                            Search
                        </Button>
                        <Button type="button" variant="outline" className="gap-2">
                            <SlidersHorizontal className="size-4" />
                            More Filters
                        </Button>
                    </div>
                </form>

                <div className="border-border/70 overflow-hidden rounded-xl border bg-card p-4 shadow-sm sm:p-6">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-tgray w-[40%] py-3 uppercase sm:px-3">
                                    Title
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Type
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Organizer
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Deadline
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Applications
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Status
                                </TableHead>
                                <TableHead className="text-tgray py-3 text-right uppercase sm:px-3">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-tgray px-4 py-14 text-center text-sm sm:px-6"
                                    >
                                        No opportunities yet. Create one to get
                                        started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((opp) => (
                                    <TableRow key={opp.id}>
                                        <TableCell className="py-4 sm:px-3">
                                            <Link
                                                href={`/admin/opportunities/${opportunityRouteKey(opp)}`}
                                                className="group block"
                                            >
                                                <div className="text-tblack font-semibold group-hover:underline">
                                                    {opp.title?.en}
                                                </div>
                                                <div className="text-tgray mt-1 text-xs">
                                                    ID: {opp.slug}
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="py-4 sm:px-3">
                                            <Badge
                                                variant="secondary"
                                                className="text-xs font-normal"
                                            >
                                                {opp.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-tgray py-4 text-sm sm:px-3">
                                            {opp.org?.en ?? ''}
                                        </TableCell>
                                        <TableCell className="text-tgray py-4 text-sm sm:px-3">
                                            {opp.deadline ?? ''}
                                        </TableCell>
                                        <TableCell className="text-tgray py-4 text-sm sm:px-3">
                                            {opp.applications_limit
                                                ? `${opp.applications_count} / ${opp.applications_limit}`
                                                : `${opp.applications_count}`}
                                        </TableCell>
                                        <TableCell className="py-4 sm:px-3">
                                            <span
                                                className={cn(
                                                    'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
                                                    statusBadgeClass(
                                                        opp.status,
                                                    ),
                                                )}
                                            >
                                                {opp.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-4 text-right sm:px-3">
                                            <div className="flex justify-end gap-3 text-sm font-medium">
                                                <Link
                                                    href={`/admin/opportunities/${opportunityRouteKey(opp)}/edit`}
                                                    className="text-beta-blue hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="text-alpha-danger hover:underline"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                'Delete this opportunity?',
                                                            )
                                                        ) {
                                                            router.delete(
                                                                `/admin/opportunities/${opportunityRouteKey(opp)}`,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

AdminOpportunitiesIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

