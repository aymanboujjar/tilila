import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { memo, useMemo } from 'react';
import TransText from '@/components/TransText';
import { useYoutubeAvailability } from '@/hooks/useYoutubeAvailability';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';
import { coverImageSrc } from '@/pages/user/tilila/utils/editions';
import {
    findJuryPrizeWinner,
    resolveShowcaseImage,
    resolveWinnerDisplay,
    resolveWinnerVideo,
    storageAssetSrc,
} from '@/pages/user/tilila/utils/winnerFields';

const FALLBACK_IMAGE = '/assets/tilila/editions/edition-2025.png';

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

function isLogoLikeImage(src, brandPhoto) {
    if (!src) {
        return false;
    }

    if (brandPhoto && src === brandPhoto) {
        return true;
    }

    return /\/winners\//.test(src) && !/\/showcase\//.test(src);
}

const LOGO_FRAME_CLASS =
    'flex h-[4.5rem] w-[7.5rem] shrink-0 items-center justify-center rounded-xl bg-muted/50 p-2 sm:h-20 sm:w-36 sm:p-2.5';

function LaureateLogo({ src }) {
    if (!src) {
        return null;
    }

    return (
        <div className={LOGO_FRAME_CLASS}>
            <img
                src={src}
                alt=""
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                decoding="async"
            />
        </div>
    );
}

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
                loop
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

const LaureateVideo = memo(function LaureateVideo({
    uploadSrc,
    youtubeUrl,
    brand,
}) {
    return (
        <div className="overflow-hidden rounded-2xl bg-tblack shadow-sm ring-1 ring-border/50">
            <div className="aspect-video w-full">
                <WinnerMiniVideo
                    uploadSrc={uploadSrc}
                    youtubeUrl={youtubeUrl}
                    brand={brand}
                />
            </div>
        </div>
    );
});

const JuryPrizeLaureate = memo(function JuryPrizeLaureate({ laureate, year }) {
    const logoShowcase = isLogoLikeImage(
        laureate.showcaseSrc,
        laureate.brandPhoto,
    );

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-twhite ring-1 ring-border/60 sm:items-stretch">
            <div className="w-full shrink-0">
                <div className="relative aspect-[16/10] max-h-[300px] overflow-hidden bg-muted/40 sm:aspect-[16/9] sm:max-h-[320px]">
                    <img
                        src={laureate.showcaseSrc}
                        alt=""
                        className={
                            logoShowcase
                                ? 'absolute inset-0 h-full w-full object-contain object-top px-6 pt-3 pb-8 sm:px-8 sm:pt-4 sm:pb-10'
                                : 'absolute inset-0 h-full w-full object-cover object-top'
                        }
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-center space-y-4 p-5 sm:space-y-5 sm:p-6 lg:p-8">
                <p className="text-[18px] font-bold tracking-[0.16em] text-beta-blue uppercase">
                    <TransText
                        en={laureate.trophy?.en || 'Jury Prize'}
                        fr={laureate.trophy?.fr || 'Prix du Jury'}
                        ar={laureate.trophy?.ar || 'جائزة لجنة التحكيم'}
                    />
                    {year ? ` · ${year}` : ''}
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                    <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold tracking-[0.12em] text-beta-blue uppercase">
                            <TransText en="Brand" fr="Marque" ar="العلامة" />
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                            <LaureateLogo src={laureate.brandPhoto} />
                            <p className="text-lg font-extrabold text-tblack sm:text-xl">
                                {laureate.brand}
                            </p>
                        </div>
                    </div>

                    {(laureate.agency?.en ||
                        laureate.agency?.fr ||
                        laureate.agency?.ar) && (
                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold tracking-[0.12em] text-beta-blue uppercase">
                                <TransText
                                    en="Agency"
                                    fr="Agence"
                                    ar="الوكالة"
                                />
                            </p>
                            <div className="mt-2 flex items-center gap-3">
                                <LaureateLogo src={laureate.agencyPhoto} />
                                <p className="text-base font-semibold text-tblack sm:text-lg">
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
                            en="They won a Tilila Award 2025"
                            fr="Ils ont remporté un Tilila Award 2025"
                            ar="فازوا بجائزة تيليلا 2025"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-blue/70"
                        aria-hidden
                    />
                </div>

                <div className="mt-10 grid items-stretch gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
                    <JuryPrizeLaureate laureate={laureate} year={year} />

                    <div className="flex w-full flex-col lg:max-w-none lg:justify-self-stretch">
                        <LaureateVideo
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
