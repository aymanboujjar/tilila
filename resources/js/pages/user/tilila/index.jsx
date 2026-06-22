import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TililaAdmissionJurySection from '@/pages/user/tilila/partials/TililaAdmissionJurySection';
import TililaBottomSection from '@/pages/user/tilila/partials/TililaBottomSection';
import TililaHero from '@/pages/user/tilila/partials/TililaHero';
import TililaKeyDatesSection from '@/pages/user/tilila/partials/TililaKeyDatesSection';
import TililaPrizesSection from '@/pages/user/tilila/partials/TililaPrizesSection';
import { TililaFaqSection } from '@/pages/user/tilila/partials/ProgramSections';
import TililaStatsBenefitsSection from '@/pages/user/tilila/partials/TililaStatsBenefitsSection';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililaIndex() {
    const { currentEdition, editions, flash } = usePage().props;

    return (
        <>
            <TililaHead />
            <div>
                {flash?.success ? (
                    <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-900">
                        {flash.success}
                    </div>
                ) : null}

                <TililaHero videoUrl={usePage().props.teaserVideoUrl} />
                <TililaStatsBenefitsSection />
                <TililaPrizesSection />
                <TililaKeyDatesSection />
                <TililaAdmissionJurySection jury={currentEdition?.jury} />
                <TililaFaqSection />

                <TililaBottomSection />

                {/* <TililaPartnersFullSection /> */}
            </div>
        </>
    );
}

TililaIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

function TililaHead() {
    const { t } = useTranslation();
    return <Head title={t('tilila.headTitle')} />;
}
