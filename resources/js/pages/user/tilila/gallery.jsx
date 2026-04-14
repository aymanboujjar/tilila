import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';

export default function TililaEditionGallery() {
    const { edition } = usePage().props;
    const images = Array.isArray(edition?.gallery_images) ? edition.gallery_images : [];

    return (
        <>
            <Head title={`Tilila Gallery ${edition?.year ?? ''}`} />

            <section className="mx-auto max-w-7xl px-4 py-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="text-xs font-semibold tracking-widest text-tgray">
                            <TransText en="TROPHÉE TILILA" fr="TROPHÉE TILILA" ar="جائزة تيليلا" />
                        </div>
                        <h1 className="mt-3 text-2xl font-semibold text-tblack sm:text-3xl">
                            <TransText
                                en={`Gallery — ${edition?.year ?? ''}`}
                                fr={`Galerie — ${edition?.year ?? ''}`}
                                ar={`المعرض — ${edition?.year ?? ''}`}
                            />
                        </h1>
                        <p className="mt-2 text-sm text-tgray">
                            <TransText
                                en={edition?.edition_label?.en ?? ''}
                                fr={edition?.edition_label?.fr ?? ''}
                                ar={edition?.edition_label?.ar ?? ''}
                            />
                        </p>
                    </div>

                    <Link
                        href="/tilila#archive"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-tblack hover:bg-secondary"
                    >
                        <ChevronLeft className="size-4 text-tgray" />
                        <TransText en="Back to archive" fr="Retour aux archives" ar="العودة للأرشيف" />
                    </Link>
                </div>

                <div className="mt-8">
                    {images.length === 0 ? (
                        <div className="rounded-2xl border border-border bg-beta-white p-10 text-center text-sm text-tgray">
                            <TransText
                                en="No images yet for this edition."
                                fr="Aucune image pour cette édition."
                                ar="لا توجد صور لهذه الدورة بعد."
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {images.map((path) => {
                                const src = path ? `/storage/${path}` : '';
                                return (
                                    <a
                                        key={path}
                                        href={src}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
                                    >
                                        <div className="aspect-4/3 bg-muted">
                                            {src ? (
                                                <img
                                                    src={src}
                                                    alt=""
                                                    className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            ) : null}
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

TililaEditionGallery.layout = (page) => <AppLayout>{page}</AppLayout>;

