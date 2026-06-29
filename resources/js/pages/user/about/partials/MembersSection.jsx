import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import TililaHorizontalCarousel from '@/pages/user/tilila/partials/TililaHorizontalCarousel';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { COMMITTEE_MEMBERS } from '@/pages/user/about/partials/about-data';

function initials(name) {
    return (name || '?')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

function MemberCard({ member, role }) {
    return (
        <article className="flex h-full flex-col items-center px-2 text-center">
            <div className="relative size-28 overflow-hidden rounded-full border-2 border-beta-blue/15 bg-beta-white sm:size-32">
                {member.photo ? (
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <span
                        className="flex h-full w-full items-center justify-center bg-alpha-blue text-lg font-extrabold text-beta-blue"
                        aria-hidden
                    >
                        {initials(member.name)}
                    </span>
                )}
            </div>
            <p className="mt-4 text-sm font-bold text-[#1a237e] sm:text-base">
                {member.name}
            </p>
            <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-[#1a237e]/75 sm:text-sm">
                {role}
            </p>
        </article>
    );
}

export default function MembersSection() {
    const { locale } = useTranslation();

    const roleFor = (member) =>
        member[locale] || member.fr || member.en || member.ar || '';

    return (
        <section
            id="members"
            className="scroll-mt-28 bg-twhite py-14 sm:py-16"
        >
            <TililaContainer>
                <div className="mx-auto max-w-6xl">
                    <div
                        className="mb-4 h-1 w-10 bg-beta-blue"
                        aria-hidden
                    />
                    <h2 className="text-xl font-extrabold tracking-tight text-[#1a237e] uppercase sm:text-[1.35rem]">
                        <TransText
                            en="Our members"
                            fr="Nos membres"
                            ar="أعضاؤنا"
                        />
                    </h2>

                    <div className="mt-10">
                        <TililaHorizontalCarousel
                            ariaLabel="CPD members"
                            slideClassName="w-[calc((100%-1rem)/2)] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]"
                            fadeFrom="from-twhite"
                            autoAdvanceMs={5200}
                        >
                            {COMMITTEE_MEMBERS.map((member) => (
                                <MemberCard
                                    key={member.name}
                                    member={member}
                                    role={roleFor(member)}
                                />
                            ))}
                        </TililaHorizontalCarousel>
                    </div>
                </div>
            </TililaContainer>
        </section>
    );
}
