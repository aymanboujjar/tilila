import React from 'react';
import TransText from '@/components/TransText';

export default function ProfessionalJourney({ items = [] }) {
    return (
        <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <h2 className="text-base font-extrabold text-foreground">
                <TransText
                    en="Media & Professional Journey"
                    fr="Parcours médiatique & professionnel"
                    ar="المسار الإعلامي والمهني"
                />
            </h2>

            <div className="mt-5 space-y-5">
                {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        <TransText
                            en="No media or professional milestones have been added yet."
                            fr="Aucun jalon médiatique ou professionnel n’a encore été ajouté."
                            ar="لم تُضف بعد أي محطات إعلامية أو مهنية."
                        />
                    </p>
                ) : null}
                {items.map((it, idx) => (
                    <div
                        key={`${it.year}-${it.role?.en ?? ''}-${idx}`}
                        className="flex gap-4"
                    >
                        <div className="mt-0.5 shrink-0">
                            {it.imageSrc ? (
                                <img
                                    src={it.imageSrc}
                                    alt=""
                                    className="h-14 w-14 rounded-full object-cover ring-2 ring-border shadow-sm"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ) : (
                                <div
                                    className="h-14 w-14 rounded-full bg-alpha-blue/90 text-beta-blue ring-2 ring-border"
                                    aria-hidden
                                />
                            )}
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs font-semibold text-muted-foreground">
                                <TransText
                                    en={`${it.year} • Press`}
                                    fr={`${it.year} • Presse`}
                                    ar={`${it.year} • الصحافة`}
                                />
                            </div>
                            <div className="mt-1 text-sm font-extrabold text-foreground">
                                <TransText
                                    en={it.role.en}
                                    fr={it.role.fr}
                                    ar={it.role.ar}
                                />
                            </div>
                            <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                <TransText
                                    en={it.description.en}
                                    fr={it.description.fr}
                                    ar={it.description.ar}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
