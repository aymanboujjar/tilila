import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import TransText from '@/components/TransText';
import ActualitesSectionHeading from '@/pages/user/actualites/partials/ActualitesSectionHeading';

const FALLBACK_GALLERY = [
    '/assets/tilila/hero-7eme-edition.png',
    '/assets/tilila/editions/edition-2025.png',
    '/assets/tilila/editions/edition-2024.png',
    '/assets/tililab/tililab1.jpg',
    '/assets/tilila/trophee-tilila.png',
];

function GalleryCell({ src, className = '' }) {
    return (
        <div
            className={`h-full min-h-0 overflow-hidden rounded-xl border border-border/30 bg-beta-white shadow-sm ${className}`}
        >
            <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
            />
        </div>
    );
}

export default function ActualitesGallerySection({ images = [] }) {
    const pool = images.length ? images : FALLBACK_GALLERY;
    const list = Array.from({ length: 5 }, (_, index) => pool[index % pool.length]);

    return (
        <div className="flex h-full min-h-0 flex-col lg:min-h-[460px]">
            <ActualitesSectionHeading>
                <TransText fr="En images" en="In pictures" ar="بالصور" />
            </ActualitesSectionHeading>

            <p className="mt-3 text-sm leading-relaxed text-tgray lg:text-[15px]">
                <TransText
                    fr="Photos & vidéos : revivez les temps forts des Tilila Awards et de Tililab à travers une sélection de photos et vidéos."
                    en="Photos & videos: relive Tilila Awards and Tililab highlights through a selection of photos and videos."
                    ar="صور وفيديوهات: استرجعوا أبرز لحظات تيليلا أووردز وتيليلاب عبر مجموعة من الصور والفيديوهات."
                />
            </p>

            <div className="mt-5 grid min-h-[220px] flex-1 grid-cols-3 grid-rows-2 gap-2.5 sm:min-h-[260px] sm:gap-3 lg:min-h-0">
                <GalleryCell src={list[0]} className="row-span-2" />
                <GalleryCell src={list[1]} />
                <GalleryCell src={list[2]} />
                <GalleryCell src={list[3]} />
                <GalleryCell src={list[4]} />
            </div>

            <Link
                href="/tilila/archives"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple sm:mt-6"
            >
                <TransText
                    fr="Voir la galerie"
                    en="View gallery"
                    ar="عرض المعرض"
                />
                <ArrowRight className="size-4" aria-hidden />
            </Link>
        </div>
    );
}
