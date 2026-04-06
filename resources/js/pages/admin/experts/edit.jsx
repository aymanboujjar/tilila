import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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
import { normalizeDetails } from '@/pages/admin/experts/Partials/expertDetailsDefaults';
import ExpertPublicProfileDetails from '@/pages/admin/experts/Partials/ExpertPublicProfileDetails';
import { update } from '@/routes/admin/experts';

const defaultGradient =
    'from-beta-green via-alpha-green/25 to-beta-blue/35';

const STEPS = [
    {
        id: 1,
        title: 'Identity',
        short: 'Slug & names',
        description:
            'URL slug and how the expert appears on the directory and profile.',
    },
    {
        id: 2,
        title: 'Classification',
        short: 'Filters & card',
        description:
            'Country, status, industries, languages, location, and card styling.',
    },
    {
        id: 3,
        title: 'Contact & media',
        short: 'Email & photo',
        description: 'Contact email and optional avatar image URL.',
    },
    {
        id: 4,
        title: 'Public profile',
        short: 'Bio & sections',
        description:
            'Headline tags, biography, quote, expertise, journey, appearances, and articles.',
    },
];

const TOTAL_STEPS = STEPS.length;

export default function AdminExpertsEdit({ expert, statuses = [] }) {
    const [step, setStep] = useState(1);
    const [stepError, setStepError] = useState('');

    const { data, setData, put, processing, errors, transform } = useForm({
        slug: expert.slug,
        name: expert.name ?? { en: '', fr: '', ar: '' },
        title: expert.title ?? { en: '', fr: '', ar: '' },
        location: expert.location ?? { en: '', fr: '', ar: '' },
        country: expert.country ?? 'ma',
        industriesStr: (expert.industries ?? []).join(', '),
        languagesStr: (expert.languages ?? []).join(', '),
        gradient: expert.gradient ?? defaultGradient,
        badge: expert.badge ?? '',
        status: expert.status ?? 'draft',
        email: expert.email ?? '',
        avatar: expert.avatar ?? '',
        details: normalizeDetails(expert.details),
    });

    transform((form) => buildExpertPayload(form));

    const validateStep = (currentStep) => {
        if (currentStep === 1) {
            if (!data.slug.trim()) {
                return 'Please enter a URL slug.';
            }
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug.trim())) {
                return 'Slug must be lowercase letters, numbers, and hyphens only.';
            }
            if (!data.name.en?.trim()) {
                return 'English name is required.';
            }
            if (!data.title.en?.trim()) {
                return 'English title is required.';
            }
        }
        if (currentStep === 2) {
            if (!data.country?.trim()) {
                return 'Country code is required.';
            }
        }
        return null;
    };

    const goNext = () => {
        setStepError('');
        const err = validateStep(step);
        if (err) {
            setStepError(err);
            return;
        }
        setStep((s) => Math.min(TOTAL_STEPS, s + 1));
    };

    const goBack = () => {
        setStepError('');
        setStep((s) => Math.max(1, s - 1));
    };

    const goToStep = (target) => {
        if (target < 1 || target > TOTAL_STEPS) {
            return;
        }
        setStepError('');
        if (target > step) {
            const err = validateStep(step);
            if (err) {
                setStepError(err);
                return;
            }
        }
        setStep(target);
    };

    const submit = (e) => {
        e.preventDefault();
        const err = validateStep(1);
        const err2 = validateStep(2);
        if (err || err2) {
            setStepError(err || err2);
            setStep(err ? 1 : 2);
            return;
        }
        put(update.url({ expert: expert.id }), { preserveScroll: true });
    };

    const current = STEPS[step - 1];

    return (
        <>
            <Head title={`Edit ${expert.name?.en ?? 'expert'}`} />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:pb-8 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-tgray text-sm font-medium">
                            Experts Directory
                        </p>
                        <h1 className="text-tblack text-2xl font-bold tracking-tight">
                            Edit expert
                        </h1>
                        <p className="text-tgray mt-1 max-w-2xl text-sm">
                            {expert.name?.en} — work through each step. You can
                            go back anytime. Slug must stay unique and URL-safe.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {expert.status === 'published' ? (
                            <Button asChild variant="outline">
                                <Link href={`/experts/${expert.id}`}>
                                    View public profile
                                </Link>
                            </Button>
                        ) : null}
                        <Button asChild variant="outline">
                            <Link href="/admin/experts">Back to list</Link>
                        </Button>
                    </div>
                </div>

                <nav aria-label="Steps" className="w-full">
                    <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                        {STEPS.map((s, index) => {
                            const isActive = step === s.id;
                            const isDone = step > s.id;
                            return (
                                <li
                                    key={s.id}
                                    className="flex min-w-0 flex-1 items-center gap-2"
                                >
                                    {index > 0 ? (
                                        <div
                                            className="bg-border mx-1 hidden h-px w-4 shrink-0 sm:block"
                                            aria-hidden
                                        />
                                    ) : null}
                                    <button
                                        type="button"
                                        onClick={() => goToStep(s.id)}
                                        className={cn(
                                            'flex min-w-0 flex-1 items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors sm:min-w-[140px]',
                                            isActive &&
                                                'border-beta-blue bg-beta-blue/10 ring-beta-blue/30 ring-2',
                                            !isActive &&
                                                !isDone &&
                                                'border-border bg-card hover:bg-muted/60',
                                            isDone &&
                                                !isActive &&
                                                'border-alpha-green/40 bg-beta-green/30 hover:bg-beta-green/50',
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                                                isActive &&
                                                    'bg-beta-blue text-twhite',
                                                isDone &&
                                                    !isActive &&
                                                    'bg-alpha-green text-twhite',
                                                !isActive &&
                                                    !isDone &&
                                                    'bg-muted text-muted-foreground',
                                            )}
                                        >
                                            {isDone ? '✓' : s.id}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="text-tblack block truncate text-sm font-semibold">
                                                {s.title}
                                            </span>
                                            <span className="text-tgray block truncate text-xs">
                                                {s.short}
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </nav>

                <form onSubmit={submit} className="space-y-6">
                    {step < 4 ? (
                        <Card>
                            <CardHeader className="px-5 sm:px-8">
                                <p className="text-beta-blue mb-1 text-xs font-semibold uppercase tracking-wide">
                                    Step {step} of {TOTAL_STEPS}
                                </p>
                                <CardTitle>{current.title}</CardTitle>
                                <CardDescription>
                                    {current.description}
                                </CardDescription>
                            </CardHeader>

                            {step === 1 ? (
                                <CardContent className="space-y-4 px-5 sm:px-8">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2 sm:col-span-2">
                                            <Label htmlFor="slug">Slug</Label>
                                            <Input
                                                id="slug"
                                                value={data.slug}
                                                onChange={(e) =>
                                                    setData(
                                                        'slug',
                                                        e.target.value,
                                                    )
                                                }
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
                                                            [lang]: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors[`name.${lang}`]
                                                    }
                                                />
                                            </div>
                                        ))}
                                        {['en', 'fr', 'ar'].map((lang) => (
                                            <div key={lang} className="space-y-2">
                                                <Label
                                                    htmlFor={`title-${lang}`}
                                                >
                                                    Title ({lang.toUpperCase()})
                                                    {lang === 'en' ? ' *' : ''}
                                                </Label>
                                                <Input
                                                    id={`title-${lang}`}
                                                    value={data.title[lang]}
                                                    onChange={(e) =>
                                                        setData('title', {
                                                            ...data.title,
                                                            [lang]: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `title.${lang}`
                                                        ]
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            ) : null}

                            {step === 2 ? (
                                <CardContent className="space-y-4 px-5 sm:px-8">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="country">
                                                Country code
                                            </Label>
                                            <Input
                                                id="country"
                                                value={data.country}
                                                onChange={(e) =>
                                                    setData(
                                                        'country',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="ma"
                                                maxLength={4}
                                            />
                                            <InputError
                                                message={errors.country}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="status">
                                                Status
                                            </Label>
                                            <select
                                                id="status"
                                                value={data.status}
                                                onChange={(e) =>
                                                    setData(
                                                        'status',
                                                        e.target.value,
                                                    )
                                                }
                                                className={cn(
                                                    'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                                                )}
                                            >
                                                {statuses.map((st) => (
                                                    <option key={st} value={st}>
                                                        {st}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError
                                                message={errors.status}
                                            />
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
                                            <InputError
                                                message={errors.industries}
                                            />
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
                                            <InputError
                                                message={errors.languages}
                                            />
                                        </div>
                                        {['en', 'fr', 'ar'].map((lang) => (
                                            <div key={lang} className="space-y-2">
                                                <Label
                                                    htmlFor={`location-${lang}`}
                                                >
                                                    Location (
                                                    {lang.toUpperCase()})
                                                </Label>
                                                <Input
                                                    id={`location-${lang}`}
                                                    value={data.location[lang]}
                                                    onChange={(e) =>
                                                        setData('location', {
                                                            ...data.location,
                                                            [lang]: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `location.${lang}`
                                                        ]
                                                    }
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
                                                    setData(
                                                        'gradient',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.gradient}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="badge">Badge</Label>
                                            <Input
                                                id="badge"
                                                value={data.badge}
                                                onChange={(e) =>
                                                    setData(
                                                        'badge',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Available"
                                            />
                                            <InputError message={errors.badge} />
                                        </div>
                                    </div>
                                </CardContent>
                            ) : null}

                            {step === 3 ? (
                                <CardContent className="space-y-4 px-5 sm:px-8">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="avatar">
                                                Avatar URL
                                            </Label>
                                            <Input
                                                id="avatar"
                                                value={data.avatar}
                                                onChange={(e) =>
                                                    setData(
                                                        'avatar',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="https://..."
                                            />
                                            <InputError
                                                message={errors.avatar}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            ) : null}
                        </Card>
                    ) : (
                        <ExpertPublicProfileDetails
                            details={data.details}
                            onChange={(next) => setData('details', next)}
                        />
                    )}

                    {stepError ? (
                        <p
                            className="text-destructive text-sm font-medium"
                            role="alert"
                        >
                            {stepError}
                        </p>
                    ) : null}

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-6">
                        <Button asChild variant="outline" type="button">
                            <Link href="/admin/experts">Cancel</Link>
                        </Button>
                        <div className="flex flex-wrap items-center gap-2">
                            {step > 1 ? (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={goBack}
                                    className="gap-1"
                                >
                                    <ChevronLeft className="size-4" />
                                    Back
                                </Button>
                            ) : null}
                            {step < TOTAL_STEPS ? (
                                <Button
                                    type="button"
                                    onClick={goNext}
                                    className="bg-beta-blue hover:bg-beta-blue/90 text-twhite gap-1"
                                >
                                    Next
                                    <ChevronRight className="size-4" />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-beta-blue hover:bg-beta-blue/90 text-twhite"
                                >
                                    {processing ? 'Saving…' : 'Save changes'}
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

AdminExpertsEdit.layout = (page) => <AppLayout>{page}</AppLayout>;
