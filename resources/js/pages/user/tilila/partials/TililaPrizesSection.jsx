import { ArrowRight, Trophy } from 'lucide-react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const PRIZES = [
    {
        fr: 'Prix du Jury',
        en: 'Jury Prize',
        ar: 'جائزة لجنة التحكيم',
        descFr: "Trophée + Espace publicitaire 2M d'une valeur de",
        descEn: 'Trophy + 2M advertising space worth',
        descAr: 'كأس + مساحة إعلانية على 2M بقيمة',
        amount: '1 000 000',
        border: 'border-beta-blue',
        badge: 'bg-beta-blue',
        amountColor: 'text-beta-blue',
    },
    {
        fr: "Prix d'Honneur",
        en: 'Honour Prize',
        ar: 'جائزة الشرف',
        descFr: "Trophée + Espace publicitaire 2M d'une valeur de",
        descEn: 'Trophy + 2M advertising space worth',
        descAr: 'كأس + مساحة إعلانية على 2M بقيمة',
        amount: '500 000',
        border: 'border-beta-turquoise',
        badge: 'bg-beta-turquoise',
        amountColor: 'text-beta-turquoise',
    },
    {
        fr: 'Prix Communication Engagée – ONLINE',
        en: 'Engaged Communication – ONLINE',
        ar: 'جائزة التواصل الملتزم – ONLINE',
        descFr: "Trophée + Espace publicitaire 2M d'une valeur de",
        descEn: 'Trophy + 2M advertising space worth',
        descAr: 'كأس + مساحة إعلانية على 2M بقيمة',
        amount: '250 000',
        border: 'border-[#3d5f9a]',
        badge: 'bg-[#3d5f9a]',
        amountColor: 'text-[#3d5f9a]',
    },
    {
        fr: 'Prix Communication Engagée – OFFLINE',
        en: 'Engaged Communication – OFFLINE',
        ar: 'جائزة التواصل الملتزم – OFFLINE',
        descFr: "Trophée + Espace publicitaire 2M d'une valeur de",
        descEn: 'Trophy + 2M advertising space worth',
        descAr: 'كأس + مساحة إعلانية على 2M بقيمة',
        amount: '250 000',
        border: 'border-beta-turquoise',
        badge: 'bg-beta-turquoise',
        amountColor: 'text-beta-turquoise',
    },
    {
        fr: 'Hommage Tilila',
        en: 'Hommage Tilila',
        ar: 'تكريم تيليلا',
        descFr:
            'Distinction honorifique décernée par le Comité Parité & Diversité de SOREAD 2M.',
        descEn:
            'Honorary distinction awarded by the SOREAD 2M Parity & Diversity Committee.',
        descAr: 'تكريم شرفي يمنحه لجنة المساواة والتنوع لـ SOREAD 2M.',
        amount: null,
        border: 'border-[#D4AF37]',
        badge: 'bg-[#D4AF37]',
        amountColor: '',
    },
];

function PrizeCard({ prize }) {
    return (
        <article
            className={`relative flex h-full flex-col rounded-2xl border-2 bg-twhite px-4 pt-10 pb-6 sm:px-5 sm:pt-11 sm:pb-7 ${prize.border}`}
        >
            <span
                className={`absolute top-0 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-twhite text-twhite shadow-sm sm:size-12 ${prize.badge}`}
            >
                <Trophy className="size-5 sm:size-[22px]" strokeWidth={1.5} aria-hidden />
            </span>

            <h3 className="text-center text-[11px] leading-snug font-extrabold tracking-wide text-beta-blue uppercase sm:text-xs">
                <TransText en={prize.en} fr={prize.fr} ar={prize.ar} />
            </h3>

            <p className="mt-3 flex-1 text-center text-[10px] leading-relaxed text-tgray sm:text-[11px]">
                <TransText
                    en={prize.descEn}
                    fr={prize.descFr}
                    ar={prize.descAr}
                />
            </p>

            {prize.amount ? (
                <div className="mt-4 text-center">
                    <p
                        className={`text-2xl leading-none font-extrabold sm:text-[1.75rem] ${prize.amountColor}`}
                    >
                        {prize.amount}
                    </p>
                    <p className={`mt-1 text-xs font-bold ${prize.amountColor}`}>
                        <TransText en="DH gross" fr="DH brut" ar="درهم إجمالي" />
                    </p>
                </div>
            ) : null}
        </article>
    );
}

export default function TililaPrizesSection() {
    return (
        <TililaSection id="prizes" className="bg-beta-white">
            <TililaContainer>
                <h2 className="text-center text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                    <TransText
                        en="Rewards"
                        fr="Les récompenses"
                        ar="المكافآت"
                    />
                </h2>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
                    {PRIZES.map((prize) => (
                        <PrizeCard key={prize.fr} prize={prize} />
                    ))}
                </div>

                <div className="mt-10 text-center lg:mt-12">
                    <Link
                        href="/tilila/reglement"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-beta-blue px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple"
                    >
                        <TransText
                            en="View full regulations"
                            fr="Consulter le règlement intégral"
                            ar="اطلع على النظام الكامل"
                        />
                        <ArrowRight className="size-4" aria-hidden />
                    </Link>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
