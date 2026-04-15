import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import OpportunityForm from '@/pages/admin/opportunities/partials/OpportunityForm';

function emptyTri() {
    return { en: '', fr: '', ar: '' };
}

export default function AdminOpportunitiesCreate({
    types = [],
    statuses = [],
}) {
    const { data, setData, errors, setError, clearErrors } = useForm({
        type: types[0] ?? 'panel_discussion',
        status: statuses[0] ?? 'open',
        title: emptyTri(),
        org: emptyTri(),
        location: emptyTri(),
        excerpt: emptyTri(),
        deadline: '',
        applications_count: 0,
        applications_limit: null,
    });

    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        router.post('/admin/opportunities', data, {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (serverErrors) => setError(serverErrors),
        });
    };

    return (
        <>
            <Head title="Create opportunity" />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-start sm:justify-between sm:pb-8">
                    <div>
                        <p className="text-sm font-medium text-tgray">
                            Opportunities
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-tblack">
                            Create opportunity
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-tgray">
                            Add a new opportunity to the directory.
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
                    submitLabel="Create opportunity"
                    processing={processing}
                    onSubmit={submit}
                />
            </div>
        </>
    );
}

AdminOpportunitiesCreate.layout = (page) => <AppLayout>{page}</AppLayout>;
