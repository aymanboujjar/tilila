import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TililabAdmissionJurySection from '@/pages/user/tililab/partials/TililabAdmissionJurySection';
import TililabApplySection from '@/pages/user/tililab/partials/TililabApplySection';
import TililabHero from '@/pages/user/tililab/partials/TililabHero';
import TililabKeyDatesSection from '@/pages/user/tililab/partials/TililabKeyDatesSection';
import TililabArchivesHubSection from '@/pages/user/tililab/partials/TililabArchivesHubSection';
import TililabPartnersSection from '@/pages/user/tililab/partials/TililabPartnersSection';
import TililabPrizesSection from '@/pages/user/tililab/partials/TililabPrizesSection';
import TililabStatsBenefitsSection from '@/pages/user/tililab/partials/TililabStatsBenefitsSection';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililabIndex() {
    const { flash } = usePage().props;

    return (
        <>
            <TililabHead />
            <div>
                {flash?.success ? (
                    <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-900">
                        {flash.success}
                    </div>
                ) : null}

                <TililabHero />
                <TililabStatsBenefitsSection />
                <TililabKeyDatesSection />
                <TililabPrizesSection />
                <TililabAdmissionJurySection />
                <TililabArchivesHubSection />
                <TililabPartnersSection />
                <TililabApplySection />
            </div>
        </>
    );
}

TililabIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

function TililabHead() {
    const { t } = useTranslation();
    return <Head title={t('tililab.headTitle')} />;
}
