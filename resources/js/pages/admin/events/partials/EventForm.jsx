import React from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

function SpeakerListAvatar({ speaker }) {
    const blobUrl = React.useMemo(() => {
        if (speaker?.photo instanceof File) {
            return URL.createObjectURL(speaker.photo);
        }

        return null;
    }, [speaker?.photo]);

    React.useEffect(() => {
        return () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, [blobUrl]);

    if (speaker?.photo_url) {
        return (
            <img
                src={speaker.photo_url}
                alt=""
                className="h-full w-full object-cover"
            />
        );
    }
    if (blobUrl) {
        return (
            <img src={blobUrl} alt="" className="h-full w-full object-cover" />
        );
    }

    return null;
}

function PartnerListLogo({ partner }) {
    const blobUrl = React.useMemo(() => {
        if (partner?.logo instanceof File) {
            return URL.createObjectURL(partner.logo);
        }

        return null;
    }, [partner?.logo]);

    React.useEffect(() => {
        return () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, [blobUrl]);

    if (partner?.logo_url) {
        return (
            <img
                src={partner.logo_url}
                alt=""
                className="max-h-full max-w-full object-contain"
            />
        );
    }
    if (blobUrl) {
        return (
            <img
                src={blobUrl}
                alt=""
                className="max-h-full max-w-full object-contain"
            />
        );
    }

    return null;
}

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
    const [speakerModalOpen, setSpeakerModalOpen] = React.useState(false);
    const [partnerModalOpen, setPartnerModalOpen] = React.useState(false);
    const [speakerDraft, setSpeakerDraft] = React.useState({
        full_name: '',
        role: '',
        email: '',
        photo: null,
        photo_path: null,
        photo_url: null,
    });
    const [partnerDraft, setPartnerDraft] = React.useState({
        name: '',
        url: '',
        logo: null,
        logo_path: null,
        logo_url: null,
    });
    const [editingSpeakerIndex, setEditingSpeakerIndex] = React.useState(null);
    const [editingPartnerIndex, setEditingPartnerIndex] = React.useState(null);

    const [speakerPreviewUrl, setSpeakerPreviewUrl] = React.useState(null);
    React.useEffect(() => {
        if (!speakerDraft.photo) {
            setSpeakerPreviewUrl(null);

            return;
        }
        const url = URL.createObjectURL(speakerDraft.photo);
        setSpeakerPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [speakerDraft.photo]);

    const [partnerPreviewUrl, setPartnerPreviewUrl] = React.useState(null);
    React.useEffect(() => {
        if (!partnerDraft.logo) {
            setPartnerPreviewUrl(null);

            return;
        }
        const url = URL.createObjectURL(partnerDraft.logo);
        setPartnerPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [partnerDraft.logo]);

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
                                    <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-8">
                                        <div className="text-center text-sm text-muted-foreground">
                                            Upload files or drag and drop
                                        </div>
                                        <div className="mt-4 flex justify-center">
                                            <label className="inline-flex cursor-pointer items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground">
                                                Choose files
                                                <input
                                                    type="file"
                                                    multiple
                                                    className="sr-only"
                                                    onChange={(e) =>
                                                        setData(
                                                            'media_files',
                                                            Array.from(
                                                                e.target.files ??
                                                                    [],
                                                            ),
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>

                                        {(data.media_files ?? []).length ? (
                                            <div className="mt-5 space-y-2 text-sm">
                                                {(data.media_files ?? []).map(
                                                    (f, idx) => (
                                                        <div
                                                            key={`${f.name}-${idx}`}
                                                            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-2"
                                                        >
                                                            <div className="min-w-0 truncate text-muted-foreground">
                                                                {f.name}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="text-xs font-semibold text-alpha-danger hover:underline"
                                                                onClick={() =>
                                                                    setData(
                                                                        'media_files',
                                                                        (data.media_files ??
                                                                            []).filter(
                                                                            (_, i) =>
                                                                                i !==
                                                                                idx,
                                                                        ),
                                                                    )
                                                                }
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        ) : null}

                                        <InputError message={errors.media_files} />
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
                            <div className="flex items-center justify-between gap-3">
                                <div className="text-sm text-muted-foreground">
                                    Add speakers (photo optional).
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setEditingSpeakerIndex(null);
                                        setSpeakerDraft({
                                            full_name: '',
                                            role: '',
                                            email: '',
                                            photo: null,
                                            photo_path: null,
                                            photo_url: null,
                                        });
                                        setSpeakerModalOpen(true);
                                    }}
                                >
                                    Add speaker
                                </Button>
                            </div>

                            <div className="mt-4 space-y-2">
                                {(data.speakers ?? []).length === 0 ? (
                                    <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                                        No speakers yet.
                                    </div>
                                ) : (
                                    (data.speakers ?? []).map((s, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
                                                    <SpeakerListAvatar speaker={s} />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-semibold text-foreground">
                                                        {s?.full_name ?? '—'}
                                                    </div>
                                                    <div className="truncate text-xs text-muted-foreground">
                                                        {[
                                                            s?.role,
                                                            s?.email,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(' • ') || '—'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    className="text-xs font-semibold text-beta-blue hover:underline"
                                                    onClick={() => {
                                                        setEditingSpeakerIndex(idx);
                                                        setSpeakerDraft({
                                                            full_name:
                                                                s?.full_name ??
                                                                '',
                                                            role: s?.role ?? '',
                                                            email: s?.email ?? '',
                                                            photo: null,
                                                            photo_path:
                                                                s?.photo_path ??
                                                                null,
                                                            photo_url:
                                                                s?.photo_url ??
                                                                null,
                                                        });
                                                        setSpeakerModalOpen(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-xs font-semibold text-alpha-danger hover:underline"
                                                    onClick={() =>
                                                        setData(
                                                            'speakers',
                                                            (data.speakers ??
                                                                []).filter(
                                                                (_, i) =>
                                                                    i !== idx,
                                                            ),
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <InputError message={errors.speakers} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="px-5 sm:px-8">
                            <CardTitle>Partners</CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 sm:px-8">
                            <div className="flex items-center justify-between gap-3">
                                <div className="text-sm text-muted-foreground">
                                    Partner name, website, and optional logo.
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setEditingPartnerIndex(null);
                                        setPartnerDraft({
                                            name: '',
                                            url: '',
                                            logo: null,
                                            logo_path: null,
                                            logo_url: null,
                                        });
                                        setPartnerModalOpen(true);
                                    }}
                                >
                                    Add partner
                                </Button>
                            </div>

                            <div className="mt-4 space-y-2">
                                {(data.partners ?? []).length === 0 ? (
                                    <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                                        No partners yet.
                                    </div>
                                ) : (
                                    (data.partners ?? []).map((p, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted ring-1 ring-border">
                                                    <PartnerListLogo partner={p} />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-semibold text-foreground">
                                                        {p?.name ?? '—'}
                                                    </div>
                                                    <div className="truncate text-xs text-muted-foreground">
                                                        {p?.url ?? '—'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    className="text-xs font-semibold text-beta-blue hover:underline"
                                                    onClick={() => {
                                                        setEditingPartnerIndex(idx);
                                                        setPartnerDraft({
                                                            name: p?.name ?? '',
                                                            url: p?.url ?? '',
                                                            logo: null,
                                                            logo_path:
                                                                p?.logo_path ??
                                                                null,
                                                            logo_url:
                                                                p?.logo_url ??
                                                                null,
                                                        });
                                                        setPartnerModalOpen(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-xs font-semibold text-alpha-danger hover:underline"
                                                    onClick={() =>
                                                        setData(
                                                            'partners',
                                                            (data.partners ??
                                                                []).filter(
                                                                (_, i) =>
                                                                    i !== idx,
                                                            ),
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <InputError message={errors.partners} />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog
                open={speakerModalOpen}
                onOpenChange={(open) => !open && setSpeakerModalOpen(false)}
            >
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader className="text-left">
                        <DialogTitle>
                            {editingSpeakerIndex === null
                                ? 'Add speaker'
                                : 'Edit speaker'}
                        </DialogTitle>
                        <DialogDescription>
                            Enter speaker details manually.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Full name *</Label>
                            <Input
                                value={speakerDraft.full_name}
                                onChange={(e) =>
                                    setSpeakerDraft((s) => ({
                                        ...s,
                                        full_name: e.target.value,
                                    }))
                                }
                                placeholder="e.g. Amina Benali"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Role (optional)</Label>
                            <Input
                                value={speakerDraft.role}
                                onChange={(e) =>
                                    setSpeakerDraft((s) => ({
                                        ...s,
                                        role: e.target.value,
                                    }))
                                }
                                placeholder="e.g. Cybersecurity Specialist"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email (optional)</Label>
                            <Input
                                type="email"
                                value={speakerDraft.email}
                                onChange={(e) =>
                                    setSpeakerDraft((s) => ({
                                        ...s,
                                        email: e.target.value,
                                    }))
                                }
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Photo (optional)</Label>
                            <div className="flex flex-wrap items-center gap-4">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="cursor-pointer"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0] ?? null;
                                        setSpeakerDraft((s) => ({
                                            ...s,
                                            photo: f,
                                            ...(f
                                                ? {
                                                      photo_path: null,
                                                      photo_url: null,
                                                  }
                                                : {}),
                                        }));
                                    }}
                                />
                                {(speakerPreviewUrl || speakerDraft.photo_url) && (
                                    <div className="h-14 w-14 overflow-hidden rounded-full ring-1 ring-border">
                                        <img
                                            src={
                                                speakerPreviewUrl ??
                                                speakerDraft.photo_url ??
                                                ''
                                            }
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setSpeakerModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                className="bg-beta-blue hover:bg-beta-blue/90 text-twhite"
                                onClick={() => {
                                    const fullName = (speakerDraft.full_name ?? '').trim();
                                    if (!fullName) return;
                                    const next = [...(data.speakers ?? [])];
                                    const payload = {
                                        full_name: fullName,
                                        role: (speakerDraft.role ?? '').trim(),
                                        email: (speakerDraft.email ?? '').trim(),
                                    };
                                    if (speakerDraft.photo) {
                                        payload.photo = speakerDraft.photo;
                                    } else if (speakerDraft.photo_path) {
                                        payload.photo_path =
                                            speakerDraft.photo_path;
                                    }
                                    if (editingSpeakerIndex === null) {
                                        next.push(payload);
                                    } else {
                                        next[editingSpeakerIndex] = payload;
                                    }
                                    setData('speakers', next);
                                    setSpeakerModalOpen(false);
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={partnerModalOpen}
                onOpenChange={(open) => !open && setPartnerModalOpen(false)}
            >
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader className="text-left">
                        <DialogTitle>
                            {editingPartnerIndex === null
                                ? 'Add partner'
                                : 'Edit partner'}
                        </DialogTitle>
                        <DialogDescription>
                            Enter partner details manually.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Name *</Label>
                            <Input
                                value={partnerDraft.name}
                                onChange={(e) =>
                                    setPartnerDraft((p) => ({
                                        ...p,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="e.g. 2M Media"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Website (optional)</Label>
                            <Input
                                value={partnerDraft.url}
                                onChange={(e) =>
                                    setPartnerDraft((p) => ({
                                        ...p,
                                        url: e.target.value,
                                    }))
                                }
                                placeholder="https://…"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Logo (optional)</Label>
                            <div className="flex flex-wrap items-center gap-4">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="cursor-pointer"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0] ?? null;
                                        setPartnerDraft((p) => ({
                                            ...p,
                                            logo: f,
                                            ...(f
                                                ? {
                                                      logo_path: null,
                                                      logo_url: null,
                                                  }
                                                : {}),
                                        }));
                                    }}
                                />
                                {(partnerPreviewUrl || partnerDraft.logo_url) && (
                                    <div className="flex h-14 w-24 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
                                        <img
                                            src={
                                                partnerPreviewUrl ??
                                                partnerDraft.logo_url ??
                                                ''
                                            }
                                            alt=""
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setPartnerModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                className="bg-beta-blue hover:bg-beta-blue/90 text-twhite"
                                onClick={() => {
                                    const name = (partnerDraft.name ?? '').trim();
                                    if (!name) return;
                                    const next = [...(data.partners ?? [])];
                                    const payload = {
                                        name,
                                        url: (partnerDraft.url ?? '').trim(),
                                    };
                                    if (partnerDraft.logo) {
                                        payload.logo = partnerDraft.logo;
                                    } else if (partnerDraft.logo_path) {
                                        payload.logo_path =
                                            partnerDraft.logo_path;
                                    }
                                    if (editingPartnerIndex === null) {
                                        next.push(payload);
                                    } else {
                                        next[editingPartnerIndex] = payload;
                                    }
                                    setData('partners', next);
                                    setPartnerModalOpen(false);
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </form>
    );
}

