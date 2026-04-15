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

export default function OpportunityForm({
    data,
    setData,
    errors,
    types = [],
    statuses = [],
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
                            <CardTitle>General Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 px-5 sm:px-8">
                            <TriLangInputs
                                idPrefix="title"
                                label="Opportunity Title"
                                required
                                value={data.title}
                                onChange={(next) => setData('title', next)}
                            />
                            <InputError message={errors['title.en']} />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type *</Label>
                                    <select
                                        id="type"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData('type', e.target.value)
                                        }
                                        className={cn(
                                            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
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

                                <div className="space-y-2">
                                    <Label htmlFor="org-en">
                                        Organizer / Institution
                                    </Label>
                                    <Input
                                        id="org-en"
                                        value={data.org?.en ?? ''}
                                        onChange={(e) =>
                                            setData('org', {
                                                ...(data.org ?? {}),
                                                en: e.target.value,
                                            })
                                        }
                                        placeholder="e.g. Ministry of Culture"
                                    />
                                    <div className="text-xs text-muted-foreground">
                                        (English — you can still fill FR/AR
                                        below)
                                    </div>
                                </div>
                            </div>

                            <TriLangInputs
                                idPrefix="org"
                                label="Organizer / Institution"
                                value={data.org}
                                onChange={(next) => setData('org', next)}
                            />

                            <TriLangInputs
                                idPrefix="location"
                                label="Location"
                                value={data.location}
                                onChange={(next) => setData('location', next)}
                            />

                            <Card className="border-border/70 bg-background shadow-none">
                                <CardHeader className="px-5 sm:px-6">
                                    <CardTitle className="text-base">
                                        Description
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
                                <Label htmlFor="deadline">
                                    Application deadline
                                </Label>
                                <Input
                                    id="deadline"
                                    type="date"
                                    value={data.deadline ?? ''}
                                    onChange={(e) =>
                                        setData('deadline', e.target.value)
                                    }
                                />
                                <InputError message={errors.deadline} />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                                <div className="space-y-2">
                                    <Label htmlFor="applications_limit">
                                        Applications limit
                                    </Label>
                                    <Input
                                        id="applications_limit"
                                        type="number"
                                        min="0"
                                        value={
                                            data.applications_limit === null ||
                                            typeof data.applications_limit ===
                                                'undefined'
                                                ? ''
                                                : data.applications_limit
                                        }
                                        onChange={(e) =>
                                            setData(
                                                'applications_limit',
                                                e.target.value === ''
                                                    ? null
                                                    : Number(e.target.value),
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.applications_limit}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="applications_count">
                                        Applications count
                                    </Label>
                                    <Input
                                        id="applications_count"
                                        type="number"
                                        min="0"
                                        value={data.applications_count ?? 0}
                                        onChange={(e) =>
                                            setData(
                                                'applications_count',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.applications_count}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border/60 pt-6">
                <Button
                    type="submit"
                    disabled={processing}
                    className="bg-beta-blue text-twhite hover:bg-beta-blue/90"
                >
                    {processing ? 'Saving…' : submitLabel}
                </Button>
            </div>
        </form>
    );
}
