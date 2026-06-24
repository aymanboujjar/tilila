import ProgramPartnersGrouped from '@/components/ProgramPartnersGrouped';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

export default function PartnersSection() {
    return (
        <TililaSection
            id="partners"
            className="scroll-mt-28 border-b border-border/60 bg-twhite py-10 sm:py-12"
        >
            <TililaContainer>
                <TililaSectionHeading
                    centered
                    className="mx-auto"
                    title={
                        <TransText
                            en="Our partners"
                            fr="Nos partenaires"
                            ar="شركاؤنا"
                        />
                    }
                    subtitle={
                        <TransText
                            en="Institutional and media partners supporting Tilila Awards and Tililab."
                            fr="Partenaires institutionnels et médias des Tilila Awards et de Tililab."
                            ar="الشركاء المؤسساتيون والإعلاميون لدعم تيليلا أووردز وتيليلاب."
                        />
                    }
                />

                <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-10">
                    <ProgramPartnersGrouped program="tilila" showProgramTitle />
                    <div
                        className="hidden w-px shrink-0 self-stretch bg-border/70 lg:block"
                        aria-hidden
                    />
                    <div className="h-px w-full bg-border/70 lg:hidden" aria-hidden />
                    <ProgramPartnersGrouped program="tililab" showProgramTitle />
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
