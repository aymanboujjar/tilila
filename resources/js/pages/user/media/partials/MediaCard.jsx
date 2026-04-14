import React from 'react';
import { Link } from '@inertiajs/react';

import TransText from '@/components/TransText';
import { cn } from '@/lib/utils';

export default function MediaCard({ item, locale }) {
    const resolvedBadge =
        locale === 'ar'
            ? item.badge.ar
            : locale === 'fr'
              ? item.badge.fr
              : item.badge.en;
    const resolvedMeta =
        locale === 'ar'
            ? item.meta.ar
            : locale === 'fr'
              ? item.meta.fr
              : item.meta.en;
    const resolvedCta =
        locale === 'ar'
            ? item.cta.ar
            : locale === 'fr'
              ? item.cta.fr
              : item.cta.en;

    return (
        <article className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
            <Link
                href={`/media/${item.id}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-beta-blue"
            >
                <div className="relative">
                    <img
                        src={item.imageSrc}
                        alt=""
                        className="h-44 w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-tblack/55 via-tblack/10 to-transparent" />
                    <div className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-extrabold text-foreground shadow-sm ring-1 ring-border backdrop-blur">
                        {resolvedBadge}
                    </div>
                </div>

                <div className="p-5">
                    <h3 className="text-sm leading-snug font-extrabold text-foreground">
                        <TransText
                            en={item.title.en}
                            fr={item.title.fr}
                            ar={item.title.ar}
                        />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        <TransText
                            en={item.excerpt.en}
                            fr={item.excerpt.fr}
                            ar={item.excerpt.ar}
                        />
                    </p>

                    <div
                        className={cn(
                            'mt-4 flex items-center gap-3 text-xs',
                            resolvedMeta ? 'justify-between' : 'justify-end',
                        )}
                    >
                        {resolvedMeta ? (
                            <div className="text-muted-foreground">
                                {resolvedMeta}
                            </div>
                        ) : null}
                        <span className="font-semibold text-beta-blue hover:underline">
                            {resolvedCta}
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
