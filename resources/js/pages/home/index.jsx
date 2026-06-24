import { Head } from '@inertiajs/react';
import HomeHero from '@/pages/home/Partials/HomeHero';
import HomeKeyFigures from '@/pages/home/Partials/HomeKeyFigures';
// import HomeNews from '@/pages/home/Partials/HomeNews';
import HomePartners from '@/pages/home/Partials/HomePartners';
import HomeProgramCards from '@/pages/home/Partials/HomeProgramCards';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';

export default function HomeIndex({ news = [] }) {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('home.headTitle')} />

            <HomeHero />
            <HomeProgramCards />
            <HomeKeyFigures />
            {/* <HomeNews items={news} /> */}
            <HomePartners />
        </>
    );
}

HomeIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
