import { Link } from '@inertiajs/react';
import { ArrowRight, Award, Calendar, Gavel } from 'lucide-react';
import TransText from '@/components/TransText';
import { textFor } from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    TililaContainer,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';
import { editionWinnerRows } from '@/pages/user/tilila/utils/archiveEditions';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililaArchivesLatestHighlight({ edition }) {
    const { locale } = useTranslation();

    if (!edition) return null;

    const label = textFor(edition.edition_label, locale);
    const theme = textFor(edition.theme, locale);
    const ceremony = textFor(edition.ceremony, locale);
    const winners = editionWinnerRows(edition, locale);
    const juryCount = edition.jury?.length ?? 0;
    const previewWinners = winners.slice(0, 4);

    return (
        <section
            id="latest"
            className="border-b border-border/60 bg-twhite py-14 sm:py-16"
        >
            <TililaContainer>
                <p className="text-xs font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                    <TransText
                        en="Latest edition"
                        fr="Dernière édition"
                        ar="آخر دورة"
                    />
                </p>
                <TililaSectionHeading
                    className="mt-2"
                    title={
                        <TransText
                            en="Edition highlights"
                            fr="Temps forts de l’édition"
                            ar="أبرز لحظات الدورة"
                        />
                    }
                    subtitle={
                        <TransText
                            en="A snapshot of the most recent Tilila Awards ceremony — winners, jury and full edition details."
                            fr="Un aperçu de la dernière cérémonie Tilila Awards — lauréats, jury et fiche complète."
                            ar="لمحة عن أحدث حفل تيليلا أووردز — الفائزون ولجنة التحكيم وتفاصيل الدورة."
                        />
                    }
                />

                <div className="mt-10 overflow-hidden rounded-3xl border border-border/60 bg-beta-white shadow-sm">
                    <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="relative min-h-[280px] lg:min-h-[480px]">
                            {edition.cover_image_src ? (
                                <img
                                    src={edition.cover_image_src}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-linear-to-br from-[#2e1861] to-[#4a2d8a]" />
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-tblack/80 via-tblack/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                                <p className="text-5xl leading-none font-extrabold text-twhite sm:text-6xl">
                                    {edition.year}
                                </p>
                                <p className="mt-2 text-lg font-semibold text-twhite/90">
                                    {label}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                            {theme ? (
                                <p className="text-base leading-relaxed text-tgray sm:text-lg">
                                    {theme}
                                </p>
                            ) : null}

                            {ceremony ? (
                                <p className="mt-4 inline-flex items-start gap-2 text-sm text-tgray">
                                    <Calendar className="mt-0.5 size-4 shrink-0 text-beta-blue" />
                                    {ceremony}
                                </p>
                            ) : null}

                            <div className="mt-6 flex flex-wrap gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full border border-beta-blue/15 bg-alpha-blue px-4 py-2 text-xs font-bold text-beta-blue">
                                    <Award className="size-3.5" />
                                    {winners.length}{' '}
                                    <TransText
                                        en="winners"
                                        fr="lauréats"
                                        ar="فائز"
                                    />
                                </span>
                                {juryCount > 0 ? (
                                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-twhite px-4 py-2 text-xs font-bold text-tblack">
                                        <Gavel className="size-3.5 text-beta-blue" />
                                        {juryCount}{' '}
                                        <TransText
                                            en="jury members"
                                            fr="membres du jury"
                                            ar="عضو تحكيم"
                                        />
                                    </span>
                                ) : null}
                            </div>

                            {previewWinners.length > 0 ? (
                                <div className="mt-8 flex-1">
                                    <p className="text-xs font-bold tracking-wide text-beta-blue uppercase">
                                        <TransText
                                            en="Top laureates"
                                            fr="Lauréats principaux"
                                            ar="أبرز الفائزين"
                                        />
                                    </p>
                                    <ul className="mt-4 space-y-3">
                                        {previewWinners.map((row, index) => (
                                            <li
                                                key={index}
                                                className="flex gap-3 rounded-xl border border-border/50 bg-twhite px-4 py-3"
                                            >
                                                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-beta-blue/10 text-xs font-bold text-beta-blue">
                                                    {index + 1}
                                                </span>
                                                <div className="min-w-0 text-sm">
                                                    {row.trophy ? (
                                                        <p className="font-bold text-beta-blue">
                                                            {row.trophy}
                                                        </p>
                                                    ) : null}
                                                    {row.name ? (
                                                        <p className="font-semibold text-tblack">
                                                            {row.name}
                                                        </p>
                                                    ) : null}
                                                    {row.detail ? (
                                                        <p className="mt-0.5 leading-relaxed text-tgray">
                                                            {row.detail}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    {winners.length > previewWinners.length ? (
                                        <a
                                            href="#winners"
                                            className="mt-4 inline-flex text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
                                        >
                                            <TransText
                                                en={`See all ${winners.length} winners`}
                                                fr={`Voir les ${winners.length} lauréats`}
                                                ar={`عرض كل ${winners.length} فائز`}
                                            />
                                        </a>
                                    ) : null}
                                </div>
                            ) : null}

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href={edition.details_url}
                                    className="inline-flex items-center gap-2 rounded-lg bg-beta-blue px-5 py-3 text-xs font-bold tracking-wide text-twhite uppercase transition hover:bg-brand-light-purple"
                                >
                                    <TransText
                                        en="Open full edition"
                                        fr="Ouvrir l’édition"
                                        ar="فتح الدورة"
                                    />
                                    <ArrowRight className="size-4" />
                                </Link>
                                {juryCount > 0 ? (
                                    <a
                                        href="#jury"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-beta-blue bg-transparent px-5 py-3 text-xs font-bold tracking-wide text-beta-blue uppercase transition hover:bg-alpha-blue"
                                    >
                                        <TransText
                                            en="View jury"
                                            fr="Voir le jury"
                                            ar="عرض لجنة التحكيم"
                                        />
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </TililaContainer>
        </section>
    );
}
