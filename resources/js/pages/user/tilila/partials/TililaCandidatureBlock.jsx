import TransText from '@/components/TransText';
import {
    ProgramApplyButton,
    ProgramDeadlineBadge,
    ProgramRegulationButton,
} from '@/components/program/ProgramCtaButtons';

export default function TililaCandidatureBlock() {
    return (
        <section
            id="candidature"
            className="border-b border-border bg-beta-blue py-10 sm:py-12"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold tracking-wide text-twhite/80 uppercase">
                            <TransText
                                en="Are you an advertiser or agency?"
                                fr="Vous êtes un annonceur, une agence ?"
                                ar="هل أنت معلن أو وكالة؟"
                            />
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-twhite sm:text-3xl">
                            <TransText
                                en="Apply to the 8th Tilila Awards 2026"
                                fr="Candidatez à la 8e édition des Tilila Awards 2026"
                                ar="ترشحوا للدورة الثامنة من تيليلا أووردز 2026"
                            />
                        </h2>
                        <p className="mt-3 text-base leading-relaxed text-twhite/85">
                            <TransText
                                en="The prize that rewards campaigns committed to equality, diversity and inclusion."
                                fr="Le prix qui récompense les campagnes engagées pour l'égalité, la diversité et l'inclusion."
                                ar="الجائزة التي تكرّم الحملات الملتزمة بالمساواة والتنوع والإدماج."
                            />
                        </p>
                        <div className="mt-5">
                            <ProgramDeadlineBadge deadline="31 août 2026" />
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                        <ProgramApplyButton href="/tilila/participate">
                            <TransText
                                en="Submit application"
                                fr="Déposer une candidature"
                                ar="قدّم ترشيحك"
                            />
                        </ProgramApplyButton>
                        <ProgramRegulationButton href="/tilila/reglement/download" />
                    </div>
                </div>
            </div>
        </section>
    );
}
