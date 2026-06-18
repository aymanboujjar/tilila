import { Gavel } from 'lucide-react';
import TransText from '@/components/TransText';
import { storagePhotoSrc } from '@/pages/user/tilila/partials/EditionDetailContent';
import { TililaIconBadge } from '@/pages/user/tilila/partials/TililaUi';
import ArchivesMediaCarousel from '@/pages/user/tilila/archives/components/ArchivesMediaCarousel';

export default function ArchivesJurySection({
    members = [],
    program = 'tilila',
    year,
}) {
    const yearLabel = year === 'all' ? '' : ` ${year}`;
    const sectionId = program === 'tililab' ? 'intervenants' : 'jurys';

    if (!members.length) {
        return (
            <section id={sectionId} className="scroll-mt-28">
                <h2 className="text-lg font-extrabold tracking-wide text-beta-blue uppercase sm:text-xl">
                    {program === 'tililab' ? (
                        <TransText
                            en={`Speakers${yearLabel}`}
                            fr={`Intervenants${yearLabel}`}
                            ar={`المتحدثون${yearLabel}`}
                        />
                    ) : (
                        <TransText
                            en={`Jury${yearLabel}`}
                            fr={`Jury${yearLabel}`}
                            ar={`لجنة التحكيم${yearLabel}`}
                        />
                    )}
                </h2>
                <p className="mt-6 rounded-xl border border-dashed border-border bg-beta-white p-8 text-center text-sm text-tgray">
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
        <section id={sectionId} className="scroll-mt-28">
            <h2 className="text-lg font-extrabold tracking-wide text-beta-blue uppercase sm:text-xl">
                {program === 'tililab' ? (
                    <TransText
                        en={`Speakers${yearLabel}`}
                        fr={`Intervenants${yearLabel}`}
                        ar={`المتحدثون${yearLabel}`}
                    />
                ) : (
                    <TransText
                        en={`Jury${yearLabel}`}
                        fr={`Jury${yearLabel}`}
                        ar={`لجنة التحكيم${yearLabel}`}
                    />
                )}
            </h2>

            <div className="mt-6">
                <ArchivesMediaCarousel
                    ariaLabel={
                        program === 'tililab' ? 'Speakers' : 'Jury members'
                    }
                    slideClassName="w-[min(100%,260px)] shrink-0 snap-start sm:w-[48%] lg:w-[32%]"
                >
                    {members.map((member, index) => (
                        <article
                            key={`${member.year}-${member.name}-${index}`}
                            className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-white shadow-sm"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-beta-white">
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
                                            className="size-14"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-1 flex-col p-4">
                                <p className="font-extrabold text-tblack">
                                    {member.name}
                                </p>
                                {member.role ? (
                                    <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-tgray">
                                        {member.role}
                                    </p>
                                ) : null}
                                {year === 'all' && member.year ? (
                                    <p className="mt-auto pt-3 text-xs font-semibold text-beta-blue">
                                        {member.year}
                                    </p>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </ArchivesMediaCarousel>
            </div>
        </section>
    );
}
