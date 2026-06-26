import { Head, Link, usePage } from '@inertiajs/react';
import { Award, ChevronLeft } from 'lucide-react';
import { useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';
import {
    EditionGallerySection,
    EditionJurySection,
    EditionVideoSection,
    PersonPhoto,
    textFor,
} from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    TililaContainer,
    TililaIconBadge,
    TililaSection,
    TililaSectionHeading,
    TililaTealText,
} from '@/pages/user/tilila/partials/TililaUi';
import { findArchiveEdition, editionWinnerRows } from '@/pages/user/tilila/utils/archiveEditions';
import {
    ARCHIVE_STAT_KEYS,
    computeEditionStats,
} from '@/pages/user/tilila/utils/archivesPageData';
import { useYoutubeAvailability } from '@/hooks/useYoutubeAvailability';
import { useTranslation } from '@/contexts/TranslationContext';

const EDITION_NAV = [
    { id: 'winners', en: 'Palmarès', fr: 'Palmarès', ar: 'الجوائز' },
    { id: 'jury', en: 'Jury', fr: 'Jury', ar: 'لجنة التحكيم' },
    { id: 'gallery', en: 'Photos', fr: 'Photos', ar: 'الصور' },
    { id: 'video', en: 'Video', fr: 'Vidéo', ar: 'فيديو' },
];

function EditionPalmarèsSection({ edition, locale }) {
    const rows = editionWinnerRows(edition, locale);
    const label = textFor(edition.edition_label, locale);

    if (!rows.length) {
        return (
            <section id="winners">
                <TililaSectionHeading
                    title={
                        <TransText
                            en="Palmarès"
                            fr="Palmarès"
                            ar="الجوائز"
                        />
                    }
                />
                <p className="mt-6 rounded-2xl border border-dashed border-beta-blue/20 bg-beta-white px-6 py-12 text-center text-sm text-tgray">
                    <TransText
                        en="Winners for this edition will be announced after the awards ceremony."
                        fr="Les lauréats de cette édition seront annoncés après la cérémonie."
                        ar="يُعلَن عن فائزي هذه الدورة بعد حفل التوزيع."
                    />
                </p>
            </section>
        );
    }

    return (
        <section id="winners">
            <TililaSectionHeading
                title={
                    <TransText
                        en="Palmarès"
                        fr="Palmarès"
                        ar="الجوائز"
                    />
                }
                subtitle={
                    <TransText
                        en={`Every prize and laureate for the ${edition.year} edition.`}
                        fr={`Chaque prix et lauréat de l'édition ${edition.year}.`}
                        ar={`كل جائزة وفائز في دورة ${edition.year}.`}
                    />
                }
            />

            <article className="mt-8 overflow-hidden rounded-2xl border border-border/50 bg-twhite shadow-[0_8px_30px_rgba(26,35,126,0.06)]">
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 bg-beta-white px-5 py-4 sm:px-6">
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-beta-blue">
                            {edition.year}
                        </span>
                        <span className="text-sm font-medium text-tgray">
                            {label}
                        </span>
                    </div>
                </header>

                <div className="hidden border-b border-border/40 bg-alpha-blue/40 px-5 py-2.5 text-[11px] font-bold tracking-wide text-beta-blue uppercase sm:grid sm:grid-cols-[minmax(140px,1.1fr)_minmax(120px,0.9fr)_1fr] sm:gap-4 sm:px-6">
                    <span>
                        <TransText en="Prize" fr="Prix" ar="الجائزة" />
                    </span>
                    <span>
                        <TransText en="Laureate" fr="Lauréat" ar="الفائز" />
                    </span>
                    <span>
                        <TransText en="Details" fr="Détails" ar="التفاصيل" />
                    </span>
                </div>

                <ul className="divide-y divide-border/40">
                    {rows.map((row, index) => {
                        if (!row.trophy && !row.name && row.detail) {
                            return (
                                <li
                                    key={index}
                                    className="px-5 py-4 sm:px-6 sm:py-5"
                                >
                                    <p className="text-sm leading-relaxed text-tgray">
                                        {row.detail}
                                    </p>
                                </li>
                            );
                        }

                        return (
                            <li
                                key={index}
                                className="px-5 py-4 sm:grid sm:grid-cols-[minmax(140px,1.1fr)_minmax(120px,0.9fr)_1fr] sm:items-start sm:gap-4 sm:px-6 sm:py-5"
                            >
                                <div className="flex items-start gap-3">
                                    {row.photo ? (
                                        <PersonPhoto
                                            path={row.photo}
                                            alt={row.name || ''}
                                            className="size-12 sm:hidden"
                                        />
                                    ) : (
                                        <TililaIconBadge
                                            icon={Award}
                                            className="size-10 sm:hidden"
                                        />
                                    )}
                                    <div>
                                        <p className="text-[11px] font-bold tracking-wide text-beta-blue uppercase sm:hidden">
                                            <TransText
                                                en="Prize"
                                                fr="Prix"
                                                ar="الجائزة"
                                            />
                                        </p>
                                        <p className="mt-0.5 text-sm font-bold text-beta-blue sm:mt-0">
                                            {row.trophy || '—'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 sm:mt-0">
                                    <p className="text-[11px] font-bold tracking-wide text-tgray uppercase sm:hidden">
                                        <TransText
                                            en="Laureate"
                                            fr="Lauréat"
                                            ar="الفائز"
                                        />
                                    </p>
                                    <p className="mt-0.5 font-semibold text-tblack sm:mt-0">
                                        {row.name || '—'}
                                    </p>
                                </div>

                                <div className="mt-3 sm:mt-0">
                                    <p className="text-[11px] font-bold tracking-wide text-tgray uppercase sm:hidden">
                                        <TransText
                                            en="Details"
                                            fr="Détails"
                                            ar="التفاصيل"
                                        />
                                    </p>
                                    <p className="mt-0.5 text-sm leading-relaxed text-tgray sm:mt-0">
                                        {row.detail || '—'}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </article>
        </section>
    );
}

export default function TililaArchivesEdition() {
    const { year, editions: rawEditions } = usePage().props;
    const { locale, t } = useTranslation();

    const edition = useMemo(
        () => findArchiveEdition(rawEditions ?? [], year),
        [rawEditions, year],
    );

    const stats = useMemo(
        () => (edition ? computeEditionStats(edition, locale) : {}),
        [edition, locale],
    );

    if (!edition) {
        return (
            <>
                <Head title="Edition — Tilila Awards" />
                <TililaSection className="bg-beta-white py-16">
                    <TililaContainer className="text-center">
                        <p className="text-tgray">
                            <TransText
                                en="This edition could not be found."
                                fr="Cette édition est introuvable."
                                ar="تعذر العثور على هذه الدورة."
                            />
                        </p>
                        <Link
                            href="/tilila/archives"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-beta-blue/20 bg-alpha-blue px-5 py-2.5 text-xs font-bold text-beta-blue uppercase hover:bg-beta-blue/10"
                        >
                            <ChevronLeft className="size-4" />
                            <TransText
                                en="Back to archives"
                                fr="Retour aux archives"
                                ar="العودة للأرشيف"
                            />
                        </Link>
                    </TililaContainer>
                </TililaSection>
            </>
        );
    }

    const label = textFor(edition.edition_label, locale);
    const theme = textFor(edition.theme, locale);
    const ceremony = textFor(edition.ceremony, locale);
    const ceremonyVideo = useYoutubeAvailability(edition.ceremony_video_url);

    const navItems = EDITION_NAV.filter((item) => {
        if (item.id === 'video') return ceremonyVideo.available;
        return true;
    });

    const statChips = ARCHIVE_STAT_KEYS.filter(
        (key) => (stats[key] ?? 0) > 0,
    ).slice(0, 4);

    return (
        <>
            <Head title={`${edition.year} — Archives Tilila Awards`} />

            <section className="relative min-h-[420px] overflow-hidden">
                {edition.cover_image_src ? (
                    <img
                        src={edition.cover_image_src}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-beta-blue to-brand-light-purple" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-beta-blue/95 via-beta-blue/65 to-beta-blue/40" />

                <TililaContainer className="relative flex min-h-[460px] flex-col justify-end py-12 sm:py-16">
                    <Link
                        href="/tilila/archives"
                        className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-twhite/20 bg-twhite/10 px-4 py-2 text-xs font-bold tracking-wide text-twhite uppercase backdrop-blur transition hover:bg-twhite/20"
                    >
                        <ChevronLeft className="size-4" />
                        <TransText
                            en="Back to archives"
                            fr="Retour aux archives"
                            ar="العودة للأرشيف"
                        />
                    </Link>

                    <div className="mt-10 max-w-3xl">
                        <p className="text-[11px] font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                            <TransText
                                en="Archives & Palmarès"
                                fr="Archives & Palmarès"
                                ar="الأرشيف والجوائز"
                            />
                        </p>
                        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-twhite sm:text-5xl lg:text-6xl">
                            <TililaTealText className="text-beta-turquoise">
                                {edition.year}
                            </TililaTealText>
                            <span className="ms-3 text-2xl font-bold text-twhite/90 sm:text-3xl">
                                {label}
                            </span>
                        </h1>
                        {theme ? (
                            <p className="mt-4 text-base leading-relaxed text-twhite/85 sm:text-lg">
                                {theme}
                            </p>
                        ) : null}
                        {ceremony ? (
                            <p className="mt-3 text-sm text-twhite/70">
                                {ceremony}
                            </p>
                        ) : null}

                        {statChips.length > 0 ? (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {statChips.map((key) => (
                                    <span
                                        key={key}
                                        className="inline-flex items-center gap-2 rounded-full border border-twhite/20 bg-twhite/10 px-3 py-1.5 text-xs font-bold text-twhite backdrop-blur"
                                    >
                                        <span className="text-beta-turquoise">
                                            {stats[key]}
                                        </span>
                                        {t(`tilila.archives.stats.${key}`)}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </TililaContainer>
            </section>

            <div className="sticky top-16 z-20 border-b border-border/50 bg-twhite/95 backdrop-blur-xl sm:top-18">
                <TililaContainer className="py-3">
                    <nav
                        className="-mx-1 flex gap-2 overflow-x-auto px-1"
                        aria-label="Edition sections"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="shrink-0 rounded-full border border-border/60 bg-beta-white px-4 py-2 text-xs font-bold tracking-wide text-tblack uppercase transition hover:border-beta-blue hover:bg-beta-blue hover:text-twhite"
                            >
                                {item[locale] || item.fr || item.en}
                            </a>
                        ))}
                    </nav>
                </TililaContainer>
            </div>

            <TililaSection className="bg-twhite pb-20">
                <TililaContainer className="space-y-8">
                    <div className="rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(68,25,168,0.06)] sm:p-8">
                        <EditionPalmarèsSection
                            edition={edition}
                            locale={locale}
                        />
                    </div>

                    <div className="rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(68,25,168,0.06)] sm:p-8">
                        <EditionJurySection
                            jury={edition.jury ?? []}
                            locale={locale}
                        />
                    </div>

                    <div className="rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(68,25,168,0.06)] sm:p-8">
                        <EditionGallerySection
                            images={edition.gallery_images ?? []}
                        />
                    </div>

                    {ceremonyVideo.available && ceremonyVideo.embedUrl ? (
                        <div className="rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(68,25,168,0.06)] sm:p-8">
                            <EditionVideoSection
                                year={edition.year}
                                embedUrl={ceremonyVideo.embedUrl}
                            />
                        </div>
                    ) : null}
                </TililaContainer>
            </TililaSection>
        </>
    );
}

TililaArchivesEdition.layout = (page) => <AppLayout>{page}</AppLayout>;
