import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

function getLocaleValue(value) {
    if (!value) {
        return '';
    }

    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'object') {
        return value.en || value.fr || value.ar || '';
    }

    return '';
}

export default function ExpertDashboard({ expert }) {
    return (
        <>
            <Head title="Expert Dashboard" />

            <div className="mx-auto flex w-full max-w-[min(100%,70rem)] flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
                <div className="flex flex-col gap-3 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-tgray">Expert Back Office</p>
                        <h1 className="text-2xl font-bold tracking-tight text-tblack">Welcome, {getLocaleValue(expert?.name) || 'Expert'}</h1>
                        <p className="mt-1 text-sm text-tgray">Update your public profile and keep your expert information accurate.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button asChild>
                            <Link href="/expert/profile">Edit my profile</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/settings/security">Change password</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
                        <div className="text-xs uppercase text-tgray">Status</div>
                        <div className="mt-1 text-lg font-semibold capitalize text-tblack">{expert?.status || '—'}</div>
                    </div>
                    <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
                        <div className="text-xs uppercase text-tgray">Email</div>
                        <div className="mt-1 text-lg font-semibold text-tblack">{expert?.email || '—'}</div>
                    </div>
                    <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
                        <div className="text-xs uppercase text-tgray">Country</div>
                        <div className="mt-1 text-lg font-semibold text-tblack">{expert?.country || '—'}</div>
                    </div>
                    <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
                        <div className="text-xs uppercase text-tgray">City</div>
                        <div className="mt-1 text-lg font-semibold text-tblack">{expert?.location || '—'}</div>
                    </div>
                </div>

                <div className="rounded-xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
                    <h2 className="text-lg font-semibold text-tblack">Account actions</h2>
                    <p className="mt-2 text-sm text-tgray">
                        You can edit your personal account details from Profile Settings and permanently delete your account there if needed.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Button asChild variant="outline">
                            <Link href="/settings/profile">Profile settings</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/settings/security">Security settings</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

ExpertDashboard.layout = (page) => <AppLayout>{page}</AppLayout>;
