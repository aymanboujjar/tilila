import { Plus, Trash2 } from 'lucide-react';

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
import { cn } from '@/lib/utils';

function emptyTri() {
    return { en: '', fr: '', ar: '' };
}

const textareaClass = cn(
    'border-input placeholder:text-muted-foreground flex min-h-[72px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
);

function TriLangInputs({ label, value, onChange }) {
    return (
        <div className="grid gap-3 sm:grid-cols-3">
            {['en', 'fr', 'ar'].map((lang) => (
                <div key={lang} className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        {label}{' '}
                        <span className="text-muted-foreground">
                            ({lang.toUpperCase()})
                        </span>
                    </Label>
                    <Input
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

function TriLangTextareas({ label, value, onChange, minHeight = 72 }) {
    return (
        <div className="grid gap-3 sm:grid-cols-3">
            {['en', 'fr', 'ar'].map((lang) => (
                <div key={lang} className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        {label}{' '}
                        <span className="text-muted-foreground">
                            ({lang.toUpperCase()})
                        </span>
                    </Label>
                    <textarea
                        className={textareaClass}
                        style={{ minHeight }}
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

/** Edits the `details` JSON shown on the public expert profile (`experts/[id]`). */
export default function ExpertPublicProfileDetails({ details, onChange }) {
    const d = details;

    const patch = (partial) => onChange({ ...d, ...partial });

    return (
        <Card>
            <CardHeader className="px-5 sm:px-8">
                <CardTitle>Public profile content</CardTitle>
                <CardDescription>
                    Headline tags, biography, quote, and sections below match
                    what visitors see on the expert detail page.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 px-5 sm:px-8">
                {/* Headline tags */}
                <section className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <h3 className="text-sm font-semibold">
                                Headline tags
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Pills above the name on the detail page header.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() =>
                                patch({
                                    headlineTags: [
                                        ...(d.headlineTags ?? []),
                                        emptyTri(),
                                    ],
                                })
                            }
                        >
                            <Plus className="size-4" />
                            Add tag
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {(d.headlineTags ?? []).map((tag, i) => (
                            <div
                                key={i}
                                className="border-border/70 space-y-2 rounded-lg border p-3"
                            >
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive size-8"
                                        onClick={() =>
                                            patch({
                                                headlineTags: (
                                                    d.headlineTags ?? []
                                                ).filter((_, j) => j !== i),
                                            })
                                        }
                                        aria-label="Remove tag"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                                <TriLangInputs
                                    label="Tag"
                                    value={tag}
                                    onChange={(next) => {
                                        const nextTags = [
                                            ...(d.headlineTags ?? []),
                                        ];
                                        nextTags[i] = next;
                                        patch({ headlineTags: nextTags });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bio paragraphs */}
                <section className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <h3 className="text-sm font-semibold">
                                Biography paragraphs
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Each block is one paragraph in the intro card.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() =>
                                patch({
                                    bio: [...(d.bio ?? []), emptyTri()],
                                })
                            }
                        >
                            <Plus className="size-4" />
                            Add paragraph
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {(d.bio ?? []).map((p, i) => (
                            <div
                                key={i}
                                className="border-border/70 space-y-2 rounded-lg border p-3"
                            >
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive size-8"
                                        onClick={() =>
                                            patch({
                                                bio: (d.bio ?? []).filter(
                                                    (_, j) => j !== i,
                                                ),
                                            })
                                        }
                                        aria-label="Remove paragraph"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                                <TriLangTextareas
                                    label="Paragraph"
                                    value={p}
                                    onChange={(next) => {
                                        const nextBio = [...(d.bio ?? [])];
                                        nextBio[i] = next;
                                        patch({ bio: nextBio });
                                    }}
                                    minHeight={96}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quote */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold">Quote (sidebar)</h3>
                    <p className="text-muted-foreground text-xs">
                        Shown in the quote card when at least one language is
                        filled.
                    </p>
                    <TriLangTextareas
                        label="Quote"
                        value={d.quote ?? emptyTri()}
                        onChange={(next) => patch({ quote: next })}
                        minHeight={64}
                    />
                </section>

                {/* Social links (sidebar icons) */}
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold">
                        Social profiles (sidebar)
                    </h3>
                    <p className="text-muted-foreground text-xs">
                        Full URLs for LinkedIn, X (Twitter), and Instagram.
                        Contact email is set in the main expert fields on this
                        form.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-1">
                        {(
                            [
                                ['linkedin', 'LinkedIn URL'],
                                ['twitter', 'X (Twitter) URL'],
                                ['instagram', 'Instagram URL'],
                            ]
                        ).map(([key, label]) => (
                            <div key={key} className="space-y-1.5">
                                <Label className="text-xs font-medium">
                                    {label}
                                </Label>
                                <Input
                                    placeholder="https://…"
                                    value={d.socials?.[key] ?? ''}
                                    onChange={(e) =>
                                        patch({
                                            socials: {
                                                ...(d.socials ?? {
                                                    linkedin: '',
                                                    twitter: '',
                                                    instagram: '',
                                                }),
                                                [key]: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Expertise */}
                <section className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <h3 className="text-sm font-semibold">
                                Areas of expertise
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Cards under “Areas of Expertise”.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() =>
                                patch({
                                    expertise: [
                                        ...(d.expertise ?? []),
                                        {
                                            title: emptyTri(),
                                            description: emptyTri(),
                                        },
                                    ],
                                })
                            }
                        >
                            <Plus className="size-4" />
                            Add area
                        </Button>
                    </div>
                    <div className="space-y-6">
                        {(d.expertise ?? []).map((item, i) => (
                            <div
                                key={i}
                                className="border-border/70 space-y-4 rounded-lg border p-3"
                            >
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive size-8"
                                        onClick={() =>
                                            patch({
                                                expertise: (
                                                    d.expertise ?? []
                                                ).filter((_, j) => j !== i),
                                            })
                                        }
                                        aria-label="Remove area"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                                <TriLangInputs
                                    label="Title"
                                    value={item.title ?? emptyTri()}
                                    onChange={(next) => {
                                        const list = [...(d.expertise ?? [])];
                                        list[i] = { ...list[i], title: next };
                                        patch({ expertise: list });
                                    }}
                                />
                                <TriLangTextareas
                                    label="Description"
                                    value={
                                        item.description ?? emptyTri()
                                    }
                                    onChange={(next) => {
                                        const list = [...(d.expertise ?? [])];
                                        list[i] = {
                                            ...list[i],
                                            description: next,
                                        };
                                        patch({ expertise: list });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Journey */}
                <section className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <h3 className="text-sm font-semibold">
                                Media & professional journey
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Timeline items on the detail page.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() =>
                                patch({
                                    journey: [
                                        ...(d.journey ?? []),
                                        {
                                            year: new Date().getFullYear(),
                                            role: emptyTri(),
                                            description: emptyTri(),
                                            imageSrc: '',
                                        },
                                    ],
                                })
                            }
                        >
                            <Plus className="size-4" />
                            Add milestone
                        </Button>
                    </div>
                    <div className="space-y-6">
                        {(d.journey ?? []).map((item, i) => (
                            <div
                                key={i}
                                className="border-border/70 space-y-4 rounded-lg border p-3"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Year</Label>
                                        <Input
                                            className="w-28"
                                            type="number"
                                            value={item.year ?? ''}
                                            onChange={(e) => {
                                                const list = [
                                                    ...(d.journey ?? []),
                                                ];
                                                const y = e.target.value;
                                                list[i] = {
                                                    ...list[i],
                                                    year:
                                                        y === ''
                                                            ? ''
                                                            : Number(y),
                                                };
                                                patch({ journey: list });
                                            }}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive size-8"
                                        onClick={() =>
                                            patch({
                                                journey: (
                                                    d.journey ?? []
                                                ).filter((_, j) => j !== i),
                                            })
                                        }
                                        aria-label="Remove milestone"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                                <TriLangInputs
                                    label="Role / label"
                                    value={item.role ?? emptyTri()}
                                    onChange={(next) => {
                                        const list = [...(d.journey ?? [])];
                                        list[i] = { ...list[i], role: next };
                                        patch({ journey: list });
                                    }}
                                />
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Image URL (round photo in timeline)
                                    </Label>
                                    <Input
                                        placeholder="https://… (optional)"
                                        value={item.imageSrc ?? ''}
                                        onChange={(e) => {
                                            const list = [...(d.journey ?? [])];
                                            list[i] = {
                                                ...list[i],
                                                imageSrc: e.target.value,
                                            };
                                            patch({ journey: list });
                                        }}
                                    />
                                </div>
                                <TriLangTextareas
                                    label="Description"
                                    value={
                                        item.description ?? emptyTri()
                                    }
                                    onChange={(next) => {
                                        const list = [...(d.journey ?? [])];
                                        list[i] = {
                                            ...list[i],
                                            description: next,
                                        };
                                        patch({ journey: list });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Appearances */}
                <section className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <h3 className="text-sm font-semibold">
                                Past appearances
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                YouTube URL embeds a mini player; use thumbnail
                                when there is no video or as extra art.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() =>
                                patch({
                                    appearances: [
                                        ...(d.appearances ?? []),
                                        {
                                            title: emptyTri(),
                                            meta: emptyTri(),
                                            duration: '',
                                            thumbnailSrc: '',
                                            videoUrl: '',
                                        },
                                    ],
                                })
                            }
                        >
                            <Plus className="size-4" />
                            Add appearance
                        </Button>
                    </div>
                    <div className="space-y-6">
                        {(d.appearances ?? []).map((item, i) => (
                            <div
                                key={i}
                                className="border-border/70 space-y-4 rounded-lg border p-3"
                            >
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive size-8"
                                        onClick={() =>
                                            patch({
                                                appearances: (
                                                    d.appearances ?? []
                                                ).filter((_, j) => j !== i),
                                            })
                                        }
                                        aria-label="Remove appearance"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                                <TriLangInputs
                                    label="Title"
                                    value={item.title ?? emptyTri()}
                                    onChange={(next) => {
                                        const list = [...(d.appearances ?? [])];
                                        list[i] = { ...list[i], title: next };
                                        patch({ appearances: list });
                                    }}
                                />
                                <TriLangInputs
                                    label="Meta (channel, format)"
                                    value={item.meta ?? emptyTri()}
                                    onChange={(next) => {
                                        const list = [...(d.appearances ?? [])];
                                        list[i] = { ...list[i], meta: next };
                                        patch({ appearances: list });
                                    }}
                                />
                                <div className="space-y-1.5">
                                    <Label className="text-xs">
                                        YouTube video URL (embed)
                                    </Label>
                                    <Input
                                        placeholder="https://www.youtube.com/watch?v=… or youtu.be/…"
                                        value={item.videoUrl ?? ''}
                                        onChange={(e) => {
                                            const list = [...(d.appearances ?? [])];
                                            list[i] = {
                                                ...list[i],
                                                videoUrl: e.target.value,
                                            };
                                            patch({ appearances: list });
                                        }}
                                    />
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">
                                            Duration (e.g. 24 min)
                                        </Label>
                                        <Input
                                            value={item.duration ?? ''}
                                            onChange={(e) => {
                                                const list = [
                                                    ...(d.appearances ?? []),
                                                ];
                                                list[i] = {
                                                    ...list[i],
                                                    duration: e.target.value,
                                                };
                                                patch({ appearances: list });
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">
                                            Thumbnail URL (optional)
                                        </Label>
                                        <Input
                                            placeholder="https://…"
                                            value={item.thumbnailSrc ?? ''}
                                            onChange={(e) => {
                                                const list = [
                                                    ...(d.appearances ?? []),
                                                ];
                                                list[i] = {
                                                    ...list[i],
                                                    thumbnailSrc:
                                                        e.target.value,
                                                };
                                                patch({ appearances: list });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Articles */}
                <section className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <h3 className="text-sm font-semibold">
                                Published articles & related content
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                List items at the bottom of the profile.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() =>
                                patch({
                                    articles: [
                                        ...(d.articles ?? []),
                                        {
                                            title: emptyTri(),
                                            description: emptyTri(),
                                            meta: emptyTri(),
                                        },
                                    ],
                                })
                            }
                        >
                            <Plus className="size-4" />
                            Add article
                        </Button>
                    </div>
                    <div className="space-y-6">
                        {(d.articles ?? []).map((item, i) => (
                            <div
                                key={i}
                                className="border-border/70 space-y-4 rounded-lg border p-3"
                            >
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive size-8"
                                        onClick={() =>
                                            patch({
                                                articles: (
                                                    d.articles ?? []
                                                ).filter((_, j) => j !== i),
                                            })
                                        }
                                        aria-label="Remove article"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                                <TriLangInputs
                                    label="Title"
                                    value={item.title ?? emptyTri()}
                                    onChange={(next) => {
                                        const list = [...(d.articles ?? [])];
                                        list[i] = { ...list[i], title: next };
                                        patch({ articles: list });
                                    }}
                                />
                                <TriLangTextareas
                                    label="Description"
                                    value={
                                        item.description ?? emptyTri()
                                    }
                                    onChange={(next) => {
                                        const list = [...(d.articles ?? [])];
                                        list[i] = {
                                            ...list[i],
                                            description: next,
                                        };
                                        patch({ articles: list });
                                    }}
                                />
                                <TriLangInputs
                                    label="Meta (publication, date)"
                                    value={item.meta ?? emptyTri()}
                                    onChange={(next) => {
                                        const list = [...(d.articles ?? [])];
                                        list[i] = { ...list[i], meta: next };
                                        patch({ articles: list });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </CardContent>
        </Card>
    );
}
