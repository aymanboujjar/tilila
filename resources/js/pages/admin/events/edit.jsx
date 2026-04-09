import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import EventForm from '@/pages/admin/events/partials/EventForm';

function emptyTri() {
    return { en: '', fr: '', ar: '' };
}

export default function AdminEventsEdit({
    event,
    types = [],
    statuses = [],
    visibilities = [],
}) {
    const { data, setData, errors, setError, clearErrors } = useForm({
        type: event.type ?? (types[0] ?? 'tilitalk'),
        status: event.status ?? (statuses[0] ?? 'draft'),
        visibility: event.visibility ?? (visibilities[0] ?? 'public'),
        title: { ...emptyTri(), ...(event.title ?? {}) },
        location: { ...emptyTri(), ...(event.location ?? {}) },
        description: { ...emptyTri(), ...(event.description ?? {}) },
        date: event.date ?? '',
        time: event.time ?? '',
        timezone: event.timezone ?? 'GMT+1',
    });

    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        router.post(
            `/admin/events/${encodeURIComponent(event.slug ?? '')}`,
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
            <Head title={`Edit ${event.title?.en ?? 'event'}`} />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">Events</p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            Edit event
                        </h1>
                        <p className="text-tgray mt-1 max-w-2xl text-sm">
                            {event.title?.en ?? 'Event'} — update the fields and
                            save.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/admin/events" className="gap-2">
                            <ChevronLeft className="size-4" />
                            Back to list
                        </Link>
                    </Button>
                </div>

                <EventForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    types={types}
                    statuses={statuses}
                    visibilities={visibilities}
                    submitLabel="Save changes"
                    processing={processing}
                    onSubmit={submit}
                />
            </div>
        </>
    );
}

AdminEventsEdit.layout = (page) => <AppLayout>{page}</AppLayout>;

