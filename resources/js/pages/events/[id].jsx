import React, { useMemo } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { EVENTS } from '@/pages/events/Partials/events-data';
import { EVENT_DETAILS } from '@/pages/events/Partials/event-details-data';
import EventHero from '@/pages/events/Partials/Details/EventHero';
import EventReplay from '@/pages/events/Partials/Details/EventReplay';
import SpeakersCard from '@/pages/events/Partials/Details/SpeakersCard';
import AgendaCard from '@/pages/events/Partials/Details/AgendaCard';
import PartnersCard from '@/pages/events/Partials/Details/PartnersCard';
import PhotoGallery from '@/pages/events/Partials/Details/PhotoGallery';
import RegistrationCard from '@/pages/events/Partials/Details/RegistrationCard';

export default function EventDetails({ id }) {
    const pageProps = usePage().props;
    const eventId = id ?? pageProps?.id;

    const base = useMemo(
        () => EVENTS.find((e) => e.id === eventId) ?? EVENTS[0],
        [eventId],
    );

    const details = useMemo(
        () => EVENT_DETAILS[eventId] ?? EVENT_DETAILS[EVENTS?.[0]?.id],
        [eventId],
    );

    const hero = details?.hero ?? {};
    const title = hero?.title ?? base?.title ?? 'Event';

    return (
        <>
            <Head title={title} />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Link href="/" className="hover:text-foreground hover:underline">
                            Home
                        </Link>
                        <span aria-hidden="true">›</span>
                        <Link
                            href="/events"
                            className="hover:text-foreground hover:underline"
                        >
                            Events
                        </Link>
                        <span aria-hidden="true">›</span>
                        <span className="font-semibold text-foreground">{title}</span>
                    </nav>

                    <div className="mt-6">
                        <EventHero
                            badge={hero?.badge ?? base?.badge}
                            dateLabel={hero?.dateLabel}
                            locationLabel={hero?.locationLabel ?? base?.location}
                            title={title}
                            subtitle={hero?.subtitle ?? base?.excerpt}
                            onWatchReplay={() => {
                                document
                                    .getElementById('replay')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            onShare={() => {
                                document
                                    .getElementById('share')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        />
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="space-y-8 lg:col-span-8">
                            <div id="replay">
                                <EventReplay {...(details?.replay ?? {})} />
                            </div>

                            <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                                <div className="text-sm font-extrabold text-foreground">
                                    {details?.about?.title ?? 'About the Event'}
                                </div>
                                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                                    {(details?.about?.paragraphs ?? []).map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                </div>
                            </section>

                            <PhotoGallery {...(details?.gallery ?? {})} />
                        </div>

                        <div className="space-y-6 lg:col-span-4">
                            <SpeakersCard {...(details?.speakers ?? {})} />
                            <AgendaCard {...(details?.agenda ?? {})} />
                            <PartnersCard {...(details?.partners ?? {})} />
                        </div>
                    </div>
                </div>

                <div id="share" />
                <RegistrationCard {...(details?.registration ?? {})} />
            </div>
        </>
    );
}

EventDetails.layout = (page) => <AppLayout>{page}</AppLayout>;

