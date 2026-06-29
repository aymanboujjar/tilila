import { Link } from '@inertiajs/react';
import { memo } from 'react';
import {
    FadeInText,
    RevealOnScroll,
    StaggerItem,
    StaggerReveal,
} from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';

// const HEADLINES = [
//     {
//         en: 'Transforming perspectives, inspiring change.',
//         fr: 'Transformer les regards, inspirer le changement.',
//         ar: 'تحويل النظرات، تشجيع التغيير.',
//     },
// ];

const HeroCta = memo(function HeroCta({ href, className, children }) {
    return (
        <Link
            href={href}
            className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-[10px] font-bold tracking-[0.08em] text-twhite uppercase transition sm:w-auto sm:shrink-0 sm:px-5 sm:py-2.5 sm:text-[11px] sm:whitespace-nowrap lg:px-6 lg:py-3 lg:text-sm ${className}`}
        >
            {children}
        </Link>
    );
});

function ProgramIntro() {
    return (
        <RevealOnScroll className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            {/* <h2 className="text-xl font-extrabold leading-[1.35] tracking-tight text-beta-blue sm:text-2xl lg:text-[1.75rem]">
                {HEADLINES.map((line, index) => (
                    <span key={line.en} className="block">
                        <FadeInText {...line} delay={0.1 + index * 0.1} />
                    </span>
                ))}
            </h2> */}

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-tblack/80 sm:text-base">
                <p>
                    <TransText
                        en="Because images have the power to shape perceptions, SOREAD 2M, through Tilila Awards and Tililab, recognizes and celebrates advertisers, agencies, public figures, and young creators who use their creativity and commitment to help build a more inclusive society."
                        fr="Parce que les images ont le pouvoir de façonner les perceptions, SOREAD 2M récompense, à travers Tilila Awards et Tililab, les annonceurs, les agences, les personnalités et les jeunes créateurs qui mettent leur créativité et leur engagement au service d'une société plus inclusive"
                        ar="لأن الصور تمتلك القدرة على تشكيل التصورات، تُكرّم سوراد 2M، من خلال جوائز تيليلا وتيليلاب، المعلنين والوكالات والشخصيات وصُنّاع الإبداع الشباب الذين يوظفون إبداعهم والتزامهم في خدمة مجتمع أكثر شمولاً."
                    />
                </p>
                <p>
                    <TransText
                        en="Having become leading references in Morocco’s advertising landscape, Tilila Awards and Tililab help combat gender stereotypes, promote positive representations of people with disabilities, and foster a culture of inclusion in advertising."
                        fr="Devenus des références dans le paysage publicitaire marocain, Tilila Awards et Tililab contribuent à lutter contre les stéréotypes féminins, à valoriser l'image des personnes en situation de handicap et à promouvoir une culture de l'inclusion dans la publicité."
                        ar="أصبحت جوائز تيليلا وتيليلاب مرجعًا بارزًا في المشهد الإعلاني المغربي، حيث تسهمان في مكافحة الصور النمطية المرتبطة بالمرأة، وتعزيز الصورة الإيجابية للأشخاص في وضعية إعاقة، وترسيخ ثقافة الإدماج والشمول في مجال الإعلانات."
                    />
                </p>
            </div>
            {/* 
            <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                <HeroCta
                    href="/tilila"
                    className="bg-beta-blue hover:bg-brand-light-purple"
                >
                    <TransText
                        en="Discover Tilila Awards"
                        fr="Découvrir Tilila Awards"
                        ar="اكتشف تيليلا أووردز"
                    />
                </HeroCta>
                <HeroCta
                    href="/tililab"
                    className="bg-beta-turquoise hover:brightness-110"
                >
                    <TransText
                        en="Discover Tililab"
                        fr="Découvrir Tililab"
                        ar="اكتشف تيليلاب"
                    />
                </HeroCta>
            </div> */}
        </RevealOnScroll>
    );
}

const CARDS = [
    {
        id: 'tilila',
        href: '/tilila',
        logoSrc: '/assets/tilila/LOGO Tilila Awards-01.png',
        logoClassName:
            'h-16 w-auto max-w-[12rem] -translate-x-5 sm:h-[8rem] sm:max-w-[13.5rem] sm:-translate-x-20 -mt-5',
        buttonClass: 'bg-brand-light-purple hover:bg-brand-light-purple/90',
        title: 'TILILA AWARDS',
        subtitleEn: 'Reward campaigns that evolve representations.',
        subtitleFr:
            'Récompenser les campagnes qui font évoluer les représentations.',
        subtitleAr: 'مكافأة الحملات التي تطور التمثيلات.',
        bodyEn: 'Tilila Awards recognizes advertising campaigns and individuals who contribute to advancing representation and promoting equity, diversity, and inclusion.',
        bodyFr: 'Tilila Awards distingue les campagnes publicitaires et les personnalités qui contribuent à faire évoluer les représentations et à promouvoir l’équité, la diversité et l’inclusion',
        bodyAr: 'تكرّم جوائز تيليلا الحملات الإعلانية والشخصيات التي تساهم في تطوير التمثلات وتعزيز الإنصاف والتنوع والشمول.',
        gradient: 'from-[#6b4a9a] via-[#3d2870] to-[#12081f]',
    },
    {
        id: 'tililab',
        href: '/tililab',
        logoSrc: '/assets/tililab/tililab-logo.png',
        logoClassName: 'h-14 w-14 object-contain sm:h-16 sm:w-16 ',
        buttonClass: 'bg-[#00b8d9] hover:bg-[#00a8c4]',
        title: 'TILILAB',
        subtitleEn: "Reveal tomorrow's committed advertising professionals.",
        subtitleFr: 'Révéler les publicitaires engagés de demain',
        subtitleAr: 'الكشف عن محترفي الإعلانات الملتزمين في المستقبل.',
        bodyEn: 'Tililab is a creative competition designed to train and support young content creators in Morocco.',
        bodyFr: 'Tililab est un concours de création destiné à former et à accompagner les jeunes créateurs et créatrices de contenus au Maroc.',
        bodyAr: 'تيليلاب هي مسابقة إبداعية تهدف إلى تدريب ودعم صنّاع وصانعات المحتوى الشباب في المغرب.',
        gradient: 'from-[#00b5d1] to-[#435b66]',
    },
];

function SectionTitle() {
    return (
        <RevealOnScroll className="mb-8 text-center sm:mb-10">
            <h2 className="text-xl font-extrabold tracking-[0.12em] text-beta-blue uppercase sm:text-2xl">
                <TransText
                    en="Transforming perspectives, inspiring change."
                    fr="Transformer les regards, inspirer le changement."
                    ar="تحويل النظرات، تشجيع التغيير."
                />
            </h2>
            <div
                className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-beta-blue/70"
                aria-hidden
            />
        </RevealOnScroll>
    );
}

const ProgramCard = memo(function ProgramCard({ card }) {
    return (
        <StaggerItem y={28} className="h-full">
            <Link
                href={card.href}
                className="group relative flex h-full min-h-[280px] overflow-hidden rounded-2xl shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl sm:min-h-[320px]"
            >
                <div
                    className={`absolute inset-0 bg-linear-to-br ${card.gradient}`}
                    aria-hidden
                />

                <div className="relative z-10 flex h-full w-full flex-col px-6 py-7 sm:px-8 sm:py-8">
                    <span className="inline-flex w-fit items-center transition group-hover:scale-105">
                        <img
                            src={card.logoSrc}
                            alt=""
                            className={`brightness-0 invert ${card.logoClassName}`}
                            loading="lazy"
                            decoding="async"
                        />
                    </span>

                    <h3
                        className={`${
                            card.id === 'tilila' ? '-mt-1.5' : 'mt-4'
                        } text-lg font-extrabold tracking-wide text-twhite uppercase sm:text-xl`}
                    >
                        {card.title}
                    </h3>

                    <p className="mt-2 text-sm leading-snug font-semibold text-twhite sm:text-[0.95rem]">
                        <TransText
                            en={card.subtitleEn}
                            fr={card.subtitleFr}
                            ar={card.subtitleAr}
                        />
                    </p>

                    <p className="mt-3 flex-1 text-xs leading-relaxed text-twhite/85 sm:text-sm">
                        <TransText
                            en={card.bodyEn}
                            fr={card.bodyFr}
                            ar={card.bodyAr}
                        />
                    </p>

                    <span
                        className={`mt-6 inline-flex w-fit items-center justify-center rounded-lg px-5 py-2.5 text-[10px] font-bold tracking-[0.14em] text-twhite uppercase transition sm:text-xs ${card.buttonClass}`}
                    >
                        <TransText en="Discover" fr="Découvrir" ar="اكتشف" />
                    </span>
                </div>
            </Link>
        </StaggerItem>
    );
});

export default function HomeProgramCards() {
    return (
        <TililaSection id="programs" className="bg-twhite py-10 sm:py-12">
            <TililaContainer>
                <SectionTitle />
                <ProgramIntro />

                <StaggerReveal
                    className="grid gap-5 md:grid-cols-2 md:items-stretch md:gap-6"
                    stagger={0.1}
                >
                    {CARDS.map((card) => (
                        <ProgramCard key={card.id} card={card} />
                    ))}
                </StaggerReveal>
            </TililaContainer>
        </TililaSection>
    );
}
