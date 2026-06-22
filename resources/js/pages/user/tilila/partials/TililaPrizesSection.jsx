import { Award, Monitor, Radio, Sparkles, Trophy } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaBtnGhost,
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

const PRIZES = [
    {
        icon: Trophy,
        border: 'border-beta-blue',
        fr: 'Prix du Jury',
        en: 'Jury Prize',
        ar: 'جائزة لجنة التحكيم',
        rewardFr:
            "Trophée + Espace publicitaire 2M d'une valeur de 1 000 000 DH brut",
        rewardEn:
            'Trophy + 2M advertising space worth 1,000,000 DH gross',
        rewardAr: 'كأس + مساحة إعلانية على 2M بقيمة 1 000 000 درهم إجمالي',
        amount: '1 000 000',
    },
    {
        icon: Award,
        border: 'border-beta-turquoise',
        fr: "Prix d'Honneur",
        en: 'Honour Prize',
        ar: 'جائزة الشرف',
        rewardFr:
            "Trophée + Espace publicitaire 2M d'une valeur de 500 000 DH brut",
        rewardEn: 'Trophy + 2M advertising space worth 500,000 DH gross',
        rewardAr: 'كأس + مساحة إعلانية على 2M بقيمة 500 000 درهم إجمالي',
        amount: '500 000',
    },
    {
        icon: Monitor,
        border: 'border-[#5b7fd6]',
        fr: 'Prix Communication Engagée – ONLINE',
        en: 'Engaged Communication – ONLINE',
        ar: 'جائزة التواصل الملتزم – ONLINE',
        rewardFr:
            "Trophée + Espace publicitaire 2M d'une valeur de 250 000 DH brut",
        rewardEn: 'Trophy + 2M advertising space worth 250,000 DH gross',
        rewardAr: 'كأس + مساحة إعلانية على 2M بقيمة 250 000 درهم إجمالي',
        amount: '250 000',
    },
    {
        icon: Radio,
        border: 'border-brand-light-purple',
        fr: 'Prix Communication Engagée – OFFLINE',
        en: 'Engaged Communication – OFFLINE',
        ar: 'جائزة التواصل الملتزم – OFFLINE',
        rewardFr:
            "Trophée + Espace publicitaire 2M d'une valeur de 250 000 DH brut",
        rewardEn: 'Trophy + 2M advertising space worth 250,000 DH gross',
        rewardAr: 'كأس + مساحة إعلانية على 2M بقيمة 250 000 درهم إجمالي',
        amount: '250 000',
    },
    {
        icon: Sparkles,
        border: 'border-beta-blue/60',
        fr: 'Hommage Tilila',
        en: 'Hommage Tilila',
        ar: 'تكريم تيليلا',
        rewardFr:
            'Distinction honorifique décernée par le Comité Parité & Diversité de SOREAD 2M',
        rewardEn:
            'Honorary distinction awarded by the SOREAD 2M Parity & Diversity Committee',
        rewardAr:
            'تكريم شرفي يمنحه لجنة المساواة والتنوع لـ SOREAD 2M',
        amount: null,
    },
];

export default function TililaPrizesSection() {
    return (
        <TililaSection id="prizes" className="bg-beta-white">
            <TililaContainer>
                <div className="text-center">
                    <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                        <TransText
                            en="Rewards"
                            fr="Les récompenses"
                            ar="المكافآت"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-blue/70"
                        aria-hidden
                    />
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {PRIZES.map((p) => {
                        const Icon = p.icon;
                        return (
                            <article
                                key={p.fr}
                                className={`flex h-full flex-col rounded-xl border-2 bg-twhite px-4 py-6 ${p.border}`}
                            >
                                <span className="inline-flex size-11 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                                    <Icon
                                        className="size-5"
                                        strokeWidth={1.5}
                                        aria-hidden
                                    />
                                </span>
                                <h3 className="mt-4 text-xs font-extrabold tracking-wide text-beta-blue uppercase">
                                    <TransText
                                        en={p.en}
                                        fr={p.fr}
                                        ar={p.ar}
                                    />
                                </h3>
                                {p.amount ? (
                                    <p className="mt-3 text-2xl font-extrabold text-beta-blue">
                                        {p.amount}
                                        <span className="ms-1 text-xs font-bold">
                                            DH
                                        </span>
                                    </p>
                                ) : null}
                                <p className="mt-3 flex-1 text-xs leading-relaxed text-tgray">
                                    <TransText
                                        en={p.rewardEn}
                                        fr={p.rewardFr}
                                        ar={p.rewardAr}
                                    />
                                </p>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-10 text-center">
                    <TililaBtnGhost href="/tilila/reglement">
                        <TransText
                            en="View full regulations"
                            fr="Consulter le règlement intégral"
                            ar="اطلع على النظام الكامل"
                        />
                    </TililaBtnGhost>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
