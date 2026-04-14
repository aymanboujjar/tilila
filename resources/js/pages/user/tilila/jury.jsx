import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';

function PeopleGrid({ people }) {
    return (
        <div className="mt-8">
            {people.length === 0 ? (
                <div className="rounded-2xl border border-border bg-beta-white p-10 text-center text-sm text-tgray">
                    <TransText
                        en="No jury members yet."
                        fr="Aucun membre du jury pour le moment."
                        ar="لا يوجد أعضاء لجنة تحكيم بعد."
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {people.map((p, idx) => {
                        const img = p?.photo_path ? `/storage/${p.photo_path}` : '';
                        return (
                            <div
                                key={`${p.full_name}-${idx}`}
                                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="size-16 overflow-hidden rounded-xl border border-border bg-muted">
                                        {img ? (
                                            <img
                                                src={img}
                                                alt=""
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        ) : null}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-base font-semibold text-foreground">
                                            {p.full_name}
                                        </div>
                                        <div className="mt-2 text-sm text-muted-foreground">
                                            <TransText
                                                en={p?.bio?.en ?? ''}
                                                fr={p?.bio?.fr ?? ''}
                                                ar={p?.bio?.ar ?? ''}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function TililaEditionJury() {
    const { edition } = usePage().props;
    const jury = Array.isArray(edition?.jury) ? edition.jury : [];

    return (
        <>
            <Head title={`Tilila Jury ${edition?.year ?? ''}`} />

            <section className="mx-auto max-w-7xl px-4 py-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="text-xs font-semibold tracking-widest text-tgray">
                            <TransText en="TROPHÉE TILILA" fr="TROPHÉE TILILA" ar="جائزة تيليلا" />
                        </div>
                        <h1 className="mt-3 text-2xl font-semibold text-tblack sm:text-3xl">
                            <TransText
                                en={`Jury — ${edition?.year ?? ''}`}
                                fr={`Jury — ${edition?.year ?? ''}`}
                                ar={`لجنة التحكيم — ${edition?.year ?? ''}`}
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

                <PeopleGrid people={jury} />
            </section>
        </>
    );
}

TililaEditionJury.layout = (page) => <AppLayout>{page}</AppLayout>;

