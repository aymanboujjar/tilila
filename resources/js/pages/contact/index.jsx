import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';
import ContactFormSection from '@/pages/contact/partials/ContactFormSection';
import ContactHelpCta from '@/pages/contact/partials/ContactHelpCta';
import ContactHero from '@/pages/contact/partials/ContactHero';
import ContactSidebar from '@/pages/contact/partials/ContactSidebar';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

export default function ContactPage() {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('contact.page.headTitle')} />

            <div className="min-h-screen bg-twhite">
                <ContactHero />

                <div className="relative z-10 -mt-6 rounded-t-3xl bg-twhite shadow-[0_-8px_30px_rgba(26,35,126,0.06)] sm:-mt-8">
                    <section className="py-12 sm:py-14 lg:py-16">
                        <TililaContainer>
                            <ContactFormSection />
                        </TililaContainer>
                    </section>
                </div>

                {/* <ContactHelpCta /> */}
            </div>
        </>
    );
}

ContactPage.layout = (page) => <AppLayout>{page}</AppLayout>;
