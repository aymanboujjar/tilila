import ProgramPartnersGrouped from '@/components/ProgramPartnersGrouped';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

export default function TililaPartnersSection() {
    return (
        <TililaSection id="partners" className="border-t border-border/60 bg-twhite">
            <TililaContainer>
                <TililaSectionHeading
                    title={
                        <TransText
                            en="Partners"
                            fr="Partenaires"
                            ar="الشركاء"
                        />
                    }
                    subtitle={
                        <TransText
                            en="Institutional and media partners associated with Tilila Awards."
                            fr="Partenaires institutionnels et médias associés aux Tilila Awards."
                            ar="الشركاء المؤسساتيون والإعلاميون المرتبطون بتيليلا أووردز."
                        />
                    }
                />
                <div className="mt-8">
                    <ProgramPartnersGrouped program="tilila" variant="carousel" />
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
