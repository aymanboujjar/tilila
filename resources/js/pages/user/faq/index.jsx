import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';
import FaqColumnsSection from '@/pages/user/faq/partials/FaqColumnsSection';
import FaqContactCta from '@/pages/user/faq/partials/FaqContactCta';
import FaqHero from '@/pages/user/faq/partials/FaqHero';

export default function FaqPage() {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('faq.pageTitle')} />

            <div className="min-h-screen bg-twhite">
                <FaqHero />

                <div className="relative z-10 -mt-6 rounded-t-3xl bg-twhite shadow-[0_-8px_30px_rgba(26,35,126,0.06)] sm:-mt-8">
                    <FaqColumnsSection />
                </div>

                <FaqContactCta />
            </div>
        </>
    );
}

FaqPage.layout = (page) => <AppLayout>{page}</AppLayout>;
