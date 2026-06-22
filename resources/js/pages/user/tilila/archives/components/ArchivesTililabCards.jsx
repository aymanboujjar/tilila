import { Camera, Play, Trophy } from 'lucide-react';
import TransText from '@/components/TransText';

const CARDS = [
    {
        id: 'laureats',
        icon: Trophy,
        title: {
            fr: 'Tililab Lauréats',
            en: 'Tililab Winners',
            ar: 'فائزو تيليلاب',
        },
        description: {
            fr: 'Découvrez les lauréats de chaque édition Tililab et leurs projets engagés.',
            en: 'Discover Tililab winners from each edition and their committed projects.',
            ar: 'اكتشفوا فائزي كل دورة من تيليلاب ومشاريعهم الملتزمة.',
        },
        cta: {
            fr: 'Voir les lauréats',
            en: 'See winners',
            ar: 'عرض الفائزين',
        },
        sectionId: 'laureats',
        program: 'tililab',
    },
    {
        id: 'projets',
        icon: Play,
        title: {
            fr: 'Projets réalisés',
            en: 'Completed projects',
            ar: 'المشاريع المنجزة',
        },
        description: {
            fr: 'Retrouvez les vidéos des projets produits lors des bootcamps Tililab.',
            en: 'Watch videos of projects produced during Tililab bootcamps.',
            ar: 'شاهدوا فيديوهات المشاريع المنجزة خلال معسكرات تيليلاب.',
        },
        cta: {
            fr: 'Voir les projets',
            en: 'See projects',
            ar: 'عرض المشاريع',
        },
        sectionId: 'galerie',
        program: 'tililab',
        galleryFilter: 'videos',
    },
    {
        id: 'bootcamp',
        icon: Camera,
        title: {
            fr: 'Best-of Bootcamps',
            en: 'Best-of Bootcamps',
            ar: 'أفضل لحظات المعسكرات',
        },
        description: {
            fr: 'Photos et vidéos des moments forts des bootcamps Tililab.',
            en: 'Photos and videos from Tililab bootcamp highlights.',
            ar: 'صور وفيديوهات من أبرز لحظات معسكرات تيليلاب.',
        },
        cta: {
            fr: 'Découvrir',
            en: 'Discover',
            ar: 'اكتشف',
        },
        sectionId: 'galerie',
        program: 'tililab',
        galleryFilter: 'all',
    },
];

export default function ArchivesTililabCards({ onNavigate }) {
    return (
        <section className="border-t border-border/40 bg-[#f5f6f8] py-12 sm:py-14">
            <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-6 lg:px-8">
                {CARDS.map((card) => {
                    const Icon = card.icon;

                    return (
                        <article
                            key={card.id}
                            className="flex flex-col rounded-xl border border-border/50 bg-twhite p-6 shadow-sm"
                        >
                            <Icon
                                className="size-9 text-beta-turquoise"
                                strokeWidth={1.5}
                                aria-hidden
                            />
                            <h3 className="mt-4 text-sm font-extrabold tracking-wide text-beta-turquoise uppercase">
                                <TransText
                                    fr={card.title.fr}
                                    en={card.title.en}
                                    ar={card.title.ar}
                                />
                            </h3>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-tgray">
                                <TransText
                                    fr={card.description.fr}
                                    en={card.description.en}
                                    ar={card.description.ar}
                                />
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    onNavigate(
                                        card.sectionId,
                                        card.program,
                                        card.galleryFilter,
                                    )
                                }
                                className="mt-6 inline-flex items-center gap-2 self-start rounded-md border-2 border-beta-turquoise px-5 py-2.5 text-xs font-extrabold tracking-[0.1em] text-beta-turquoise uppercase transition hover:bg-beta-turquoise hover:text-twhite"
                            >
                                <TransText
                                    fr={card.cta.fr}
                                    en={card.cta.en}
                                    ar={card.cta.ar}
                                />
                                <span aria-hidden>→</span>
                            </button>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
