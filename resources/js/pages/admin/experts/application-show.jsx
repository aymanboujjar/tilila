import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, FileText, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';

function Row({ label, value }) {
    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-4">
            <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {label}
            </div>
            <div className="text-sm wrap-break-word text-foreground sm:col-span-3">
                {value || '—'}
            </div>
        </div>
    );
}

function statusClass(status) {
    switch (status) {
        case 'accepted':
            return 'border-alpha-green/40 bg-beta-green text-alpha-green';
        case 'denied':
            return 'border-alpha-danger/40 bg-beta-danger text-alpha-danger';
        default:
            return 'border-alpha-yellow/50 bg-beta-yellow text-alpha-yellow';
    }
}

export default function AdminExpertApplicationShow({ application }) {
    const a = application ?? {};
    const [denyOpen, setDenyOpen] = useState(false);
    const [denyNote, setDenyNote] = useState('');

    const review = (decision) => {
        if (decision === 'denied') {
            setDenyOpen(true);
            return;
        }

        router.patch(`/admin/expert-applications/${a.id}/review`, {
            decision,
        });
    };

    const submitDeny = () => {
        router.patch(`/admin/expert-applications/${a.id}/review`, {
            decision: 'denied',
            admin_notes: denyNote,
        }, {
            onSuccess: () => {
                setDenyOpen(false);
                setDenyNote('');
            },
        });
    };

    return (
        <>
            <Head title={`Expert Request #${a.id ?? ''}`} />

            <div className="mx-auto flex w-full max-w-[min(100%,70rem)] flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
                <div className="flex flex-col gap-3 border-b border-border/60 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-tgray">Experts Directory</p>
                        <h1 className="text-2xl font-bold tracking-tight text-tblack">{a.full_name || 'Application details'}</h1>
                        <p className="mt-1 text-sm text-tgray">
                            Submitted {a.created_at ? new Date(a.created_at).toLocaleString() : '—'}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusClass(a.status)}`}>
                            {a.status || 'pending'}
                        </span>
                        <Button asChild variant="outline">
                            <Link href="/admin/expert-applications">Back</Link>
                        </Button>

                        {a.cv_url ? (
                            <Button
                                type="button"
                                variant="outline"
                                className="gap-2"
                                onClick={() => window.open(a.cv_url, '_blank', 'noopener,noreferrer')}
                            >
                                <FileText className="size-4" />
                                Open CV
                            </Button>
                        ) : null}

                        {a.status === 'pending' ? (
                            <>
                                <Button
                                    type="button"
                                    className="gap-2 bg-alpha-green text-twhite hover:bg-alpha-green/90"
                                    onClick={() => review('accepted')}
                                >
                                    <CheckCircle2 className="size-4" />
                                    Accept
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="gap-2"
                                    onClick={() => setDenyOpen(true)}
                                >
                                    <XCircle className="size-4" />
                                    Deny
                                </Button>
                            </>
                        ) : null}

                        {a.expert_id ? (
                            <Button asChild variant="ghost" className="text-beta-blue">
                                <Link href={`/admin/experts/${a.expert_id}/edit`}>Open Expert</Link>
                            </Button>
                        ) : null}
                    </div>
                </div>

                <div className="space-y-4 rounded-xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
                    <Row label="Email" value={a.email} />
                    <Row label="Phone" value={a.phone} />
                    <Row label="Current title" value={a.current_title} />
                    <Row label="Country" value={a.country} />
                    <Row label="City" value={a.city} />
                    <Row label="Expertise" value={a.expertise} />
                    <Row label="Bio" value={a.bio} />
                    <Row label="LinkedIn" value={a.linkedin_url} />
                    <Row label="Portfolio" value={a.portfolio_url} />
                    <Row label="Locale" value={a.locale} />
                    <Row label="IP" value={a.ip} />
                    <Row label="User agent" value={a.user_agent} />
                    <Row label="Reviewed at" value={a.reviewed_at ? new Date(a.reviewed_at).toLocaleString() : ''} />
                    <Row label="Admin notes" value={a.admin_notes} />
                    <Row
                        label="Reviewed by"
                        value={a.reviewed_by ? `${a.reviewed_by.name ?? ''} (${a.reviewed_by.email ?? ''})` : ''}
                    />
                </div>
            </div>

            <Dialog
                open={denyOpen}
                onOpenChange={(open) => {
                    setDenyOpen(open);
                    if (!open) {
                        setDenyNote('');
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deny expert application</DialogTitle>
                        <DialogDescription>
                            Add an optional note that will be saved with this decision.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2">
                        <label htmlFor="deny-note" className="text-sm font-medium text-foreground">
                            Admin note
                        </label>
                        <textarea
                            id="deny-note"
                            value={denyNote}
                            onChange={(e) => setDenyNote(e.target.value)}
                            placeholder="Reason for denial (optional)..."
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-28 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setDenyOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={submitDeny}>
                            Confirm deny
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

AdminExpertApplicationShow.layout = (page) => <AppLayout>{page}</AppLayout>;
