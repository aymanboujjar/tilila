import React from 'react';

import { Plus, Trash2 } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

function TriLangInputs({ idPrefix, label, value, onChange, required = false }) {
    return (
        <div className="grid gap-3 sm:grid-cols-3">
            {['en', 'fr', 'ar'].map((lang) => (
                <div key={lang} className="space-y-2">
                    <Label htmlFor={`${idPrefix}-${lang}`}>
                        {label} ({lang.toUpperCase()})
                        {required && lang === 'en' ? ' *' : ''}
                    </Label>
                    <Input
                        id={`${idPrefix}-${lang}`}
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

function TriLangTextareas({ idPrefix, label, value, onChange }) {
    return (
        <div className="grid gap-3 sm:grid-cols-3">
            {['en', 'fr', 'ar'].map((lang) => (
                <div key={lang} className="space-y-2">
                    <Label htmlFor={`${idPrefix}-${lang}`}>
                        {label} ({lang.toUpperCase()})
                    </Label>
                    <textarea
                        id={`${idPrefix}-${lang}`}
                        className={cn(
                            'flex min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground',
                            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                        )}
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

function emptyTri() {
    return { en: '', fr: '', ar: '' };
}

export default function MediaForm({
    mode = 'create',
    data,
    setData,
    errors,
    experts = [],
    categories = [],
    statuses = [],
    visibilities = [],
    submitLabel = 'Save',
    processing = false,
    onSubmit,
}) {
    const [imagePreview, setImagePreview] = React.useState(null);

    React.useEffect(() => {
        if (!data.image) {
            setImagePreview(null);
            return;
        }

        const url = URL.createObjectURL(data.image);
        setImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [data.image]);

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-8">
                    <Card>
                        <CardHeader className="px-5 sm:px-8">
                            <CardTitle>Media details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 px-5 sm:px-8">
                            <TriLangInputs
                                idPrefix="title"
                                label="Title"
                                required
                                value={data.title}
                                onChange={(next) => setData('title', next)}
                            />
                            <InputError message={errors['title.en']} />

                            <TriLangInputs
                                idPrefix="badge"
                                label="Badge (small label)"
                                value={data.badge}
                                onChange={(next) => setData('badge', next)}
                            />

                            <Card className="border-border/70 bg-background shadow-none">
                                <CardHeader className="px-5 sm:px-6">
                                    <CardTitle className="text-base">
                                        Excerpt
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 px-5 sm:px-6">
                                    <TriLangTextareas
                                        idPrefix="excerpt"
                                        label="Short description"
                                        value={data.excerpt}
                                        onChange={(next) =>
                                            setData('excerpt', next)
                                        }
                                    />
                                    <div className="rounded-lg border border-dashed border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
                                        Card CTA is fixed for all items:{' '}
                                        <span className="font-semibold text-foreground">
                                            Watch replay →
                                        </span>{' '}
                                        / FR / AR (not editable here).
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/70 bg-background shadow-none">
                                <CardHeader className="px-5 sm:px-6">
                                    <CardTitle className="text-base">
                                        Page sidebar (this media)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 px-5 sm:px-6">
                                    <p className="text-xs text-muted-foreground">
                                        Used on the public detail page for this
                                        item. If you leave all topic or resource
                                        rows empty, the site uses the global
                                        media sidebar (
                                        <span className="font-medium text-foreground">
                                            Media page sidebar
                                        </span>
                                        ).
                                    </p>
                                    <div className="space-y-2">
                                        <Label htmlFor="featured_expert_id">
                                            Featured expert (spotlight)
                                        </Label>
                                        <select
                                            id="featured_expert_id"
                                            value={
                                                data.featured_expert_id !==
                                                    null &&
                                                data.featured_expert_id !==
                                                    undefined &&
                                                data.featured_expert_id !== ''
                                                    ? String(
                                                          data.featured_expert_id,
                                                      )
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'featured_expert_id',
                                                    e.target.value === ''
                                                        ? ''
                                                        : Number(
                                                              e.target.value,
                                                          ),
                                                )
                                            }
                                            className={cn(
                                                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
                                            )}
                                        >
                                            <option value="">None</option>
                                            {experts.map((ex) => (
                                                <option
                                                    key={ex.id}
                                                    value={ex.id}
                                                >
                                                    {ex.label}
                                                    {ex.status !== 'published'
                                                        ? ` (${ex.status})`
                                                        : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.featured_expert_id}
                                        />
                                    </div>

                                    <div className="space-y-4 border-t border-border pt-5">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <span className="text-sm font-semibold">
                                                Trending topics
                                            </span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="gap-1"
                                                onClick={() =>
                                                    setData('trending_topics', [
                                                        ...data.trending_topics,
                                                        {
                                                            title: emptyTri(),
                                                            tag: emptyTri(),
                                                        },
                                                    ])
                                                }
                                            >
                                                <Plus className="size-4" />
                                                Add topic
                                            </Button>
                                        </div>
                                        {(data.trending_topics ?? []).map(
                                            (row, idx) => (
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
                                                                'inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:underline',
                                                                (data
                                                                    .trending_topics
                                                                    ?.length ??
                                                                    0) <= 1
                                                                    ? 'pointer-events-none opacity-40'
                                                                    : '',
                                                            )}
                                                            onClick={() =>
                                                                setData(
                                                                    'trending_topics',
                                                                    data.trending_topics.filter(
                                                                        (
                                                                            _,
                                                                            i,
                                                                        ) =>
                                                                            i !==
                                                                            idx,
                                                                    ),
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="size-3.5" />
                                                            Remove
                                                        </button>
                                                    </div>
                                                    <TriLangInputs
                                                        idPrefix={`topic-${idx}-title`}
                                                        label="Title"
                                                        value={
                                                            row.title ??
                                                            emptyTri()
                                                        }
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
                                                    <TriLangInputs
                                                        idPrefix={`topic-${idx}-tag`}
                                                        label="Right label (date, badge…)"
                                                        value={
                                                            row.tag ??
                                                            emptyTri()
                                                        }
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
                                            ),
                                        )}
                                    </div>

                                    <div className="space-y-4 border-t border-border pt-5">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <span className="text-sm font-semibold">
                                                Resources
                                            </span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="gap-1"
                                                onClick={() =>
                                                    setData('resource_links', [
                                                        ...data.resource_links,
                                                        {
                                                            label: emptyTri(),
                                                            url: '',
                                                        },
                                                    ])
                                                }
                                            >
                                                <Plus className="size-4" />
                                                Add link
                                            </Button>
                                        </div>
                                        {(data.resource_links ?? []).map(
                                            (row, idx) => (
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
                                                                'inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:underline',
                                                                (data
                                                                    .resource_links
                                                                    ?.length ??
                                                                    0) <= 1
                                                                    ? 'pointer-events-none opacity-40'
                                                                    : '',
                                                            )}
                                                            onClick={() =>
                                                                setData(
                                                                    'resource_links',
                                                                    data.resource_links.filter(
                                                                        (
                                                                            _,
                                                                            i,
                                                                        ) =>
                                                                            i !==
                                                                            idx,
                                                                    ),
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="size-3.5" />
                                                            Remove
                                                        </button>
                                                    </div>
                                                    <TriLangInputs
                                                        idPrefix={`link-${idx}-label`}
                                                        label="Label"
                                                        value={
                                                            row.label ??
                                                            emptyTri()
                                                        }
                                                        onChange={(next) => {
                                                            const nextRows = [
                                                                ...data.resource_links,
                                                            ];
                                                            nextRows[idx] = {
                                                                ...row,
                                                                label: next,
                                                            };
                                                            setData(
                                                                'resource_links',
                                                                nextRows,
                                                            );
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
                                                        <Label
                                                            htmlFor={`link-${idx}-url`}
                                                        >
                                                            URL (optional)
                                                        </Label>
                                                        <Input
                                                            id={`link-${idx}-url`}
                                                            type="url"
                                                            value={
                                                                row.url ?? ''
                                                            }
                                                            onChange={(e) => {
                                                                const nextRows =
                                                                    [
                                                                        ...data.resource_links,
                                                                    ];
                                                                nextRows[idx] =
                                                                    {
                                                                        ...row,
                                                                        url: e
                                                                            .target
                                                                            .value,
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
                                            ),
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/70 bg-background shadow-none">
                                <CardHeader className="px-5 sm:px-6">
                                    <CardTitle className="text-base">
                                        Cover image
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 px-5 sm:px-6">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="cursor-pointer"
                                        onChange={(e) => {
                                            const f =
                                                e.target.files?.[0] ?? null;
                                            if (f) {
                                                setData('image', f);
                                                setData('image_path', null);
                                                setData('image_url', null);
                                            }
                                        }}
                                    />
                                    {(imagePreview || data.image_url) && (
                                        <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
                                            <img
                                                src={
                                                    imagePreview ??
                                                    data.image_url ??
                                                    ''
                                                }
                                                alt=""
                                                className="max-h-52 w-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <InputError message={errors.image} />
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6 lg:col-span-4">
                    <Card>
                        <CardHeader className="px-5 sm:px-8">
                            <CardTitle>Publishing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 px-5 sm:px-8">
                            <div className="space-y-2">
                                <Label htmlFor="category_id">Category *</Label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData('category_id', e.target.value)
                                    }
                                    className={cn(
                                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
                                    )}
                                >
                                    {categories.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.category_id} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status *</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                    className={cn(
                                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
                                    )}
                                >
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.status} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="visibility">Visibility *</Label>
                                <select
                                    id="visibility"
                                    value={data.visibility}
                                    onChange={(e) =>
                                        setData('visibility', e.target.value)
                                    }
                                    className={cn(
                                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
                                    )}
                                >
                                    {visibilities.map((v) => (
                                        <option key={v} value={v}>
                                            {v}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.visibility} />
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-beta-blue text-twhite hover:bg-beta-blue/90"
                                >
                                    {processing ? 'Saving…' : submitLabel}
                                </Button>
                                {mode === 'edit' ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={processing}
                                        onClick={() => {
                                            setData('status', 'draft');
                                        }}
                                    >
                                        Convert to draft
                                    </Button>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
