import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import TransText from '@/components/TransText';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

export default function TililaArchivesIntro({
    showBackLink = false,
    editionCount = 0,
}) {
    return (
        <section className="relative overflow-hidden border-b border-beta-blue/10 bg-linear-to-br from-[#2e1861] via-[#3d2578] to-[#1a1045] text-twhite">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '28px 28px',
                }}
            />
            <div className="pointer-events-none absolute -top-24 right-0 size-80 rounded-full bg-beta-turquoise/20 blur-3xl" />

            <TililaContainer className="relative py-10 sm:py-14">
                {showBackLink ? (
                    <Link
                        href="/tilila"
                        className="inline-flex items-center gap-2 rounded-full border border-twhite/20 bg-twhite/10 px-4 py-2 text-xs font-bold tracking-wide text-twhite uppercase backdrop-blur transition hover:bg-twhite/15"
                    >
                        <ChevronLeft className="size-4" />
                        <TransText
                            en="Back to Tilila Awards"
                            fr="Retour aux Tilila Awards"
                            ar="العودة إلى تيليلا أووردز"
                        />
                    </Link>
                ) : null}

                <div className={showBackLink ? 'mt-8 max-w-3xl' : 'max-w-3xl'}>
                    <p className="text-xs font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                        <TransText
                            en="Tilila Awards heritage"
                            fr="Patrimoine Tilila Awards"
                            ar="إرث تيليلا أووردز"
                        />
                    </p>
                    <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
                        <TransText
                            en="Archives & palmarès"
                            fr="Archives & palmarès"
                            ar="الأرشيف والجوائز"
                        />
                    </h1>
                    <p className="mt-4 text-base leading-relaxed text-twhite/80 sm:text-lg">
                        <TransText
                            en="Latest edition highlights, past ceremonies, and the full record of winners and juries."
                            fr="Temps forts de la dernière édition, cérémonies passées, et palmarès complet des lauréats et jurys."
                            ar="أبرز آخر دورة، والحفلات السابقة، وسجل كامل للفائزين ولجان التحكيم."
                        />
                    </p>
                    {editionCount > 0 ? (
                        <nav className="mt-6 flex flex-wrap gap-2">
                            <a
                                href="#latest"
                                className="rounded-full border border-twhite/20 bg-twhite/10 px-4 py-2 text-xs font-bold text-twhite backdrop-blur transition hover:bg-twhite/15"
                            >
                                <TransText
                                    en="Latest"
                                    fr="Dernière édition"
                                    ar="آخر دورة"
                                />
                            </a>
                            <a
                                href="#editions"
                                className="rounded-full border border-twhite/20 bg-twhite/10 px-4 py-2 text-xs font-bold text-twhite backdrop-blur transition hover:bg-twhite/15"
                            >
                                <TransText
                                    en="Past editions"
                                    fr="Éditions passées"
                                    ar="دورات سابقة"
                                />
                            </a>
                            <a
                                href="#winners"
                                className="rounded-full border border-twhite/20 bg-twhite/10 px-4 py-2 text-xs font-bold text-twhite backdrop-blur transition hover:bg-twhite/15"
                            >
                                <TransText
                                    en="Winners"
                                    fr="Lauréats"
                                    ar="الفائزون"
                                />
                            </a>
                            <a
                                href="#jury"
                                className="rounded-full border border-twhite/20 bg-twhite/10 px-4 py-2 text-xs font-bold text-twhite backdrop-blur transition hover:bg-twhite/15"
                            >
                                <TransText en="Jury" fr="Jury" ar="التحكيم" />
                            </a>
                        </nav>
                    ) : null}
                </div>
            </TililaContainer>
        </section>
    );
}
