import { Head, Link, router, usePage } from '@inertiajs/react';
import { Handshake, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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

const PROGRAM_OPTIONS = [
    { value: 'all', label: 'All programs' },
    { value: 'tilila', label: 'Tilila Awards' },
    { value: 'tililab', label: 'Tililab' },
    { value: 'both', label: 'Both programs' },
];

const GROUP_OPTIONS = [
    { value: 'all', label: 'All groups' },
    { value: 'featured', label: 'Featured' },
    { value: 'institutional', label: 'Institutional' },
    { value: 'media', label: 'Media' },
    { value: 'program', label: 'Program' },
    { value: 'organiser', label: 'Organiser' },
    { value: 'strip', label: 'Strip' },
];

function programLabel(value) {
    return (
        PROGRAM_OPTIONS.find((option) => option.value === value)?.label ?? value
    );
}

function groupLabel(value) {
    return GROUP_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

function programBadgeClass(program) {
    switch (program) {
        case 'tilila':
            return 'border-beta-blue/30 bg-beta-blue/10 text-beta-blue';
        case 'tililab':
            return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700';
        case 'both':
            return 'border-violet-500/30 bg-violet-500/10 text-violet-700';
        default:
            return 'border-border bg-muted text-muted-foreground';
    }
}

function StatCard({ label, value }) {
    return (
        <div className="rounded-xl border border-border/70 bg-card px-4 py-3 shadow-sm">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {label}
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-tblack">
                {value}
            </p>
        </div>
    );
}

export default function AdminPartnersIndex({ partners, filters, stats }) {
    const { flash } = usePage().props;
    const [deleteTarget, setDeleteTarget] = useState(null);
    const data = partners?.data ?? [];
    const links = partners?.links ?? [];

    const applyFilters = (next) => {
        const params = {};
        const program = next.program ?? filters?.program ?? '';
        const group = next.group ?? filters?.group ?? '';

        if (program) {
            params.program = program;
        }
        if (group) {
            params.group = group;
        }

        router.get('/admin/partners', params, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        router.get('/admin/partners', {}, { preserveState: true, replace: true });
    };

    const handleDelete = () => {
        if (!deleteTarget) return;

        router.delete(`/admin/partners/${deleteTarget.id}`, {
            preserveScroll: true,
            onFinish: () => setDeleteTarget(null),
        });
    };

    const hasActiveFilters = Boolean(filters?.program || filters?.group);

    return (
        <>
            <Head title="Partners" />

            {flash?.success ? (
                <div className="sr-only" role="status">
                    {flash.success}
                </div>
            ) : null}

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard label="Total" value={stats?.total ?? 0} />
                    <StatCard
                        label="Published"
                        value={stats?.published ?? 0}
                    />
                    <StatCard
                        label="Tilila Awards"
                        value={stats?.tilila ?? 0}
                    />
                    <StatCard label="Tililab" value={stats?.tililab ?? 0} />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:max-w-xl">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">
                                Program
                            </label>
                            <Select
                                value={filters?.program || 'all'}
                                onValueChange={(value) =>
                                    applyFilters({
                                        program:
                                            value === 'all' ? '' : value,
                                    })
                                }
                            >
                                <SelectTrigger className="h-10 w-full min-w-48 bg-background">
                                    <SelectValue placeholder="All programs" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PROGRAM_OPTIONS.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">
                                Group
                            </label>
                            <Select
                                value={filters?.group || 'all'}
                                onValueChange={(value) =>
                                    applyFilters({
                                        group: value === 'all' ? '' : value,
                                    })
                                }
                            >
                                <SelectTrigger className="h-10 w-full min-w-48 bg-background">
                                    <SelectValue placeholder="All groups" />
                                </SelectTrigger>
                                <SelectContent>
                                    {GROUP_OPTIONS.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {hasActiveFilters ? (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetFilters}
                            >
                                Reset filters
                            </Button>
                        ) : null}
                        <Button
                            asChild
                            className="gap-2 bg-beta-blue text-twhite hover:bg-beta-blue/90"
                        >
                            <Link href="/admin/partners/create">
                                <Plus className="size-4" />
                                Add partner
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-28 py-3 text-tgray uppercase sm:px-4">
                                    Logo
                                </TableHead>
                                <TableHead className="py-3 text-tgray uppercase sm:px-4">
                                    Partner
                                </TableHead>
                                <TableHead className="py-3 text-tgray uppercase sm:px-4">
                                    Program
                                </TableHead>
                                <TableHead className="py-3 text-tgray uppercase sm:px-4">
                                    Group
                                </TableHead>
                                <TableHead className="py-3 text-tgray uppercase sm:px-4">
                                    Order
                                </TableHead>
                                <TableHead className="py-3 text-tgray uppercase sm:px-4">
                                    Status
                                </TableHead>
                                <TableHead className="py-3 text-right text-tgray uppercase sm:px-4">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="py-16 text-center"
                                    >
                                        <div className="mx-auto flex max-w-sm flex-col items-center gap-3">
                                            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                                <Handshake className="size-5 text-muted-foreground" />
                                            </div>
                                            <p className="text-sm font-medium text-foreground">
                                                No partners found
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {hasActiveFilters
                                                    ? 'Try adjusting your filters or add a new partner.'
                                                    : 'Add your first partner to display logos on program pages.'}
                                            </p>
                                            <Button
                                                asChild
                                                size="sm"
                                                className="mt-1 bg-beta-blue text-twhite hover:bg-beta-blue/90"
                                            >
                                                <Link href="/admin/partners/create">
                                                    <Plus className="size-4" />
                                                    Add partner
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="sm:px-4">
                                            <div className="flex h-14 w-24 items-center justify-center rounded-lg border border-border/70 bg-background p-2">
                                                {row.logo_url ? (
                                                    <img
                                                        src={row.logo_url}
                                                        alt=""
                                                        className="max-h-10 max-w-full object-contain"
                                                    />
                                                ) : (
                                                    <span className="text-[10px] font-medium text-muted-foreground">
                                                        No logo
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="sm:px-4">
                                            <div className="font-semibold text-foreground">
                                                {row.name}
                                            </div>
                                            {row.subtitle?.fr ||
                                            row.subtitle?.en ? (
                                                <div className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">
                                                    {row.subtitle?.fr ||
                                                        row.subtitle?.en}
                                                </div>
                                            ) : null}
                                        </TableCell>
                                        <TableCell className="sm:px-4">
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    'font-medium',
                                                    programBadgeClass(
                                                        row.program,
                                                    ),
                                                )}
                                            >
                                                {programLabel(row.program)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="sm:px-4">
                                            <div className="flex flex-wrap gap-1">
                                                {(row.groups?.length
                                                    ? row.groups
                                                    : [row.group]
                                                ).map((group) => (
                                                    <Badge
                                                        key={group}
                                                        variant="secondary"
                                                    >
                                                        {groupLabel(group)}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground sm:px-4">
                                            {row.sort ?? 0}
                                        </TableCell>
                                        <TableCell className="sm:px-4">
                                            <Badge
                                                variant={
                                                    row.is_published
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                                className={
                                                    row.is_published
                                                        ? 'bg-beta-blue hover:bg-beta-blue/90'
                                                        : ''
                                                }
                                            >
                                                {row.is_published
                                                    ? 'Published'
                                                    : 'Draft'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right sm:px-4">
                                            <div className="inline-flex items-center justify-end gap-2">
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    <Link
                                                        href={`/admin/partners/${row.id}/edit`}
                                                    >
                                                        <Pencil className="size-3.5" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-alpha-danger hover:text-alpha-danger"
                                                    onClick={() =>
                                                        setDeleteTarget(row)
                                                    }
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

                {partners && partners.last_page > 1 ? (
                    <div className="flex flex-col items-center justify-between gap-3 text-sm text-tgray sm:flex-row">
                        <p>
                            Showing {partners.from ?? 0} to {partners.to ?? 0}{' '}
                            of {partners.total} results
                        </p>
                        <nav
                            className="flex flex-wrap items-center gap-1"
                            aria-label="Pagination"
                        >
                            {links.map((link, index) =>
                                link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        preserveScroll
                                        className={cn(
                                            'inline-flex min-w-9 items-center justify-center rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-muted',
                                            link.active
                                                ? 'border-beta-blue bg-beta-blue text-twhite'
                                                : '',
                                        )}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        key={index}
                                        className="inline-flex min-w-9 items-center justify-center px-3 py-1.5 text-xs text-muted-foreground"
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

            <AlertDialog
                open={Boolean(deleteTarget)}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete “{deleteTarget?.name}”?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This partner will be removed from all program
                            pages. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-alpha-danger text-twhite hover:bg-alpha-danger/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

AdminPartnersIndex.layout = (page) => (
    <AppLayout
        breadcrumbs={[
            { title: 'Dashboard', href: '/admin/dashboard' },
            { title: 'Partners', href: '/admin/partners' },
        ]}
        title="Partners"
        description="Manage partner logos, groups, and visibility on Tilila Awards and Tililab pages."
    >
        {page}
    </AppLayout>
);
