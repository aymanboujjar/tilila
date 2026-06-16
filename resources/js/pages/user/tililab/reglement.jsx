import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import RegulationDocument from '@/components/program/RegulationDocument';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import { getTililabReglement } from '@/data';

export default function TililabReglement({ downloadUrl }) {
    const { locale } = useTranslation();
    const document = getTililabReglement(locale);

    return (
        <>
            <Head>
                <title>
                    {locale === 'ar'
                        ? 'النظام — Tililab'
                        : locale === 'en'
                          ? 'Regulations — Tililab'
                          : 'Règlement — Tililab'}
                </title>
            </Head>

            <RegulationDocument
                backHref="/tililab"
                backLabel={
                    <TransText
                        en="Back to Tililab"
                        fr="Retour à Tililab"
                        ar="العودة إلى تيليلاب"
                    />
                }
                downloadUrl={downloadUrl}
                document={document}
            />
        </>
    );
}

TililabReglement.layout = (page) => <AppLayout>{page}</AppLayout>;
