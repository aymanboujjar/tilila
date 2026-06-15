import { Clapperboard, Radio, Sparkles, Trophy, Tv } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaBtnGhost,
    TililaContainer,
    TililaIconBadge,
    TililaSection,
    TililaSectionHeading,
    TililaTealText,
} from '@/pages/user/tilila/partials/TililaUi';

const REWARDS = [
    {
        icon: Clapperboard,
        fr: 'Participation au Bootcamp Tililab',
        en: 'Tililab Bootcamp participation',
        ar: 'المشاركة في معسكر تيليلاب',
        descFr: 'Masterclass et résidence créative de 48h.',
        descEn: 'Masterclass and 48-hour creative residency.',
        descAr: 'ماستركلاس وإقامة إبداعية لمدة 48 ساعة.',
    },
    {
        icon: Trophy,
        fr: 'Tililab Trophy',
        en: 'Tililab Trophy',
        ar: 'كأس تيليلاب',
        descFr: 'Trophée remis lors de la cérémonie Tilila Awards.',
        descEn: 'Trophy presented at the Tilila Awards ceremony.',
        descAr: 'كأس يُمنح خلال حفل تيليلا أووردز.',
    },
    {
        icon: Tv,
        fr: 'Outil de travail SOREAD 2M',
        en: 'Work tool from SOREAD 2M',
        ar: 'أداة عمل من SOREAD 2M',
        descFr: 'Équipement offert au lauréat.',
        descEn: 'Equipment offered to the laureate.',
        descAr: 'معدات تُقدَّم للفائز.',
    },
    {
        icon: Sparkles,
        fr: 'Accompagnement LionsGeek',
        en: 'LionsGeek mentoring',
        ar: 'مرافقة LionsGeek',
        descFr: 'Soutien professionnel après le concours.',
        descEn: 'Professional support after the competition.',
        descAr: 'دعم مهني بعد المسابقة.',
    },
    {
        icon: Radio,
        fr: 'Diffusion sur les plateformes 2M',
        en: 'Broadcast on 2M platforms',
        ar: 'بث على منصات 2M',
        descFr: '2M.ma, My2M et réseaux sociaux du groupe.',
        descEn: '2M.ma, My2M and group social networks.',
        descAr: '2M.ma وMy2M وشبكات المجموعة.',
    },
];

export default function TililabPrizesSection() {
    return (
        <TililaSection id="prizes" className="border-t border-border/60 bg-twhite">
            <TililaContainer>
                <TililaSectionHeading
                    centered
                    className="mx-auto"
                    title={
                        <TransText
                            en="Rewards"
                            fr="Récompenses"
                            ar="المكافآت"
                        />
                    }
                    subtitle={
                        <TransText
                            en="What Tililab laureates receive."
                            fr="Ce que reçoivent les lauréats Tililab."
                            ar="ما يحصل عليه فائزو تيليلاب."
                        />
                    }
                />

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {REWARDS.map((item) => (
                        <article
                            key={item.en}
                            className="flex flex-col rounded-xl border border-border bg-beta-white p-6 shadow-sm"
                        >
                            <TililaIconBadge icon={item.icon} />
                            <h3 className="mt-4 text-base font-bold text-beta-blue">
                                <TransText
                                    en={item.en}
                                    fr={item.fr}
                                    ar={item.ar}
                                />
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-tgray">
                                <TransText
                                    en={item.descEn}
                                    fr={item.descFr}
                                    ar={item.descAr}
                                />
                            </p>
                        </article>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <TililaBtnGhost href="/tililab/reglement">
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
