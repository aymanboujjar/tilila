import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ArchiveSection from '@/pages/user/tilila/partials/ArchiveSection';
import CtaSection from '@/pages/user/tilila/partials/CtaSection';
import FeaturedLaureatesSection from '@/pages/user/tilila/partials/FeaturedLaureatesSection';
import HeroSection from '@/pages/user/tilila/partials/HeroSection';
import ParticipateModal from '@/pages/user/tilila/partials/ParticipateModal';
import { useTranslation } from '@/contexts/TranslationContext';
import { useState } from 'react';

export default function TililaIndex() {
    const { editions } = usePage().props;
    const [participateOpen, setParticipateOpen] = useState(false);
    // `editions` is provided by the /tilila route (Inertia props)
    return (
        <>
            <TililaHead />
            <div>
                <div className="pb-8">
                    <HeroSection onParticipate={() => setParticipateOpen(true)} />
                </div>
                <div className="bg-twhite px-8 py-10">
                    <FeaturedLaureatesSection />
                </div>
                <div className="bg-beta-white py-10">
                    <ArchiveSection editions={editions ?? []} />
                </div>
                <div className="bg-twhite py-10">
                    <CtaSection />
                </div>
            </div>

            <ParticipateModal open={participateOpen} onOpenChange={setParticipateOpen} />
        </>
    );
}

TililaIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

function TililaHead() {
    const { t } = useTranslation();
    return <Head title={t('tilila.headTitle')} />;
}
