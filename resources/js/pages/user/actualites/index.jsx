import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';
import ActualitesFeaturedSection from '@/pages/user/actualites/partials/ActualitesFeaturedSection';
import ActualitesGallerySection from '@/pages/user/actualites/partials/ActualitesGallerySection';
import ActualitesHero from '@/pages/user/actualites/partials/ActualitesHero';
import ActualitesLatestSection from '@/pages/user/actualites/partials/ActualitesLatestSection';
import ActualitesNewsletterCard from '@/pages/user/actualites/partials/ActualitesNewsletterCard';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

export default function ActualitesIndex({ news = [], galleryImages = [] }) {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('actualites.pageTitle')} />

            <div className="min-h-screen bg-twhite">
                <ActualitesHero />

                <div className="relative z-10 -mt-6 rounded-t-3xl bg-twhite shadow-[0_-8px_30px_rgba(26,35,126,0.06)] sm:-mt-8">
                    <ActualitesFeaturedSection news={news} />
                </div>

                <ActualitesLatestSection news={news} />

                <section className="border-t border-border/40 bg-twhite py-12 sm:py-14">
                    <TililaContainer>
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-12">
                            <ActualitesGallerySection images={galleryImages} />
                            <ActualitesNewsletterCard />
                        </div>
                    </TililaContainer>
                </section>
            </div>
        </>
    );
}

ActualitesIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
