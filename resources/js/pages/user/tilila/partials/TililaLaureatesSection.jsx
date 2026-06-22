import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Play, Quote } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaBtnGhost,
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const FALLBACK_IMAGE = '/assets/tilila/editions/edition-2025.png';
const THUMB_IMAGES = [
    '/assets/tilila/editions/edition-2024.png',
    '/assets/tilila/hero-7eme-edition.png',
    '/assets/tilila/editions/edition-2023.png',
];

function findFeaturedWinner(editions) {
    if (!Array.isArray(editions)) return null;
    for (const edition of editions) {
        const winners = edition?.winners;
        if (!Array.isArray(winners) || winners.length === 0) continue;
        const person = winners[0];
        return {
            person,
            editionYear: edition?.year,
            editionId: edition?.id,
        };
    }
    return null;
}

export default function TililaLaureatesSection() {
    const { editions = [], teaserVideoUrl } = usePage().props;
    const featured = findFeaturedWinner(editions);
    const photo = featured?.person?.photo_path
        ? `/storage/${featured.person.photo_path}`
        : FALLBACK_IMAGE;
    const quote =
        featured?.person?.bio?.fr ||
        featured?.person?.bio?.en ||
        'Une reconnaissance qui valorise notre engagement pour une publicité plus inclusive et représentative.';

    return (
        <TililaSection
            id="laureates"
            className="border-t border-border/60 bg-twhite"
        >
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

                <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className="overflow-hidden rounded-2xl border border-border/70 bg-beta-white shadow-sm">
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                                src={photo}
                                alt=""
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                            {featured?.editionYear ? (
                                <span className="absolute top-4 left-4 rounded-full bg-beta-blue px-3 py-1 text-xs font-bold text-twhite">
                                    {featured.editionYear}
                                </span>
                            ) : null}
                        </div>
                        <div className="p-6 sm:p-8">
                            <Quote
                                className="size-10 text-brand-light-purple"
                                aria-hidden
                            />
                            <p className="mt-4 text-sm leading-relaxed text-tgray italic sm:text-base">
                                {typeof quote === 'string' ? (
                                    quote
                                ) : (
                                    <TransText
                                        en={quote?.en}
                                        fr={quote?.fr}
                                        ar={quote?.ar}
                                    />
                                )}
                            </p>
                            {featured?.person?.full_name ? (
                                <p className="mt-4 text-sm font-extrabold text-beta-blue">
                                    {featured.person.full_name}
                                </p>
                            ) : null}
                            {teaserVideoUrl ? (
                                <a
                                    href={teaserVideoUrl}
                                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-beta-blue px-5 py-2.5 text-xs font-bold tracking-wide text-twhite uppercase transition hover:bg-brand-light-purple"
                                >
                                    <Play className="size-4" aria-hidden />
                                    <TransText
                                        en="Watch video"
                                        fr="Voir la vidéo"
                                        ar="شاهد الفيديو"
                                    />
                                </a>
                            ) : null}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                        {[
                            {
                                labelFr: 'Photos',
                                labelEn: 'Photos',
                                labelAr: 'صور',
                                src: THUMB_IMAGES[0],
                                href: '/tilila/archives',
                            },
                            {
                                labelFr: 'Vidéos',
                                labelEn: 'Videos',
                                labelAr: 'فيديوهات',
                                src: THUMB_IMAGES[1],
                                href: teaserVideoUrl || '/tilila/archives',
                                play: true,
                            },
                            {
                                labelFr: 'Campagnes primées',
                                labelEn: 'Awarded campaigns',
                                labelAr: 'حملات فائزة',
                                src: THUMB_IMAGES[2],
                                href: '/tilila/archives',
                            },
                        ].map((item) => (
                            <Link
                                key={item.labelEn}
                                href={item.href}
                                className="group relative overflow-hidden rounded-xl"
                            >
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img
                                        src={item.src}
                                        alt=""
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />
                                    {item.play ? (
                                        <span className="absolute inset-0 flex items-center justify-center bg-tblack/30">
                                            <span className="flex size-12 items-center justify-center rounded-full border-2 border-twhite bg-twhite/20">
                                                <Play
                                                    className="ms-0.5 size-5 fill-twhite text-twhite"
                                                    aria-hidden
                                                />
                                            </span>
                                        </span>
                                    ) : null}
                                </div>
                                <p className="mt-2 text-center text-xs font-bold tracking-wide text-beta-blue uppercase">
                                    <TransText
                                        en={item.labelEn}
                                        fr={item.labelFr}
                                        ar={item.labelAr}
                                    />
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <TililaBtnGhost href="/tilila/archives">
                        <TransText
                            en="Discover the awards list"
                            fr="Découvrir le palmarès"
                            ar="اكتشف قائمة الفائزين"
                        />
                    </TililaBtnGhost>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
