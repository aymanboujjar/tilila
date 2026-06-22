import { Link } from '@inertiajs/react';
import { ArrowRight, Gavel } from 'lucide-react';
import TransText from '@/components/TransText';
import ArchivesMediaCarousel from '@/pages/user/tilila/archives/components/ArchivesMediaCarousel';
import { storagePhotoSrc } from '@/pages/user/tilila/partials/EditionDetailContent';
import { TililaIconBadge } from '@/pages/user/tilila/partials/TililaUi';

const VISIBLE_JURY = 3;
const PREVIEW_JURY = 9;

export default function ArchivesJurySection({
    members = [],
    program = 'tilila',
    year,
    detailsUrl,
    compact = false,
}) {
    const yearLabel = year === 'all' ? '' : ` ${year}`;
    const sectionId = program === 'tililab' ? 'intervenants' : 'jurys';
    const previewMembers = compact
        ? members.slice(0, PREVIEW_JURY)
        : members;

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

    if (!members.length) {
        return (
            <section
                id={sectionId}
                className={`scroll-mt-28 ${compact ? 'flex h-full flex-col' : ''}`}
            >
                <h2 className="text-base font-extrabold tracking-wide text-beta-blue uppercase sm:text-lg">
                    {title}
                </h2>
                <p className="mt-6 rounded-xl border border-dashed border-border bg-beta-white p-6 text-center text-sm text-tgray">
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
        <section
            id={sectionId}
            className={`scroll-mt-28 ${compact ? 'flex h-full flex-col' : ''}`}
        >
            <ArchivesMediaCarousel
                ariaLabel={
                    program === 'tililab' ? 'Speakers' : 'Jury members'
                }
                visibleCount={compact ? VISIBLE_JURY : null}
                showFade={compact && previewMembers.length > VISIBLE_JURY}
                slideClassName={
                    compact
                        ? undefined
                        : 'w-[min(100%,200px)] shrink-0 snap-start sm:w-[42%] md:w-[30%] lg:w-[24%]'
                }
                headerRow={(nav) => (
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="text-base font-extrabold tracking-wide text-beta-blue uppercase sm:text-lg">
                            {title}
                        </h2>
                        {nav}
                    </div>
                )}
            >
                {previewMembers.map((member, index) => (
                    <article
                        key={`${member.year}-${member.name}-${index}`}
                        className="flex flex-col"
                    >
                        <div
                            className={`relative overflow-hidden rounded-lg border border-border/50 bg-beta-white shadow-sm ${
                                compact
                                    ? 'aspect-[3/4]'
                                    : 'aspect-[4/3]'
                            }`}
                        >
                            {member.photo_path ? (
                                <img
                                    src={storagePhotoSrc(member.photo_path)}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-alpha-blue">
                                    <TililaIconBadge
                                        icon={Gavel}
                                        className="size-10"
                                    />
                                </div>
                            )}
                        </div>
                        <p className="mt-3 text-sm font-extrabold text-beta-blue">
                            {member.name}
                        </p>
                        {member.role ? (
                            <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-tgray">
                                {member.role}
                            </p>
                        ) : null}
                        {year === 'all' && member.year ? (
                            <p className="mt-1 text-[11px] font-semibold text-beta-blue/80">
                                {member.year}
                            </p>
                        ) : null}
                    </article>
                ))}
            </ArchivesMediaCarousel>

            {detailsUrl ? (
                <Link
                    href={`${detailsUrl}#jury`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-beta-blue px-4 py-3 text-[11px] font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple sm:text-xs"
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
