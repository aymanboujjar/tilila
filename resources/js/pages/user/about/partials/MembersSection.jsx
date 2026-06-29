import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
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
        <li className="flex flex-col items-center text-center">
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
            <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-[#1a237e]/75 sm:text-sm">
                {role}
            </p>
        </li>
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
                <div className="mx-auto max-w-5xl">
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

                    <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
                        {COMMITTEE_MEMBERS.map((member) => (
                            <MemberCard
                                key={member.name}
                                member={member}
                                role={roleFor(member)}
                            />
                        ))}
                    </ul>
                </div>
            </TililaContainer>
        </section>
    );
}
