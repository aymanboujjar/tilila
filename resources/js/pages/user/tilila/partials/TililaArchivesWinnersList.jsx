import { Link } from '@inertiajs/react';
import { ArrowRight, Award } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    PersonPhoto,
    textFor,
} from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    TililaContainer,
    TililaIconBadge,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';
import { editionWinnerRows } from '@/pages/user/tilila/utils/archiveEditions';
import { useTranslation } from '@/contexts/TranslationContext';

function EditionWinnersBlock({ edition, locale }) {
    const label = textFor(edition.edition_label, locale);
    const rows = editionWinnerRows(edition, locale);

    if (!rows.length) return null;

    return (
        <article className="overflow-hidden rounded-2xl border border-border/60 bg-twhite shadow-sm">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 bg-beta-white px-5 py-4 sm:px-6">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-beta-blue">
                        {edition.year}
                    </span>
                    <span className="text-sm font-medium text-tgray">
                        {label}
                    </span>
                </div>
                <Link
                    href={edition.details_url}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
                >
                    <TransText en="Edition" fr="Édition" ar="الدورة" />
                    <ArrowRight className="size-3.5" />
                </Link>
            </header>

            <div className="hidden border-b border-border/40 bg-alpha-blue/30 px-5 py-2.5 text-[11px] font-bold tracking-wide text-beta-blue uppercase sm:grid sm:grid-cols-[minmax(140px,1.1fr)_minmax(120px,0.9fr)_1fr] sm:gap-4 sm:px-6">
                <span>
                    <TransText en="Prize" fr="Prix" ar="الجائزة" />
                </span>
                <span>
                    <TransText en="Laureate" fr="Lauréat" ar="الفائز" />
                </span>
                <span>
                    <TransText en="Details" fr="Détails" ar="التفاصيل" />
                </span>
            </div>

            <ul className="divide-y divide-border/40">
                {rows.map((row, index) => {
                    if (!row.trophy && !row.name && row.detail) {
                        return (
                            <li
                                key={index}
                                className="px-5 py-4 sm:px-6 sm:py-5"
                            >
                                <p className="text-sm leading-relaxed text-tgray">
                                    {row.detail}
                                </p>
                            </li>
                        );
                    }

                    return (
                        <li
                            key={index}
                            className="px-5 py-4 sm:grid sm:grid-cols-[minmax(140px,1.1fr)_minmax(120px,0.9fr)_1fr] sm:items-start sm:gap-4 sm:px-6 sm:py-5"
                        >
                            <div className="flex items-start gap-3">
                                {row.photo ? (
                                    <PersonPhoto
                                        path={row.photo}
                                        alt={row.name || ''}
                                        className="size-12 sm:hidden"
                                    />
                                ) : (
                                    <TililaIconBadge
                                        icon={Award}
                                        className="size-10 sm:hidden"
                                    />
                                )}
                                <div>
                                    <p className="text-[11px] font-bold tracking-wide text-beta-blue uppercase sm:hidden">
                                        <TransText
                                            en="Prize"
                                            fr="Prix"
                                            ar="الجائزة"
                                        />
                                    </p>
                                    <p className="mt-0.5 text-sm font-bold text-beta-blue sm:mt-0">
                                        {row.trophy || '—'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 sm:mt-0">
                                <p className="text-[11px] font-bold tracking-wide text-tgray uppercase sm:hidden">
                                    <TransText
                                        en="Laureate"
                                        fr="Lauréat"
                                        ar="الفائز"
                                    />
                                </p>
                                <p className="mt-0.5 font-semibold text-tblack sm:mt-0">
                                    {row.name || '—'}
                                </p>
                            </div>

                            <div className="mt-3 sm:mt-0">
                                <p className="text-[11px] font-bold tracking-wide text-tgray uppercase sm:hidden">
                                    <TransText
                                        en="Details"
                                        fr="Détails"
                                        ar="التفاصيل"
                                    />
                                </p>
                                <p className="mt-0.5 text-sm leading-relaxed text-tgray sm:mt-0">
                                    {row.detail || '—'}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default function TililaArchivesWinnersList({ editions = [] }) {
    const { locale } = useTranslation();
    const withWinners = editions.filter(
        (e) => editionWinnerRows(e, locale).length > 0,
    );

    return (
        <TililaSection id="winners" className="bg-beta-white">
            <TililaContainer>
                <TililaSectionHeading
                    title={
                        <TransText
                            en="Winners & palmarès"
                            fr="Lauréats & palmarès"
                            ar="الفائزون والجوائز"
                        />
                    }
                    subtitle={
                        <TransText
                            en="Every prize and laureate, edition by edition — structured for easy reading."
                            fr="Chaque prix et lauréat, édition par édition — structuré pour une lecture claire."
                            ar="كل جائزة وفائز، دورة بعد دورة — منظم لقراءة واضحة."
                        />
                    }
                />

                {withWinners.length === 0 ? (
                    <p className="mt-8 rounded-2xl border border-dashed border-beta-blue/20 bg-twhite px-6 py-12 text-center text-sm text-tgray">
                        <TransText
                            en="Winners will be published after each ceremony."
                            fr="Les lauréats seront publiés après chaque cérémonie."
                            ar="يُعلَن عن الفائزين بعد كل حفل."
                        />
                    </p>
                ) : (
                    <div className="mt-10 space-y-8">
                        {withWinners.map((edition) => (
                            <EditionWinnersBlock
                                key={edition.id}
                                edition={edition}
                                locale={locale}
                            />
                        ))}
                    </div>
                )}
            </TililaContainer>
        </TililaSection>
    );
}
