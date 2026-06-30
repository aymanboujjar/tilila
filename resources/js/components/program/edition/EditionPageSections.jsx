import { Award, Gavel, Play } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import TransText from '@/components/TransText';
import { StaggerItem, StaggerReveal } from '@/components/motion/home-motion';
import EditionInfiniteMarquee from '@/components/program/edition/EditionInfiniteMarquee';
import {
    EditionMotionSection,
    MotionCard,
} from '@/components/program/edition/EditionPageMotion';
import { withYoutubeAutoplay } from '@/lib/youtubeEmbed';
import { useYoutubeAvailability } from '@/hooks/useYoutubeAvailability';
import ArchivesBootcampSection, {
    EditionBootcampSchedule,
} from '@/pages/user/tilila/archives/components/ArchivesBootcampSection';
import ArchivesMediaCarousel, {
    ArchivesPhotoSlide,
} from '@/pages/user/tilila/archives/components/ArchivesMediaCarousel';
import ArchivesSectionHeading from '@/pages/user/tilila/archives/components/ArchivesSectionHeading';
import { TililaIconBadge } from '@/pages/user/tilila/partials/TililaUi';
import {
    resolveShowcaseImage,
    resolveWinnerDisplay,
    resolveWinnerVideo,
    storageAssetSrc,
} from '@/pages/user/tilila/utils/winnerFields';

function textFor(obj, locale) {
    return obj?.[locale] || obj?.fr || obj?.en || obj?.ar || '';
}

const CARD_CLASS =
    'h-full overflow-hidden rounded-2xl border border-border/50 bg-twhite shadow-[0_4px_24px_rgba(68,25,168,0.08)]';

function PersonPortrait({ path, alt }) {
    const src = storageAssetSrc(path);
    if (!src) return null;

    return (
        <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
        />
    );
}

const PALMARES_CARD_CLASS =
    'overflow-hidden rounded-2xl border border-border/40 bg-twhite shadow-[0_8px_30px_rgba(26,35,126,0.08)]';

const LOGO_BOX_CLASS =
    'flex h-16 w-full items-center justify-center rounded-xl border border-border/50 bg-twhite p-3 sm:h-20 sm:p-4';

function LaureateLogo({ src, alt = '' }) {
    if (!src) {
        return null;
    }

    return (
        <div className={LOGO_BOX_CLASS}>
            <img
                src={src}
                alt={alt}
                className="max-h-12 max-w-full object-contain object-center sm:max-h-14"
                loading="lazy"
                decoding="async"
            />
        </div>
    );
}

function WinnerLogoColumn({ label, logoSrc, fallbackName }) {
    return (
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="text-[10px] font-extrabold tracking-[0.14em] text-beta-blue uppercase">
                {label}
            </div>
            {logoSrc ? (
                <LaureateLogo src={logoSrc} alt={fallbackName || ''} />
            ) : (
                <div className="flex h-16 items-center sm:h-20">
                    <p className="line-clamp-2 text-sm leading-snug font-bold text-tblack">
                        {fallbackName || '—'}
                    </p>
                </div>
            )}
        </div>
    );
}

function isCeremonyPhoto(src, brandPhoto) {
    if (!src) {
        return false;
    }

    if (brandPhoto && src === brandPhoto) {
        return false;
    }

    return !/\/winners\//.test(src) || /\/showcase\//.test(src);
}

function VideoCoverPlay({ posterSrc, onPlay, brand }) {
    return (
        <button
            type="button"
            onClick={onPlay}
            className="group relative h-full w-full overflow-hidden"
            aria-label={
                brand ? `Play ${brand} campaign video` : 'Play winner video'
            }
        >
            {posterSrc ? (
                <img
                    src={posterSrc}
                    alt=""
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                />
            ) : (
                <div className="h-full w-full bg-[#0a1028]" />
            )}
            <span className="absolute inset-0 bg-[#1a237e]/20 transition group-hover:bg-[#1a237e]/30" />
            <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-14 items-center justify-center rounded-full border border-twhite/30 bg-twhite/95 text-beta-blue shadow-lg transition group-hover:scale-105">
                    <Play className="size-6 fill-beta-blue" aria-hidden />
                </span>
            </span>
        </button>
    );
}

const WinnerMiniVideo = memo(function WinnerMiniVideo({
    uploadSrc,
    youtubeUrl,
    brand,
    posterSrc = '',
}) {
    const [started, setStarted] = useState(false);
    const videoRef = useRef(null);
    const youtube = useYoutubeAvailability(youtubeUrl);
    const embedUrl = youtube.available ? youtube.embedUrl : null;

    useEffect(() => {
        if (!started || !uploadSrc || !videoRef.current) {
            return;
        }

        videoRef.current.play().catch(() => {});
    }, [started, uploadSrc]);

    if (uploadSrc) {
        if (!started) {
            return (
                <VideoCoverPlay
                    posterSrc={posterSrc}
                    brand={brand}
                    onPlay={() => setStarted(true)}
                />
            );
        }

        return (
            <video
                ref={videoRef}
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="auto"
                title={brand ? `${brand} — campaign video` : 'Winner video'}
            >
                <source src={uploadSrc} />
            </video>
        );
    }

    if (embedUrl) {
        if (!started) {
            return (
                <VideoCoverPlay
                    posterSrc={posterSrc}
                    brand={brand}
                    onPlay={() => setStarted(true)}
                />
            );
        }

        return (
            <iframe
                title={brand ? `${brand} — campaign video` : 'Winner video'}
                src={withYoutubeAutoplay(embedUrl) ?? embedUrl}
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
                className="relative flex h-full items-center justify-center bg-[#0a1028] px-4 text-center text-xs font-bold tracking-wide text-twhite/80 uppercase transition hover:text-twhite"
            >
                {posterSrc ? (
                    <img
                        src={posterSrc}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-40"
                        loading="lazy"
                    />
                ) : null}
                <span className="relative z-10">
                    <TransText
                        en="Watch video"
                        fr="Voir la vidéo"
                        ar="شاهد الفيديو"
                    />
                </span>
            </a>
        );
    }

    if (posterSrc) {
        return (
            <img
                src={posterSrc}
                alt=""
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
            />
        );
    }

    return (
        <div className="flex h-full items-center justify-center bg-[#0a1028] px-4">
            <p className="text-center text-xs text-twhite/35">
                <TransText
                    en="Winner video coming soon"
                    fr="Vidéo du lauréat bientôt disponible"
                    ar="فيديو الفائز قريباً"
                />
            </p>
        </div>
    );
});

function resolveWinnerShowcasePhoto(winner, edition, brandPhoto) {
    const showcase = resolveShowcaseImage(winner, edition, '');

    if (isCeremonyPhoto(showcase, brandPhoto)) {
        return showcase;
    }

    const cover = storageAssetSrc(edition?.cover_image_path);

    if (cover) {
        return cover;
    }

    const galleryPath = edition?.gallery_images?.[0];

    if (galleryPath) {
        return storageAssetSrc(galleryPath);
    }

    return '';
}

function WinnerCardMeta({
    trophy,
    brandPhoto,
    agencyPhoto,
    agencyName,
    winnerName,
    campaignText,
    bio,
    hasCampaign,
    hasAgency,
}) {
    return (
        <div className="flex flex-col gap-3 border-t border-border/30 p-4 sm:gap-3.5 sm:p-5">
            {trophy ? (
                <p className="text-[11px] font-extrabold tracking-[0.12em] text-beta-blue uppercase">
                    {trophy}
                </p>
            ) : null}

            <div className="flex gap-3 sm:gap-4">
                <WinnerLogoColumn
                    label={<TransText en="Laureate" fr="Lauréat" ar="الفائز" />}
                    logoSrc={brandPhoto}
                    fallbackName={winnerName}
                />
                <WinnerLogoColumn
                    label={<TransText en="Agency" fr="Agence" ar="الوكالة" />}
                    logoSrc={agencyPhoto}
                    fallbackName={agencyName}
                />
            </div>

            {hasCampaign ? (
                <p className="line-clamp-2 text-sm leading-relaxed text-tblack">
                    <span className="font-extrabold text-beta-blue">
                        <TransText en="Campaign" fr="Campagne" ar="الحملة" />
                        {': '}
                    </span>
                    {campaignText}
                </p>
            ) : null}

            {!hasCampaign && !hasAgency && bio ? (
                <p className="line-clamp-2 text-sm leading-relaxed text-tgray">
                    {bio}
                </p>
            ) : null}
        </div>
    );
}

function WinnerCard({ winner, locale, edition }) {
    const { campaign, agency, agencyPhoto } = resolveWinnerDisplay(winner);
    const { uploadSrc, youtubeUrl } = resolveWinnerVideo(winner);
    const trophy = textFor(winner.trophy, locale);
    const bio = textFor(winner.bio, locale);
    const hasCampaign = Boolean(textFor(campaign, locale));
    const hasAgency = Boolean(textFor(agency, locale));
    const brandPhoto = storageAssetSrc(winner.photo_path);
    const posterSrc = resolveWinnerShowcasePhoto(winner, edition, brandPhoto);

    return (
        <article className={`${PALMARES_CARD_CLASS} flex flex-col`}>
            <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-[#0a1028]">
                <WinnerMiniVideo
                    uploadSrc={uploadSrc}
                    youtubeUrl={youtubeUrl}
                    brand={winner.full_name}
                    posterSrc={posterSrc}
                />
            </div>

            <WinnerCardMeta
                trophy={trophy}
                brandPhoto={brandPhoto}
                agencyPhoto={agencyPhoto}
                agencyName={textFor(agency, locale)}
                winnerName={winner.full_name}
                campaignText={textFor(campaign, locale)}
                bio={bio}
                hasCampaign={hasCampaign}
                hasAgency={hasAgency}
            />
        </article>
    );
}

function JuryCarouselCard({ member, locale }) {
    const role = textFor(member.bio, locale);
    const photoSrc = storageAssetSrc(member.photo_path);

    return (
        <MotionCard className={`${CARD_CLASS} group`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-alpha-blue/30">
                {photoSrc ? (
                    <PersonPortrait
                        path={member.photo_path}
                        alt={member.full_name}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <TililaIconBadge icon={Gavel} className="size-12" />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h3 className="text-base font-extrabold text-tblack">
                    {member.full_name}
                </h3>
                {role ? (
                    <p className="line-clamp-4 text-sm leading-relaxed text-tgray">
                        {role}
                    </p>
                ) : null}
            </div>
        </MotionCard>
    );
}

function EmptyState({ children }) {
    return (
        <p className="mt-8 rounded-2xl border border-dashed border-beta-blue/25 bg-beta-white px-6 py-12 text-center text-sm leading-relaxed text-tgray">
            {children}
        </p>
    );
}

export function EditionPageWinnersSection({
    winners = [],
    edition,
    locale,
    isCurrent,
    pendingMessage,
}) {
    const heading = (
        <ArchivesSectionHeading
            kicker={<TransText en="Palmarès" fr="Palmarès" ar="الجوائز" />}
            title={
                isCurrent ? (
                    <TransText en="To be announced" fr="À venir" ar="قريبًا" />
                ) : (
                    <TransText
                        en="Edition laureates"
                        fr="Lauréats de l'édition"
                        ar="فائزو الدورة"
                    />
                )
            }
        />
    );

    if (isCurrent || !winners.length) {
        return (
            <EditionMotionSection id="winners">
                {heading}
                <EmptyState>
                    <TransText
                        en={pendingMessage.en}
                        fr={pendingMessage.fr}
                        ar={pendingMessage.ar}
                    />
                </EmptyState>
            </EditionMotionSection>
        );
    }

    return (
        <EditionMotionSection id="winners">
            {heading}
            <div className="mt-8">
                <ArchivesMediaCarousel
                    ariaLabel="Edition laureates"
                    slideClassName="w-full shrink-0 snap-start sm:w-[min(100%,540px)] lg:w-[calc(50%-0.625rem)]"
                    trackGapClassName="gap-5"
                    showFade={winners.length > 1}
                    autoAdvanceMs={0}
                >
                    {winners.map((winner, index) => (
                        <WinnerCard
                            key={`${winner.full_name}-${index}`}
                            winner={winner}
                            locale={locale}
                            edition={edition}
                        />
                    ))}
                </ArchivesMediaCarousel>
            </div>
        </EditionMotionSection>
    );
}

export function EditionPageJurySection({ jury = [], locale }) {
    const heading = (
        <ArchivesSectionHeading
            kicker={<TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />}
            title={
                <TransText
                    en="Jury members"
                    fr="Membres du jury"
                    ar="أعضاء لجنة التحكيم"
                />
            }
        />
    );

    if (!jury.length) {
        return (
            <EditionMotionSection id="jury">
                {heading}
                <EmptyState>
                    <TransText
                        en="Jury members for this edition will be published soon."
                        fr="Les membres du jury de cette édition seront publiés prochainement."
                        ar="سيُنشر أعضاء لجنة التحكيم لهذه الدورة قريبًا."
                    />
                </EmptyState>
            </EditionMotionSection>
        );
    }

    return (
        <EditionMotionSection id="jury">
            {heading}
            <div className="mt-8">
                <EditionInfiniteMarquee
                    items={jury}
                    ariaLabel="Edition jury"
                    slideClassName="w-[15.5rem] shrink-0 sm:w-[16.5rem]"
                    minItems={6}
                    durationMultiplier={5}
                    renderItem={(member) => (
                        <JuryCarouselCard member={member} locale={locale} />
                    )}
                />
            </div>
        </EditionMotionSection>
    );
}

export function EditionPageBootcampSection({ bootcamp, locale }) {
    if (!bootcamp || typeof bootcamp !== 'object') {
        return null;
    }

    return (
        <EditionMotionSection id="bootcamp">
            <ArchivesSectionHeading
                kicker={<TransText en="Bootcamp" fr="Bootcamp" ar="المعسكر" />}
                title={
                    <TransText en="Programme" fr="Programme" ar="البرنامج" />
                }
            />
            <div className="-mx-1 mt-8 sm:mx-0">
                <EditionBootcampSchedule bootcamp={bootcamp} locale={locale} />
            </div>
        </EditionMotionSection>
    );
}

export function EditionPageGallerySection({ images = [], galleryTitle }) {
    const rows = Array.isArray(images) ? images : [];

    if (!rows.length) {
        return (
            <EditionMotionSection id="gallery">
                <ArchivesSectionHeading
                    kicker={<TransText en="Gallery" fr="Galerie" ar="المعرض" />}
                    title={
                        <TransText
                            en={galleryTitle.en}
                            fr={galleryTitle.fr}
                            ar={galleryTitle.ar}
                        />
                    }
                />
                <EmptyState>
                    <TransText
                        en="No photos published for this edition yet."
                        fr="Aucune photo publiée pour cette édition."
                        ar="لا توجد صور منشورة لهذه الدورة بعد."
                    />
                </EmptyState>
            </EditionMotionSection>
        );
    }

    return (
        <EditionMotionSection id="gallery">
            <ArchivesSectionHeading
                kicker={<TransText en="Gallery" fr="Galerie" ar="المعرض" />}
                title={
                    <TransText
                        en={galleryTitle.en}
                        fr={galleryTitle.fr}
                        ar={galleryTitle.ar}
                    />
                }
            />
            <div className="mt-8">
                <EditionInfiniteMarquee
                    items={rows}
                    ariaLabel="Edition gallery"
                    slideClassName="w-[18rem] shrink-0 sm:w-[22rem] lg:w-[26rem]"
                    minItems={5}
                    durationMultiplier={6}
                    renderItem={(path) => (
                        <ArchivesPhotoSlide
                            src={storageAssetSrc(path)}
                            href={storageAssetSrc(path)}
                            className="shadow-[0_8px_32px_rgba(68,25,168,0.1)]"
                        />
                    )}
                />
            </div>
        </EditionMotionSection>
    );
}

export function EditionPageCeremonyVideoSection({ videoUrl, embedUrl, year }) {
    if (!embedUrl) {
        return null;
    }

    return (
        <EditionMotionSection id="video">
            <ArchivesSectionHeading
                kicker={<TransText en="Media" fr="Médias" ar="الوسائط" />}
                title={
                    <TransText
                        en="Ceremony video"
                        fr="Vidéo de cérémonie"
                        ar="فيديو الحفل"
                    />
                }
            />
            <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-tblack shadow-lg">
                <div className="aspect-video">
                    <iframe
                        title={`Ceremony ${year ?? ''}`}
                        src={embedUrl}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>
            {videoUrl && !videoUrl.includes('youtube') ? (
                <p className="mt-4 text-center">
                    <a
                        href={videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-beta-blue hover:underline"
                    >
                        <TransText
                            en="Open video in a new tab"
                            fr="Ouvrir la vidéo dans un nouvel onglet"
                            ar="فتح الفيديو في علامة تبويب جديدة"
                        />
                    </a>
                </p>
            ) : null}
        </EditionMotionSection>
    );
}
