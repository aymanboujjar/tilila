import { Head, Link, router } from '@inertiajs/react';
import { ExternalLink, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

function Row({ label, value }) {
    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {label}
            </div>
            <div className="sm:col-span-3 text-sm text-foreground wrap-break-word">
                {value ?? '—'}
            </div>
        </div>
    );
}

export default function AdminTililaSubmissionShow({ participant }) {
    const p = participant ?? {};

    return (
        <>
            <Head title={`Tilila Submission #${p.id ?? ''}`} />

            <div className="mx-auto flex w-full max-w-[min(100%,70rem)] flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
                <div className="flex flex-col gap-3 border-b border-border/60 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">Trophée Tilila</p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            {p.first_name} {p.last_name}
                        </h1>
                        <p className="text-tgray mt-1 text-sm">
                            Submitted {p.created_at ? new Date(p.created_at).toLocaleString() : '—'}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button asChild variant="outline">
                            <Link href="/admin/tilila/participants">Back</Link>
                        </Button>

                        {p.submission_link ? (
                            <Button
                                type="button"
                                variant="outline"
                                className="gap-2"
                                onClick={() =>
                                    window.open(p.submission_link, '_blank', 'noopener,noreferrer')
                                }
                            >
                                <ExternalLink className="size-4" />
                                Open submission link
                            </Button>
                        ) : null}

                        <Button
                            type="button"
                            variant="destructive"
                            className="gap-2"
                            onClick={() => {
                                if (confirm('Delete this submission? This cannot be undone.')) {
                                    router.delete(`/admin/tilila/participants/${p.id}`, {
                                        onSuccess: () => router.visit('/admin/tilila/participants'),
                                    });
                                }
                            }}
                        >
                            <Trash2 className="size-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border border-border/70 bg-card p-5 shadow-sm sm:p-6 space-y-4">
                    <Row label="Email" value={p.email} />
                    <Row label="Phone" value={p.phone} />
                    <Row label="Organization" value={p.organization} />
                    <Row label="Job title" value={p.job_title} />
                    <Row label="City" value={p.city} />
                    <Row label="Country" value={p.country} />
                    <Row label="Title" value={p.submission_title} />
                    <Row label="Description" value={p.submission_description} />
                    <Row label="Link" value={p.submission_link} />
                    <Row label="Accepted rules" value={p.accepted_rules ? 'Yes' : 'No'} />
                    <Row label="Locale" value={p.locale} />
                    <Row label="IP" value={p.ip} />
                    <Row label="User agent" value={p.user_agent} />
                </div>
            </div>
        </>
    );
}

AdminTililaSubmissionShow.layout = (page) => <AppLayout>{page}</AppLayout>;

