import { Link } from '@inertiajs/react';
import { ArrowRight, Gavel } from 'lucide-react';
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
import { useTranslation } from '@/contexts/TranslationContext';

function EditionJuryBlock({ edition, locale }) {
    const jury = edition.jury ?? [];
    if (!jury.length) return null;

    const label = textFor(edition.edition_label, locale);

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
                    <span className="rounded-full bg-alpha-blue px-2.5 py-0.5 text-xs font-bold text-beta-blue">
                        {jury.length}
                    </span>
                </div>
                <Link
                    href={`${edition.details_url}#jury`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
                >
                    <TransText en="Edition" fr="Édition" ar="الدورة" />
                    <ArrowRight className="size-3.5" />
                </Link>
            </header>

            <ul className="grid gap-px bg-border/40 sm:grid-cols-2 lg:grid-cols-3">
                {jury.map((member, index) => (
                    <li
                        key={index}
                        className="flex gap-4 bg-twhite p-5 sm:p-6"
                    >
                        {member.photo_path ? (
                            <PersonPhoto
                                path={member.photo_path}
                                alt={member.full_name}
                                className="size-16"
                            />
                        ) : (
                            <TililaIconBadge icon={Gavel} />
                        )}
                        <div className="min-w-0">
                            <p className="font-bold text-tblack">
                                {member.full_name}
                            </p>
                            {textFor(member.bio, locale) ? (
                                <p className="mt-1.5 text-sm leading-relaxed text-tgray">
                                    {textFor(member.bio, locale)}
                                </p>
                            ) : null}
                        </div>
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default function TililaArchivesJuryList({ editions = [] }) {
    const { locale } = useTranslation();
    const withJury = editions.filter((e) => (e.jury?.length ?? 0) > 0);

    return (
        <TililaSection id="jury" className="bg-twhite">
            <TililaContainer>
                <TililaSectionHeading
                    title={
                        <TransText
                            en="Juries"
                            fr="Jurys"
                            ar="لجان التحكيم"
                        />
                    }
                    subtitle={
                        <TransText
                            en="The professionals who chaired each Tilila Awards edition."
                            fr="Les professionnels qui ont présidé chaque édition des Tilila Awards."
                            ar="المهنيون الذين ترأسوا كل دورة من تيليلا أووردز."
                        />
                    }
                />

                {withJury.length === 0 ? (
                    <p className="mt-8 rounded-2xl border border-dashed border-beta-blue/20 bg-beta-white px-6 py-12 text-center text-sm text-tgray">
                        <TransText
                            en="Jury members are published for each edition."
                            fr="Les membres du jury sont publiés pour chaque édition."
                            ar="يُنشر أعضاء لجنة التحكيم لكل دورة."
                        />
                    </p>
                ) : (
                    <div className="mt-10 space-y-8">
                        {withJury.map((edition) => (
                            <EditionJuryBlock
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
