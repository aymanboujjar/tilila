import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';

function emptyTri() {
    return { en: '', fr: '', ar: '' };
}

function LangInputs({ prefix, label, value, onChange }) {
    return (
        <div className="grid gap-3 sm:grid-cols-3">
            {['en', 'fr', 'ar'].map((lang) => (
                <div key={lang} className="space-y-2">
                    <Label htmlFor={`${prefix}-${lang}`}>
                        {label} ({lang.toUpperCase()})
                    </Label>
                    <Input
                        id={`${prefix}-${lang}`}
                        value={value?.[lang] ?? ''}
                        onChange={(e) =>
                            onChange({ ...value, [lang]: e.target.value })
                        }
                    />
                </div>
            ))}
        </div>
    );
}

export default function AdminMediaSidebar({ settings }) {
    const [processing, setProcessing] = useState(false);
    const topics =
        settings?.trending_topics?.length > 0
            ? settings.trending_topics
            : [{ title: emptyTri(), tag: emptyTri() }];
    const links =
        settings?.resource_links?.length > 0
            ? settings.resource_links
            : [{ label: emptyTri(), url: '' }];

    const { data, setData, errors, setError, clearErrors } = useForm({
        trending_topics: topics.map((t) => ({
            title: { ...emptyTri(), ...(t.title ?? {}) },
            tag: { ...emptyTri(), ...(t.tag ?? {}) },
        })),
        resource_links: links.map((r) => ({
            label: { ...emptyTri(), ...(r.label ?? {}) },
            url: r.url ?? '',
        })),
    });

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        router.put('/admin/media/sidebar', data, {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (serverErrors) => setError(serverErrors),
        });
    };

    return (
        <>
            <Head title="Media page sidebar" />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-start sm:justify-between sm:pb-8">
                    <div>
                        <p className="text-sm font-medium text-tgray">Media</p>
                        <h1 className="text-2xl font-bold tracking-tight text-tblack">
                            Public media sidebar
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-tgray">
                            Default trending topics and resource links for the
                            /media listing (tri-lingual). Individual media items
                            can override these on their public detail pages.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/admin/media" className="gap-2">
                            <ChevronLeft className="size-4" />
                            Back to media list
                        </Link>
                    </Button>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    <Card>
                        <CardHeader className="flex flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                            <CardTitle>Trending topics</CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() =>
                                    setData('trending_topics', [
                                        ...data.trending_topics,
                                        { title: emptyTri(), tag: emptyTri() },
                                    ])
                                }
                            >
                                <Plus className="size-4" />
                                Add topic
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6 px-5 sm:px-8">
                            {data.trending_topics.map((row, idx) => (
                                <div
                                    key={idx}
                                    className="space-y-4 rounded-xl border border-border bg-card/50 p-4"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs font-extrabold text-muted-foreground uppercase">
                                            Topic {idx + 1}
                                        </span>
                                        <button
                                            type="button"
                                            className={cn(
                                                'inline-flex items-center gap-1 text-xs font-semibold text-alpha-danger hover:underline',
                                                data.trending_topics.length <= 1
                                                    ? 'pointer-events-none opacity-40'
                                                    : '',
                                            )}
                                            onClick={() =>
                                                setData(
                                                    'trending_topics',
                                                    data.trending_topics.filter(
                                                        (_, i) => i !== idx,
                                                    ),
                                                )
                                            }
                                        >
                                            <Trash2 className="size-3.5" />
                                            Remove
                                        </button>
                                    </div>
                                    <LangInputs
                                        prefix={`topic-${idx}-title`}
                                        label="Title"
                                        value={row.title}
                                        onChange={(next) => {
                                            const nextRows = [
                                                ...data.trending_topics,
                                            ];
                                            nextRows[idx] = {
                                                ...row,
                                                title: next,
                                            };
                                            setData(
                                                'trending_topics',
                                                nextRows,
                                            );
                                        }}
                                    />
                                    <InputError
                                        message={
                                            errors[
                                                `trending_topics.${idx}.title.en`
                                            ]
                                        }
                                    />
                                    <LangInputs
                                        prefix={`topic-${idx}-tag`}
                                        label="Right label (date, badge…)"
                                        value={row.tag}
                                        onChange={(next) => {
                                            const nextRows = [
                                                ...data.trending_topics,
                                            ];
                                            nextRows[idx] = {
                                                ...row,
                                                tag: next,
                                            };
                                            setData(
                                                'trending_topics',
                                                nextRows,
                                            );
                                        }}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                            <CardTitle>Resources</CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() =>
                                    setData('resource_links', [
                                        ...data.resource_links,
                                        { label: emptyTri(), url: '' },
                                    ])
                                }
                            >
                                <Plus className="size-4" />
                                Add link
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6 px-5 sm:px-8">
                            {data.resource_links.map((row, idx) => (
                                <div
                                    key={idx}
                                    className="space-y-4 rounded-xl border border-border bg-card/50 p-4"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs font-extrabold text-muted-foreground uppercase">
                                            Link {idx + 1}
                                        </span>
                                        <button
                                            type="button"
                                            className={cn(
                                                'inline-flex items-center gap-1 text-xs font-semibold text-alpha-danger hover:underline',
                                                data.resource_links.length <= 1
                                                    ? 'pointer-events-none opacity-40'
                                                    : '',
                                            )}
                                            onClick={() =>
                                                setData(
                                                    'resource_links',
                                                    data.resource_links.filter(
                                                        (_, i) => i !== idx,
                                                    ),
                                                )
                                            }
                                        >
                                            <Trash2 className="size-3.5" />
                                            Remove
                                        </button>
                                    </div>
                                    <LangInputs
                                        prefix={`link-${idx}-label`}
                                        label="Label"
                                        value={row.label}
                                        onChange={(next) => {
                                            const nextRows = [
                                                ...data.resource_links,
                                            ];
                                            nextRows[idx] = {
                                                ...row,
                                                label: next,
                                            };
                                            setData('resource_links', nextRows);
                                        }}
                                    />
                                    <InputError
                                        message={
                                            errors[
                                                `resource_links.${idx}.label.en`
                                            ]
                                        }
                                    />
                                    <div className="space-y-2">
                                        <Label htmlFor={`link-${idx}-url`}>
                                            URL (optional)
                                        </Label>
                                        <Input
                                            id={`link-${idx}-url`}
                                            type="url"
                                            value={row.url ?? ''}
                                            onChange={(e) => {
                                                const nextRows = [
                                                    ...data.resource_links,
                                                ];
                                                nextRows[idx] = {
                                                    ...row,
                                                    url: e.target.value,
                                                };
                                                setData(
                                                    'resource_links',
                                                    nextRows,
                                                );
                                            }}
                                            placeholder="https://…"
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-beta-blue text-twhite hover:bg-beta-blue/90"
                    >
                        {processing ? 'Saving…' : 'Save sidebar'}
                    </Button>
                </form>
            </div>
        </>
    );
}

AdminMediaSidebar.layout = (page) => <AppLayout>{page}</AppLayout>;
