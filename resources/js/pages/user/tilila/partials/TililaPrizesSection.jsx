import { Globe, Monitor, Radio, Sparkles, Trophy, Tv } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaBtnGhost,
    TililaContainer,
    TililaIconBadge,
    TililaSection,
    TililaSectionHeading,
    TililaTealText,
} from '@/pages/user/tilila/partials/TililaUi';

const PRIZES = [
    {
        icon: Sparkles,
        fr: 'Hommage Tilila',
        en: 'Hommage Tilila',
        ar: 'تكريم تيليلا',
        descFr: 'Distinction honorifique décernée à une personnalité engagée.',
        descEn: 'Honorary distinction awarded to an engaged personality.',
        descAr: 'تكريم شرفي يُمنح لشخصية ملتزمة.',
        reward: null,
    },
    {
        icon: Trophy,
        fr: 'Prix du Jury',
        en: 'Jury Prize',
        ar: 'جائزة لجنة التحكيم',
        descFr: "Meilleur spot publicitaire promouvant l'égalité femmes-hommes.",
        descEn: 'Best advertising spot promoting gender equality.',
        descAr: 'أفضل إعلان يعزز المساواة بين النساء والرجال.',
        reward: "1 000 000 DH d'espace publicitaire 2M brut",
    },
    {
        icon: Tv,
        fr: "Prix d'Honneur",
        en: 'Honour Prize',
        ar: 'جائزة الشرف',
        descFr: "Marque engagée en faveur de l'équité, de la diversité et de l'inclusion.",
        descEn: 'Brand committed to equity, diversity and inclusion.',
        descAr: 'علامة تجارية ملتزمة بالإنصاف والتنوع والإدماج.',
        reward: "500 000 DH d'espace publicitaire 2M brut",
    },
    {
        icon: Monitor,
        fr: 'Prix Communication Engagée – Digital',
        en: 'Engaged Communication – Digital',
        ar: 'تواصل ملتزم – رقمي',
        descFr: 'Campagne ou contenu diffusé sur les supports digitaux.',
        descEn: 'Campaign or content broadcast on digital media.',
        descAr: 'حملة أو محتوى منشور على المنصات الرقمية.',
        reward: "250 000 DH d'espace publicitaire 2M brut",
    },
    {
        icon: Radio,
        fr: 'Prix Communication Engagée – Offline',
        en: 'Engaged Communication – Offline',
        ar: 'تواصل ملتزم – تقليدي',
        descFr: 'Campagne diffusée en télévision, radio, presse écrite ou affichage.',
        descEn: 'Campaign on TV, radio, print or out-of-home.',
        descAr: 'حملة في التلفزيون أو الإذاعة أو الصحافة أو الإشهار الخارجي.',
        reward: "250 000 DH d'espace publicitaire 2M brut",
    },
    {
        icon: Globe,
        fr: 'Grand Prix du Jury',
        en: 'Grand Jury Prize',
        ar: 'الجائزة الكبرى للجنة التحكيم',
        descFr: "La campagne la plus remarquable de l'édition.",
        descEn: 'The most outstanding campaign of the edition.',
        descAr: 'أبرز حملة في الدورة.',
        reward: 'Trophée Tilila Awards',
    },
];

export default function TililaPrizesSection() {
    return (
        <TililaSection id="prizes" className="bg-twhite">
            <TililaContainer>
                <TililaSectionHeading
                    centered
                    title={
                        <TransText
                            en="Prizes & rewards"
                            fr="Les prix & récompenses"
                            ar="الجوائز والمكافآت"
                        />
                    }
                    subtitle={
                        <TransText
                            en="Tilila Awards distinguish and reward campaigns, brands and personalities committed to equity, diversity and inclusion."
                            fr="Les Tilila Awards distinguent et récompensent les campagnes, les marques et les personnalités engagées en faveur de l'équité, de la diversité et de l'inclusion."
                            ar="تميّز تيليلا أووردز وتكافئ الحملات والعلامات والشخصيات الملتزمة بالإنصاف والتنوع والإدماج."
                        />
                    }
                    className="mx-auto"
                />

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {PRIZES.map((p) => (
                        <article
                            key={p.fr}
                            className="flex h-full flex-col rounded-xl border border-border bg-twhite p-6 shadow-sm"
                        >
                            <TililaIconBadge icon={p.icon} />
                            <h3 className="mt-4 text-sm font-bold tracking-wide text-beta-blue uppercase">
                                <TransText en={p.en} fr={p.fr} ar={p.ar} />
                            </h3>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-tgray">
                                <TransText
                                    en={p.descEn}
                                    fr={p.descFr}
                                    ar={p.descAr}
                                />
                            </p>
                            {p.reward ? (
                                <p className="mt-4 text-sm">
                                    <TililaTealText>{p.reward}</TililaTealText>
                                </p>
                            ) : null}
                        </article>
                    ))}
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
