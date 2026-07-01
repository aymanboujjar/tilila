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
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';

function emptyTri() {
    return { fr: '', en: '', ar: '' };
}

function normalizeTri(value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return {
            fr: value.fr ?? '',
            en: value.en ?? '',
            ar: value.ar ?? '',
        };
    }

    return emptyTri();
}

const textareaClassName = cn(
    'flex min-h-[5rem] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs',
    'placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
);

export default function AdminCommitteeMemberForm({ member }) {
    const isEdit = Boolean(member?.id);

    const { data, setData, errors, setError, clearErrors } = useForm({
        name: member?.name ?? '',
        bio: normalizeTri(member?.bio),
        photo_path: member?.photo_path ?? '',
        sort: member?.sort ?? 0,
        is_published: member?.is_published ?? true,
        photo: null,
    });

    const [processing, setProcessing] = useState(false);
    const bio = data.bio ?? emptyTri();

    const submit = (e) => {
        e.preventDefault();
        clearErrors();

        const hasPhotoUpload = data.photo instanceof File;

        if (isEdit) {
            router.post(
                `/admin/committee-members/${member.id}`,
                { ...data, _method: 'put' },
                {
                    forceFormData: hasPhotoUpload,
                    preserveScroll: true,
                    onStart: () => setProcessing(true),
                    onFinish: () => setProcessing(false),
                    onError: (serverErrors) => setError(serverErrors),
                },
            );
            return;
        }

        router.post('/admin/committee-members', data, {
            forceFormData: hasPhotoUpload,
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onError: (serverErrors) => setError(serverErrors),
        });
    };

    return (
        <>
            <Head
                title={
                    isEdit ? `Edit — ${member.name}` : 'New committee member'
                }
            />

            <form
                onSubmit={submit}
                className="mx-auto flex w-full max-w-[min(100%,48rem)] flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:pb-10"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-tgray">
                            Committee members
                        </p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-tblack">
                            {isEdit ? member.name : 'New member'}
                        </h1>
                    </div>
                    <Button variant="outline" asChild className="gap-2">
                        <Link href="/admin/committee-members">
                            <ChevronLeft className="size-4" />
                            Back to list
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            Name and role shown on the About page carousel.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            {errors.name ? (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            ) : null}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-1">
                            <div className="space-y-2">
                                <Label>Bio / role (FR)</Label>
                                <textarea
                                    className={textareaClassName}
                                    value={bio.fr}
                                    onChange={(e) =>
                                        setData('bio', {
                                            ...bio,
                                            fr: e.target.value,
                                        })
                                    }
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Bio / role (EN)</Label>
                                <textarea
                                    className={textareaClassName}
                                    value={bio.en}
                                    onChange={(e) =>
                                        setData('bio', {
                                            ...bio,
                                            en: e.target.value,
                                        })
                                    }
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Bio / role (AR)</Label>
                                <textarea
                                    className={textareaClassName}
                                    value={bio.ar}
                                    onChange={(e) =>
                                        setData('bio', {
                                            ...bio,
                                            ar: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    dir="rtl"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Photo</CardTitle>
                        <CardDescription>
                            Upload a portrait or reference an existing public
                            asset path.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {member?.photo_url ? (
                            <div className="flex size-28 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background">
                                <img
                                    src={member.photo_url}
                                    alt=""
                                    className="size-full object-cover object-top"
                                />
                            </div>
                        ) : null}
                        <div className="space-y-2">
                            <Label>Photo file</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        'photo',
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Photo path (optional)</Label>
                            <Input
                                value={data.photo_path}
                                placeholder="/assets/cpd/name.jpeg"
                                onChange={(e) =>
                                    setData('photo_path', e.target.value)
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Display</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="sort">Sort order</Label>
                            <Input
                                id="sort"
                                type="number"
                                min={0}
                                value={data.sort}
                                onChange={(e) =>
                                    setData(
                                        'sort',
                                        Number.parseInt(e.target.value, 10) ||
                                            0,
                                    )
                                }
                            />
                        </div>
                        <div className="flex items-center justify-between gap-4 rounded-lg border border-border/70 px-4 py-3">
                            <div>
                                <p className="text-sm font-medium">Published</p>
                                <p className="text-xs text-muted-foreground">
                                    Show on the public About page.
                                </p>
                            </div>
                            <Switch
                                checked={data.is_published}
                                onCheckedChange={(checked) =>
                                    setData('is_published', checked)
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/committee-members">Cancel</Link>
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-beta-blue text-twhite hover:bg-beta-blue/90"
                    >
                        {processing ? 'Saving…' : 'Save member'}
                    </Button>
                </div>
            </form>
        </>
    );
}

AdminCommitteeMemberForm.layout = (page) => (
    <AppLayout
        breadcrumbs={[
            { title: 'Dashboard', href: '/admin/dashboard' },
            {
                title: 'Committee members',
                href: '/admin/committee-members',
            },
            {
                title: 'Form',
                href: '/admin/committee-members/create',
            },
        ]}
        title="Committee member"
        description="Create or edit a Parity Committee member."
    >
        {page}
    </AppLayout>
);
