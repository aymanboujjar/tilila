import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useMemo } from 'react';
import TililaAwardsLayout from '@/layouts/tilila-awards-layout';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';
import { textFor } from '@/pages/user/tilila/partials/EditionDetailContent';
import { buildArchiveEditions } from '@/pages/user/tilila/utils/archiveEditions';
import { useTranslation } from '@/contexts/TranslationContext';

function ArchivesHero() {
    return (
        <section className="border-b border-border/60 bg-beta-white py-12 sm:py-14">
            <TililaContainer>
                <Link
                    href="/tilila"
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
                >
                    <ChevronLeft className="size-4" />
                    <TransText
                        en="Back to Tilila Awards"
                        fr="Retour aux Tilila Awards"
                        ar="العودة إلى تيليلا أووردز"
                    />
                </Link>
                <div className="mt-8 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl font-extrabold tracking-tight text-beta-blue sm:text-4xl lg:text-[2.75rem]">
                            <TransText
                                en="Archives & awards"
                                fr="Archives & palmarès"
                                ar="الأرشيف والجوائز"
                            />
                        </h1>
                        <p className="mt-4 text-base leading-relaxed text-tgray">
                            <TransText
                                en="Browse past Tilila Awards editions. Open an edition to see winners, jury, photos and ceremony video."
                                fr="Parcourez les éditions passées des Tilila Awards. Ouvrez une édition pour découvrir lauréats, jury, photos et vidéo de cérémonie."
                                ar="تصفح دورات تيليلا أووردز السابقة. افتح أي دورة لعرض الفائزين ولجنة التحكيم والصور وفيديو الحفل."
                            />
                        </p>
                    </div>
                    <img
                        src="/assets/tilila/trophee-tilila.png"
                        alt=""
                        className="h-36 w-auto object-contain sm:h-44"
                    />
                </div>
            </TililaContainer>
        </section>
    );
}

function EditionCard({ edition, locale }) {
    const label = textFor(edition.edition_label, locale);
    const theme = textFor(edition.theme, locale);

    return (
        <Link
            href={edition.details_url}
            id={`edition-${edition.year}`}
            className="group block overflow-hidden rounded-xl border border-border bg-twhite shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="relative aspect-[16/10] bg-muted">
                {edition.cover_image_src ? (
                    <img
                        src={edition.cover_image_src}
                        alt=""
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                    />
                ) : null}
                <div className="absolute inset-0 bg-linear-to-t from-tblack/70 via-tblack/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-3xl font-extrabold text-twhite">
                        {edition.year}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-twhite/90">
                        {label}
                    </p>
                </div>
            </div>
            <div className="p-5">
                {theme ? (
                    <p className="line-clamp-3 text-sm leading-relaxed text-tgray">
                        {theme}
                    </p>
                ) : null}
                <p className="mt-4 text-xs font-bold tracking-wide text-beta-blue uppercase">
                    <TransText
                        en="View edition →"
                        fr="Voir l’édition →"
                        ar="عرض الدورة →"
                    />
                </p>
            </div>
        </Link>
    );
}

export default function TililaArchives() {
    const { editions: rawEditions } = usePage().props;
    const { locale } = useTranslation();

    const editions = useMemo(
        () => buildArchiveEditions(rawEditions ?? []),
        [rawEditions],
    );

    return (
        <>
            <Head title="Archives & Palmarès — Tilila Awards" />
            <ArchivesHero />
            <TililaSection className="bg-twhite pb-16">
                <TililaContainer>
                    <TililaSectionHeading
                        title={
                            <TransText
                                en="All editions"
                                fr="Toutes les éditions"
                                ar="جميع الدورات"
                            />
                        }
                        subtitle={
                            <TransText
                                en={`${editions.length} past editions of Tilila Awards.`}
                                fr={`${editions.length} éditions passées des Tilila Awards.`}
                                ar={`${editions.length} دورات سابقة من تيليلا أووردز.`}
                            />
                        }
                    />
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {editions.map((edition) => (
                            <EditionCard
                                key={edition.id}
                                edition={edition}
                                locale={locale}
                            />
                        ))}
                    </div>
                </TililaContainer>
            </TililaSection>
        </>
    );
}

TililaArchives.layout = (page) => (
    <TililaAwardsLayout>{page}</TililaAwardsLayout>
);
