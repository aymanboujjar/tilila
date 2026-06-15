import { Head, usePage } from '@inertiajs/react';
import TililabProgramLayout from '@/layouts/tililab-program-layout';
import TililabAdmissionJurySection from '@/pages/user/tililab/partials/TililabAdmissionJurySection';
import TililabBottomSection from '@/pages/user/tililab/partials/TililabBottomSection';
import TililabHero from '@/pages/user/tililab/partials/TililabHero';
import TililabKeyDatesSection from '@/pages/user/tililab/partials/TililabKeyDatesSection';
import TililabPrizesSection from '@/pages/user/tililab/partials/TililabPrizesSection';
import TililabStatsBenefitsSection from '@/pages/user/tililab/partials/TililabStatsBenefitsSection';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililabIndex() {
    const { currentEdition, flash } = usePage().props;

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
                <TililabPrizesSection />
                <TililabKeyDatesSection />
                <TililabAdmissionJurySection jury={currentEdition?.jury} />
                <TililabBottomSection />
            </div>
        </>
    );
}

TililabIndex.layout = (page) => (
    <TililabProgramLayout>{page}</TililabProgramLayout>
);

function TililabHead() {
    const { t } = useTranslation();
    return <Head title={t('tililab.headTitle')} />;
}
