import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ProgramBottomSection from '@/components/program/ProgramBottomSection';
import ProgramSubNav from '@/components/program/ProgramSubNav';
import { ProgramContactSection, ProgramPartnersSection } from '@/components/program/ProgramSharedSections';
import TililabCandidatureBlock from '@/pages/user/tililab/partials/TililabCandidatureBlock';
import TililabHero from '@/pages/user/tililab/partials/TililabHero';
import TililabPastEditionsCarousel from '@/pages/user/tililab/partials/TililabPastEditionsCarousel';
import TililabStatsBenefitsSection from '@/pages/user/tililab/partials/TililabStatsBenefitsSection';
import KeyDatesSection from '@/pages/user/tililab/partials/KeyDatesSection';
import {
    TililabAdmissionSection,
    TililabFaqSection,
    TililabJourneySection,
    TililabPrizesSection,
} from '@/pages/user/tililab/partials/ProgramSections';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililabIndex() {
    const { currentEdition, editions, news } = usePage().props;

    return (
        <>
            <TililabHead />
            <ProgramSubNav program="tililab" />
            <div>
                <TililabHero />
                <TililabCandidatureBlock />
                <TililabStatsBenefitsSection />

                <div className="bg-beta-white">
                    <TililabJourneySection />
                    <TililabPrizesSection />
                </div>

                <div className="bg-background">
                    <TililabAdmissionSection />
                    <KeyDatesSection edition={currentEdition} />
                </div>

                <ProgramBottomSection
                    program="tililab"
                    news={news ?? []}
                    editionsSlot={
                        <div className="mt-6">
                            <TililabPastEditionsCarousel
                                editions={editions ?? []}
                                excludeEditionId={currentEdition?.id ?? null}
                                excludeYear={currentEdition?.year ?? null}
                                compact
                            />
                        </div>
                    }
                />

                <ProgramPartnersSection />

                <div className="border-t border-border bg-background">
                    <TililabFaqSection />
                </div>

                <ProgramContactSection program="tililab" />
            </div>
        </>
    );
}

TililabIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

function TililabHead() {
    const { t } = useTranslation();
    return <Head title={t('tililab.headTitle')} />;
}
