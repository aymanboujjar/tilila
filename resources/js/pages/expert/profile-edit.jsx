import { Head, router, setLayoutProps, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

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
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import ExpertPublicProfileDetails from '@/pages/admin/experts/partials/ExpertPublicProfileDetails';

function FieldError({ error }) {
    if (!error) {
        return null;
    }

    return <p className="mt-1 text-xs text-alpha-danger">{error}</p>;
}

export default function ExpertProfileEdit({ expert }) {
    setLayoutProps({
        breadcrumbs: [
            {
                title: 'Dashboard',
                href: '/experts/dashboard',
            },
            {
                title: 'My Profile',
                href: '#',
            },
        ],
        title: 'Edit My Information',
        description:
            'Update your public profile and keep your expert information accurate.',
    });

    const { data, setData, processing, errors, setError, clearErrors } = useForm({
        name: expert?.name ?? { en: '', fr: '', ar: '' },
        title: expert?.title ?? { en: '', fr: '', ar: '' },
        location: expert?.location ?? { en: '', fr: '', ar: '' },
        email: expert?.email ?? '',
        country: expert?.country ?? '',
        industriesStr: (expert?.industries ?? []).join(', '),
        languagesStr: (expert?.languages ?? []).join(', '),
        details: expert?.details ?? {
            headlineTags: [],
            bio: [],
            quote: { en: '', fr: '', ar: '' },
            socials: { linkedin: '', twitter: '', instagram: '' },
            expertise: [],
            journey: [],
            appearances: [],
            articles: [],
        },
        profile_image: null,
        remove_image: false,
    });

    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
    const avatarBlobRef = useRef(null);
    const avatarFileInputRef = useRef(null);

    useEffect(
        () => () => {
            if (avatarBlobRef.current) {
                URL.revokeObjectURL(avatarBlobRef.current);
                avatarBlobRef.current = null;
            }
        },
        [],
    );

    const handleAvatarFileChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            setData('remove_image', false);
        }
        if (avatarBlobRef.current) {
            URL.revokeObjectURL(avatarBlobRef.current);
            avatarBlobRef.current = null;
        }
        setData('profile_image', file);
        if (file) {
            avatarBlobRef.current = URL.createObjectURL(file);
            setAvatarPreviewUrl(avatarBlobRef.current);
        } else {
            setAvatarPreviewUrl(null);
        }
    };

    const clearAvatarFile = () => {
        if (avatarFileInputRef.current) {
            avatarFileInputRef.current.value = '';
        }
        if (avatarBlobRef.current) {
            URL.revokeObjectURL(avatarBlobRef.current);
            avatarBlobRef.current = null;
        }
        setData('profile_image', null);
        setAvatarPreviewUrl(null);
    };

    const displayAvatarSrc =
        data.profile_image instanceof File
            ? avatarPreviewUrl
            : data.remove_image
              ? null
              : (expert?.image_url ?? null);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        router.post(
            '/expert/profile',
            {
                ...data,
                industries: String(data.industriesStr)
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                languages: String(data.languagesStr)
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                _method: 'patch',
            },
            {
                preserveScroll: true,
                forceFormData: true,
                onError: (serverErrors) => setError(serverErrors),
            },
        );
    };

    return (
        <>
            <Head title="Edit Expert Profile" />

            <div className="mx-auto flex w-full max-w-[min(100%,70rem)] flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Identity and basic profile</CardTitle>
                            <CardDescription>
                                Edit your profile fields in all supported
                                languages (EN, FR, AR).
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-3">
                                {['en', 'fr', 'ar'].map((lang) => (
                                    <div key={`name-${lang}`} className="space-y-1.5">
                                        <Label htmlFor={`name-${lang}`}>
                                            Name ({lang.toUpperCase()})
                                            {lang === 'en' ? ' *' : ''}
                                        </Label>
                                        <Input
                                            id={`name-${lang}`}
                                            value={data.name[lang] ?? ''}
                                            onChange={(e) =>
                                                setData('name', {
                                                    ...data.name,
                                                    [lang]: e.target.value,
                                                })
                                            }
                                        />
                                        <FieldError error={errors[`name.${lang}`]} />
                                    </div>
                                ))}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {['en', 'fr', 'ar'].map((lang) => (
                                    <div key={`title-${lang}`} className="space-y-1.5">
                                        <Label htmlFor={`title-${lang}`}>
                                            Title ({lang.toUpperCase()})
                                            {lang === 'en' ? ' *' : ''}
                                        </Label>
                                        <Input
                                            id={`title-${lang}`}
                                            value={data.title[lang] ?? ''}
                                            onChange={(e) =>
                                                setData('title', {
                                                    ...data.title,
                                                    [lang]: e.target.value,
                                                })
                                            }
                                        />
                                        <FieldError error={errors[`title.${lang}`]} />
                                    </div>
                                ))}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {['en', 'fr', 'ar'].map((lang) => (
                                    <div
                                        key={`location-${lang}`}
                                        className="space-y-1.5"
                                    >
                                        <Label htmlFor={`location-${lang}`}>
                                            Location ({lang.toUpperCase()})
                                        </Label>
                                        <Input
                                            id={`location-${lang}`}
                                            value={data.location[lang] ?? ''}
                                            onChange={(e) =>
                                                setData('location', {
                                                    ...data.location,
                                                    [lang]: e.target.value,
                                                })
                                            }
                                        />
                                        <FieldError
                                            error={errors[`location.${lang}`]}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        id="country"
                                        value={data.country}
                                        onChange={(e) =>
                                            setData('country', e.target.value)
                                        }
                                    />
                                    <FieldError error={errors.country} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                    <FieldError error={errors.email} />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label htmlFor="industriesStr">
                                        Industries (comma-separated)
                                    </Label>
                                    <Input
                                        id="industriesStr"
                                        value={data.industriesStr}
                                        onChange={(e) =>
                                            setData('industriesStr', e.target.value)
                                        }
                                        placeholder="economics, technology"
                                    />
                                    <FieldError error={errors.industries} />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label htmlFor="languagesStr">
                                        Languages (comma-separated)
                                    </Label>
                                    <Input
                                        id="languagesStr"
                                        value={data.languagesStr}
                                        onChange={(e) =>
                                            setData('languagesStr', e.target.value)
                                        }
                                        placeholder="en, fr, ar"
                                    />
                                    <FieldError error={errors.languages} />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label htmlFor="profile_image">
                                        Profile image
                                    </Label>
                                    <div className="flex flex-wrap items-start gap-4">
                                        {displayAvatarSrc ? (
                                            <div className="relative size-24 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                                                <img
                                                    src={displayAvatarSrc}
                                                    alt=""
                                                    className="size-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex size-24 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs text-muted-foreground">
                                                No image
                                            </div>
                                        )}
                                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                                            <input
                                                ref={avatarFileInputRef}
                                                id="profile_image"
                                                name="profile_image"
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp,image/gif"
                                                className={cn(
                                                    'flex h-10 w-full max-w-md cursor-pointer rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-xs ring-offset-background file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
                                                )}
                                                onChange={handleAvatarFileChange}
                                            />
                                            {expert?.image_url ? (
                                                <label className="flex cursor-pointer items-center gap-2 text-sm">
                                                    <input
                                                        type="checkbox"
                                                        className="size-4 rounded border-input"
                                                        checked={data.remove_image}
                                                        onChange={(e) =>
                                                            setData(
                                                                'remove_image',
                                                                e.target.checked,
                                                            )
                                                        }
                                                    />
                                                    Remove current profile photo
                                                </label>
                                            ) : null}
                                            {data.profile_image instanceof File ? (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-fit"
                                                    onClick={clearAvatarFile}
                                                >
                                                    Clear new image
                                                </Button>
                                            ) : null}
                                            <FieldError error={errors.profile_image} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <ExpertPublicProfileDetails
                        details={data.details}
                        onChange={(next) => setData('details', next)}
                    />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
