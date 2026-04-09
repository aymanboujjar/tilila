import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import OpportunityForm from '@/pages/admin/opportunities/partials/OpportunityForm';

function emptyTri() {
    return { en: '', fr: '', ar: '' };
}

export default function AdminOpportunitiesEdit({
    opportunity,
    types = [],
    statuses = [],
}) {
    const { data, setData, errors, setError, clearErrors } = useForm({
        type: opportunity.type ?? (types[0] ?? 'panel_discussion'),
        status: opportunity.status ?? (statuses[0] ?? 'open'),
        title: { ...emptyTri(), ...(opportunity.title ?? {}) },
        org: { ...emptyTri(), ...(opportunity.org ?? {}) },
        location: { ...emptyTri(), ...(opportunity.location ?? {}) },
        excerpt: { ...emptyTri(), ...(opportunity.excerpt ?? {}) },
        deadline: opportunity.deadline ?? '',
        applications_count: opportunity.applications_count ?? 0,
        applications_limit:
            typeof opportunity.applications_limit === 'number'
                ? opportunity.applications_limit
                : null,
    });

    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        router.post(
            `/admin/opportunities/${encodeURIComponent(opportunity.slug ?? '')}`,
            { ...data, _method: 'put' },
            {
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onError: (serverErrors) => setError(serverErrors),
            },
        );
    };

    return (
        <>
            <Head title={`Edit ${opportunity.title?.en ?? 'opportunity'}`} />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">
                            Opportunities
                        </p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            Edit opportunity
                        </h1>
                        <p className="text-tgray mt-1 max-w-2xl text-sm">
                            {opportunity.title?.en ?? 'Opportunity'} — update
                            the fields and save.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/admin/opportunities" className="gap-2">
                            <ChevronLeft className="size-4" />
                            Back to list
                        </Link>
                    </Button>
                </div>

                <OpportunityForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    types={types}
                    statuses={statuses}
                    submitLabel="Save changes"
                    processing={processing}
                    onSubmit={submit}
                />

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <div className="text-tblack text-lg font-bold">
                                Applications
                            </div>
                            <div className="text-tgray text-sm">
                                {opportunity.applications?.length ?? 0} latest
                                submissions
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                                <tr className="border-b border-border">
                                    <th className="px-3 py-2">Name</th>
                                    <th className="px-3 py-2">Email</th>
                                    <th className="px-3 py-2">Phone</th>
                                    <th className="px-3 py-2">Country</th>
                                    <th className="px-3 py-2">Role</th>
                                    <th className="px-3 py-2">Org</th>
                                    <th className="px-3 py-2">Experience</th>
                                    <th className="px-3 py-2">CV</th>
                                    <th className="px-3 py-2">Portfolio</th>
                                    <th className="px-3 py-2">Submitted</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {(opportunity.applications ?? []).map((a) => (
                                    <tr key={a.id} className="align-top">
                                        <td className="px-3 py-2 font-semibold text-foreground">
                                            {a.full_name}
                                        </td>
                                        <td className="px-3 py-2">
                                            <a
                                                className="text-beta-blue hover:underline"
                                                href={`mailto:${a.email}`}
                                            >
                                                {a.email}
                                            </a>
                                        </td>
                                        <td className="px-3 py-2">
                                            {a.phone ?? '—'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {a.country ?? '—'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {a.current_role ?? '—'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {a.organization ?? '—'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {a.years_experience ?? '—'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {a.resume_url ? (
                                                <a
                                                    className="text-beta-blue hover:underline"
                                                    href={a.resume_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Download
                                                </a>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                        <td className="px-3 py-2">
                                            {a.portfolio_link ? (
                                                <a
                                                    className="text-beta-blue hover:underline"
                                                    href={a.portfolio_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Open
                                                </a>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                        <td className="px-3 py-2 text-muted-foreground">
                                            {a.created_at ?? '—'}
                                        </td>
                                    </tr>
                                ))}
                                {(opportunity.applications ?? []).length ===
                                0 ? (
                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="px-3 py-10 text-center text-muted-foreground"
                                        >
                                            No applications yet.
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminOpportunitiesEdit.layout = (page) => <AppLayout>{page}</AppLayout>;

