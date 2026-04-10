import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import MediaForm from '@/pages/admin/media/partials/MediaForm';

function emptyTri() {
    return { en: '', fr: '', ar: '' };
}

export default function AdminMediaCreate({
    categories = [],
    statuses = [],
    visibilities = [],
}) {
    const { data, setData, errors, setError, clearErrors } = useForm({
        category_id: categories[0] ?? 'interviews',
        status: statuses[0] ?? 'draft',
        visibility: visibilities[0] ?? 'public',
        badge: emptyTri(),
        title: emptyTri(),
        excerpt: emptyTri(),
        meta: emptyTri(),
        cta: emptyTri(),
        image_path: null,
        image_url: null,
        image: null,
    });

    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        router.post('/admin/media', data, {
            forceFormData: true,
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (serverErrors) => setError(serverErrors),
        });
    };

    return (
        <>
            <Head title="Create media item" />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">Media</p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            Create media item
                        </h1>
                        <p className="text-tgray mt-1 max-w-2xl text-sm">
                            Add a new media item to the library.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/admin/media" className="gap-2">
                            <ChevronLeft className="size-4" />
                            Back to list
                        </Link>
                    </Button>
                </div>

                <MediaForm
                    mode="create"
                    data={data}
                    setData={setData}
                    errors={errors}
                    categories={categories}
                    statuses={statuses}
                    visibilities={visibilities}
                    submitLabel="Create media item"
                    processing={processing}
                    onSubmit={submit}
                />
            </div>
        </>
    );
}

AdminMediaCreate.layout = (page) => <AppLayout>{page}</AppLayout>;

