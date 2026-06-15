import { Head, usePage } from '@inertiajs/react';
import TililaAwardsLayout from '@/layouts/tilila-awards-layout';
import TililaAdmissionJurySection from '@/pages/user/tilila/partials/TililaAdmissionJurySection';
import TililaBottomSection from '@/pages/user/tilila/partials/TililaBottomSection';
import TililaHero from '@/pages/user/tilila/partials/TililaHero';
import TililaKeyDatesSection from '@/pages/user/tilila/partials/TililaKeyDatesSection';
import TililaPartnersFullSection from '@/pages/user/tilila/partials/TililaPartnersFullSection';
import TililaPastEditionsCarousel from '@/pages/user/tilila/partials/TililaPastEditionsCarousel';
import TililaPrizesSection from '@/pages/user/tilila/partials/TililaPrizesSection';
import TililaStatsBenefitsSection from '@/pages/user/tilila/partials/TililaStatsBenefitsSection';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililaIndex() {
    const { currentEdition, editions, flash, news } = usePage().props;

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

                <TililaBottomSection
                    news={news ?? []}
                    editionsSlot={
                        <div id="past-editions-carousel" className="mt-6">
                            <TililaPastEditionsCarousel
                                editions={editions ?? []}
                                excludeEditionId={currentEdition?.id ?? null}
                                excludeYear={currentEdition?.year ?? null}
                                compact
                            />
                        </div>
                    }
                />

                {/* <TililaPartnersFullSection /> */}
            </div>
        </>
    );
}

TililaIndex.layout = (page) => <TililaAwardsLayout>{page}</TililaAwardsLayout>;

function TililaHead() {
    const { t } = useTranslation();
    return <Head title={t('tilila.headTitle')} />;
}
