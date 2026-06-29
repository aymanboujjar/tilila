import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

import ProgramEditionPage from '@/components/program/edition/ProgramEditionPage';
import AppLayout from '@/layouts/app-layout';
import { useYoutubeAvailability } from '@/hooks/useYoutubeAvailability';
import { resolveTililaHeroMedia } from '@/lib/editionHeroMedia';
import { coverImageSrc } from '@/pages/user/tilila/utils/editions';

export default function TililaEditionDetails() {
    const { edition } = usePage().props;
    const ceremonyVideo = useYoutubeAvailability(edition?.ceremony_video_url);

    const coverSrc = coverImageSrc(
        edition?.cover_image_path,
        edition?.gallery_images,
    );

    const heroMedia = useMemo(
        () =>
            resolveTililaHeroMedia({
                ceremonyVideoUrl: ceremonyVideo.available
                    ? edition?.ceremony_video_url
                    : null,
                bannerSrc: coverSrc,
            }),
        [ceremonyVideo.available, edition?.ceremony_video_url, coverSrc],
    );

    return (
        <ProgramEditionPage
            program="tilila"
            edition={edition}
            heroMedia={heroMedia}
            coverSrc={coverSrc}
            pageTitle={`${edition?.year ?? ''} — Tilila Awards`}
            showCeremonyVideoCheck
        />
    );
}

TililaEditionDetails.layout = (page) => <AppLayout>{page}</AppLayout>;
