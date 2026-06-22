import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TililaAdmissionJurySection from '@/pages/user/tilila/partials/TililaAdmissionJurySection';
import TililaCategoriesSection from '@/pages/user/tilila/partials/TililaCategoriesSection';
import TililaFinalCtaSection from '@/pages/user/tilila/partials/TililaFinalCtaSection';
import TililaHero from '@/pages/user/tilila/partials/TililaHero';
import TililaLaureatesSection from '@/pages/user/tilila/partials/TililaLaureatesSection';
import TililaPrizesSection from '@/pages/user/tilila/partials/TililaPrizesSection';
import { TililaFaqSection } from '@/pages/user/tilila/partials/ProgramSections';
import TililaStatsBenefitsSection from '@/pages/user/tilila/partials/TililaStatsBenefitsSection';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililaIndex() {
    const { currentEdition, flash } = usePage().props;

    return (
        <>
            <TililaHead />
            <div>
                {flash?.success ? (
                    <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-900">
                        {flash.success}
                    </div>
                ) : null}

                <TililaHero />
                <TililaStatsBenefitsSection />
                <TililaCategoriesSection />
                <TililaPrizesSection />
                <TililaLaureatesSection />
                <TililaAdmissionJurySection jury={currentEdition?.jury} />
                <TililaFinalCtaSection />
                {/* <TililaFaqSection /> */}
            </div>
        </>
    );
}

TililaIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

function TililaHead() {
    const { t } = useTranslation();
    return <Head title={t('tilila.headTitle')} />;
}
