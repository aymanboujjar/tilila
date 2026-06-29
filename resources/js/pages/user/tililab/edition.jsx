import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

import ProgramEditionPage from '@/components/program/edition/ProgramEditionPage';
import AppLayout from '@/layouts/app-layout';
import { resolveTililabHeroMedia } from '@/lib/editionHeroMedia';
import { coverImageSrc } from '@/pages/user/tililab/utils/editions';

export default function TililabEditionDetails() {
    const { edition } = usePage().props;

    const coverSrc = coverImageSrc(
        edition?.cover_image_path,
        edition?.gallery_images,
        edition?.winners,
    );

    const heroMedia = useMemo(
        () =>
            resolveTililabHeroMedia({
                ceremonyVideoPath: edition?.ceremony_video_path,
                ceremonyVideoUrl: edition?.ceremony_video_url,
                bannerSrc: coverSrc,
            }),
        [
            edition?.ceremony_video_path,
            edition?.ceremony_video_url,
            coverSrc,
        ],
    );

    return (
        <ProgramEditionPage
            program="tililab"
            edition={edition}
            heroMedia={heroMedia}
            coverSrc={coverSrc}
            pageTitle={`Tililab Edition ${edition?.year ?? ''}`}
        />
    );
}

TililabEditionDetails.layout = (page) => <AppLayout>{page}</AppLayout>;
