import { Award, Gavel } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    StaggerItem,
    StaggerReveal,
} from '@/components/motion/home-motion';
import EditionInfiniteMarquee from '@/components/program/edition/EditionInfiniteMarquee';
import {
    EditionMotionSection,
    MotionCard,
} from '@/components/program/edition/EditionPageMotion';
import ArchivesBootcampSection, {
    EditionBootcampSchedule,
} from '@/pages/user/tilila/archives/components/ArchivesBootcampSection';
import { ArchivesPhotoSlide } from '@/pages/user/tilila/archives/components/ArchivesMediaCarousel';
import ArchivesSectionHeading from '@/pages/user/tilila/archives/components/ArchivesSectionHeading';
import { TililaIconBadge } from '@/pages/user/tilila/partials/TililaUi';
import {
    resolveWinnerDisplay,
    storageAssetSrc,
} from '@/pages/user/tilila/utils/winnerFields';

function textFor(obj, locale) {
    return obj?.[locale] || obj?.fr || obj?.en || obj?.ar || '';
}

const CARD_CLASS =
    'h-full overflow-hidden rounded-2xl border border-border/50 bg-twhite shadow-[0_4px_24px_rgba(68,25,168,0.08)]';

function PersonPortrait({ path, alt }) {
    const src = storageAssetSrc(path);
    if (!src) return null;

    return (
        <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
        />
    );
}

function WinnerCard({ winner, locale }) {
    const { campaign, agency, agencyPhoto } = resolveWinnerDisplay(winner);
    const trophy = textFor(winner.trophy, locale);
    const bio = textFor(winner.bio, locale);
    const hasCampaign = Boolean(textFor(campaign, locale));
    const hasAgency = Boolean(textFor(agency, locale));
    const photoSrc = storageAssetSrc(winner.photo_path);

    return (
        <MotionCard
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-twhite shadow-[0_4px_24px_rgba(68,25,168,0.08)] lg:flex-row"
        >
            <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-alpha-blue/40 sm:aspect-[5/4] lg:aspect-auto lg:w-[42%] lg:min-h-[280px]">
                {photoSrc ? (
                    <PersonPortrait
                        path={winner.photo_path}
                        alt={winner.full_name}
                    />
                ) : (
                    <div className="flex h-full min-h-[220px] items-center justify-center">
                        <TililaIconBadge icon={Award} className="size-14" />
                    </div>
                )}
                {trophy ? (
                    <span className="absolute start-4 top-4 max-w-[calc(100%-2rem)] rounded-full bg-beta-blue px-3 py-1 text-[10px] font-extrabold tracking-[0.1em] text-twhite uppercase shadow-lg">
                        {trophy}
                    </span>
                ) : null}
            </div>

            <div className="flex flex-1 flex-col justify-center gap-3 p-5 sm:p-6">
                <h3 className="text-xl font-extrabold tracking-tight text-tblack sm:text-2xl">
                    {winner.full_name}
                </h3>

                {hasCampaign ? (
                    <p className="text-sm leading-relaxed text-tgray">
                        <span className="font-bold text-beta-blue">
                            <TransText
                                en="Campaign"
                                fr="Campagne"
                                ar="الحملة"
                            />
                            {': '}
                        </span>
                        {textFor(campaign, locale)}
                    </p>
                ) : null}

                {hasAgency ? (
                    <div className="flex items-start gap-3">
                        {agencyPhoto ? (
                            <img
                                src={agencyPhoto}
                                alt=""
                                className="mt-0.5 h-9 max-w-20 object-contain"
                                loading="lazy"
                                decoding="async"
                            />
                        ) : null}
                        <p className="text-sm leading-relaxed text-tgray">
                            <span className="font-bold text-beta-blue">
                                <TransText
                                    en="Agency"
                                    fr="Agence"
                                    ar="الوكالة"
                                />
                                {': '}
                            </span>
                            {textFor(agency, locale)}
                        </p>
                    </div>
                ) : null}

                {!hasCampaign && !hasAgency && bio ? (
                    <p className="text-sm leading-relaxed text-tgray">
                        {bio}
                    </p>
                ) : null}
            </div>
        </MotionCard>
    );
}

function JuryCarouselCard({ member, locale }) {
    const role = textFor(member.bio, locale);
    const photoSrc = storageAssetSrc(member.photo_path);

    return (
        <MotionCard className={`${CARD_CLASS} group`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-alpha-blue/30">
                {photoSrc ? (
                    <PersonPortrait
                        path={member.photo_path}
                        alt={member.full_name}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <TililaIconBadge icon={Gavel} className="size-12" />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h3 className="text-base font-extrabold text-tblack">
                    {member.full_name}
                </h3>
                {role ? (
                    <p className="line-clamp-4 text-sm leading-relaxed text-tgray">
                        {role}
                    </p>
                ) : null}
            </div>
        </MotionCard>
    );
}

function EmptyState({ children }) {
    return (
        <p className="mt-8 rounded-2xl border border-dashed border-beta-blue/25 bg-beta-white px-6 py-12 text-center text-sm leading-relaxed text-tgray">
            {children}
        </p>
    );
}

export function EditionPageWinnersSection({
    winners = [],
    locale,
    isCurrent,
    pendingMessage,
}) {
    const heading = (
        <ArchivesSectionHeading
            kicker={
                <TransText en="Winners" fr="Lauréats" ar="الفائزون" />
            }
            title={
                isCurrent ? (
                    <TransText en="To be announced" fr="À venir" ar="قريبًا" />
                ) : (
                    <TransText
                        en="Laureates"
                        fr="Palmarès"
                        ar="الفائزون"
                    />
                )
            }
        />
    );

    if (isCurrent || !winners.length) {
        return (
            <EditionMotionSection id="winners">
                {heading}
                <EmptyState>
                    <TransText
                        en={pendingMessage.en}
                        fr={pendingMessage.fr}
                        ar={pendingMessage.ar}
                    />
                </EmptyState>
            </EditionMotionSection>
        );
    }

    return (
        <EditionMotionSection id="winners">
            {heading}
            <StaggerReveal
                className={`mt-8 grid gap-6 ${
                    winners.length === 1
                        ? 'grid-cols-1'
                        : 'grid-cols-1 xl:grid-cols-2'
                }`}
            >
                {winners.map((winner, index) => (
                    <StaggerItem key={`${winner.full_name}-${index}`}>
                        <WinnerCard winner={winner} locale={locale} />
                    </StaggerItem>
                ))}
            </StaggerReveal>
        </EditionMotionSection>
    );
}

export function EditionPageJurySection({ jury = [], locale }) {
    const heading = (
        <ArchivesSectionHeading
            kicker={
                <TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />
            }
            title={
                <TransText
                    en="Jury members"
                    fr="Membres du jury"
                    ar="أعضاء لجنة التحكيم"
                />
            }
        />
    );

    if (!jury.length) {
        return (
            <EditionMotionSection id="jury">
                {heading}
                <EmptyState>
                    <TransText
                        en="Jury members for this edition will be published soon."
                        fr="Les membres du jury de cette édition seront publiés prochainement."
                        ar="سيُنشر أعضاء لجنة التحكيم لهذه الدورة قريبًا."
                    />
                </EmptyState>
            </EditionMotionSection>
        );
    }

    return (
        <EditionMotionSection id="jury">
            {heading}
            <div className="mt-8">
                <EditionInfiniteMarquee
                    items={jury}
                    ariaLabel="Edition jury"
                    slideClassName="w-[15.5rem] shrink-0 sm:w-[16.5rem]"
                    minItems={6}
                    durationMultiplier={5}
                    renderItem={(member) => (
                        <JuryCarouselCard member={member} locale={locale} />
                    )}
                />
            </div>
        </EditionMotionSection>
    );
}

export function EditionPageBootcampSection({ bootcamp, locale }) {
    if (!bootcamp || typeof bootcamp !== 'object') {
        return null;
    }

    return (
        <EditionMotionSection id="bootcamp">
            <ArchivesSectionHeading
                kicker={
                    <TransText en="Bootcamp" fr="Bootcamp" ar="المعسكر" />
                }
                title={
                    <TransText
                        en="Programme"
                        fr="Programme"
                        ar="البرنامج"
                    />
                }
            />
            <div className="mt-8 -mx-1 sm:mx-0">
                <EditionBootcampSchedule bootcamp={bootcamp} locale={locale} />
            </div>
        </EditionMotionSection>
    );
}

export function EditionPageGallerySection({ images = [], galleryTitle }) {
    const rows = Array.isArray(images) ? images : [];

    if (!rows.length) {
        return (
            <EditionMotionSection id="gallery">
                <ArchivesSectionHeading
                    kicker={
                        <TransText en="Gallery" fr="Galerie" ar="المعرض" />
                    }
                    title={
                        <TransText
                            en={galleryTitle.en}
                            fr={galleryTitle.fr}
                            ar={galleryTitle.ar}
                        />
                    }
                />
                <EmptyState>
                    <TransText
                        en="No photos published for this edition yet."
                        fr="Aucune photo publiée pour cette édition."
                        ar="لا توجد صور منشورة لهذه الدورة بعد."
                    />
                </EmptyState>
            </EditionMotionSection>
        );
    }

    return (
        <EditionMotionSection id="gallery">
            <ArchivesSectionHeading
                kicker={
                    <TransText en="Gallery" fr="Galerie" ar="المعرض" />
                }
                title={
                    <TransText
                        en={galleryTitle.en}
                        fr={galleryTitle.fr}
                        ar={galleryTitle.ar}
                    />
                }
            />
            <div className="mt-8">
                <EditionInfiniteMarquee
                    items={rows}
                    ariaLabel="Edition gallery"
                    slideClassName="w-[18rem] shrink-0 sm:w-[22rem] lg:w-[26rem]"
                    minItems={5}
                    durationMultiplier={6}
                    renderItem={(path) => (
                        <ArchivesPhotoSlide
                            src={storageAssetSrc(path)}
                            href={storageAssetSrc(path)}
                            className="shadow-[0_8px_32px_rgba(68,25,168,0.1)]"
                        />
                    )}
                />
            </div>
        </EditionMotionSection>
    );
}
