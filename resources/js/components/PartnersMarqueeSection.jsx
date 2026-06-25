import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import {
    combinedHomeMediaPartners,
    groupedProgramPartners,
} from '@/lib/programPartners';
import { cn } from '@/lib/utils';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const MARQUEE_CELL = {
    default: 'w-[11rem] sm:w-[12.5rem] lg:w-[14rem]',
    compact: 'w-[9rem] sm:w-[10rem] lg:w-[11rem]',
};

const DEFAULT_DESCRIPTIONS = {
    home: {
        en: 'Institutions and media standing with Tilila — organized in two clear tiers that power our programmes nationwide.',
        fr: "Des institutions et des médias aux côtés de Tilila — deux niveaux de partenariat qui soutiennent nos programmes à l'échelle nationale.",
        ar: 'مؤسسات وإعلام إلى جانب تيليلا — مستويان من الشراكة يدعمان برامجنا على الصعيد الوطني.',
    },
    tilila: {
        en: 'Institutional and media partners associated with Tilila Awards.',
        fr: 'Partenaires institutionnels et médias associés aux Tilila Awards.',
        ar: 'الشركاء المؤسساتيون والإعلاميون المرتبطون بتيليلا أووردز.',
    },
    tililab: {
        en: 'Institutional and media partners supporting Tililab.',
        fr: 'Partenaires institutionnels et médias qui soutiennent Tililab.',
        ar: 'الشركاء المؤسساتيون والإعلاميون الذين يدعمون تيليلاب.',
    },
};

function buildMarqueeLoop(partners, minItems = 6) {
    if (partners.length === 0) {
        return [];
    }

    let loop = [...partners];
    while (loop.length < minItems) {
        loop = [...loop, ...partners];
    }

    return loop;
}

function resolvePartnerGroups(program, partners) {
    if (program === 'home') {
        const tilila = groupedProgramPartners(partners, 'tilila');

        return {
            institutional: tilila.institutional,
            media: combinedHomeMediaPartners(partners),
        };
    }

    return groupedProgramPartners(partners, program);
}

const PartnerLogoCell = memo(function PartnerLogoCell({
    partner,
    compact = false,
    className = '',
}) {
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
            width={160}
            height={64}
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
        'group grid h-full w-full place-items-center border-border/50 bg-twhite p-4 transition duration-300 hover:bg-alpha-blue/25 sm:p-5',
        compact ? 'min-h-[5.5rem] sm:min-h-[6rem]' : 'min-h-[7rem] sm:min-h-[8rem]',
        className,
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
});

const PartnerMarquee = memo(function PartnerMarquee({
    partners,
    compact = false,
    ariaLabel,
}) {
    const { locale } = useTranslation();
    const isRtl = locale === 'ar';

    const loopPartners = useMemo(
        () => buildMarqueeLoop(partners, compact ? 8 : 6),
        [partners, compact],
    );

    const track = useMemo(
        () => [...loopPartners, ...loopPartners],
        [loopPartners],
    );

    const durationSec = Math.max(22, loopPartners.length * (compact ? 3.2 : 4));

    if (partners.length === 0) {
        return null;
    }

    const cellWidth = compact ? MARQUEE_CELL.compact : MARQUEE_CELL.default;

    return (
        <div
            className="partner-marquee group/marquee relative overflow-hidden"
            aria-label={ariaLabel}
        >
            <div
                className="pointer-events-none absolute inset-y-0 start-0 z-10 w-10 bg-linear-to-e from-twhite to-transparent"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute inset-y-0 end-0 z-10 w-10 bg-linear-to-l from-twhite to-transparent"
                aria-hidden
            />

            <div
                className={cn(
                    'partner-marquee-track flex w-max',
                    isRtl && 'partner-marquee-track-rtl',
                )}
                style={{
                    '--marquee-duration': `${durationSec}s`,
                }}
            >
                {track.map((partner, index) => (
                    <div
                        key={`${partner.id}-${index}`}
                        className={cn(
                            'shrink-0 border-e border-border/50',
                            cellWidth,
                        )}
                    >
                        <PartnerLogoCell partner={partner} compact={compact} />
                    </div>
                ))}
            </div>
        </div>
    );
});

function EmptyTierMessage() {
    return (
        <div className="grid min-h-28 place-items-center border border-dashed border-border/70 bg-twhite/80 p-8 text-center">
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

function PartnerTier({
    accent,
    label,
    count,
    partners,
    compact = false,
    marqueeLabel,
}) {
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
                        'grid place-items-center px-2 py-6 text-center lg:py-8',
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

                <div className="overflow-hidden border-t border-border/50 lg:border-t-0 lg:border-s lg:border-border/50">
                    {partners.length > 0 ? (
                        <PartnerMarquee
                            partners={partners}
                            compact={compact}
                            ariaLabel={marqueeLabel}
                        />
                    ) : (
                        <EmptyTierMessage />
                    )}
                </div>
            </div>
        </section>
    );
}

function SectionIntro({ description, showCta }) {
    return (
        <div className="tilila-section-fade grid gap-6 border-s-4 border-beta-blue ps-5 sm:ps-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
            <div className="max-w-2xl">
                {/* <p className="text-[11px] font-bold tracking-[0.22em] text-beta-turquoise uppercase">
                    <TransText
                        en="Ecosystem"
                        fr="Écosystème"
                        ar="المنظومة"
                    />
                </p> */}
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-tblack sm:text-3xl lg:text-[2rem]">
                    <TransText
                        en="Partners"
                        fr="Partenaires"
                        ar="الشركاء"
                    />
                </h2>
                {/* <p className="mt-3 text-sm leading-relaxed text-tgray sm:text-base">
                    {description}
                </p> */}
            </div>

            {/* {showCta ? (
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
            ) : null} */}
        </div>
    );
}

export default function PartnersMarqueeSection({
    id = 'partners',
    program = 'home',
    description,
    showCta = true,
    className = 'border-t border-border/50 bg-[#fafafa]',
}) {
    const { partners = [] } = usePage().props;
    const { institutional, media } = resolvePartnerGroups(program, partners);

    const institutionalCount = String(institutional.length).padStart(2, '0');
    const mediaCount = String(media.length).padStart(2, '0');

    const descriptionNode =
        description ??
        (DEFAULT_DESCRIPTIONS[program] ? (
            <TransText
                en={DEFAULT_DESCRIPTIONS[program].en}
                fr={DEFAULT_DESCRIPTIONS[program].fr}
                ar={DEFAULT_DESCRIPTIONS[program].ar}
            />
        ) : null);

    return (
        <TililaSection id={id} className={className}>
            <TililaContainer>
                <SectionIntro description={descriptionNode} showCta={showCta} />

                <div className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
                    <div className="tilila-section-fade">
                        <PartnerTier
                            accent={{
                                rail: 'bg-linear-to-b from-[#5a3d96] to-beta-blue',
                                ring: 'ring-brand-light-purple/15',
                            }}
                            // count={institutionalCount}
                            marqueeLabel="Institutional partners"
                            label={
                                <TransText
                                    en="Institutional"
                                    fr="Institutionnels"
                                    ar="مؤسسات"
                                />
                            }
                            partners={institutional}
                        />
                    </div>

                    <div
                        className="tilila-section-fade"
                        style={{ '--stagger-i': 1 }}
                    >
                        <PartnerTier
                            accent={{
                                rail: 'bg-linear-to-b from-[#0d9488] to-beta-turquoise',
                                ring: 'ring-beta-turquoise/15',
                            }}
                            // count={mediaCount}
                            marqueeLabel="Media partners"
                            label={
                                <TransText
                                    en="Media"
                                    fr="Médias"
                                    ar="إعلام"
                                />
                            }
                            partners={media}
                            compact
                        />
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
