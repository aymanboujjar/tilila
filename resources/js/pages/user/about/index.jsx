import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import AboutGalleryStrip from '@/pages/user/about/partials/AboutGalleryStrip';
import CommitteeSection from '@/pages/user/about/partials/CommitteeSection';
import HeroSection from '@/pages/user/about/partials/HeroSection';
import MissionSection, {
    AboutValuesSection,
} from '@/pages/user/about/partials/MissionSection';
import { useTranslation } from '@/contexts/TranslationContext';

function scrollToHashSection() {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) {
        return;
    }

    const target = document.getElementById(hash);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

export default function About() {
    useEffect(() => {
        scrollToHashSection();
    }, []);

    return (
        <>
            {/* <AboutHead /> */}
            <div className="bg-twhite">
                <HeroSection />
                <AboutGalleryStrip />
                <MissionSection />
                <CommitteeSection />
                <AboutValuesSection />
            </div>
        </>
    );
}

About.layout = (page) => <AppLayout>{page}</AppLayout>;

function AboutHead() {
    const { t } = useTranslation();
    return <Head title={t('about.headTitle')} />;
}
