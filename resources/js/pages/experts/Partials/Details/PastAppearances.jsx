import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';
import { getYoutubeEmbedUrl } from '@/lib/youtubeEmbed';

export default function PastAppearances({ items = [] }) {
    return (
        <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-base font-extrabold text-foreground">
                    <TransText
                        en="Past Appearances"
                        fr="Apparitions passées"
                        ar="الظهورات السابقة"
                    />
                </h2>
                {items.length > 0 ? (
                    <Link
                        href="#"
                        className="text-xs font-semibold text-beta-blue hover:underline"
                    >
                        <TransText en="View All" fr="Tout voir" ar="عرض الكل" />
                    </Link>
                ) : null}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground md:col-span-2">
                        <TransText
                            en="No past appearances are listed yet."
                            fr="Aucune apparition passée n’est encore répertoriée."
                            ar="لا توجد ظهورات سابقة مدرجة بعد."
                        />
                    </p>
                ) : null}
                {items.map((x, idx) => {
                    const embedSrc = getYoutubeEmbedUrl(x.videoUrl);
                    const titleStr =
                        typeof x?.title?.en === 'string'
                            ? x.title.en
                            : 'appearance';
                    return (
                        <div
                            key={`${idx}-${titleStr}`}
                            className="overflow-hidden rounded-xl bg-background ring-1 ring-border"
                        >
                            <div className="relative aspect-video w-full bg-muted">
                                {embedSrc ? (
                                    <iframe
                                        title={titleStr}
                                        src={embedSrc}
                                        className="absolute inset-0 h-full w-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                    />
                                ) : (
                                    <>
                                        {x.thumbnailSrc ? (
                                            <img
                                                src={x.thumbnailSrc}
                                                alt=""
                                                className="absolute inset-0 h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : null}
                                        <div className="absolute inset-0 bg-linear-to-t from-tblack/65 via-tblack/15 to-transparent" />
                                        <div className="absolute top-3 left-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/25 backdrop-blur">
                                            ▶
                                        </div>
                                    </>
                                )}
                                {x.duration ? (
                                    <div className="absolute right-3 bottom-3 rounded-md bg-tblack/75 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                        {x.duration}
                                    </div>
                                ) : null}
                            </div>
                            <div className="p-4">
                                <div className="text-sm font-extrabold text-foreground">
                                    <TransText
                                        en={x.title.en}
                                        fr={x.title.fr}
                                        ar={x.title.ar}
                                    />
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    <TransText
                                        en={x.meta.en}
                                        fr={x.meta.fr}
                                        ar={x.meta.ar}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
