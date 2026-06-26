import { Link } from '@inertiajs/react';
import { ArrowRight, Gavel } from 'lucide-react';
import TransText from '@/components/TransText';
import ArchivesMediaCarousel from '@/pages/user/tilila/archives/components/ArchivesMediaCarousel';
import ArchivesSectionHeading from '@/pages/user/tilila/archives/components/ArchivesSectionHeading';
import { TililaIconBadge } from '@/pages/user/tilila/partials/TililaUi';
import { storageAssetSrc } from '@/pages/user/tilila/utils/winnerFields';

const VISIBLE_JURY = 4;
const PREVIEW_JURY = 12;

function JuryCard({ member, showYear }) {
    const photoSrc = storageAssetSrc(member.photo_path);

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-twhite shadow-[0_4px_24px_rgba(68,25,168,0.06)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-alpha-blue">
                {photoSrc ? (
                    <img
                        src={photoSrc}
                        alt={member.name}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <TililaIconBadge icon={Gavel} className="size-12" />
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="text-sm font-extrabold text-tblack">
                    {member.name}
                </p>
                {member.role ? (
                    <p className="line-clamp-3 text-xs leading-relaxed text-tgray">
                        {member.role}
                    </p>
                ) : null}
                {showYear && member.year ? (
                    <p className="mt-1 text-[10px] font-bold tracking-wide text-beta-turquoise uppercase">
                        {member.year}
                    </p>
                ) : null}
            </div>
        </article>
    );
}

export default function ArchivesJurySection({
    members = [],
    program = 'tilila',
    year,
    detailsUrl,
}) {
    const yearLabel = year === 'all' ? '' : ` ${year}`;
    const sectionId = program === 'tililab' ? 'intervenants' : 'jurys';
    const previewMembers = members.slice(0, PREVIEW_JURY);
    const showYear = year === 'all';

    const title =
        program === 'tililab' ? (
            <TransText
                en={`Speakers${yearLabel}`}
                fr={`Intervenants${yearLabel}`}
                ar={`المتحدثون${yearLabel}`}
            />
        ) : (
            <TransText
                en="Jury from 7 editions"
                fr="Jury des 7 éditions"
                ar="لجنة التحكيم في الدورات السبع"
            />
        );

    const kicker =
        program === 'tililab' ? (
            <TransText en="Tililab" fr="Tililab" ar="تيليلاب" />
        ) : (
            <TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />
        );

    if (!members.length) {
        return (
            <section id={sectionId} className="scroll-mt-32">
                <ArchivesSectionHeading kicker={kicker} title={title} />
                <p className="mt-8 rounded-2xl border border-dashed border-beta-blue/25 bg-beta-white px-6 py-12 text-center text-sm text-tgray">
                    <TransText
                        en="No jury members for this selection."
                        fr="Aucun membre du jury pour cette sélection."
                        ar="لا يوجد أعضاء لجنة تحكيم لهذا الاختيار."
                    />
                </p>
            </section>
        );
    }

    return (
        <section id={sectionId} className="scroll-mt-32">
            <ArchivesSectionHeading kicker={kicker} title={title} />

            <div className="mt-8">
                <ArchivesMediaCarousel
                    ariaLabel={
                        program === 'tililab' ? 'Speakers' : 'Jury members'
                    }
                    visibleCount={VISIBLE_JURY}
                    showFade={previewMembers.length > VISIBLE_JURY}
                    slideClassName="w-[calc((100%-3rem)/4)] shrink-0 snap-start"
                >
                    {previewMembers.map((member, index) => (
                        <JuryCard
                            key={`${member.year}-${member.name}-${index}`}
                            member={member}
                            showYear={showYear}
                        />
                    ))}
                </ArchivesMediaCarousel>
            </div>

            {detailsUrl ? (
                <Link
                    href={`${detailsUrl}#jury`}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-beta-blue px-6 py-3 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple sm:w-auto"
                >
                    <TransText
                        fr="Voir tous les membres du jury"
                        en="See all jury members"
                        ar="عرض كل أعضاء لجنة التحكيم"
                    />
                    <ArrowRight className="size-3.5" aria-hidden />
                </Link>
            ) : null}
        </section>
    );
}
