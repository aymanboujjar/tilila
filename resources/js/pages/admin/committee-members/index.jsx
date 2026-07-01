import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Users } from 'lucide-react';
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

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

function bioPreview(member) {
    const bio = member?.bio;
    if (!bio || typeof bio !== 'object') {
        return '—';
    }

    return bio.fr || bio.en || bio.ar || '—';
}

export default function AdminCommitteeMembersIndex({ members, stats }) {
    const { flash } = usePage().props;
    const [deleteTarget, setDeleteTarget] = useState(null);
    const data = members?.data ?? [];

    const handleDelete = () => {
        if (!deleteTarget) return;

        router.delete(`/admin/committee-members/${deleteTarget.id}`, {
            preserveScroll: true,
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <>
            <Head title="Committee members" />

            {flash?.success ? (
                <div className="sr-only" role="status">
                    {flash.success}
                </div>
            ) : null}

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="grid gap-3 sm:grid-cols-2">
                    <StatCard label="Total" value={stats?.total ?? 0} />
                    <StatCard
                        label="Published"
                        value={stats?.published ?? 0}
                    />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-tblack">
                            Comité Parité members
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage names, bios and photos shown on the About
                            page.
                        </p>
                    </div>
                    <Button
                        asChild
                        className="gap-2 bg-beta-blue text-twhite hover:bg-beta-blue/90"
                    >
                        <Link href="/admin/committee-members/create">
                            <Plus className="size-4" />
                            Add member
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-24 py-3 text-tgray uppercase sm:px-4">
                                    Photo
                                </TableHead>
                                <TableHead className="py-3 text-tgray uppercase sm:px-4">
                                    Name
                                </TableHead>
                                <TableHead className="py-3 text-tgray uppercase sm:px-4">
                                    Bio (FR)
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
                                        colSpan={6}
                                        className="py-16 text-center"
                                    >
                                        <div className="mx-auto flex max-w-sm flex-col items-center gap-3">
                                            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                                <Users className="size-5 text-muted-foreground" />
                                            </div>
                                            <p className="text-sm font-medium text-foreground">
                                                No committee members yet
                                            </p>
                                            <Button
                                                asChild
                                                size="sm"
                                                className="mt-1 bg-beta-blue text-twhite hover:bg-beta-blue/90"
                                            >
                                                <Link href="/admin/committee-members/create">
                                                    <Plus className="size-4" />
                                                    Add member
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="sm:px-4">
                                            <div className="flex size-12 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background">
                                                {row.photo_url ? (
                                                    <img
                                                        src={row.photo_url}
                                                        alt=""
                                                        className="size-full object-cover object-top"
                                                    />
                                                ) : (
                                                    <Users className="size-4 text-muted-foreground" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium sm:px-4">
                                            {row.name}
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate text-sm text-muted-foreground sm:px-4">
                                            {bioPreview(row)}
                                        </TableCell>
                                        <TableCell className="sm:px-4">
                                            {row.sort}
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
                                                        ? 'bg-emerald-600 text-white hover:bg-emerald-600'
                                                        : ''
                                                }
                                            >
                                                {row.is_published
                                                    ? 'Published'
                                                    : 'Draft'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right sm:px-4">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/admin/committee-members/${row.id}/edit`}
                                                    >
                                                        <Pencil className="size-4" />
                                                        <span className="sr-only">
                                                            Edit
                                                        </span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        setDeleteTarget(row)
                                                    }
                                                >
                                                    <Trash2 className="size-4 text-destructive" />
                                                    <span className="sr-only">
                                                        Delete
                                                    </span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <AlertDialog
                open={Boolean(deleteTarget)}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete member?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {deleteTarget
                                ? `Remove ${deleteTarget.name} from the committee members list. This cannot be undone.`
                                : null}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

AdminCommitteeMembersIndex.layout = (page) => (
    <AppLayout
        breadcrumbs={[
            { title: 'Dashboard', href: '/admin/dashboard' },
            { title: 'Committee members', href: '/admin/committee-members' },
        ]}
        title="Committee members"
        description="Manage Parity Committee members on the About page."
    >
        {page}
    </AppLayout>
);
