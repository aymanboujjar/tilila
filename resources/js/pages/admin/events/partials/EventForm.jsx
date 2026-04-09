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
                            'border-input placeholder:text-muted-foreground flex min-h-[120px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none',
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

export default function EventForm({
    data,
    setData,
    errors,
    types = [],
    statuses = [],
    visibilities = [],
    submitLabel = 'Save',
    processing = false,
    onSubmit,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-8">
                    <Card>
                        <CardHeader className="px-5 sm:px-8">
                            <CardTitle>Event Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 px-5 sm:px-8">
                            <TriLangInputs
                                idPrefix="title"
                                label="Event Title"
                                required
                                value={data.title}
                                onChange={(next) => setData('title', next)}
                            />
                            <InputError message={errors['title.en']} />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={data.date ?? ''}
                                        onChange={(e) =>
                                            setData('date', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.date} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="time">Time *</Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        value={data.time ?? ''}
                                        onChange={(e) =>
                                            setData('time', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.time} />
                                </div>
                            </div>

                            <TriLangInputs
                                idPrefix="location"
                                label="Location"
                                value={data.location}
                                onChange={(next) => setData('location', next)}
                            />

                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Input
                                    id="timezone"
                                    value={data.timezone ?? 'GMT+1'}
                                    onChange={(e) =>
                                        setData('timezone', e.target.value)
                                    }
                                    placeholder="GMT+1"
                                />
                                <InputError message={errors.timezone} />
                            </div>

                            <Card className="border-border/70 bg-background shadow-none">
                                <CardHeader className="px-5 sm:px-6">
                                    <CardTitle className="text-base">
                                        Description
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-5 sm:px-6">
                                    <TriLangTextareas
                                        idPrefix="description"
                                        label="Description"
                                        value={data.description}
                                        onChange={(next) =>
                                            setData('description', next)
                                        }
                                    />
                                </CardContent>
                            </Card>

                            <Card className="border-border/70 bg-background shadow-none">
                                <CardHeader className="px-5 sm:px-6">
                                    <CardTitle className="text-base">
                                        Media & Archives
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-5 sm:px-6">
                                    <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
                                        Upload files or drag and drop
                                    </div>
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
                                <Label htmlFor="status">Status</Label>
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
                                <Label htmlFor="visibility">Visibility</Label>
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

                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) =>
                                        setData('type', e.target.value)
                                    }
                                    className={cn(
                                        'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                                    )}
                                >
                                    {types.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.type} />
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-beta-blue hover:bg-beta-blue/90 text-twhite"
                                >
                                    {processing ? 'Saving…' : submitLabel}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={processing}
                                >
                                    Save Draft
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="px-5 sm:px-8">
                            <CardTitle>Speakers</CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 sm:px-8">
                            <Input
                                placeholder="Search Expert Directory…"
                                value=""
                                onChange={() => {}}
                            />
                            <div className="mt-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                                Connect speakers (UI placeholder)
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="px-5 sm:px-8">
                            <CardTitle>Partners</CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 sm:px-8">
                            <Input
                                placeholder="Link institution…"
                                value=""
                                onChange={() => {}}
                            />
                            <div className="mt-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                                Connect partners (UI placeholder)
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}

