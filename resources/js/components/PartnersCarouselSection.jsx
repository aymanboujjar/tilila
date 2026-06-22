import { usePage } from '@inertiajs/react';
import TransText from '@/components/TransText';
import {
    PARTNER_CAROUSEL_SLIDE_CLASS,
    PartnerCarouselCard,
} from '@/components/PartnerSection';
import { allPartnersCarousel } from '@/lib/programPartners';
import TililaHorizontalCarousel from '@/pages/user/tilila/partials/TililaHorizontalCarousel';
import {
    TililaBtnGhost,
    TililaContainer,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

export default function PartnersCarouselSection({
    id = 'partners',
    className = 'scroll-mt-28 border-b border-border/60 bg-twhite',
    fadeFrom = 'from-twhite',
    showCta = true,
    ctaHref = '/contact',
    title = (
        <TransText en="Our partners" fr="Nos partenaires" ar="شركاؤنا" />
    ),
    subtitle = (
        <TransText
            en="Valoriser les partenaires institutionnels, médias et techniques associés à Tilila."
            fr="Valoriser les partenaires institutionnels, médias et techniques associés à Tilila."
            ar="إبراز الشركاء المؤسساتيين والإعلاميين والتقنيين المرتبطين بتيليلا."
        />
    ),
}) {
    const { partners = [] } = usePage().props;
    const displayed = allPartnersCarousel(partners);

    return (
        <TililaSection id={id} className={className}>
            <TililaContainer>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <TililaSectionHeading title={title} subtitle={subtitle} />
                    {showCta ? (
                        <TililaBtnGhost href={ctaHref}>
                            <TransText
                                en="Become a partner"
                                fr="Devenir partenaire"
                                ar="كن شريكًا"
                            />
                        </TililaBtnGhost>
                    ) : null}
                </div>

                {displayed.length > 0 ? (
                    <div className="mt-8">
                        <TililaHorizontalCarousel
                            ariaLabel="Partners"
                            slideClassName={PARTNER_CAROUSEL_SLIDE_CLASS}
                            fadeFrom={fadeFrom}
                            autoAdvanceMs={4500}
                        >
                            {displayed.map((partner) => (
                                <PartnerCarouselCard
                                    key={partner.id}
                                    name={partner.name}
                                    logoUrl={partner.logo_url}
                                />
                            ))}
                        </TililaHorizontalCarousel>
                    </div>
                ) : (
                    <p className="mt-8 rounded-xl border border-dashed border-border bg-beta-white p-8 text-center text-sm text-tgray">
                        <TransText
                            en="Partner logos will appear here when published."
                            fr="Les logos partenaires apparaîtront ici une fois publiés."
                            ar="ستظهر شعارات الشركاء هنا عند نشرها."
                        />
                    </p>
                )}
            </TililaContainer>
        </TililaSection>
    );
}
