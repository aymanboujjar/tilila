import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Mic2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import TransText from '@/components/TransText';
import { HOME_EASE } from '@/components/motion/home-motion';
import { textFor } from '@/pages/user/tilila/partials/EditionDetailContent';

function inferSessionKind(title) {
    const t = (title || '').toLowerCase();
    if (/master\s*class|masterclass/i.test(t)) return 'masterclass';
    if (/workshop|atelier/i.test(t)) return 'workshop';
    if (/conférence|conference|keynote/i.test(t)) return 'conference';
    if (/pitch/i.test(t)) return 'pitch';
    if (
        /déjeuner|dîner|dinner|lunch|petit.?déjeuner|breakfast|cocktail|pause.?café|coffee/i.test(
            t,
        )
    ) {
        return 'meal';
    }
    if (/vidéo|video|projection/i.test(t)) return 'screening';
    if (/wrap|clôture|closing|certificat|check-out|départ/i.test(t)) {
        return 'closing';
    }
    return null;
}

const KIND_LABEL = {
    masterclass: { en: 'Masterclass', fr: 'Masterclass', ar: 'ماستركلاس' },
    workshop: { en: 'Workshop', fr: 'Workshop', ar: 'ورشة' },
    conference: { en: 'Conference', fr: 'Conférence', ar: 'محاضرة' },
    pitch: { en: 'Pitch', fr: 'Pitch', ar: 'عرض' },
    meal: { en: 'Meal', fr: 'Repas', ar: 'وجبة' },
    screening: { en: 'Screening', fr: 'Projection', ar: 'عرض' },
    closing: { en: 'Closing', fr: 'Clôture', ar: 'ختام' },
};

function SessionRow({ session, locale, isLast }) {
    const title = textFor(session.title, locale);
    const time = session.time?.trim();
    const speakers = Array.isArray(session.speakers)
        ? session.speakers.filter((s) => s?.name)
        : [];
    const kind = inferSessionKind(title);
    const kindLabel = kind ? KIND_LABEL[kind] : null;

    return (
        <li className="relative flex gap-4 sm:gap-6">
            {!isLast ? (
                <span
                    className="absolute inset-s-14 top-8 bottom-0 w-px bg-border/60 sm:inset-s-18"
                    aria-hidden
                />
            ) : null}

            <div className="w-14 shrink-0 pt-0.5 text-end sm:w-18">
                {time ? (
                    <time className="text-xs font-bold text-tililab-cyan tabular-nums sm:text-sm">
                        {time}
                    </time>
                ) : (
                    <span className="text-xs text-tgray">—</span>
                )}
            </div>

            <div
                className={`min-w-0 flex-1 pb-6 ${isLast ? 'pb-0' : ''}`}
            >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    {kindLabel ? (
                        <span className="text-[10px] font-bold tracking-wide text-tililab-cyan uppercase">
                            <TransText
                                en={kindLabel.en}
                                fr={kindLabel.fr}
                                ar={kindLabel.ar}
                            />
                        </span>
                    ) : null}
                    <p className="text-sm leading-relaxed text-tblack sm:text-[15px]">
                        {title}
                    </p>
                </div>

                {speakers.length > 0 ? (
                    <ul className="mt-1.5 space-y-0.5">
                        {speakers.map((speaker, index) => {
                            const role = textFor(speaker.role, locale);
                            return (
                                <li
                                    key={`${speaker.name}-${index}`}
                                    className="text-xs text-tgray sm:text-sm"
                                >
                                    <span className="font-semibold text-tililab-slate">
                                        {speaker.name}
                                    </span>
                                    {role ? (
                                        <span className="text-tgray">
                                            {' — '}
                                            {role}
                                        </span>
                                    ) : null}
                                </li>
                            );
                        })}
                    </ul>
                ) : null}
            </div>
        </li>
    );
}

function JuryNote({ jury }) {
    if (!jury?.length) return null;

    return (
        <p className="mt-5 border-t border-border/40 pt-4 text-sm text-tgray">
            <span className="font-bold text-tililab-slate">
                <TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />
                {': '}
            </span>
            {jury.map((m) => m.name).filter(Boolean).join(' · ')}
        </p>
    );
}

function DayAgenda({ day, locale }) {
    const sessions = Array.isArray(day.sessions) ? day.sessions : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: HOME_EASE }}
        >
            <ul className="mt-1">
                {sessions.map((session, i) => (
                    <SessionRow
                        key={`s-${i}`}
                        session={session}
                        locale={locale}
                        isLast={i === sessions.length - 1}
                    />
                ))}
            </ul>
            <JuryNote jury={day.jury} />
        </motion.div>
    );
}

function PreBootcampAgenda({ preBootcamp, locale }) {
    const sessions = Array.isArray(preBootcamp.sessions)
        ? preBootcamp.sessions
        : [];
    const date = textFor(preBootcamp.date, locale);
    const location = textFor(preBootcamp.location, locale);
    const title = textFor(preBootcamp.title, locale);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: HOME_EASE }}
        >
            {(title || date || location) && (
                <div className="mb-4 text-sm text-tgray">
                    {title ? (
                        <p className="font-semibold text-tililab-slate">
                            {title}
                        </p>
                    ) : null}
                    {(date || location) && (
                        <p className="mt-1">
                            {[date, location].filter(Boolean).join(' · ')}
                        </p>
                    )}
                </div>
            )}

            <ul>
                {sessions.map((session, i) => (
                    <SessionRow
                        key={`pre-${i}`}
                        session={session}
                        locale={locale}
                        isLast={i === sessions.length - 1}
                    />
                ))}
            </ul>
            <JuryNote jury={preBootcamp.jury} />
        </motion.div>
    );
}

function PlanningTabs({ days, preBootcamp, locale, activeKey, onSelect }) {
    const items = useMemo(() => {
        const rows = [];
        if (preBootcamp) {
            rows.push({
                key: 'pre',
                label: (
                    <TransText
                        en="Pre-bootcamp"
                        fr="Pré-bootcamp"
                        ar="ما قبل المعسكر"
                    />
                ),
            });
        }
        days.forEach((day, index) => {
            rows.push({
                key: String(index),
                label: textFor(day.label, locale),
            });
        });
        return rows;
    }, [days, preBootcamp, locale]);

    return (
        <nav
            className="flex gap-1 overflow-x-auto border-b border-border/50 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Programme navigation"
        >
            {items.map((item) => {
                const isActive = activeKey === item.key;
                return (
                    <button
                        key={item.key}
                        type="button"
                        onClick={() => onSelect(item.key)}
                        className={`shrink-0 border-b-2 px-3 py-2.5 text-start text-sm font-semibold transition sm:px-4 ${
                            isActive
                                ? 'border-tililab-cyan text-tililab-slate'
                                : 'border-transparent text-tgray hover:text-tblack'
                        }`}
                    >
                        {item.label}
                    </button>
                );
            })}
        </nav>
    );
}

export default function TililabBootcampProgramme({
    bootcamp,
    locale,
    year = '',
    detailsUrl = null,
    expandFirstDay = false,
}) {
    const days = Array.isArray(bootcamp?.days) ? bootcamp.days : [];
    const preBootcamp = bootcamp?.pre_bootcamp;
    const defaultKey = preBootcamp ? 'pre' : days.length ? '0' : 'pre';

    const [activeKey, setActiveKey] = useState(
        expandFirstDay ? defaultKey : defaultKey,
    );

    const title = textFor(bootcamp?.title, locale);
    const dates = textFor(bootcamp?.dates, locale);
    const location = textFor(bootcamp?.location, locale);
    const context = textFor(bootcamp?.context, locale);
    const mc = Array.isArray(bootcamp?.masters_of_ceremony)
        ? bootcamp.masters_of_ceremony
        : [];

    const activeDay =
        activeKey !== 'pre' ? days[Number(activeKey)] : null;
    const activeLabel =
        activeKey === 'pre'
            ? null
            : textFor(activeDay?.label, locale);

    const metaParts = [
        dates ? { icon: Calendar, text: dates } : null,
        location ? { icon: MapPin, text: location } : null,
        mc.length > 0
            ? {
                  icon: Mic2,
                  text: mc
                      .map((p) => {
                          const role = textFor(p.role, locale);
                          return role ? `${p.name} (${role})` : p.name;
                      })
                      .filter(Boolean)
                      .join(' · '),
              }
            : null,
    ].filter(Boolean);

    return (
        <article className="overflow-hidden rounded-2xl border border-border/50 bg-twhite">
            <header className="border-b border-border/40 px-5 py-5 sm:px-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                        {year ? (
                            <p className="text-[10px] font-bold tracking-[0.14em] text-tililab-cyan uppercase">
                                {year}
                            </p>
                        ) : null}
                        <h3 className="text-lg font-extrabold text-tililab-slate sm:text-xl">
                            {title}
                        </h3>
                    </div>

                    {detailsUrl ? (
                        <Link
                            href={`${detailsUrl}#bootcamp`}
                            className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-tililab-cyan hover:underline"
                        >
                            <TransText
                                en="View edition"
                                fr="Voir l'édition"
                                ar="عرض الدورة"
                            />
                            <ArrowRight className="size-3.5" aria-hidden />
                        </Link>
                    ) : null}
                </div>

                {metaParts.length > 0 ? (
                    <ul className="mt-3 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-1">
                        {metaParts.map(({ icon: Icon, text }, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-tgray"
                            >
                                <Icon
                                    className="mt-0.5 size-3.5 shrink-0 text-tililab-cyan"
                                    aria-hidden
                                />
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                ) : null}

                {context ? (
                    <p className="mt-4 border-s-2 border-tililab-cyan/40 ps-3 text-sm leading-relaxed text-tgray">
                        {context}
                    </p>
                ) : null}
            </header>

            <div className="px-5 sm:px-6">
                <p className="pt-4 text-[10px] font-bold tracking-[0.14em] text-tgray uppercase">
                    <TransText en="Schedule" fr="Planning" ar="الجدول" />
                </p>
                <PlanningTabs
                    days={days}
                    preBootcamp={preBootcamp}
                    locale={locale}
                    activeKey={activeKey}
                    onSelect={setActiveKey}
                />
            </div>

            <div className="px-5 py-5 sm:px-6 sm:py-6">
                {activeLabel ? (
                    <h4 className="mb-4 text-base font-bold text-tililab-slate">
                        {activeLabel}
                    </h4>
                ) : null}

                <AnimatePresence mode="wait">
                    {activeKey === 'pre' && preBootcamp ? (
                        <PreBootcampAgenda
                            key="pre"
                            preBootcamp={preBootcamp}
                            locale={locale}
                        />
                    ) : activeDay ? (
                        <DayAgenda
                            key={activeKey}
                            day={activeDay}
                            locale={locale}
                        />
                    ) : null}
                </AnimatePresence>
            </div>
        </article>
    );
}
