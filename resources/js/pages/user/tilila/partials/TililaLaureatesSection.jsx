import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { memo, useMemo } from 'react';
import TransText from '@/components/TransText';
import { useYoutubeAvailability } from '@/hooks/useYoutubeAvailability';
import { TililaContainer, TililaSection } from '@/pages/user/tilila/partials/TililaUi';
import { coverImageSrc } from '@/pages/user/tilila/utils/editions';
import {
    findJuryPrizeWinner,
    resolveShowcaseImage,
    resolveWinnerDisplay,
    resolveWinnerVideo,
    storageAssetSrc,
} from '@/pages/user/tilila/utils/winnerFields';

const FALLBACK_IMAGE = '/assets/tilila/editions/edition-2025.png';
const BORDER_IMAGE_COUNT = 10;

const FALLBACK_LAUREATE = {
    brand: 'Ain Atlas',
    brandPhoto: FALLBACK_IMAGE,
    showcaseSrc: FALLBACK_IMAGE,
    videoUploadSrc: null,
    videoYoutubeUrl: null,
    campaign: {
        fr: 'Campagne primée',
        en: 'Award-winning campaign',
        ar: 'حملة فائزة',
    },
    agency: {
        fr: 'Klem.',
        en: 'Klem.',
        ar: 'Klem.',
    },
    agencyPhoto: null,
    trophy: {
        fr: 'Prix du Jury',
        en: 'Jury Prize',
        ar: 'جائزة لجنة التحكيم',
    },
};

function lastFinishedEdition(editions) {
    if (!Array.isArray(editions) || editions.length === 0) {
        return null;
    }

    const finished = editions.filter((edition) => !edition?.is_current);

    if (finished.length === 0) {
        return editions[0];
    }

    return [...finished].sort((a, b) => {
        const yearDiff = Number(b?.year ?? 0) - Number(a?.year ?? 0);

        if (yearDiff !== 0) {
            return yearDiff;
        }

        return (b?.id ?? 0) - (a?.id ?? 0);
    })[0];
}

function buildJuryPrizeLaureate(edition) {
    const winner = findJuryPrizeWinner(edition?.winners);
    const cover = coverImageSrc(
        edition?.cover_image_path,
        edition?.gallery_images,
    );

    if (!winner) {
        return {
            ...FALLBACK_LAUREATE,
            showcaseSrc: cover || FALLBACK_IMAGE,
            brandPhoto: cover || FALLBACK_IMAGE,
        };
    }

    const { campaign, agency, agencyPhoto } = resolveWinnerDisplay(winner);
    const { uploadSrc, youtubeUrl } = resolveWinnerVideo(winner);
    const fallback = cover || FALLBACK_IMAGE;

    return {
        brand: winner.full_name || FALLBACK_LAUREATE.brand,
        brandPhoto: storageAssetSrc(winner.photo_path) || null,
        showcaseSrc: resolveShowcaseImage(winner, edition, fallback),
        videoUploadSrc: uploadSrc,
        videoYoutubeUrl: youtubeUrl,
        campaign,
        agency,
        agencyPhoto,
        trophy: winner.trophy ?? FALLBACK_LAUREATE.trophy,
    };
}

function borderGallerySrcs(edition, count = BORDER_IMAGE_COUNT) {
    const gallery = (Array.isArray(edition?.gallery_images)
        ? edition.gallery_images
        : []
    )
        .map((path) => storageAssetSrc(path))
        .filter(Boolean);

    const cover =
        coverImageSrc(edition?.cover_image_path, edition?.gallery_images) ||
        FALLBACK_IMAGE;
    const pool = gallery.length > 0 ? gallery : [cover];
    const images = [];

    for (let index = 0; index < count; index += 1) {
        images.push(pool[index % pool.length]);
    }

    return images;
}

function isLogoLikeImage(src, brandPhoto) {
    if (!src) {
        return false;
    }

    if (brandPhoto && src === brandPhoto) {
        return true;
    }

    return /\/winners\//.test(src) && !/\/showcase\//.test(src);
}

const FrameThumb = memo(function FrameThumb({ src }) {
    return (
        <div className="aspect-square overflow-hidden rounded-md bg-muted/80 ring-1 ring-border/40">
            <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
            />
        </div>
    );
});

const WinnerMiniVideo = memo(function WinnerMiniVideo({
    uploadSrc,
    youtubeUrl,
    brand,
}) {
    const youtube = useYoutubeAvailability(youtubeUrl);
    const embedUrl = youtube.available ? youtube.embedUrl : null;

    if (uploadSrc) {
        return (
            <video
                className="h-full w-full object-contain"
                controls
                autoPlay
                muted
                playsInline
                preload="metadata"
                title={brand ? `${brand} — campaign video` : 'Winner video'}
            >
                <source src={uploadSrc} />
            </video>
        );
    }

    if (embedUrl) {
        return (
            <iframe
                title={brand ? `${brand} — campaign video` : 'Winner video'}
                src={embedUrl}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        );
    }

    if (youtubeUrl) {
        return (
            <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-full items-center justify-center bg-beta-blue/10 px-3 text-center text-[10px] font-bold tracking-wide text-beta-blue uppercase hover:bg-beta-blue/15 sm:text-xs"
            >
                <TransText
                    en="Watch video"
                    fr="Voir la vidéo"
                    ar="شاهد الفيديو"
                />
            </a>
        );
    }

    return (
        <div className="flex h-full items-center justify-center px-3 text-center text-[10px] text-tgray sm:text-xs">
            <TransText
                en="Winner video coming soon"
                fr="Vidéo du lauréat bientôt disponible"
                ar="فيديو الفائز قريباً"
            />
        </div>
    );
});

const EditionMediaFrame = memo(function EditionMediaFrame({
    images,
    uploadSrc,
    youtubeUrl,
    brand,
}) {
    return (
        <div className="overflow-hidden rounded-2xl bg-beta-blue/5 p-2 ring-1 ring-border/50 sm:p-2.5">
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                <FrameThumb src={images[0]} />
                <FrameThumb src={images[1]} />
                <FrameThumb src={images[2]} />
                <FrameThumb src={images[3]} />

                <div className="col-start-1 row-start-2 self-center">
                    <FrameThumb src={images[4]} />
                </div>
                <div className="col-start-1 row-start-3 self-center">
                    <FrameThumb src={images[5]} />
                </div>

                <div className="col-span-2 col-start-2 row-span-1 row-start-2 overflow-hidden rounded-lg bg-tblack shadow-sm ring-1 ring-border/40">
                    <div className="aspect-video h-full w-full">
                        <div className="h-full w-full">
                            <WinnerMiniVideo
                                uploadSrc={uploadSrc}
                                youtubeUrl={youtubeUrl}
                                brand={brand}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-start-4 row-start-2 self-center">
                    <FrameThumb src={images[6]} />
                </div>
                <div className="col-start-4 row-start-3 self-center">
                    <FrameThumb src={images[7]} />
                </div>

                <FrameThumb src={images[8]} />
                <FrameThumb src={images[9]} />
                {/* <FrameThumb src={images[0]} /> */}
                {/* <FrameThumb src={images[1]} /> */}
            </div>
        </div>
    );
});

const JuryPrizeLaureate = memo(function JuryPrizeLaureate({
    laureate,
    year,
}) {
    const logoShowcase = isLogoLikeImage(
        laureate.showcaseSrc,
        laureate.brandPhoto,
    );

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-twhite ring-1 ring-border/60 sm:items-stretch">
            <div className="w-full shrink-0">
                <div className="relative  overflow-hidden bg-muted/40 sm:aspect-auto sm:h-full sm:min-h-[260px]">
                    <img
                        src={laureate.showcaseSrc}
                        alt=""
                        className={
                            logoShowcase
                                ? 'absolute inset-0 h-full w-full object-contain p-6 sm:p-8'
                                : 'absolute inset-0 h-full w-full object-cover'
                        }
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-center space-y-4 p-5 sm:space-y-5 sm:p-6 lg:p-8">
                <p className="text-[11px] font-bold tracking-[0.16em] text-beta-blue uppercase sm:text-xs">
                    <TransText
                        en={laureate.trophy?.en || 'Jury Prize'}
                        fr={laureate.trophy?.fr || 'Prix du Jury'}
                        ar={laureate.trophy?.ar || 'جائزة لجنة التحكيم'}
                    />
                    {year ? ` · ${year}` : ''}
                </p>

                <div>
                    <p className="text-[11px] font-bold tracking-[0.12em] text-beta-blue uppercase">
                        <TransText en="Brand" fr="Marque" ar="العلامة" />
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                        {laureate.brandPhoto ? (
                            <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-lg bg-muted/50 p-1.5">
                                <img
                                    src={laureate.brandPhoto}
                                    alt=""
                                    className="max-h-full max-w-full object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        ) : null}
                        <p className="text-lg font-extrabold text-tblack sm:text-xl">
                            {laureate.brand}
                        </p>
                    </div>
                </div>

                {(laureate.campaign?.en ||
                    laureate.campaign?.fr ||
                    laureate.campaign?.ar) && (
                    <p className="text-sm leading-relaxed text-tgray">
                        <span className="font-extrabold text-beta-blue">
                            <TransText
                                en="Campaign"
                                fr="Campagne"
                                ar="الحملة"
                            />
                            {' : '}
                        </span>
                        <TransText
                            en={laureate.campaign.en}
                            fr={laureate.campaign.fr}
                            ar={laureate.campaign.ar}
                        />
                    </p>
                )}

                {(laureate.agency?.en ||
                    laureate.agency?.fr ||
                    laureate.agency?.ar) && (
                    <div>
                        <p className="text-[11px] font-bold tracking-[0.12em] text-beta-blue uppercase">
                            <TransText
                                en="Agency"
                                fr="Agence"
                                ar="الوكالة"
                            />
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                            {laureate.agencyPhoto ? (
                                <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-muted/50 p-1">
                                    <img
                                        src={laureate.agencyPhoto}
                                        alt=""
                                        className="max-h-full max-w-full object-contain"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            ) : null}
                            <p className="text-base font-semibold text-tblack">
                                <TransText
                                    en={laureate.agency.en}
                                    fr={laureate.agency.fr}
                                    ar={laureate.agency.ar}
                                />
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
});

export default function TililaLaureatesSection() {
    const { editions = [] } = usePage().props;

    const edition = useMemo(() => lastFinishedEdition(editions), [editions]);

    const laureate = useMemo(
        () => (edition ? buildJuryPrizeLaureate(edition) : FALLBACK_LAUREATE),
        [edition],
    );

    const borderImages = useMemo(
        () =>
            edition
                ? borderGallerySrcs(edition)
                : Array(BORDER_IMAGE_COUNT).fill(FALLBACK_IMAGE),
        [edition],
    );

    const awardsUrl = edition?.id
        ? `/tilila/editions/${edition.id}`
        : '/tilila/archives';
    const year = edition?.year ?? '2025';

    return (
        <TililaSection id="laureates" className="bg-twhite">
            <TililaContainer>
                <div className="text-center">
                    <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                        <TransText
                            en="They won a Tilila Award"
                            fr="Ils ont remporté un Tilila Award"
                            ar="فازوا بجائزة تيليلا"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-blue/70"
                        aria-hidden
                    />
                </div>

                <div className="mt-10 grid items-stretch gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
                    <JuryPrizeLaureate laureate={laureate} year={year} />

                    <div className="flex w-full flex-col lg:max-w-none lg:justify-self-stretch">
                        <EditionMediaFrame
                            images={borderImages}
                            uploadSrc={laureate.videoUploadSrc}
                            youtubeUrl={laureate.videoYoutubeUrl}
                            brand={laureate.brand}
                        />

                        <div className="mt-5 text-center lg:mt-6">
                            <Link
                                href={awardsUrl}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-beta-blue bg-transparent px-5 py-3 text-[11px] font-bold tracking-[0.12em] text-beta-blue uppercase transition hover:bg-alpha-blue sm:text-xs"
                            >
                                <TransText
                                    en="Discover the awards list"
                                    fr="Découvrir le palmarès"
                                    ar="اكتشف قائمة الفائزين"
                                />
                                <ArrowRight className="size-4" aria-hidden />
                            </Link>
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
