import TransText from '@/components/TransText';
import { PartnerLogoTile } from '@/components/PartnerSection';
import { TILILA_AWARDS_PARTNERS } from '@/data/tilila-awards-partners';
import {
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

export default function TililaPartnersFullSection() {
    return (
        <TililaSection id="partners-full" className="border-t border-border/60 bg-twhite">
            <TililaContainer>
                <TililaSectionHeading
                    centered
                    className="mx-auto"
                    title={
                        <TransText
                            en="All partners"
                            fr="Tous nos partenaires"
                            ar="جميع شركائنا"
                        />
                    }
                />
                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {TILILA_AWARDS_PARTNERS.map((partner) => (
                        <PartnerLogoTile
                            key={partner.id}
                            name={partner.name}
                            logoUrl={partner.logoUrl}
                            tall
                            subtitle={
                                partner.subtitle ? (
                                    <TransText
                                        en={partner.subtitle.en}
                                        fr={partner.subtitle.fr}
                                        ar={partner.subtitle.ar}
                                    />
                                ) : null
                            }
                        />
                    ))}
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
