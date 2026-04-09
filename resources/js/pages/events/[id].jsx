import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';
import EventHero from '@/pages/events/Partials/Details/EventHero';
import EventReplay from '@/pages/events/Partials/Details/EventReplay';
import SpeakersCard from '@/pages/events/Partials/Details/SpeakersCard';
import AgendaCard from '@/pages/events/Partials/Details/AgendaCard';
import PartnersCard from '@/pages/events/Partials/Details/PartnersCard';
import PhotoGallery from '@/pages/events/Partials/Details/PhotoGallery';
import RegistrationCard from '@/pages/events/Partials/Details/RegistrationCard';

export default function EventDetails({ event, details }) {
    const { locale } = useTranslation();
    const base = event ?? {};
    const [registerOpen, setRegisterOpen] = React.useState(false);

    const hero = details?.hero ?? {};
    const resolve = (v) =>
        typeof v === 'string'
            ? v
            : locale === 'ar'
              ? v?.ar
              : locale === 'fr'
                ? v?.fr
                : v?.en;

    const title = hero?.title ?? resolve(base?.title) ?? 'Event';
    const locationLabel = hero?.locationLabel ?? resolve(base?.location) ?? '';
    const subtitle = hero?.subtitle ?? resolve(base?.excerpt) ?? '';
    const badgeLabel =
        (typeof hero?.badge === 'string' ? hero.badge : null) ??
        resolve(hero?.badge) ??
        resolve(base?.badge) ??
        resolve(base?.categoryLabel) ??
        '';

    const dateLabel =
        hero?.dateLabel ??
        [base?.dateIso, base?.startTime, base?.tzLabel]
            .filter(Boolean)
            .join(' · ') ??
        '';

    const aboutParagraphs =
        (details?.about?.paragraphs ?? []).length > 0
            ? details.about.paragraphs
            : resolve(base?.excerpt)
              ? [base?.excerpt]
              : [];

    const heroImageSrc = base?.imageSrc ?? null;

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
                            badge={badgeLabel}
                            dateLabel={dateLabel}
                            locationLabel={locationLabel}
                            title={title}
                            subtitle={subtitle}
                            imageSrc={heroImageSrc}
                            onRegister={() => setRegisterOpen(true)}
                        />
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="space-y-8 lg:col-span-8">
                            {details?.replay ? (
                                <div id="replay">
                                    <EventReplay {...(details?.replay ?? {})} />
                                </div>
                            ) : null}

                            {aboutParagraphs.length > 0 ? (
                                <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                                    <div className="text-sm font-extrabold text-foreground">
                                        {resolve(details?.about?.title) ??
                                            'About the Event'}
                                    </div>
                                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                                        {aboutParagraphs.map((p, idx) => (
                                            <p key={idx}>
                                                {typeof p === 'string'
                                                    ? p
                                                    : resolve(p)}
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            ) : null}

                            {(details?.gallery?.items ?? []).length > 0 ? (
                                <PhotoGallery {...(details?.gallery ?? {})} />
                            ) : null}
                        </div>

                        <div className="space-y-6 lg:col-span-4">
                            {(details?.speakers?.items ?? []).length > 0 ? (
                                <SpeakersCard {...(details?.speakers ?? {})} />
                            ) : null}
                            {(details?.agenda?.items ?? []).length > 0 ? (
                                <AgendaCard {...(details?.agenda ?? {})} />
                            ) : null}
                            {(details?.partners?.items ?? []).length > 0 ? (
                                <PartnersCard {...(details?.partners ?? {})} />
                            ) : null}
                        </div>
                    </div>
                </div>

                <RegistrationCard
                    isOpen={registerOpen}
                    onClose={() => setRegisterOpen(false)}
                    eventId={base?.id}
                    badge={resolve(details?.registration?.badge)}
                    title={resolve(details?.registration?.title)}
                    description={resolve(details?.registration?.description)}
                    submitLabel={resolve(details?.registration?.submitLabel)}
                />
            </div>
        </>
    );
}

EventDetails.layout = (page) => <AppLayout>{page}</AppLayout>;

