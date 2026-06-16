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
import { useYoutubeAvailability } from '@/hooks/useYoutubeAvailability';
import { useTranslation } from '@/contexts/TranslationContext';

const EDITION_NAV = [
    { id: 'winners', en: 'Winners', fr: 'Lauréats', ar: 'الفائزون' },
    { id: 'jury', en: 'Jury', fr: 'Jury', ar: 'لجنة التحكيم' },
    { id: 'gallery', en: 'Photos', fr: 'Photos', ar: 'الصور' },
    { id: 'video', en: 'Video', fr: 'Vidéo', ar: 'فيديو' },
];

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
                            className="mt-6 inline-flex items-center gap-2 rounded-full border border-beta-blue/20 bg-alpha-blue px-5 py-2.5 text-xs font-bold text-beta-blue uppercase hover:bg-beta-blue/10"
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

    return (
        <>
            <Head title={`${edition.year} — Archives Tilila Awards`} />

            <section className="relative min-h-[420px] overflow-hidden border-b border-border/60">
                {edition.cover_image_src ? (
                    <img
                        src={edition.cover_image_src}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-[#2e1861] to-[#1a1045]" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-tblack/90 via-tblack/55 to-tblack/30" />

                <TililaContainer className="relative flex min-h-[420px] flex-col justify-end py-12 sm:py-16">
                    <Link
                        href="/tilila/archives"
                        className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-twhite/20 bg-twhite/10 px-4 py-2 text-xs font-bold tracking-wide text-twhite uppercase backdrop-blur transition hover:bg-twhite/15"
                    >
                        <ChevronLeft className="size-4" />
                        <TransText
                            en="Back to archives"
                            fr="Retour aux archives"
                            ar="العودة للأرشيف"
                        />
                    </Link>

                    <div className="mt-10 max-w-3xl">
                        <p className="text-xs font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                            <TransText
                                en="Past edition"
                                fr="Édition passée"
                                ar="دورة سابقة"
                            />
                        </p>
                        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-twhite sm:text-5xl">
                            <TililaTealText className="text-beta-turquoise">
                                {edition.year}
                            </TililaTealText>
                            <span className="ms-3">{label}</span>
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
                    </div>
                </TililaContainer>
            </section>

            <div className="sticky top-16 z-20 border-b border-border/60 bg-twhite/90 backdrop-blur-md sm:top-18">
                <TililaContainer className="py-3">
                    <nav
                        className="-mx-1 flex gap-2 overflow-x-auto px-1"
                        aria-label="Edition sections"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="shrink-0 rounded-full border border-border/70 bg-twhite px-4 py-2 text-xs font-bold tracking-wide text-tblack uppercase shadow-sm transition hover:border-beta-blue hover:text-beta-blue"
                            >
                                {item[locale] || item.fr || item.en}
                            </a>
                        ))}
                    </nav>
                </TililaContainer>
            </div>

            <TililaSection className="bg-twhite pb-20">
                <TililaContainer className="space-y-16">
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
                    {ceremonyVideo.available && ceremonyVideo.embedUrl ? (
                        <EditionVideoSection
                            year={edition.year}
                            embedUrl={ceremonyVideo.embedUrl}
                        />
                    ) : null}
                </TililaContainer>
            </TililaSection>
        </>
    );
}

TililaArchivesEdition.layout = (page) => (
    <TililaAwardsLayout>{page}</TililaAwardsLayout>
);
