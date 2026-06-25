import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';

const GROUP_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'institutional', label: 'Institutional' },
    { value: 'media', label: 'Media' },
    { value: 'program', label: 'Program' },
    { value: 'organiser', label: 'Organiser' },
    { value: 'strip', label: 'Strip' },
];

export default function AdminPartnerForm({ partner }) {
    const isEdit = Boolean(partner?.id);
    const initialGroups =
        partner?.groups?.length > 0
            ? partner.groups
            : partner?.group
              ? [partner.group]
              : ['featured'];

    const { data, setData, errors, setError, clearErrors } = useForm({
        program: partner?.program ?? 'tilila',
        group: initialGroups[0],
        groups: initialGroups,
        name: partner?.name ?? '',
        subtitle: {
            fr: partner?.subtitle?.fr ?? '',
            en: partner?.subtitle?.en ?? '',
            ar: partner?.subtitle?.ar ?? '',
        },
        meta: {
            role: {
                fr: partner?.meta?.role?.fr ?? '',
                en: partner?.meta?.role?.en ?? '',
                ar: partner?.meta?.role?.ar ?? '',
            },
            edition: {
                fr: partner?.meta?.edition?.fr ?? '',
                en: partner?.meta?.edition?.en ?? '',
                ar: partner?.meta?.edition?.ar ?? '',
            },
        },
        url: partner?.url ?? '',
        logo_path: partner?.logo_path ?? '',
        sort: partner?.sort ?? 0,
        is_published: partner?.is_published ?? true,
        logo: null,
    });

    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();

        const hasLogoUpload = data.logo instanceof File;

        if (isEdit) {
            router.post(
                `/admin/partners/${partner.id}`,
                { ...data, _method: 'put' },
                {
                    forceFormData: hasLogoUpload,
                    preserveScroll: true,
                    onStart: () => setProcessing(true),
                    onFinish: () => setProcessing(false),
                    onError: (serverErrors) => setError(serverErrors),
                },
            );
            return;
        }

        router.post('/admin/partners', data, {
            forceFormData: hasLogoUpload,
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (serverErrors) => setError(serverErrors),
        });
    };

    return (
        <>
            <Head title={isEdit ? `Edit — ${partner.name}` : 'New partner'} />

            <form
                onSubmit={submit}
                className="mx-auto flex w-full max-w-[min(100%,48rem)] flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:pb-10"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-tgray">
                            Partners
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-tblack">
                            {isEdit ? 'Edit partner' : 'New partner'}
                        </h1>
                        <p className="mt-1 text-sm text-tgray">
                            {isEdit
                                ? `Update ${partner.name} for program pages.`
                                : 'Add a partner logo to Tilila or Tililab pages.'}
                        </p>
                    </div>
                    <Button
                        asChild
                        variant="outline"
                        className="gap-2 border-border text-tblack hover:border-beta-blue/40 hover:bg-alpha-blue/30"
                    >
                        <Link href="/admin/partners">
                            <ChevronLeft className="size-4" />
                            Back to list
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Placement</CardTitle>
                        <CardDescription>
                            Choose which program and section display this
                            partner.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                            <Label>Program</Label>
                            <Select
                                value={data.program}
                                onValueChange={(value) =>
                                    setData('program', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tilila">
                                        Tilila Awards
                                    </SelectItem>
                                    <SelectItem value="tililab">
                                        Tililab
                                    </SelectItem>
                                    <SelectItem value="both">
                                        Both programs
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Primary group</Label>
                            <Select
                                value={data.group}
                                onValueChange={(value) => {
                                    const groups = data.groups.includes(value)
                                        ? data.groups
                                        : [...data.groups, value];
                                    setData({
                                        group: value,
                                        groups,
                                    });
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {GROUP_OPTIONS.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Label>Display groups</Label>
                            <div className="grid gap-2 sm:grid-cols-3">
                                {GROUP_OPTIONS.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex items-center gap-2 rounded-lg border border-border/70 px-3 py-2 text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.groups.includes(
                                                option.value,
                                            )}
                                            onChange={(event) => {
                                                const checked =
                                                    event.target.checked;
                                                const groups = checked
                                                    ? [
                                                          ...data.groups,
                                                          option.value,
                                                      ]
                                                    : data.groups.filter(
                                                          (value) =>
                                                              value !==
                                                              option.value,
                                                      );
                                                setData({
                                                    groups,
                                                    group:
                                                        groups[0] ?? data.group,
                                                });
                                            }}
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Sort order</Label>
                            <Input
                                type="number"
                                value={data.sort}
                                onChange={(e) =>
                                    setData('sort', Number(e.target.value))
                                }
                            />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-border/70 px-4 py-3">
                            <div>
                                <Label htmlFor="is_published">Published</Label>
                                <p className="text-xs text-muted-foreground">
                                    Visible on public program pages
                                </p>
                            </div>
                            <Switch
                                id="is_published"
                                checked={data.is_published}
                                onCheckedChange={(checked) =>
                                    setData('is_published', checked)
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Identity</CardTitle>
                        <CardDescription>
                            Partner name, subtitles, and optional website.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            {errors.name ? (
                                <p className="text-sm text-red-600">
                                    {errors.name}
                                </p>
                            ) : null}
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label>Subtitle (FR)</Label>
                                <Input
                                    value={data.subtitle.fr}
                                    onChange={(e) =>
                                        setData('subtitle', {
                                            ...data.subtitle,
                                            fr: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Subtitle (EN)</Label>
                                <Input
                                    value={data.subtitle.en}
                                    onChange={(e) =>
                                        setData('subtitle', {
                                            ...data.subtitle,
                                            en: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Subtitle (AR)</Label>
                                <Input
                                    value={data.subtitle.ar}
                                    onChange={(e) =>
                                        setData('subtitle', {
                                            ...data.subtitle,
                                            ar: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Website URL</Label>
                            <Input
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                placeholder="https://"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Logo</CardTitle>
                        <CardDescription>
                            Upload a file or reference an existing public asset
                            path.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {partner?.logo_url ? (
                            <div className="flex h-24 w-40 items-center justify-center rounded-lg border border-border/70 bg-background p-3">
                                <img
                                    src={partner.logo_url}
                                    alt=""
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        ) : null}
                        <div className="space-y-2">
                            <Label>Logo file</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData('logo', e.target.files?.[0] ?? null)
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Logo path (optional)</Label>
                            <Input
                                value={data.logo_path}
                                placeholder="partners/logo.png"
                                onChange={(e) =>
                                    setData('logo_path', e.target.value)
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/partners">Cancel</Link>
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-beta-blue text-twhite hover:bg-beta-blue/90"
                    >
                        {processing ? 'Saving…' : 'Save partner'}
                    </Button>
                </div>
            </form>
        </>
    );
}

AdminPartnerForm.layout = (page) => (
    <AppLayout
        breadcrumbs={[
            { title: 'Dashboard', href: '/admin/dashboard' },
            { title: 'Partners', href: '/admin/partners' },
            {
                title: 'Form',
                href: '/admin/partners/create',
            },
        ]}
        title="Partner"
        description="Create or edit a program partner."
    >
        {page}
    </AppLayout>
);
