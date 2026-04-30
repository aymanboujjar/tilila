import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ProfileSidebar from '@/pages/experts/Partials/Details/ProfileSidebar';
import AreasOfExpertise from '@/pages/experts/Partials/Details/AreasOfExpertise';
import ProfessionalJourney from '@/pages/experts/Partials/Details/ProfessionalJourney';
import PastAppearances from '@/pages/experts/Partials/Details/PastAppearances';
import RelatedContent from '@/pages/experts/Partials/Details/RelatedContent';
import { useTranslation } from '@/contexts/TranslationContext';
import TransText from '@/components/TransText';

export default function ExpertDetails({ expert, details: detailsProp }) {
    const { locale, t } = useTranslation();
    const details = detailsProp ?? {};

    const resolvedName =
        locale === 'ar'
            ? expert?.name?.ar
            : locale === 'fr'
              ? expert?.name?.fr
              : expert?.name?.en;

    return (
        <>
            <Head
                title={resolvedName ?? t('experts.detail.fallbackHeadTitle')}
            />

            <div className="bg-[linear-gradient(180deg,#f8fcff_0%,#ffffff_22%,#ffffff_100%)]">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Link
                            href="/"
                            className="hover:text-foreground hover:underline"
                        >
                            {t('nav.home')}
                        </Link>
                        <span aria-hidden="true">›</span>
                        <Link
                            href="/experts"
                            className="hover:text-foreground hover:underline"
                        >
                            {t('nav.experts')}
                        </Link>
                        <span aria-hidden="true">›</span>
                        <span className="font-semibold text-foreground">
                            {resolvedName}
                        </span>
                    </nav>

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <ProfileSidebar expert={expert} details={details} />
                        </div>

                        <div className="space-y-6 lg:col-span-8">
                            <header className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                                <div className="flex flex-wrap gap-2">
                                    {(details?.headlineTags ?? []).map(
                                        (tag) => (
                                            <span
                                                key={tag.en}
                                                className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
                                            >
                                                <TransText
                                                    en={tag.en}
                                                    fr={tag.fr}
                                                    ar={tag.ar}
                                                />
                                            </span>
                                        ),
                                    )}
                                </div>

                                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
                                    {resolvedName}
                                </h1>
                                <p className="mt-2 text-sm font-semibold text-muted-foreground">
                                    <TransText
                                        en={expert?.title?.en ?? ''}
                                        fr={expert?.title?.fr ?? ''}
                                        ar={expert?.title?.ar ?? ''}
                                    />
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                    {expert?.country ? (
                                        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-muted-foreground">
                                            {expert.country}
                                        </span>
                                    ) : null}
                                    {expert?.location ? (
                                        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-muted-foreground">
                                            {expert.location}
                                        </span>
                                    ) : null}
                                </div>

                                <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                                    {(details?.bio ?? []).length > 0 ? (
                                        (details.bio ?? []).map((p) => (
                                            <p key={p.en}>
                                                <TransText
                                                    en={p.en}
                                                    fr={p.fr}
                                                    ar={p.ar}
                                                />
                                            </p>
                                        ))
                                    ) : (
                                        <p>
                                            <TransText
                                                en="Biography and highlights will appear here when added for this expert."
                                                fr="La biographie et les points forts apparaîtront ici lorsqu’ils seront ajoutés pour cette experte."
                                                ar="ستظهر السيرة الذاتية والنقاط البارزة هنا عند إضافتها لهذه الخبيرة."
                                            />
                                        </p>
                                    )}
                                </div>
                            </header>

                            <AreasOfExpertise
                                items={details?.expertise ?? []}
                            />
                            <ProfessionalJourney
                                items={details?.journey ?? []}
                            />
                            <PastAppearances
                                items={details?.appearances ?? []}
                            />
                            <RelatedContent items={details?.articles ?? []} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ExpertDetails.layout = (page) => <AppLayout>{page}</AppLayout>;
