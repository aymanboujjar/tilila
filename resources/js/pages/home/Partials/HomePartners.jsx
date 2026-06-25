import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import TransText from '@/components/TransText';
import {
    combinedHomeMediaPartners,
    groupedProgramPartners,
} from '@/lib/programPartners';
import { cn } from '@/lib/utils';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

function PartnerLogoCell({ partner, compact = false }) {
    const [imgError, setImgError] = useState(false);
    const showImage = partner.logo_url && !imgError;

    const content = showImage ? (
        <img
            src={partner.logo_url}
            alt={`${partner.name} logo`}
            className={cn(
                'max-w-full object-contain opacity-80 transition duration-300 group-hover:opacity-100 group-hover:grayscale-0',
                compact
                    ? 'max-h-10 sm:max-h-12'
                    : 'max-h-14 grayscale sm:max-h-16',
            )}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
        />
    ) : (
        <span
            className={cn(
                'text-center font-bold tracking-wide text-tgray uppercase',
                compact ? 'text-[10px]' : 'text-xs',
            )}
        >
            {partner.name}
        </span>
    );

    const cellClass = cn(
        'group grid place-items-center border-border/50 bg-twhite p-4 transition duration-300 hover:bg-alpha-blue/25 sm:p-5',
        compact ? 'min-h-[5.5rem] sm:min-h-[6rem]' : 'min-h-[7rem] sm:min-h-[8rem]',
    );

    if (partner.url) {
        return (
            <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cellClass}
                aria-label={partner.name}
            >
                {content}
            </a>
        );
    }

    return <div className={cellClass}>{content}</div>;
}

function EmptyTierMessage() {
    return (
        <div className="grid min-h-[7rem] place-items-center border border-dashed border-border/70 bg-twhite/80 p-8 text-center">
            <p className="text-sm text-tgray">
                <TransText
                    en="Partner logos will appear here when published."
                    fr="Les logos partenaires apparaîtront ici une fois publiés."
                    ar="ستظهر شعارات الشركاء هنا عند نشرها."
                />
            </p>
        </div>
    );
}

function PartnerTier({ accent, label, count, partners, compact = false }) {
    const cols = compact
        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

    return (
        <section
            className={cn(
                'overflow-hidden rounded-2xl border border-border/60 bg-twhite shadow-sm',
                accent.ring,
            )}
        >
            <div className="grid grid-cols-1 lg:grid-cols-[11rem_1fr]">
                <div
                    className={cn(
                        'grid place-items-center px-4 py-6 text-center lg:py-8',
                        accent.rail,
                    )}
                >
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] text-twhite/70 uppercase">
                            {count}
                        </p>
                        <h3 className="mt-2 text-sm font-extrabold leading-tight tracking-[0.08em] text-twhite uppercase sm:text-base">
                            {label}
                        </h3>
                    </div>
                </div>

                <div className="border-t border-border/50 lg:border-t-0 lg:border-s lg:border-border/50">
                    {partners.length > 0 ? (
                        <div
                            className={cn(
                                'grid divide-x divide-y divide-border/50',
                                cols,
                            )}
                        >
                            {partners.map((partner) => (
                                <PartnerLogoCell
                                    key={partner.id}
                                    partner={partner}
                                    compact={compact}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyTierMessage />
                    )}
                </div>
            </div>
        </section>
    );
}

function SectionIntro() {
    return (
        <div className="grid gap-6 border-s-4 border-beta-blue ps-5 sm:ps-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
            <div className="max-w-2xl">
                <p className="text-[11px] font-bold tracking-[0.22em] text-beta-turquoise uppercase">
                    <TransText
                        en="Ecosystem"
                        fr="Écosystème"
                        ar="المنظومة"
                    />
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-tblack sm:text-3xl lg:text-[2rem]">
                    <TransText
                        en="Partners"
                        fr="Partenaires"
                        ar="الشركاء"
                    />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-tgray sm:text-base">
                    <TransText
                        en="Institutions and media standing with Tilila — organized in two clear tiers that power our programmes nationwide."
                        fr="Des institutions et des médias aux côtés de Tilila — deux niveaux de partenariat qui soutiennent nos programmes à l’échelle nationale."
                        ar="مؤسسات وإعلام إلى جانب تيليلا — مستويان من الشراكة يدعمان برامجنا على الصعيد الوطني."
                    />
                </p>
            </div>

            <Link
                href="/contact"
                className="inline-grid w-fit place-items-center rounded-xl border-2 border-beta-blue px-5 py-3 text-xs font-bold tracking-[0.12em] text-beta-blue uppercase transition hover:bg-alpha-blue lg:justify-self-end"
            >
                <span className="inline-grid grid-flow-col items-center gap-2">
                    <TransText
                        en="Become a partner"
                        fr="Devenir partenaire"
                        ar="كن شريكًا"
                    />
                    <ArrowUpRight className="size-4" aria-hidden />
                </span>
            </Link>
        </div>
    );
}

export default function HomePartners() {
    const { partners = [] } = usePage().props;
    const tilila = groupedProgramPartners(partners, 'tilila');
    const mediaPartners = combinedHomeMediaPartners(partners);

    const institutionalCount = String(tilila.institutional.length).padStart(
        2,
        '0',
    );
    const mediaCount = String(mediaPartners.length).padStart(2, '0');

    return (
        <TililaSection
            id="partners"
            className="border-t border-border/50 bg-[#fafafa]"
        >
            <TililaContainer>
                <SectionIntro />

                <div className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
                    <PartnerTier
                        accent={{
                            rail: 'bg-linear-to-b from-[#5a3d96] to-beta-blue',
                            ring: 'ring-brand-light-purple/15',
                        }}
                        count={institutionalCount}
                        label={
                            <TransText
                                en="Institutional"
                                fr="Institutionnels"
                                ar="مؤسسات"
                            />
                        }
                        partners={tilila.institutional}
                    />

                    <PartnerTier
                        accent={{
                            rail: 'bg-linear-to-b from-[#0d9488] to-beta-turquoise',
                            ring: 'ring-beta-turquoise/15',
                        }}
                        count={mediaCount}
                        label={
                            <TransText
                                en="Media"
                                fr="Médias"
                                ar="إعلام"
                            />
                        }
                        partners={mediaPartners}
                        compact
                    />
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
