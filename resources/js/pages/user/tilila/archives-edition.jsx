import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useMemo } from 'react';
import TililaAwardsLayout from '@/layouts/tilila-awards-layout';
import TransText from '@/components/TransText';
import {
    EditionGallerySection,
    EditionJurySection,
    EditionVideoSection,
    EditionWinnersSection,
    textFor,
} from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    TililaContainer,
    TililaSection,
    TililaTealText,
} from '@/pages/user/tilila/partials/TililaUi';
import { findArchiveEdition } from '@/pages/user/tilila/utils/archiveEditions';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililaArchivesEdition() {
    const { year, editions: rawEditions } = usePage().props;
    const { locale } = useTranslation();

    const edition = useMemo(
        () => findArchiveEdition(rawEditions ?? [], year),
        [rawEditions, year],
    );

    if (!edition) {
        return (
            <>
                <Head title="Edition — Tilila Awards" />
                <TililaSection className="bg-twhite py-16">
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
                            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-beta-blue uppercase hover:underline"
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

    return (
        <>
            <Head title={`${edition.year} — Archives Tilila Awards`} />

            <section className="border-b border-border/60 bg-beta-white py-10 sm:py-12">
                <TililaContainer>
                    <Link
                        href="/tilila/archives"
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
                    >
                        <ChevronLeft className="size-4" />
                        <TransText
                            en="Back to archives"
                            fr="Retour aux archives"
                            ar="العودة للأرشيف"
                        />
                    </Link>

                    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
                        <div>
                            <p className="text-xs font-bold tracking-[0.14em] text-beta-turquoise uppercase">
                                <TransText
                                    en="Past edition"
                                    fr="Édition passée"
                                    ar="دورة سابقة"
                                />
                            </p>
                            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-beta-blue sm:text-4xl">
                                <TililaTealText>{edition.year}</TililaTealText>
                                <span className="ms-2 text-tblack">{label}</span>
                            </h1>
                            {theme ? (
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-tgray">
                                    {theme}
                                </p>
                            ) : null}
                            {ceremony ? (
                                <p className="mt-3 text-sm text-tgray">
                                    {ceremony}
                                </p>
                            ) : null}
                        </div>
                        {edition.cover_image_src ? (
                            <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                                <img
                                    src={edition.cover_image_src}
                                    alt=""
                                    className="aspect-[4/3] w-full object-cover"
                                />
                            </div>
                        ) : null}
                    </div>
                </TililaContainer>
            </section>

            <TililaSection className="bg-twhite pb-16">
                <TililaContainer className="space-y-14">
                    <nav
                        className="flex flex-wrap gap-2 text-sm font-semibold text-beta-blue"
                        aria-label="Edition sections"
                    >
                        <a href="#winners" className="hover:underline">
                            <TransText
                                en="Winners"
                                fr="Lauréats"
                                ar="الفائزون"
                            />
                        </a>
                        <span className="text-tgray">·</span>
                        <a href="#jury" className="hover:underline">
                            <TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />
                        </a>
                        <span className="text-tgray">·</span>
                        <a href="#gallery" className="hover:underline">
                            <TransText en="Photos" fr="Photos" ar="الصور" />
                        </a>
                        {edition.ceremony_video_url ? (
                            <>
                                <span className="text-tgray">·</span>
                                <a href="#video" className="hover:underline">
                                    <TransText
                                        en="Video"
                                        fr="Vidéo"
                                        ar="فيديو"
                                    />
                                </a>
                            </>
                        ) : null}
                    </nav>

                    <EditionWinnersSection
                        winners={edition.winners ?? []}
                        historyLines={edition.history_lines ?? []}
                        locale={locale}
                    />
                    <EditionJurySection
                        jury={edition.jury ?? []}
                        locale={locale}
                    />
                    <EditionGallerySection
                        images={edition.gallery_images ?? []}
                    />
                    <EditionVideoSection
                        videoUrl={edition.ceremony_video_url}
                        year={edition.year}
                    />
                </TililaContainer>
            </TililaSection>
        </>
    );
}

TililaArchivesEdition.layout = (page) => (
    <TililaAwardsLayout>{page}</TililaAwardsLayout>
);
