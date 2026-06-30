import { Head, usePage } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import TililaHero from '@/pages/user/tilila/partials/TililaHero';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';

const TililaStatsBenefitsSection = lazy(
    () => import('@/pages/user/tilila/partials/TililaStatsBenefitsSection'),
);
const TililaPrizesSection = lazy(
    () => import('@/pages/user/tilila/partials/TililaPrizesSection'),
);
const TililaLaureatesSection = lazy(
    () => import('@/pages/user/tilila/partials/TililaLaureatesSection'),
);
const TililaArchivesHubSection = lazy(
    () => import('@/pages/user/tilila/partials/TililaArchivesHubSection'),
);
const TililaAdmissionJurySection = lazy(
    () => import('@/pages/user/tilila/partials/TililaAdmissionJurySection'),
);
const TililaPartnersSection = lazy(
    () => import('@/pages/user/tilila/partials/TililaPartnersSection'),
);

function SectionFallback({ className = 'min-h-[280px]' }) {
    return <div className={className} aria-hidden />;
}

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

                <Suspense
                    fallback={<SectionFallback className="min-h-[520px]" />}
                >
                    <TililaStatsBenefitsSection />
                </Suspense>

                <Suspense
                    fallback={<SectionFallback className="min-h-[480px]" />}
                >
                    <TililaPrizesSection />
                </Suspense>

                {/* <Suspense fallback={<SectionFallback className="min-h-[420px]" />}>
                    <TililaLaureatesSection />
                </Suspense> */}

                <Suspense
                    fallback={<SectionFallback className="min-h-[380px]" />}
                >
                    <TililaAdmissionJurySection
                        jury={currentEdition?.jury}
                        hasCurrentEdition={Boolean(currentEdition)}
                    />
                </Suspense>
                <Suspense
                    fallback={<SectionFallback className="min-h-[720px]" />}
                >
                    <TililaArchivesHubSection />
                </Suspense>
                <Suspense
                    fallback={<SectionFallback className="min-h-[280px]" />}
                >
                    <TililaPartnersSection />
                </Suspense>
            </div>
        </>
    );
}

TililaIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

function TililaHead() {
    const { t } = useTranslation();
    return <Head title={t('tilila.headTitle')} />;
}
