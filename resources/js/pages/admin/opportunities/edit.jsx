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
        type: opportunity.type ?? types[0] ?? 'panel_discussion',
        status: opportunity.status ?? statuses[0] ?? 'open',
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
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-start sm:justify-between sm:pb-8">
                    <div>
                        <p className="text-sm font-medium text-tgray">
                            Opportunities
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-tblack">
                            Edit opportunity
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-tgray">
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
            </div>
        </>
    );
}

AdminOpportunitiesEdit.layout = (page) => <AppLayout>{page}</AppLayout>;
