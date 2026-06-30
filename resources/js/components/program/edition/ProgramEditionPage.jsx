import { Head } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';

import EditionTopHero from '@/components/program/EditionTopHero';
import { EDITION_PAGE_CONFIG } from '@/components/program/edition/editionPageConfig';
import EditionPageHeroBand from '@/components/program/edition/EditionPageHeroBand';
import EditionPageSectionNav from '@/components/program/edition/EditionPageSectionNav';
import {
    EditionPageBootcampSection,
    EditionPageCeremonyVideoSection,
    EditionPageGallerySection,
    EditionPageJurySection,
    EditionPageWinnersSection,
} from '@/components/program/edition/EditionPageSections';
import { RevealOnScroll } from '@/components/motion/home-motion';
import { useTranslation } from '@/contexts/TranslationContext';
import { useYoutubeAvailability } from '@/hooks/useYoutubeAvailability';
import { textFor } from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

export default function ProgramEditionPage({
    program,
    edition,
    heroMedia,
    coverSrc,
    pageTitle,
    ceremonyVideoAtEnd = false,
}) {
    const { locale } = useTranslation();
    const config = EDITION_PAGE_CONFIG[program];
    const isCurrent = Boolean(edition?.is_current);

    const winners = useMemo(() => {
        if (isCurrent) return [];
        return Array.isArray(edition?.winners) ? edition.winners : [];
    }, [edition?.winners, isCurrent]);

    const jury = Array.isArray(edition?.jury) ? edition.jury : [];
    const images = Array.isArray(edition?.gallery_images)
        ? edition.gallery_images
        : [];

    const bootcamp =
        program === 'tililab' && edition?.bootcamp ? edition.bootcamp : null;

    const ceremonyVideo = useYoutubeAvailability(
        ceremonyVideoAtEnd ? edition?.ceremony_video_url : null,
    );

    const showTopHero =
        !ceremonyVideoAtEnd &&
        (Boolean(heroMedia?.uploadSrc) ||
            Boolean(heroMedia?.embedUrl) ||
            Boolean(heroMedia?.bannerSrc));

    const showCeremonySection = ceremonyVideoAtEnd && ceremonyVideo.available;

    const showTopHeroVideo =
        showTopHero &&
        (Boolean(heroMedia?.uploadSrc) || Boolean(heroMedia?.embedUrl));

    const label = textFor(edition?.edition_label, locale);
    const theme = textFor(edition?.theme, locale);

    useEffect(() => {
        const hash = window.location.hash.replace(/^#/, '');
        if (!hash) {
            return;
        }

        const target = document.getElementById(hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [edition?.id]);

    return (
        <>
            <Head title={pageTitle} />

            <EditionPageHeroBand
                year={edition?.year ?? ''}
                label={label}
                theme={theme}
                coverSrc={coverSrc}
                backHref={config.backHref}
                backLabel={config.backLabel}
                programName={config.programName}
                isCurrent={isCurrent}
                currentBadge={config.currentBadge}
            />

            <TililaSection className="bg-linear-to-b from-beta-white to-twhite pb-20">
                <TililaContainer>
                    {showTopHero ? (
                        <RevealOnScroll className="mb-10" y={32} scale={0.98}>
                            <EditionTopHero {...heroMedia} />
                        </RevealOnScroll>
                    ) : null}

                    <EditionPageSectionNav
                        isCurrent={isCurrent}
                        showCeremonyVideo={showCeremonySection}
                        showTopHeroVideo={showTopHeroVideo}
                        showBootcamp={Boolean(bootcamp)}
                    />

                    <div className="mt-12 space-y-16 sm:space-y-20">
                        <EditionPageWinnersSection
                            winners={winners}
                            edition={edition}
                            locale={locale}
                            isCurrent={isCurrent}
                            pendingMessage={config.winnersPending}
                        />
                        <EditionPageJurySection jury={jury} locale={locale} />
                        {bootcamp ? (
                            <EditionPageBootcampSection
                                bootcamp={bootcamp}
                                locale={locale}
                            />
                        ) : null}
                        <EditionPageGallerySection
                            images={images}
                            galleryTitle={config.galleryTitle}
                        />
                        {showCeremonySection ? (
                            <EditionPageCeremonyVideoSection
                                videoUrl={edition?.ceremony_video_url}
                                embedUrl={ceremonyVideo.embedUrl}
                                year={edition?.year}
                            />
                        ) : null}
                    </div>
                </TililaContainer>
            </TililaSection>
        </>
    );
}
