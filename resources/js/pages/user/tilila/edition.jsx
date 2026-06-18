import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useMemo } from 'react';
import TililaAwardsLayout from '@/layouts/tilila-awards-layout';
import EditionTopHero from '@/components/program/EditionTopHero';
import TransText from '@/components/TransText';
import { useYoutubeAvailability } from '@/hooks/useYoutubeAvailability';
import { resolveTililaHeroMedia } from '@/lib/editionHeroMedia';
import {
    EditionGallerySection,
    EditionJurySection,
    EditionWinnersSection,
    textFor,
} from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    TililaContainer,
    TililaSection,
    TililaTealText,
} from '@/pages/user/tilila/partials/TililaUi';
import { coverImageSrc } from '@/pages/user/tilila/utils/editions';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililaEditionDetails() {
    const { edition } = usePage().props;
    const { locale } = useTranslation();
    const isCurrent = Boolean(edition?.is_current);

    const winners = useMemo(() => {
        if (isCurrent) return [];
        return Array.isArray(edition?.winners) ? edition.winners : [];
    }, [edition?.winners, isCurrent]);

    const jury = Array.isArray(edition?.jury) ? edition.jury : [];
    const images = Array.isArray(edition?.gallery_images)
        ? edition.gallery_images
        : [];

    const ceremonyVideo = useYoutubeAvailability(edition?.ceremony_video_url);

    const heroMedia = useMemo(
        () =>
            resolveTililaHeroMedia({
                ceremonyVideoUrl: ceremonyVideo.available
                    ? edition?.ceremony_video_url
                    : null,
                bannerSrc: coverImageSrc(
                    edition?.cover_image_path,
                    edition?.gallery_images,
                ),
            }),
        [
            ceremonyVideo.available,
            edition?.ceremony_video_url,
            edition?.cover_image_path,
            edition?.gallery_images,
        ],
    );

    const label = textFor(edition?.edition_label, locale);
    const theme = textFor(edition?.theme, locale);

    return (
        <>
            <Head title={`${edition?.year ?? ''} — Tilila Awards`} />

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
                                    en="Tilila Awards"
                                    fr="Tilila Awards"
                                    ar="تيليلا أووردز"
                                />
                            </p>
                            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-beta-blue sm:text-4xl">
                                <TililaTealText>{edition?.year}</TililaTealText>
                                <span className="ms-2 text-tblack">
                                    {label}
                                </span>
                            </h1>
                            {theme ? (
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-tgray">
                                    {theme}
                                </p>
                            ) : null}
                        </div>
                        {coverImageSrc(
                            edition?.cover_image_path,
                            edition?.gallery_images,
                        ) ? (
                            <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                                <img
                                    src={coverImageSrc(
                                        edition?.cover_image_path,
                                        edition?.gallery_images,
                                    )}
                                    alt=""
                                    className="aspect-[4/3] w-full object-cover"
                                />
                            </div>
                        ) : null}
                    </div>
                </TililaContainer>
            </section>

            <TililaSection className="bg-twhite pb-16">
                <TililaContainer>
                    <EditionTopHero {...heroMedia} />

                    <nav
                        className="mt-8 flex flex-wrap gap-2 text-sm font-semibold text-beta-blue"
                        aria-label="Edition sections"
                    >
                        {!isCurrent ? (
                            <>
                                <a href="#winners" className="hover:underline">
                                    <TransText
                                        en="Winners"
                                        fr="Lauréats"
                                        ar="الفائزون"
                                    />
                                </a>
                                <span className="text-tgray">·</span>
                            </>
                        ) : null}
                        <a href="#jury" className="hover:underline">
                            <TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />
                        </a>
                        <span className="text-tgray">·</span>
                        <a href="#gallery" className="hover:underline">
                            <TransText en="Photos" fr="Photos" ar="الصور" />
                        </a>
                        {ceremonyVideo.available ? (
                            <>
                                <span className="text-tgray">·</span>
                                <a
                                    href="#edition-hero"
                                    className="hover:underline"
                                >
                                    <TransText
                                        en="Video"
                                        fr="Vidéo"
                                        ar="فيديو"
                                    />
                                </a>
                            </>
                        ) : null}
                    </nav>

                    <div className="mt-10 space-y-14">
                        {!isCurrent ? (
                            <EditionWinnersSection
                                winners={winners}
                                locale={locale}
                            />
                        ) : (
                            <section id="winners">
                                <p className="rounded-xl border border-border bg-beta-white p-8 text-center text-sm text-tgray">
                                    <TransText
                                        en="Winners for this edition will be announced after the awards ceremony."
                                        fr="Les lauréats de cette édition seront annoncés après la cérémonie."
                                        ar="يُعلَن عن فائزي هذه الدورة بعد حفل التوزيع."
                                    />
                                </p>
                            </section>
                        )}

                        <EditionJurySection jury={jury} locale={locale} />
                        <EditionGallerySection images={images} />
                    </div>
                </TililaContainer>
            </TililaSection>
        </>
    );
}

TililaEditionDetails.layout = (page) => (
    <TililaAwardsLayout>{page}</TililaAwardsLayout>
);
