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

function statusBadgeClass(status) {
    switch (status) {
        case 'published':
            return 'border-alpha-green/40 bg-beta-green text-alpha-green';
        case 'pending':
            return 'border-alpha-yellow/50 bg-beta-yellow text-alpha-yellow';
        case 'suspended':
            return 'border-alpha-danger/40 bg-beta-danger text-alpha-danger';
        default:
            return 'border-border bg-muted text-muted-foreground';
    }
}

export default function AdminExpertsIndex({ experts, filters }) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const submitSearch = (e) => {
        e.preventDefault();
        router.get('/admin/experts', { search, status: filters?.status }, {
            preserveState: true,
            replace: true,
        });
    };

    const data = experts?.data ?? [];
    const links = experts?.links ?? [];

    return (
        <>
            <Head title="Expert Management" />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">
                            Experts Directory
                        </p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            Expert Management
                        </h1>
                        <p className="text-tgray mt-1 max-w-2xl text-sm">
                            Manage, verify, and track expert profiles for media
                            connections.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="gap-2"
                        >
                            <Download className="size-4" />
                            Export
                        </Button>
                        <Button
                            asChild
                            className="bg-beta-blue hover:bg-beta-blue/90 text-twhite gap-2"
                        >
                            <Link href="/admin/experts/create">
                                <Plus className="size-4" />
                                Add Expert
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
                            placeholder="Search experts by name, email, or institution..."
                            className="h-10 pl-10"
                            name="search"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="gap-2"
                            onClick={() =>
                                router.get('/admin/experts', {
                                    search,
                                    status: '',
                                })
                            }
                        >
                            All Statuses
                        </Button>
                        <Button type="submit" variant="secondary">
                            Search
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="gap-2"
                        >
                            <SlidersHorizontal className="size-4" />
                            More Filters
                        </Button>
                    </div>
                </form>

                <div className="border-border/70 overflow-hidden rounded-xl border bg-card p-4 shadow-sm sm:p-6">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-tgray w-[32%] py-3 uppercase sm:px-3">
                                    Expert name
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Status
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Expertise
                                </TableHead>
                                <TableHead className="text-tgray py-3 uppercase sm:px-3">
                                    Last activity
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
                                        No experts yet. Add one to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((expert) => (
                                    <TableRow key={expert.id}>
                                        <TableCell className="py-4 sm:px-3">
                                            <div className="flex items-center gap-3">
                                                {expert.image_url ? (
                                                    <img
                                                        src={expert.image_url}
                                                        alt=""
                                                        className="border-border size-10 shrink-0 rounded-full border object-cover"
                                                    />
                                                ) : (
                                                    <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                                                        {(expert.name?.en ?? '?')
                                                            .split(' ')
                                                            .map((w) => w[0])
                                                            .join('')
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <div className="text-tblack font-semibold">
                                                        {expert.name?.en}
                                                    </div>
                                                    <div className="text-tgray truncate text-xs">
                                                        {expert.title?.en}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 sm:px-3">
                                            <span
                                                className={cn(
                                                    'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
                                                    statusBadgeClass(
                                                        expert.status,
                                                    ),
                                                )}
                                            >
                                                {expert.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-tgray max-w-xs py-4 sm:px-3">
                                            <div className="flex flex-wrap gap-1">
                                                {(expert.industries ?? [])
                                                    .slice(0, 3)
                                                    .map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="secondary"
                                                            className="text-xs font-normal"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-tgray py-4 text-sm sm:px-3">
                                            {expert.updated_at
                                                ? new Date(
                                                      expert.updated_at,
                                                  ).toLocaleString()
                                                : '—'}
                                        </TableCell>
                                        <TableCell className="py-4 text-right sm:px-3">
                                            <Button
                                                asChild
                                                variant="ghost"
                                                size="sm"
                                                className="text-beta-blue"
                                            >
                                                <Link
                                                    href={`/admin/experts/${expert.id}/edit`}
                                                >
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="text-alpha-danger"
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            'Delete this expert?',
                                                        )
                                                    ) {
                                                        router.delete(
                                                            `/admin/experts/${expert.id}`,
                                                        );
                                                    }
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {experts && experts.last_page > 1 ? (
                    <div className="text-tgray flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                        <p>
                            Showing {experts.from ?? 0} to {experts.to ?? 0} of{' '}
                            {experts.total} results
                        </p>
                        <nav
                            className="flex flex-wrap items-center gap-1"
                            aria-label="Pagination"
                        >
                            {links.map((link, i) =>
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={cn(
                                            'border-border hover:bg-muted inline-flex min-w-9 items-center justify-center rounded-md border bg-card px-3 py-1.5 text-xs font-medium shadow-sm',
                                            link.active &&
                                                'bg-beta-blue border-beta-blue text-twhite',
                                        )}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className={cn(
                                            'inline-flex min-w-9 items-center justify-center px-3 py-1.5 text-xs',
                                            link.active &&
                                                'border-beta-blue text-beta-blue font-semibold',
                                        )}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
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

AdminExpertsIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
