import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';
import RegulationCta from '@/components/program/RegulationCta';
import TililabParticipateForm from '@/pages/user/tililab/partials/TililabParticipateForm';

export default function TililabParticipate() {
    return (
        <>
            <Head title="Tililab — Candidature" />

            <div className="mx-auto max-w-3xl px-4 py-10">
                <Link
                    href="/tililab"
                    className="text-sm font-semibold text-beta-blue hover:underline"
                >
                    <TransText
                        en="← Back to Tililab"
                        fr="← Retour à Tililab"
                        ar="← العودة إلى تيليلاب"
                    />
                </Link>
                <h1 className="mt-4 text-2xl font-bold text-tblack">
                    <TransText
                        en="Apply to Tililab"
                        fr="Déposer une candidature Tililab"
                        ar="الترشح لتيليلاب"
                    />
                </h1>
                <p className="mt-2 text-sm text-tgray">
                    <TransText
                        en="For Moroccan residents under 30. No diploma required."
                        fr="Pour les résident·e·s du Maroc de moins de 30 ans. Aucun diplôme requis."
                        ar="للمقيمين في المغرب دون 30 سنة. لا يلزم شهادة."
                    />
                </p>
                <div className="mt-4">
                    <RegulationCta href="/tililab/reglement" />
                </div>
                <div className="mt-8">
                    <TililabParticipateForm />
                </div>
            </div>
        </>
    );
}

TililabParticipate.layout = (page) => <AppLayout>{page}</AppLayout>;
