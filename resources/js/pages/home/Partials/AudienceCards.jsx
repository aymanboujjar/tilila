import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

const AUDIENCES = [
    {
        enTitle: 'Tililab',
        frTitle: 'Tililab',
        arTitle: 'تيليلاب',
        enDescription:
            'Apply to the program and explore past editions and winners.',
        frDescription:
            'Postulez au programme et explorez les éditions précédentes et lauréats.',
        arDescription: 'قدّم للبرنامج واستكشف الدورات السابقة والفائزين.',
        enCta: 'Apply now',
        frCta: 'Postuler',
        arCta: 'قدّم الآن',
        href: '/tililab/form',
    },
    {
        enTitle: 'Trophée Tilila',
        frTitle: 'Trophée Tilila',
        arTitle: 'جائزة تيليلا',
        enDescription:
            'Participate and discover editions, winners, jury and gallery.',
        frDescription:
            'Participez et découvrez les éditions, lauréats, jury et galerie.',
        arDescription: 'شارك واكتشف الدورات والفائزين ولجنة التحكيم والمعرض.',
        enCta: 'Participate',
        frCta: 'Participer',
        arCta: 'شارك',
        href: '/tilila',
    },
    {
        enTitle: 'Partners',
        frTitle: 'Partenaires',
        arTitle: 'الشركاء',
        enDescription:
            'See our institutional and media partners supporting the mission.',
        frDescription:
            'Découvrez nos partenaires institutionnels et médias qui soutiennent la mission.',
        arDescription:
            'اطّلع على شركائنا المؤسسيين والإعلاميين الداعمين للرسالة.',
        enCta: 'View partners',
        frCta: 'Voir les partenaires',
        arCta: 'عرض الشركاء',
        href: '/about#partners',
    },
];

export default function AudienceCards() {
    return (
        <section id="connect" className="bg-background">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                        <TransText
                            en="Explore Tilila & Tililab"
                            fr="Explorer Tilila & Tililab"
                            ar="استكشف تيليلا و تيليلاب"
                        />
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        <TransText
                            en="Apply, participate, and discover the editions and partners behind the movement."
                            fr="Postulez, participez, et découvrez les éditions et partenaires derrière le mouvement."
                            ar="قدّم، شارك، واكتشف الدورات والشركاء وراء المبادرة."
                        />
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {AUDIENCES.map((card) => (
                        <div
                            key={card.title}
                            className="group rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-alpha-blue text-beta-blue">
                                <div className="h-4 w-4 rounded bg-beta-blue/30" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-foreground">
                                <TransText
                                    en={card.enTitle}
                                    fr={card.frTitle}
                                    ar={card.arTitle}
                                />
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                <TransText
                                    en={card.enDescription}
                                    fr={card.frDescription}
                                    ar={card.arDescription}
                                />
                            </p>
                            <div className="mt-5">
                                <Link
                                    href={card.href}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-beta-blue hover:underline"
                                >
                                    <TransText
                                        en={card.enCta}
                                        fr={card.frCta}
                                        ar={card.arCta}
                                    />{' '}
                                    <span aria-hidden="true">+</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
