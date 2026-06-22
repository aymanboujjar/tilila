import {
    Globe2,
    Lightbulb,
    Palette,
    Scale,
    Users,
} from 'lucide-react';
import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

const VALUES = [
    { icon: Scale, en: 'Equity', fr: 'Équité', ar: 'المساواة' },
    { icon: Globe2, en: 'Diversity', fr: 'Diversité', ar: 'التنوع' },
    { icon: Users, en: 'Inclusion', fr: 'Inclusion', ar: 'الإدماج' },
    { icon: Lightbulb, en: 'Innovation', fr: 'Innovation', ar: 'الابتكار' },
    {
        icon: Palette,
        en: 'Responsible creativity',
        fr: 'Créativité responsable',
        ar: 'إبداع مسؤول',
    },
];

function ValueItem({ icon: Icon, label, light = false }) {
    return (
        <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
            <Icon
                className={`size-11 stroke-[1.15] sm:size-12 ${
                    light ? 'text-twhite' : 'text-beta-blue'
                }`}
                aria-hidden
            />
            <p
                className={`max-w-[9rem] text-[10px] leading-tight font-bold tracking-[0.14em] uppercase sm:text-[11px] ${
                    light ? 'text-twhite' : 'text-beta-blue'
                }`}
            >
                {label}
            </p>
        </div>
    );
}

export default function MissionSection() {
    return (
        <section className="bg-twhite py-14 sm:py-16">
            <TililaContainer>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-[11px] font-bold tracking-[0.24em] text-beta-blue uppercase">
                        <TransText
                            en="Our mission"
                            fr="Notre mission"
                            ar="مهمتنا"
                        />
                    </p>
                    <h2 className="mt-4 text-2xl leading-tight font-extrabold text-[#1a237e] sm:text-[1.75rem]">
                        <TransText
                            en="Promote more inclusive communication"
                            fr="Promouvoir une communication plus inclusive"
                            ar="تعزيز تواصل أكثر شمولاً"
                        />
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-beta-blue/85 sm:text-[15px]">
                        <TransText
                            en="Promote equity, diversity and inclusion through initiatives that foster awareness, dialogue, innovation and responsible creativity."
                            fr="Promouvoir l'équité, la diversité et l'inclusion à travers des initiatives favorisant la sensibilisation, le dialogue, l'innovation et la créativité responsable."
                            ar="تعزيز المساواة والتنوع والإدماج عبر مبادرات تفضّل التوعية والحوار والابتكار والإبداع المسؤول."
                        />
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
                    {VALUES.map((item) => (
                        <ValueItem
                            key={item.en}
                            icon={item.icon}
                            label={
                                <TransText
                                    en={item.en}
                                    fr={item.fr}
                                    ar={item.ar}
                                />
                            }
                        />
                    ))}
                </div>
            </TililaContainer>
        </section>
    );
}

export function AboutValuesSection() {
    return (
        <section className="relative overflow-hidden bg-[#162475]">
            <div
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 select-none font-black text-[10rem] leading-none text-twhite/[0.06] sm:left-8 sm:text-[14rem]"
                aria-hidden
            >
                2M
            </div>
            <div
                className="pointer-events-none absolute top-1/2 right-0 h-40 w-56 translate-x-1/4 -translate-y-1/2 rounded-full bg-twhite/[0.04] blur-3xl"
                aria-hidden
            />
            <img
                src="/assets/about/about2.png"
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.04]"
                aria-hidden
            />

            <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 px-6 py-16 sm:gap-12 sm:px-10 sm:py-20 lg:py-24">
                <h2 className="text-center text-base font-extrabold tracking-[0.22em] text-twhite uppercase sm:text-lg">
                    <TransText en="Our values" fr="Nos valeurs" ar="قيمنا" />
                </h2>

                <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-0">
                    {VALUES.map((item) => (
                        <ValueItem
                            key={`light-${item.en}`}
                            icon={item.icon}
                            light
                            label={
                                <TransText
                                    en={item.en}
                                    fr={item.fr}
                                    ar={item.ar}
                                />
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
