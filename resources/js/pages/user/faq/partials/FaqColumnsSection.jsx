import { Link } from '@inertiajs/react';
import { ChevronDown, ExternalLink, Trophy, Users } from 'lucide-react';
import { useState } from 'react';
import TransText from '@/components/TransText';
import {
    TILILAB_FAQ_PAGE_ITEMS,
    TILILA_FAQ_PAGE_ITEMS,
} from '@/pages/user/faq/data/faq-content';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { useTranslation } from '@/contexts/TranslationContext';

function textFor(obj, locale) {
    return obj?.[locale] || obj?.fr || obj?.en || obj?.ar || '';
}

function FaqAccordion({ items, accent = 'purple', defaultOpen = 0 }) {
    const { locale } = useTranslation();
    const [openId, setOpenId] = useState(items[defaultOpen]?.id ?? null);

    const accentText =
        accent === 'turquoise' ? 'text-beta-turquoise' : 'text-beta-blue';
    const accentBorder =
        accent === 'turquoise'
            ? 'border-beta-turquoise/30'
            : 'border-beta-blue/20';
    const accentHover =
        accent === 'turquoise'
            ? 'hover:text-beta-turquoise'
            : 'hover:text-beta-blue';

    return (
        <div className="space-y-0 divide-y divide-border/50 border-y border-border/50">
            {items.map((item) => {
                const isOpen = openId === item.id;

                return (
                    <div key={item.id} className="py-1">
                        <button
                            type="button"
                            onClick={() => setOpenId(isOpen ? null : item.id)}
                            className={`flex w-full items-start justify-between gap-4 py-4 text-start transition ${accentHover}`}
                            aria-expanded={isOpen}
                        >
                            <span
                                className={`text-sm leading-snug font-extrabold sm:text-[15px] ${isOpen ? accentText : 'text-tblack'}`}
                            >
                                {textFor(item.q, locale)}
                            </span>
                            <ChevronDown
                                className={`mt-0.5 size-5 shrink-0 text-tgray transition-transform ${isOpen ? `rotate-180 ${accentText}` : ''}`}
                                aria-hidden
                            />
                        </button>
                        {isOpen ? (
                            <div
                                className={`pb-4 text-sm leading-relaxed text-tgray ${accentBorder}`}
                            >
                                {textFor(item.a, locale)}
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}

function FaqColumn({ program, items, cta }) {
    const isTilila = program === 'tilila';
    const Icon = isTilila ? Trophy : Users;
    const accentText = isTilila ? 'text-beta-blue' : 'text-beta-turquoise';
    const iconBg = isTilila ? 'bg-beta-blue' : 'bg-beta-turquoise';
    const ctaClass = isTilila
        ? 'border-beta-blue text-beta-blue hover:bg-beta-blue hover:text-twhite'
        : 'border-beta-turquoise text-beta-turquoise hover:bg-beta-turquoise hover:text-twhite';

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-start gap-4">
                <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full ${iconBg} text-twhite`}
                >
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                    <h2
                        className={`text-base font-extrabold tracking-wide uppercase sm:text-lg ${accentText}`}
                    >
                        {isTilila ? 'Tilila Awards' : 'Tililab'}
                    </h2>
                    <p className="mt-1 text-sm text-tgray">
                        {isTilila ? (
                            <TransText
                                fr="Tout savoir sur le concours Tilila Awards"
                                en="Everything about the Tilila Awards competition"
                                ar="كل ما يجب معرفته عن مسابقة تيليلا أووردز"
                            />
                        ) : (
                            <TransText
                                fr="Tout savoir sur le programme Tililab"
                                en="Everything about the Tililab programme"
                                ar="كل ما يجب معرفته عن برنامج تيليلاب"
                            />
                        )}
                    </p>
                </div>
            </div>

            <div className="mt-6 flex-1">
                <FaqAccordion
                    items={items}
                    accent={isTilila ? 'purple' : 'turquoise'}
                />
            </div>

            <Link
                href={cta.href}
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 bg-twhite px-5 py-3.5 text-xs font-extrabold tracking-[0.1em] uppercase transition sm:text-sm ${ctaClass}`}
            >
                <TransText fr={cta.fr} en={cta.en} ar={cta.ar} />
                <ExternalLink className="size-4" aria-hidden />
            </Link>
        </div>
    );
}

export default function FaqColumnsSection() {
    return (
        <section className="bg-twhite py-12 sm:py-14 lg:py-16">
            <TililaContainer>
                <div className="text-center">
                    <h2 className="text-base font-extrabold tracking-wide text-beta-blue uppercase sm:text-lg">
                        <TransText
                            fr="Trouvez rapidement votre réponse"
                            en="Find your answer quickly"
                            ar="اعثروا بسرعة على إجابتكم"
                        />
                    </h2>
                    <div
                        className="mx-auto mt-2 h-0.5 w-10 rounded-full bg-beta-blue/70"
                        aria-hidden
                    />
                </div>

                <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
                    <FaqColumn
                        program="tilila"
                        items={TILILA_FAQ_PAGE_ITEMS}
                        cta={{
                            href: '/tilila/reglement',
                            fr: 'Voir le règlement des Tilila Awards',
                            en: 'View Tilila Awards regulations',
                            ar: 'عرض نظام تيليلا أووردز',
                        }}
                    />
                    <FaqColumn
                        program="tililab"
                        items={TILILAB_FAQ_PAGE_ITEMS}
                        cta={{
                            href: '/tililab',
                            fr: 'Découvrir Tililab',
                            en: 'Discover Tililab',
                            ar: 'اكتشف تيليلاب',
                        }}
                    />
                </div>
            </TililaContainer>
        </section>
    );
}
