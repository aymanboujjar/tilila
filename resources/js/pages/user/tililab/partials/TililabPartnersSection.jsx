import ProgramPartnersGrouped from '@/components/ProgramPartnersGrouped';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

export default function TililabPartnersSection() {
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
                            en="Institutional and media partners associated with Tililab."
                            fr="Partenaires institutionnels et médias associés à Tililab."
                            ar="الشركاء المؤسساتيون والإعلاميون المرتبطون بتيليلاب."
                        />
                    }
                />
                <div className="mt-8">
                    <ProgramPartnersGrouped program="tililab" variant="carousel" />
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
