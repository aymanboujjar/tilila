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

const MOSAIC_LAYOUT = [
    'col-span-1 row-span-2 min-h-[220px] sm:min-h-[280px]',
    'col-span-1 row-span-1 min-h-[130px]',
    'col-span-1 row-span-1 min-h-[130px]',
    'col-span-1 row-span-1 min-h-[130px]',
    'col-span-1 row-span-1 min-h-[130px]',
];

export default function ActualitesGallerySection({ images = [] }) {
    const list = (images.length ? images : FALLBACK_GALLERY).slice(0, 5);

    return (
        <div className="flex h-full flex-col">
            <ActualitesSectionHeading>
                <TransText fr="En images" en="In pictures" ar="بالصور" />
            </ActualitesSectionHeading>

            <p className="mt-3 text-sm leading-relaxed text-tgray">
                <TransText
                    fr="Photos & vidéos : revivez les temps forts des Tilila Awards et de Tililab à travers une sélection de photos et vidéos."
                    en="Photos & videos: relive Tilila Awards and Tililab highlights through a selection of photos and videos."
                    ar="صور وفيديوهات: استرجعوا أبرز لحظات تيليلا أووردز وتيليلاب عبر مجموعة من الصور والفيديوهات."
                />
            </p>

            <div className="mt-5 grid flex-1 grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3 lg:grid-rows-2">
                {list.map((src, index) => (
                    <div
                        key={`${src}-${index}`}
                        className={`overflow-hidden rounded-xl border border-border/40 bg-beta-white shadow-sm ${MOSAIC_LAYOUT[index] ?? 'min-h-[120px]'}`}
                    >
                        <img
                            src={src}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            <Link
                href="/tilila/archives"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple sm:w-auto"
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
