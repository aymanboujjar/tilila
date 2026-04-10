import React from 'react';

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
                            'border-input placeholder:text-muted-foreground flex min-h-[96px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none',
                            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
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

export default function MediaForm({
    mode = 'create',
    data,
    setData,
    errors,
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
                                <CardContent className="px-5 sm:px-6">
                                    <TriLangTextareas
                                        idPrefix="excerpt"
                                        label="Short description"
                                        value={data.excerpt}
                                        onChange={(next) =>
                                            setData('excerpt', next)
                                        }
                                    />
                                </CardContent>
                            </Card>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Meta</Label>
                                    <TriLangInputs
                                        idPrefix="meta"
                                        label="Meta line"
                                        value={data.meta}
                                        onChange={(next) =>
                                            setData('meta', next)
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>CTA</Label>
                                    <TriLangInputs
                                        idPrefix="cta"
                                        label="CTA label"
                                        value={data.cta}
                                        onChange={(next) => setData('cta', next)}
                                    />
                                </div>
                            </div>

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
                                        'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
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
                                        'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
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
                                        'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
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
                                    className="bg-beta-blue hover:bg-beta-blue/90 text-twhite"
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

