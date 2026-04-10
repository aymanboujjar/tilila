import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import MediaForm from '@/pages/admin/media/partials/MediaForm';

function emptyTri() {
    return { en: '', fr: '', ar: '' };
}

export default function AdminMediaEdit({
    item,
    updateUrl,
    categories = [],
    statuses = [],
    visibilities = [],
    experts = [],
}) {
    const topics =
        Array.isArray(item.trending_topics) &&
        item.trending_topics.length > 0
            ? item.trending_topics
            : [{ title: emptyTri(), tag: emptyTri() }];
    const links =
        Array.isArray(item.resource_links) &&
        item.resource_links.length > 0
            ? item.resource_links
            : [{ label: emptyTri(), url: '' }];

    const { data, setData, errors, setError, clearErrors } = useForm({
        category_id: item.category_id ?? (categories[0] ?? 'interviews'),
        status: item.status ?? (statuses[0] ?? 'draft'),
        visibility: item.visibility ?? (visibilities[0] ?? 'public'),
        badge: { ...emptyTri(), ...(item.badge ?? {}) },
        title: { ...emptyTri(), ...(item.title ?? {}) },
        excerpt: { ...emptyTri(), ...(item.excerpt ?? {}) },
        reading_label: {
            ...emptyTri(),
            ...(item.reading_label ?? {}),
        },
        location_label: {
            ...emptyTri(),
            ...(item.location_label ?? {}),
        },
        featured_expert_id: item.featured_expert_id ?? '',
        trending_topics: topics.map((t) => ({
            title: { ...emptyTri(), ...(t.title ?? {}) },
            tag: { ...emptyTri(), ...(t.tag ?? {}) },
        })),
        resource_links: links.map((r) => ({
            label: { ...emptyTri(), ...(r.label ?? {}) },
            url: r.url ?? '',
        })),
        image_path: item.image_path ?? null,
        image_url: item.image_url ?? null,
        image: null,
    });

    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        const url =
            updateUrl ??
            `/admin/media/${encodeURIComponent(item?.slug ?? item?.id ?? '')}`;
        router.post(
            url,
            { ...data, _method: 'put' },
            {
                forceFormData: true,
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onError: (serverErrors) => setError(serverErrors),
            },
        );
    };

    return (
        <>
            <Head title={`Edit ${item.title?.en ?? 'media item'}`} />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">Media</p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            Edit media item
                        </h1>
                        <p className="text-tgray mt-1 max-w-2xl text-sm">
                            {item.title?.en ?? 'Media item'} — update the fields
                            and save.
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
                    mode="edit"
                    data={data}
                    setData={setData}
                    errors={errors}
                    experts={experts}
                    categories={categories}
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

AdminMediaEdit.layout = (page) => <AppLayout>{page}</AppLayout>;

