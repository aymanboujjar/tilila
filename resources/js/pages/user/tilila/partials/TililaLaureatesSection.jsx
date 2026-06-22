import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Play, Quote } from 'lucide-react';
import { useMemo, useState } from 'react';
import TransText from '@/components/TransText';
import { TililaContainer, TililaSection } from '@/pages/user/tilila/partials/TililaUi';
import { coverImageSrc } from '@/pages/user/tilila/utils/editions';

const FALLBACK_IMAGE = '/assets/tilila/editions/edition-2025.png';

const DEFAULT_QUOTE = {
    fr: "Recevoir un Tilila Award a été une formidable reconnaissance de notre engagement en faveur d'une communication plus inclusive.",
    en: 'Receiving a Tilila Award was tremendous recognition of our commitment to more inclusive communication.',
    ar: 'كان الفوز بجائزة تيليلا اعترافاً رائعاً بالتزامنا نحو تواصل أكثر شمولاً.',
};

const FALLBACK_SLIDES = [
    {
        id: 'fallback-inwi',
        photo: FALLBACK_IMAGE,
        quote: DEFAULT_QUOTE,
        brand: 'Inwi',
        campaign: {
            fr: '« Dirha Raybi inwi »',
            en: '« Dirha Raybi inwi »',
            ar: '« Dirha Raybi inwi »',
        },
        videoUrl: null,
    },
];

const MEDIA_ITEMS = [
    {
        labelFr: 'Photos',
        labelEn: 'Photos',
        labelAr: 'صور',
        src: '/assets/tilila/editions/edition-2024.png',
        href: '/tilila/archives',
    },
    {
        labelFr: 'Vidéos',
        labelEn: 'Videos',
        labelAr: 'فيديوهات',
        src: '/assets/tilila/hero-7eme-edition.png',
        href: null,
        play: true,
    },
    {
        labelFr: 'Campagnes primées',
        labelEn: 'Awarded campaigns',
        labelAr: 'حملات فائزة',
        src: '/assets/tilila/trophee-tilila.png',
        href: '/tilila/archives',
    },
];

function winnerPhoto(winner, editionPhoto) {
    if (!winner?.photo_path) {
        return editionPhoto;
    }

    if (
        winner.photo_path.startsWith('assets/') ||
        winner.photo_path.startsWith('/assets/')
    ) {
        return winner.photo_path.startsWith('/')
            ? winner.photo_path
            : `/${winner.photo_path}`;
    }

    return `/storage/${winner.photo_path}`;
}

function buildSlides(editions, teaserVideoUrl) {
    const slides = [];

    if (Array.isArray(editions)) {
        for (const edition of editions) {
            const winners = edition?.winners;
            if (!Array.isArray(winners) || winners.length === 0) {
                continue;
            }

            const editionPhoto =
                coverImageSrc(
                    edition.cover_image_path,
                    edition.gallery_images,
                ) || FALLBACK_IMAGE;
            const videoUrl =
                edition.ceremony_video_url || teaserVideoUrl || null;

            for (const winner of winners) {
                slides.push({
                    id: `${edition.id ?? edition.year}-${winner.full_name}`,
                    photo: winnerPhoto(winner, editionPhoto),
                    quote: DEFAULT_QUOTE,
                    brand: winner.full_name || '',
                    campaign: winner.bio ?? { fr: '', en: '', ar: '' },
                    videoUrl,
                });
            }
        }
    }

    return slides.length > 0 ? slides.slice(0, 8) : FALLBACK_SLIDES;
}

function MetaLine({ label, children }) {
    return (
        <p className="text-sm leading-relaxed text-tblack">
            <span className="font-extrabold text-beta-blue">
                <TransText en={label.en} fr={label.fr} ar={label.ar} />
                {' : '}
            </span>
            <span>{children}</span>
        </p>
    );
}

function FeaturedLaureate({ slide }) {
    return (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
            <div className="w-full shrink-0 sm:w-[44%] lg:w-[46%]">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                        src={slide.photo}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>

            <div className="min-w-0 flex-1 pt-0 sm:pt-1">
                <Quote
                    className="size-8 text-brand-light-purple sm:size-9"
                    aria-hidden
                />
                <p className="mt-3 text-sm leading-relaxed text-tgray sm:text-[15px]">
                    <TransText
                        en={slide.quote.en}
                        fr={slide.quote.fr}
                        ar={slide.quote.ar}
                    />
                </p>

                {slide.brand ? (
                    <div className="mt-5 space-y-1">
                        <MetaLine
                            label={{
                                fr: 'Marque',
                                en: 'Brand',
                                ar: 'العلامة',
                            }}
                        >
                            {slide.brand}
                        </MetaLine>
                        <MetaLine
                            label={{
                                fr: 'Campagne',
                                en: 'Campaign',
                                ar: 'الحملة',
                            }}
                        >
                            {typeof slide.campaign === 'string' ? (
                                slide.campaign
                            ) : (
                                <TransText
                                    en={slide.campaign.en}
                                    fr={slide.campaign.fr}
                                    ar={slide.campaign.ar}
                                />
                            )}
                        </MetaLine>
                    </div>
                ) : null}

                {slide.videoUrl ? (
                    <a
                        href={slide.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-beta-blue px-5 py-2.5 text-xs font-bold tracking-[0.1em] text-twhite uppercase transition hover:bg-brand-light-purple"
                    >
                        <TransText
                            en="Watch video"
                            fr="Voir la vidéo"
                            ar="شاهد الفيديو"
                        />
                        <Play className="size-4 fill-twhite" aria-hidden />
                    </a>
                ) : null}
            </div>
        </div>
    );
}

function MediaCard({ item, videoHref }) {
    const href = item.play ? videoHref || '/tilila/archives' : item.href;

    return (
        <Link href={href} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                    src={item.src}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                />
                {item.play ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-tblack/25">
                        <span className="flex size-11 items-center justify-center rounded-full border-2 border-twhite bg-twhite/20">
                            <Play
                                className="ms-0.5 size-5 fill-twhite text-twhite"
                                aria-hidden
                            />
                        </span>
                    </span>
                ) : null}
            </div>
            <p className="mt-2.5 text-center text-[10px] font-bold tracking-wide text-beta-blue uppercase sm:text-[11px]">
                <TransText
                    en={item.labelEn}
                    fr={item.labelFr}
                    ar={item.labelAr}
                />
            </p>
        </Link>
    );
}

export default function TililaLaureatesSection() {
    const { editions = [], teaserVideoUrl } = usePage().props;
    const slides = useMemo(
        () => buildSlides(editions, teaserVideoUrl),
        [editions, teaserVideoUrl],
    );
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSlide = slides[activeIndex] ?? slides[0];

    const mediaItems = useMemo(
        () =>
            MEDIA_ITEMS.map((item) =>
                item.play ? { ...item, href: teaserVideoUrl } : item,
            ),
        [teaserVideoUrl],
    );

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

                <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-8 xl:gap-10">
                    <div>
                        <FeaturedLaureate slide={activeSlide} />

                        {slides.length > 1 ? (
                            <div className="mt-5 flex justify-center gap-2 sm:justify-start sm:ps-[2%]">
                                {slides.map((slide, index) => (
                                    <button
                                        key={slide.id}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className={`size-2.5 rounded-full transition ${
                                            index === activeIndex
                                                ? 'bg-beta-blue'
                                                : 'bg-border hover:bg-beta-blue/40'
                                        }`}
                                        aria-label={`Laureate ${index + 1}`}
                                        aria-current={
                                            index === activeIndex
                                                ? 'true'
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <div className="flex flex-col">
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            {mediaItems.map((item) => (
                                <MediaCard
                                    key={item.labelEn}
                                    item={item}
                                    videoHref={teaserVideoUrl}
                                />
                            ))}
                        </div>

                        <div className="mt-6 text-center lg:mt-8">
                            <Link
                                href="/tilila/archives"
                                className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-lg border-2 border-beta-blue bg-transparent px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-beta-blue uppercase transition hover:bg-alpha-blue"
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
