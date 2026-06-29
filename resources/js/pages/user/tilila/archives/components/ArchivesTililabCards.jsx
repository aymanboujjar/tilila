import { Camera, Play, Trophy } from 'lucide-react';
import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const CARDS = [
    {
        id: 'laureats',
        icon: Trophy,
        accent: 'border-beta-turquoise/30 bg-alpha-turquoise',
        iconClass: 'text-beta-turquoise',
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
        accent: 'border-beta-blue/20 bg-alpha-blue',
        iconClass: 'text-beta-blue',
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
        accent: 'border-brand-light-purple/25 bg-beta-purple',
        iconClass: 'text-brand-light-purple',
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
        <section className="border-t border-border/40 bg-beta-white py-14 sm:py-16">
            <TililaContainer>
                <p className="text-center text-[11px] font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                    <TransText en="Tililab" fr="Tililab" ar="تيليلاب" />
                </p>
                <h2 className="mt-2 text-center text-2xl font-extrabold tracking-tight text-beta-blue sm:text-3xl">
                    <TransText
                        en="Explore Tililab archives"
                        fr="Explorer les archives Tililab"
                        ar="استكشف أرشيف تيليلاب"
                    />
                </h2>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {CARDS.map((card) => {
                        const Icon = card.icon;

                        return (
                            <article
                                key={card.id}
                                className={`flex flex-col rounded-2xl border p-6 shadow-sm ${card.accent}`}
                            >
                                <Icon
                                    className={`size-9 ${card.iconClass}`}
                                    strokeWidth={1.5}
                                    aria-hidden
                                />
                                <h3 className="mt-4 text-sm font-extrabold tracking-wide text-beta-blue uppercase">
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
                                    className="mt-6 inline-flex items-center gap-2 self-start rounded-lg border-2 border-beta-blue px-5 py-2.5 text-xs font-extrabold tracking-[0.1em] text-beta-blue uppercase transition hover:bg-beta-blue hover:text-twhite"
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
            </TililaContainer>
        </section>
    );
}
