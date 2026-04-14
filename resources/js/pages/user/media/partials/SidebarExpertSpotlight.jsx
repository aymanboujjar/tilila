import React from 'react';

import { Link } from '@inertiajs/react';

import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';

const FALLBACK_NAME = {
    en: 'Fatima Zahra El Idrissi',
    fr: 'Fatima Zahra El Idrissi',
    ar: 'فاطمة الزهراء الإدريسي',
};

/**
 * @param {{ expertSpotlight?: { name?: { en?: string, fr?: string, ar?: string }, image?: string | null, profileHref?: string } | null }} props
 */
export default function SidebarExpertSpotlight({ expertSpotlight = null }) {
    const { locale, t } = useTranslation();

    const nameObj = expertSpotlight?.name ?? FALLBACK_NAME;
    const resolvedName =
        locale === 'ar'
            ? nameObj.ar || nameObj.en || ''
            : locale === 'fr'
              ? nameObj.fr || nameObj.en || ''
              : nameObj.en || '';

    const imageSrc = expertSpotlight?.image ?? null;
    const profileHref = expertSpotlight?.profileHref ?? null;

    const ctaInner = (
        <TransText
            en="Consult Profile"
            fr="Consulter le profil"
            ar="عرض الملف"
        />
    );

    const ctaClassName =
        'mt-4 inline-flex w-full items-center justify-center rounded-md bg-beta-blue px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90';

    return (
        <aside className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-extrabold tracking-wide text-muted-foreground uppercase">
                    <TransText
                        en="Expert spotlight"
                        fr="Experte à la une"
                        ar="خبيرة مميزة"
                    />
                </div>
                <Link
                    href="/experts"
                    className="text-xs font-semibold text-beta-blue hover:underline"
                >
                    {t('media.actions.viewAllExperts')}
                </Link>
            </div>

            <div className="mt-4 rounded-xl bg-background p-4 ring-1 ring-border">
                <div className="flex items-center gap-3">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt=""
                            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-border"
                        />
                    ) : (
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground ring-1 ring-border">
                            <span aria-hidden="true">👤</span>
                        </div>
                    )}
                    <div className="min-w-0">
                        <div className="truncate text-sm font-extrabold text-foreground">
                            {resolvedName}
                        </div>
                    </div>
                </div>

                {profileHref ? (
                    <Link href={profileHref} className={ctaClassName}>
                        {ctaInner}
                    </Link>
                ) : (
                    <button type="button" className={ctaClassName}>
                        {ctaInner}
                    </button>
                )}
            </div>
        </aside>
    );
}
