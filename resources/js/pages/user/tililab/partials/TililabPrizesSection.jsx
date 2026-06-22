import { Download, Gem, Megaphone, Target, Trophy, Users } from 'lucide-react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';
import { TililaContainer, TililaSection } from '@/pages/user/tilila/partials/TililaUi';

const LAUREATES_IMG = '/assets/tililab/tililab1.jpg';

const REWARDS = [
    {
        icon: Gem,
        fr: 'Participation au Bootcamp Tililab',
        en: 'Tililab Bootcamp participation',
        ar: 'المشاركة في معسكر تيليلاب',
    },
    {
        icon: Trophy,
        fr: 'Tililab Trophy',
        en: 'Tililab Trophy',
        ar: 'كأس تيليلاب',
    },
    {
        icon: Target,
        fr: 'Outil de travail offert par SOREAD 2M',
        en: 'Work tool offered by SOREAD 2M',
        ar: 'أداة عمل مقدمة من SOREAD 2M',
    },
    {
        icon: Users,
        fr: 'Accompagnement professionnel par LionsGeek',
        en: 'Professional mentoring by LionsGeek',
        ar: 'مرافقة مهنية من LionsGeek',
    },
    {
        icon: Megaphone,
        fr: 'Diffusion du projet sur les plateformes du Groupe 2M',
        en: 'Project broadcast on 2M Group platforms',
        ar: 'بث المشروع على منصات مجموعة 2M',
    },
];

export default function TililabPrizesSection() {
    return (
        <TililaSection id="prizes" className="bg-twhite">
            <TililaContainer>
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 xl:gap-16">
                    <div>
                        <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                            <TransText
                                en="Rewards"
                                fr="Récompenses"
                                ar="المكافآت"
                            />
                        </h2>
                        <div
                            className="mt-2.5 h-0.5 w-10 rounded-full bg-beta-turquoise"
                            aria-hidden
                        />

                        <ul className="mt-8 space-y-4 sm:space-y-5">
                            {REWARDS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li
                                        key={item.fr}
                                        className="flex items-center gap-3.5 sm:gap-4"
                                    >
                                        <Icon
                                            className="size-5 shrink-0 text-beta-turquoise sm:size-[22px]"
                                            strokeWidth={1.75}
                                            aria-hidden
                                        />
                                        <p className="text-sm leading-snug font-medium text-tblack sm:text-[15px]">
                                            <TransText
                                                en={item.en}
                                                fr={item.fr}
                                                ar={item.ar}
                                            />
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>

                        <Link
                            href="/tililab/reglement"
                            className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-beta-blue px-5 py-3 text-[11px] font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple sm:text-xs"
                        >
                            <Download className="size-4 shrink-0" aria-hidden />
                            <TransText
                                en="View full regulations"
                                fr="Consulter le règlement intégral"
                                ar="اطلع على النظام الكامل"
                            />
                        </Link>
                    </div>

                    <div className="w-[650px] overflow-hidden rounded-xl shadow-[0_12px_40px_rgba(26,35,126,0.12)]">
                        <img
                            src={LAUREATES_IMG}
                            alt=""
                            className="aspect-[16/10] w-full object-cover object-center"
                            loading="lazy"
                        />
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
