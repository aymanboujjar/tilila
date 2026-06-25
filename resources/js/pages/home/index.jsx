import { Head } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import HomeHero from '@/pages/home/Partials/HomeHero';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';

const HomeProgramCards = lazy(
    () => import('@/pages/home/Partials/HomeProgramCards'),
);
const HomeKeyFigures = lazy(
    () => import('@/pages/home/Partials/HomeKeyFigures'),
);
const HomePartners = lazy(() => import('@/pages/home/Partials/HomePartners'));

function SectionFallback({ className = 'min-h-[280px]' }) {
    return <div className={className} aria-hidden />;
}

export default function HomeIndex() {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('home.headTitle')} />

            <HomeHero />

            <Suspense fallback={<SectionFallback className="min-h-[320px]" />}>
                <HomeProgramCards />
            </Suspense>

            <Suspense fallback={<SectionFallback className="min-h-[480px]" />}>
                <HomeKeyFigures />
            </Suspense>

            <Suspense fallback={<SectionFallback className="min-h-[360px]" />}>
                <HomePartners />
            </Suspense>
        </>
    );
}

HomeIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
