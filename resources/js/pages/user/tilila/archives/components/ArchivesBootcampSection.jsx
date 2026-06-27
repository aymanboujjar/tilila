import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, MapPin, Mic2 } from 'lucide-react';
import TransText from '@/components/TransText';
import ArchivesSectionHeading from '@/pages/user/tilila/archives/components/ArchivesSectionHeading';
import { textFor } from '@/pages/user/tilila/partials/EditionDetailContent';

function MetaPill({ icon: Icon, children }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-beta-white px-3 py-1.5 text-xs font-semibold text-tgray">
            <Icon className="size-3.5 shrink-0 text-beta-blue" aria-hidden />
            {children}
        </span>
    );
}

function BootcampProgramCard({ bootcamp, year, locale, detailsUrl, defaultOpen = false }) {
    const title = textFor(bootcamp?.title, locale);
    const dates = textFor(bootcamp?.dates, locale);
    const location = textFor(bootcamp?.location, locale);
    const days = Array.isArray(bootcamp?.days) ? bootcamp.days : [];
    const preBootcamp = bootcamp?.pre_bootcamp;
    const mc = Array.isArray(bootcamp?.masters_of_ceremony)
        ? bootcamp.masters_of_ceremony
        : [];
    const context = textFor(bootcamp?.context, locale);

    return (
        <article className="overflow-hidden rounded-2xl border border-border/50 bg-twhite shadow-[0_4px_24px_rgba(68,25,168,0.06)]">
            <div className="border-b border-border/40 bg-linear-to-r from-beta-blue/5 to-beta-turquoise/5 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-[10px] font-extrabold tracking-[0.14em] text-beta-turquoise uppercase">
                            {year}
                        </p>
                        <h3 className="mt-1 text-lg font-extrabold text-tblack sm:text-xl">
                            {title}
                        </h3>
                    </div>
                    {detailsUrl ? (
                        <Link
                            href={`${detailsUrl}#bootcamp`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-beta-blue uppercase hover:underline"
                        >
                            <TransText
                                en="Full edition"
                                fr="Voir l'édition"
                                ar="عرض الدورة"
                            />
                            <ArrowRight className="size-3.5" aria-hidden />
                        </Link>
                    ) : null}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {dates ? <MetaPill icon={Calendar}>{dates}</MetaPill> : null}
                    {location ? <MetaPill icon={MapPin}>{location}</MetaPill> : null}
                </div>

                {mc.length > 0 ? (
                    <p className="mt-3 flex items-start gap-2 text-sm text-tgray">
                        <Mic2
                            className="mt-0.5 size-4 shrink-0 text-beta-blue"
                            aria-hidden
                        />
                        <span>
                            <span className="font-bold text-tblack">
                                <TransText
                                    en="Master of ceremony"
                                    fr="Maître de cérémonie"
                                    ar="مقدم الحفل"
                                />
                                {': '}
                            </span>
                            {mc
                                .map((person) => person.name)
                                .filter(Boolean)
                                .join(' · ')}
                        </span>
                    </p>
                ) : null}
            </div>

            {context ? (
                <p className="border-b border-border/30 px-5 py-4 text-sm leading-relaxed text-tgray sm:px-6">
                    {context}
                </p>
            ) : null}

            {preBootcamp ? (
                <div className="border-b border-border/30 px-5 py-4 sm:px-6">
                    <p className="text-xs font-extrabold tracking-wide text-beta-blue uppercase">
                        <TransText
                            en="Pre-bootcamp"
                            fr="Pré-bootcamp"
                            ar="ما قبل المعسكر"
                        />
                    </p>
                    <p className="mt-1 text-sm font-bold text-tblack">
                        {textFor(preBootcamp.title, locale)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-tgray">
                        {textFor(preBootcamp.date, locale) ? (
                            <span>{textFor(preBootcamp.date, locale)}</span>
                        ) : null}
                        {textFor(preBootcamp.location, locale) ? (
                            <span>· {textFor(preBootcamp.location, locale)}</span>
                        ) : null}
                    </div>
                    {Array.isArray(preBootcamp.jury) &&
                    preBootcamp.jury.length > 0 ? (
                        <p className="mt-2 text-sm text-tgray">
                            <span className="font-semibold text-tblack">
                                <TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />
                                {': '}
                            </span>
                            {preBootcamp.jury
                                .map((m) => m.name)
                                .filter(Boolean)
                                .join(', ')}
                        </p>
                    ) : null}
                    {Array.isArray(preBootcamp.sessions) &&
                    preBootcamp.sessions.length > 0 ? (
                        <div className="mt-4 space-y-3">
                            {preBootcamp.sessions.map((session, sessionIndex) => (
                                <div
                                    key={`pre-session-${sessionIndex}`}
                                    className="rounded-xl border border-border/40 bg-beta-white/80 p-4"
                                >
                                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                        {session.time ? (
                                            <span className="text-xs font-extrabold tracking-wide text-beta-turquoise">
                                                {session.time}
                                            </span>
                                        ) : null}
                                        <p className="text-sm font-semibold text-tblack">
                                            {textFor(session.title, locale)}
                                        </p>
                                    </div>
                                    {(session.speakers ?? []).length > 0 ? (
                                        <ul className="mt-2 space-y-1">
                                            {session.speakers.map(
                                                (speaker, speakerIndex) => (
                                                    <li
                                                        key={`${speaker.name}-${speakerIndex}`}
                                                        className="text-sm text-tgray"
                                                    >
                                                        <span className="font-semibold text-tblack">
                                                            {speaker.name}
                                                        </span>
                                                        {textFor(
                                                            speaker.role,
                                                            locale,
                                                        ) ? (
                                                            <span>
                                                                {' '}
                                                                —{' '}
                                                                {textFor(
                                                                    speaker.role,
                                                                    locale,
                                                                )}
                                                            </span>
                                                        ) : null}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            ) : null}

            <div className="divide-y divide-border/30">
                {days.map((day, dayIndex) => (
                    <details
                        key={`${year}-day-${dayIndex}`}
                        className="group"
                        open={defaultOpen && dayIndex === 0}
                    >
                        <summary className="cursor-pointer list-none px-5 py-4 marker:content-none sm:px-6 [&::-webkit-details-marker]:hidden">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-extrabold text-beta-blue">
                                    {textFor(day.label, locale)}
                                </p>
                                <span className="text-xs font-bold text-beta-turquoise uppercase transition group-open:rotate-180">
                                    ▾
                                </span>
                            </div>
                        </summary>
                        <div className="space-y-3 px-5 pb-5 sm:px-6">
                            {(day.sessions ?? []).map((session, sessionIndex) => (
                                <div
                                    key={`${year}-session-${dayIndex}-${sessionIndex}`}
                                    className="rounded-xl border border-border/40 bg-beta-white/80 p-4"
                                >
                                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                        {session.time ? (
                                            <span className="text-xs font-extrabold tracking-wide text-beta-turquoise">
                                                {session.time}
                                            </span>
                                        ) : null}
                                        <p className="text-sm font-semibold text-tblack">
                                            {textFor(session.title, locale)}
                                        </p>
                                    </div>
                                    {(session.speakers ?? []).length > 0 ? (
                                        <ul className="mt-2 space-y-1">
                                            {session.speakers.map(
                                                (speaker, speakerIndex) => (
                                                    <li
                                                        key={`${speaker.name}-${speakerIndex}`}
                                                        className="text-sm text-tgray"
                                                    >
                                                        <span className="font-semibold text-tblack">
                                                            {speaker.name}
                                                        </span>
                                                        {textFor(
                                                            speaker.role,
                                                            locale,
                                                        ) ? (
                                                            <span>
                                                                {' '}
                                                                —{' '}
                                                                {textFor(
                                                                    speaker.role,
                                                                    locale,
                                                                )}
                                                            </span>
                                                        ) : null}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    ) : null}
                                </div>
                            ))}
                            {Array.isArray(day.jury) && day.jury.length > 0 ? (
                                <p className="text-sm text-tgray">
                                    <span className="font-semibold text-tblack">
                                        <TransText
                                            en="Jury"
                                            fr="Jury"
                                            ar="لجنة التحكيم"
                                        />
                                        {': '}
                                    </span>
                                    {day.jury
                                        .map((m) => m.name)
                                        .filter(Boolean)
                                        .join(', ')}
                                </p>
                            ) : null}
                        </div>
                    </details>
                ))}
            </div>
        </article>
    );
}

export default function ArchivesBootcampSection({
    items = [],
    year,
    detailsUrl,
    locale,
}) {
    const yearLabel = year === 'all' ? '' : ` ${year}`;

    if (!items.length) {
        return (
            <section id="bootcamp-programme" className="scroll-mt-32">
                <ArchivesSectionHeading
                    kicker={
                        <TransText en="Tililab" fr="Tililab" ar="تيليلاب" />
                    }
                    title={
                        <TransText
                            en={`Bootcamp programme${yearLabel}`}
                            fr={`Programme bootcamp${yearLabel}`}
                            ar={`برنامج المعسكر${yearLabel}`}
                        />
                    }
                />
                <p className="mt-8 rounded-2xl border border-dashed border-beta-blue/25 bg-beta-white px-6 py-12 text-center text-sm text-tgray">
                    <TransText
                        en="Bootcamp programme for this selection will be published soon."
                        fr="Le programme bootcamp pour cette sélection sera publié prochainement."
                        ar="سيُنشر برنامج المعسكر لهذا الاختيار قريبًا."
                    />
                </p>
            </section>
        );
    }

    return (
        <section id="bootcamp-programme" className="scroll-mt-32">
            <ArchivesSectionHeading
                kicker={
                    <TransText en="Tililab" fr="Tililab" ar="تيليلاب" />
                }
                title={
                    <TransText
                        en={`Bootcamp programme${yearLabel}`}
                        fr={`Programme bootcamp${yearLabel}`}
                        ar={`برنامج المعسكر${yearLabel}`}
                    />
                }
            />

            <div className="mt-8 space-y-6">
                {items.map((item) => (
                    <BootcampProgramCard
                        key={item.year}
                        bootcamp={item.bootcamp}
                        year={item.year}
                        locale={locale}
                        detailsUrl={detailsUrl}
                        defaultOpen={items.length === 1}
                    />
                ))}
            </div>
        </section>
    );
}

export function EditionBootcampSchedule({ bootcamp, locale }) {
    if (!bootcamp || typeof bootcamp !== 'object') {
        return null;
    }

    return (
        <BootcampProgramCard
            bootcamp={bootcamp}
            year=""
            locale={locale}
            detailsUrl={null}
            defaultOpen
        />
    );
}
