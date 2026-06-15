import TransText from '@/components/TransText';
import {
    ProgramApplyButton,
    ProgramDeadlineBadge,
    ProgramRegulationButton,
} from '@/components/program/ProgramCtaButtons';

export default function TililabCandidatureBlock() {
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
                                en="Are you a young content creator?"
                                fr="Vous êtes jeune créateur de contenu ?"
                                ar="هل أنت مبدع محتوى شاب؟"
                            />
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-twhite sm:text-3xl">
                            <TransText
                                en="Apply to Tililab 2026"
                                fr="Candidatez au concours Tililab 2026"
                                ar="ترشحوا لمسابقة تيليلاب 2026"
                            />
                        </h2>
                        <p className="mt-3 text-base leading-relaxed text-twhite/85">
                            <TransText
                                en="The creative competition and bootcamp for young media and communication talents."
                                fr="Le concours et bootcamp créatif destiné aux jeunes talents des médias et de la communication."
                                ar="المسابقة والمعسكر الإبداعي الموجه للمواهب الشابة في الإعلام والاتصال."
                            />
                        </p>
                        <div className="mt-5">
                            <ProgramDeadlineBadge deadline="31 juillet 2026" />
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                        <ProgramApplyButton href="/tililab/form">
                            <TransText
                                en="Apply to Tililab"
                                fr="Candidater à Tililab"
                                ar="ترشح لتيليلاب"
                            />
                        </ProgramApplyButton>
                        <ProgramRegulationButton href="/tililab/reglement/download" />
                    </div>
                </div>
            </div>
        </section>
    );
}
