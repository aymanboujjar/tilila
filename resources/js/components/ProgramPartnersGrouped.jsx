import { usePage } from '@inertiajs/react';
import TransText from '@/components/TransText';
import {
    PARTNER_CAROUSEL_SLIDE_CLASS,
    PartnerCarouselCard,
    PartnerLogoTile,
} from '@/components/PartnerSection';
import { combinedHomeMediaPartners, groupedProgramPartners } from '@/lib/programPartners';
import TililaHorizontalCarousel from '@/pages/user/tilila/partials/TililaHorizontalCarousel';

const PROGRAM_LABELS = {
    tilila: {
        en: 'Tilila Awards',
        fr: 'Tilila Awards',
        ar: 'تيليلا أووردز',
        accent: 'text-beta-blue',
    },
    tililab: {
        en: 'Tililab',
        fr: 'Tililab',
        ar: 'تيليلاب',
        accent: 'text-beta-turquoise',
    },
};

const CENTERED_CAROUSEL_MAX = 4;

export function PartnerCategoryGrid({
    title,
    partners,
    compact = false,
    variant = 'grid',
    fadeFrom = 'from-beta-white',
    carouselLabel,
}) {
    if (!partners.length) {
        return null;
    }

    const centerFew =
        variant === 'carousel' && partners.length <= CENTERED_CAROUSEL_MAX;

    return (
        <div>
            {title ? (
                <h4
                    className={`text-xs font-bold tracking-[0.16em] text-beta-blue/75 uppercase ${
                        centerFew ? 'text-center' : ''
                    }`}
                >
                    {title}
                </h4>
            ) : null}
            <div className={title ? 'mt-4' : undefined}>
                {variant === 'carousel' ? (
                    partners.length <= CENTERED_CAROUSEL_MAX ? (
                        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
                            {partners.map((partner) => (
                                <PartnerCarouselCard
                                    key={partner.id}
                                    name={partner.name}
                                    logoUrl={partner.logo_url}
                                    className="w-auto max-w-[180px] sm:max-w-[220px]"
                                />
                            ))}
                        </div>
                    ) : (
                        <TililaHorizontalCarousel
                            ariaLabel={carouselLabel ?? 'Partners'}
                            slideClassName={PARTNER_CAROUSEL_SLIDE_CLASS}
                            fadeFrom={fadeFrom}
                            autoAdvanceMs={4500}
                        >
                            {partners.map((partner) => (
                                <PartnerCarouselCard
                                    key={partner.id}
                                    name={partner.name}
                                    logoUrl={partner.logo_url}
                                />
                            ))}
                        </TililaHorizontalCarousel>
                    )
                ) : (
                    <div
                        className={`grid gap-4 ${
                            compact
                                ? 'grid-cols-2 sm:grid-cols-3'
                                : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                        }`}
                    >
                        {partners.map((partner) => (
                            <div
                                key={partner.id}
                                className="flex items-center justify-center rounded-xl border border-border/40 bg-twhite px-3 py-4"
                            >
                                <PartnerLogoTile
                                    name={partner.name}
                                    logoUrl={partner.logo_url}
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function ProgramTitle({ program }) {
    const labels = PROGRAM_LABELS[program];

    return (
        <h3
            className={`text-sm font-extrabold tracking-[0.14em] uppercase sm:text-base ${labels.accent}`}
        >
            <TransText en={labels.en} fr={labels.fr} ar={labels.ar} />
        </h3>
    );
}

export function ProgramPartnersBlock({
    program,
    showProgramTitle = false,
    institutionalOnly = false,
    mediaOnly = false,
    compact = false,
    variant = 'grid',
    fadeFrom = 'from-beta-white',
    className = '',
}) {
    const { partners = [] } = usePage().props;
    const { institutional, media } = groupedProgramPartners(partners, program);
    const carouselProps =
        variant === 'carousel' ? { variant, fadeFrom } : { variant };

    const showInstitutional = !mediaOnly && institutional.length > 0;
    const showMedia = !institutionalOnly && media.length > 0;

    if (!showInstitutional && !showMedia) {
        return null;
    }

    return (
        <div className={className}>
            {showProgramTitle ? <ProgramTitle program={program} /> : null}

            <div
                className={
                    showProgramTitle ? 'mt-6 space-y-8' : 'space-y-8'
                }
            >
                {showInstitutional ? (
                    <PartnerCategoryGrid
                        title={
                            <TransText
                                en="Institutional partners"
                                fr="Partenaires institutionnels"
                                ar="شركاء مؤسساتيون"
                            />
                        }
                        partners={institutional}
                        compact={compact}
                        carouselLabel={`${program} institutional partners`}
                        {...carouselProps}
                    />
                ) : null}
                {showMedia ? (
                    <PartnerCategoryGrid
                        title={
                            <TransText
                                en="Media partners"
                                fr="Partenaires médias"
                                ar="شركاء إعلاميون"
                            />
                        }
                        partners={media}
                        compact={compact}
                        carouselLabel={`${program} media partners`}
                        {...carouselProps}
                    />
                ) : null}
            </div>
        </div>
    );
}

/** Home: institutional partners, then all media in one carousel. */
export function HomePartnersContent({ className = '' }) {
    const { partners = [] } = usePage().props;
    const tilila = groupedProgramPartners(partners, 'tilila');
    const mediaPartners = combinedHomeMediaPartners(partners);
    const carouselProps = {
        variant: 'carousel',
        fadeFrom: 'from-beta-white',
    };

    return (
        <div className={`space-y-12 ${className}`}>
            <PartnerCategoryGrid
                title={
                    <TransText
                        en="Institutional partners"
                        fr="Partenaires institutionnels"
                        ar="شركاء مؤسساتيون"
                    />
                }
                partners={tilila.institutional}
                carouselLabel="Institutional partners"
                {...carouselProps}
            />

            <PartnerCategoryGrid
                title={
                    <TransText
                        en="Media partners"
                        fr="Partenaires médias"
                        ar="شركاء إعلاميون"
                    />
                }
                partners={mediaPartners}
                carouselLabel="Media partners"
                {...carouselProps}
            />
        </div>
    );
}

export default function ProgramPartnersGrouped({
    program,
    showProgramTitle = false,
    compact = false,
    variant = 'grid',
    fadeFrom = 'from-beta-white',
    className = '',
}) {
    return (
        <ProgramPartnersBlock
            program={program}
            showProgramTitle={showProgramTitle}
            compact={compact}
            variant={variant}
            fadeFrom={fadeFrom}
            className={className}
        />
    );
}
