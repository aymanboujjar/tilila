import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, Pencil, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';

function statusBadgeClass(status) {
    switch (status) {
        case 'published':
            return 'border-alpha-green/40 bg-beta-green text-alpha-green';
        case 'draft':
            return 'border-alpha-yellow/50 bg-beta-yellow text-alpha-yellow';
        case 'archived':
            return 'border-border bg-muted text-muted-foreground';
        default:
            return 'border-border bg-muted text-muted-foreground';
    }
}

function Tri({ value }) {
    return (
        <div className="grid gap-3 sm:grid-cols-3">
            {['en', 'fr', 'ar'].map((lang) => (
                <div key={lang} className="rounded-xl border border-border bg-card px-4 py-3">
                    <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                        {lang}
                    </div>
                    <div className="mt-1 text-sm text-foreground">
                        {value?.[lang] ?? ''}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function AdminMediaShow({ item }) {
    return (
        <>
            <Head title={item?.title?.en ?? 'Media item'} />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">Media</p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            {item?.title?.en ?? item?.slug ?? 'Media item'}
                        </h1>
                        <p className="text-tgray mt-1 max-w-2xl text-sm">
                            Review details and manage publishing.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button asChild variant="outline">
                            <Link href="/admin/media" className="gap-2">
                                <ChevronLeft className="size-4" />
                                Back to list
                            </Link>
                        </Button>
                        <Button asChild className="gap-2">
                            <Link
                                href={`/admin/media/${encodeURIComponent(item.slug ?? '')}/edit`}
                            >
                                <Pencil className="size-4" />
                                Edit
                            </Link>
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            className="gap-2"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        'Delete this media item? This cannot be undone.',
                                    )
                                ) {
                                    router.delete(
                                        `/admin/media/${encodeURIComponent(item.slug ?? '')}`,
                                        { preserveScroll: true },
                                    );
                                }
                            }}
                        >
                            <Trash2 className="size-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="space-y-6 lg:col-span-8">
                        {item?.image_url ? (
                            <div className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                                <img
                                    src={item.image_url}
                                    alt=""
                                    className="max-h-88 w-full object-cover"
                                />
                            </div>
                        ) : null}

                        <Card>
                            <CardHeader className="px-5 sm:px-8">
                                <CardTitle>Content</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 px-5 sm:px-8">
                                <div>
                                    <div className="text-sm font-semibold text-foreground">
                                        Badge
                                    </div>
                                    <div className="mt-2">
                                        <Tri value={item.badge} />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-foreground">
                                        Title
                                    </div>
                                    <div className="mt-2">
                                        <Tri value={item.title} />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-foreground">
                                        Excerpt
                                    </div>
                                    <div className="mt-2">
                                        <Tri value={item.excerpt} />
                                    </div>
                                </div>
                                <div className="rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
                                    Public cards use the fixed replay CTA (EN / FR /
                                    AR). A secondary meta line appears only when the
                                    item has meta text saved in the database.
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="px-5 sm:px-8">
                                <CardTitle>Page sidebar (detail)</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-5 sm:px-8">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        Featured expert ID
                                    </div>
                                    <div className="text-sm font-semibold text-foreground">
                                        {item.featured_expert_id ?? '—'}
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Trending topics:{' '}
                                    <span className="font-semibold text-foreground">
                                        {Array.isArray(item.trending_topics)
                                            ? item.trending_topics.length
                                            : 0}
                                    </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Resource links:{' '}
                                    <span className="font-semibold text-foreground">
                                        {Array.isArray(item.resource_links)
                                            ? item.resource_links.length
                                            : 0}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6 lg:col-span-4">
                        <Card>
                            <CardHeader className="px-5 sm:px-8">
                                <CardTitle>Publishing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-5 sm:px-8">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        Category
                                    </div>
                                    <div className="text-sm font-semibold text-foreground">
                                        {item.category_id ?? '—'}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        Visibility
                                    </div>
                                    <div className="text-sm font-semibold text-foreground">
                                        {item.visibility ?? '—'}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        Status
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            'capitalize',
                                            statusBadgeClass(item.status),
                                        )}
                                    >
                                        {item.status ?? '—'}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        Updated
                                    </div>
                                    <div className="text-sm font-semibold text-foreground">
                                        {item.updated_at
                                            ? new Date(item.updated_at).toLocaleString()
                                            : '—'}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminMediaShow.layout = (page) => <AppLayout>{page}</AppLayout>;

