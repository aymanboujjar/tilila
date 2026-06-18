import { Head } from '@inertiajs/react';
import RegulationDocument from '@/components/program/RegulationDocument';
import TransText from '@/components/TransText';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';
import { getTililaReglement } from '@/data';

export default function TililaReglement({ downloadUrl }) {
    const { locale } = useTranslation();
    const document = getTililaReglement(locale);

    return (
        <>
            <Head>
                <title>
                    {locale === 'ar'
                        ? 'النظام — Tilila Awards'
                        : locale === 'en'
                          ? 'Regulations — Tilila Awards'
                          : 'Règlement — Tilila Awards'}
                </title>
            </Head>

            <RegulationDocument
                backHref="/tilila"
                backLabel={
                    <TransText
                        en="Back to Tilila Awards"
                        fr="Retour aux Tilila Awards"
                        ar="العودة إلى تيليلا أووردز"
                    />
                }
                downloadUrl={downloadUrl}
                document={document}
            />
        </>
    );
}

TililaReglement.layout = (page) => <AppLayout>{page}</AppLayout>;
