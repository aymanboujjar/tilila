import { Head, Link, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
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
import { buildExpertPayload } from '@/pages/admin/experts/Partials/buildExpertPayload';
import { store } from '@/routes/admin/experts';

const defaultGradient =
    'from-beta-green via-alpha-green/25 to-beta-blue/35';

export default function AdminExpertsCreate({ statuses = [] }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        slug: '',
        name: { en: '', fr: '', ar: '' },
        title: { en: '', fr: '', ar: '' },
        location: { en: '', fr: '', ar: '' },
        country: 'ma',
        industriesStr: 'economics',
        languagesStr: 'en, fr',
        gradient: defaultGradient,
        badge: '',
        status: 'draft',
        email: '',
        avatar: '',
        details: {},
    });

    transform((form) => buildExpertPayload(form));

    const submit = (e) => {
        e.preventDefault();
        post(store.url(), { preserveScroll: true });
    };

    return (
        <>
            <Head title="Add expert" />

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">
                            Experts Directory
                        </p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            Add expert
                        </h1>
                        <p className="text-tgray mt-1 max-w-2xl text-sm">
                            Create a public expert profile. Slug must be
                            unique and URL-safe (lowercase letters, numbers,
                            hyphens).
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/admin/experts">Back to list</Link>
                    </Button>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Identity</CardTitle>
                            <CardDescription>
                                Names and titles appear on the public directory
                                and detail page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData('slug', e.target.value)
                                        }
                                        placeholder="amina-benali"
                                        autoComplete="off"
                                    />
                                    <InputError message={errors.slug} />
                                </div>
                                {['en', 'fr', 'ar'].map((lang) => (
                                    <div key={lang} className="space-y-2">
                                        <Label htmlFor={`name-${lang}`}>
                                            Name ({lang.toUpperCase()})
                                            {lang === 'en' ? ' *' : ''}
                                        </Label>
                                        <Input
                                            id={`name-${lang}`}
                                            value={data.name[lang]}
                                            onChange={(e) =>
                                                setData('name', {
                                                    ...data.name,
                                                    [lang]: e.target.value,
                                                })
                                            }
                                        />
                                        <InputError
                                            message={errors[`name.${lang}`]}
                                        />
                                    </div>
                                ))}
                                {['en', 'fr', 'ar'].map((lang) => (
                                    <div key={lang} className="space-y-2">
                                        <Label htmlFor={`title-${lang}`}>
                                            Title ({lang.toUpperCase()})
                                            {lang === 'en' ? ' *' : ''}
                                        </Label>
                                        <Input
                                            id={`title-${lang}`}
                                            value={data.title[lang]}
                                            onChange={(e) =>
                                                setData('title', {
                                                    ...data.title,
                                                    [lang]: e.target.value,
                                                })
                                            }
                                        />
                                        <InputError
                                            message={errors[`title.${lang}`]}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Classification</CardTitle>
                            <CardDescription>
                                Used for filters and directory cards.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country code</Label>
                                    <Input
                                        id="country"
                                        value={data.country}
                                        onChange={(e) =>
                                            setData('country', e.target.value)
                                        }
                                        placeholder="ma"
                                        maxLength={4}
                                    />
                                    <InputError message={errors.country} />
                                </div>
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
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="industriesStr">
                                        Industries (comma-separated)
                                    </Label>
                                    <Input
                                        id="industriesStr"
                                        value={data.industriesStr}
                                        onChange={(e) =>
                                            setData(
                                                'industriesStr',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="economics, technology"
                                    />
                                    <InputError message={errors.industries} />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="languagesStr">
                                        Languages (comma-separated)
                                    </Label>
                                    <Input
                                        id="languagesStr"
                                        value={data.languagesStr}
                                        onChange={(e) =>
                                            setData(
                                                'languagesStr',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="en, fr, ar"
                                    />
                                    <InputError message={errors.languages} />
                                </div>
                                {['en', 'fr', 'ar'].map((lang) => (
                                    <div key={lang} className="space-y-2">
                                        <Label htmlFor={`location-${lang}`}>
                                            Location ({lang.toUpperCase()})
                                        </Label>
                                        <Input
                                            id={`location-${lang}`}
                                            value={data.location[lang]}
                                            onChange={(e) =>
                                                setData('location', {
                                                    ...data.location,
                                                    [lang]: e.target.value,
                                                })
                                            }
                                        />
                                        <InputError
                                            message={errors[`location.${lang}`]}
                                        />
                                    </div>
                                ))}
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="gradient">
                                        Card gradient (Tailwind classes)
                                    </Label>
                                    <Input
                                        id="gradient"
                                        value={data.gradient}
                                        onChange={(e) =>
                                            setData('gradient', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.gradient} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="badge">Badge</Label>
                                    <Input
                                        id="badge"
                                        value={data.badge}
                                        onChange={(e) =>
                                            setData('badge', e.target.value)
                                        }
                                        placeholder="Available"
                                    />
                                    <InputError message={errors.badge} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact & media</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="avatar">Avatar URL</Label>
                                    <Input
                                        id="avatar"
                                        value={data.avatar}
                                        onChange={(e) =>
                                            setData('avatar', e.target.value)
                                        }
                                        placeholder="https://..."
                                    />
                                    <InputError message={errors.avatar} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-beta-blue hover:bg-beta-blue/90 text-twhite"
                        >
                            {processing ? 'Saving…' : 'Create expert'}
                        </Button>
                        <Button asChild variant="outline" type="button">
                            <Link href="/admin/experts">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

AdminExpertsCreate.layout = (page) => <AppLayout>{page}</AppLayout>;
