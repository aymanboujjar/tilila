import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import SuccessModal from '@/components/modals/SuccessModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

const PROGRAM_OPTIONS = [
    { value: '', label: 'All programs' },
    { value: 'tilila', label: 'Tilila Awards' },
    { value: 'tililab', label: 'Tililab' },
    { value: 'both', label: 'Both' },
];

const GROUP_OPTIONS = [
    { value: '', label: 'All groups' },
    { value: 'featured', label: 'Featured' },
    { value: 'institutional', label: 'Institutional' },
    { value: 'media', label: 'Media' },
    { value: 'program', label: 'Program' },
    { value: 'organiser', label: 'Organiser' },
    { value: 'strip', label: 'Strip' },
];

function programLabel(value) {
    return PROGRAM_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

function groupLabel(value) {
    return GROUP_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export default function AdminPartnersIndex({ partners, filters }) {
    const { flash } = usePage().props;
    const [successOpen, setSuccessOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setSuccessOpen(true);
        }
    }, [flash?.success]);

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

    return (
        <AppLayout>
            <Head title="Partners" />

            <SuccessModal
                open={successOpen}
                onOpenChange={setSuccessOpen}
                message={flash?.success}
                title="Done"
            />

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Partners</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage logos and visibility for Tilila Awards and
                            Tililab program pages.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/partners/create">
                            <Plus className="size-4" />
                            Add partner
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                    <select
                        className="rounded-md border bg-background px-3 py-2 text-sm"
                        value={filters?.program ?? ''}
                        onChange={(event) =>
                            applyFilters({ program: event.target.value })
                        }
                    >
                        {PROGRAM_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <select
                        className="rounded-md border bg-background px-3 py-2 text-sm"
                        value={filters?.group ?? ''}
                        onChange={(event) =>
                            applyFilters({ group: event.target.value })
                        }
                    >
                        {GROUP_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Logo</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Program</TableHead>
                                <TableHead>Group</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {partners.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No partners yet. Add one to display it
                                        on program pages.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                partners.data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            {row.logo_url ? (
                                                <img
                                                    src={row.logo_url}
                                                    alt=""
                                                    className="h-10 w-20 object-contain"
                                                />
                                            ) : (
                                                <span className="text-xs text-muted-foreground">
                                                    —
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>
                                            {programLabel(row.program)}
                                        </TableCell>
                                        <TableCell>
                                            {groupLabel(row.group)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    row.is_published
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                            >
                                                {row.is_published
                                                    ? 'Published'
                                                    : 'Draft'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/admin/partners/${row.id}/edit`}
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                'Delete this partner?',
                                                            )
                                                        ) {
                                                            router.delete(
                                                                `/admin/partners/${row.id}`,
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

                {partners.links?.length > 3 ? (
                    <div className="flex flex-wrap gap-2">
                        {partners.links.map((link) => (
                            <Button
                                key={link.label}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                asChild={Boolean(link.url)}
                            >
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                ) : null}
            </div>
        </AppLayout>
    );
}
