import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { COMMITTEE_MEMBERS } from '@/pages/user/about/partials/about-data';

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
                <div className="mx-auto max-w-4xl">
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

                    <ul className="mt-10 divide-y divide-border/70">
                        {COMMITTEE_MEMBERS.map((member) => (
                            <li
                                key={member.name}
                                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                            >
                                <p className="text-sm font-bold text-[#1a237e] sm:text-base">
                                    {member.name}
                                </p>
                                <p className="text-sm leading-relaxed text-[#1a237e]/80 sm:max-w-md sm:text-end">
                                    {roleFor(member)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </TililaContainer>
        </section>
    );
}
