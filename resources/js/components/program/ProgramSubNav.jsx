import { Link, usePage } from '@inertiajs/react';
import TransText from '@/components/TransText';

const TILILA_LINKS = [
    { hash: 'candidature', fr: 'Candidater', en: 'Apply', ar: 'ترشح' },
    { hash: 'prizes', fr: 'Les prix', en: 'Prizes', ar: 'الجوائز' },
    { hash: 'calendar', fr: 'Calendrier', en: 'Calendar', ar: 'التقويم' },
    { hash: 'admission', fr: 'Conditions', en: 'Conditions', ar: 'الشروط' },
    { hash: 'jury', fr: 'Jury', en: 'Jury', ar: 'لجنة التحكيم' },
    {
        hash: 'news',
        fr: 'Actualités',
        en: 'News',
        ar: 'أخبار',
        href: '/actualites?program=tilila',
    },
    {
        hash: 'reglement',
        fr: 'Règlement',
        en: 'Rules',
        ar: 'النظام',
        href: '/tilila/reglement',
    },
    {
        hash: 'contact',
        fr: 'Contact',
        en: 'Contact',
        ar: 'تواصل',
        href: '#contact',
    },
];

const TILILAB_LINKS = [
    { hash: 'candidature', fr: 'Candidater', en: 'Apply', ar: 'ترشح' },
    { hash: 'journey', fr: 'Parcours', en: 'Journey', ar: 'المسار' },
    { hash: 'prizes', fr: 'Récompenses', en: 'Rewards', ar: 'المكافآت' },
    { hash: 'calendar', fr: 'Calendrier', en: 'Calendar', ar: 'التقويم' },
    { hash: 'admission', fr: 'Conditions', en: 'Conditions', ar: 'الشروط' },
    { hash: 'faq', fr: 'FAQ', en: 'FAQ', ar: 'الأسئلة', href: '#faq' },
    {
        hash: 'news',
        fr: 'Actualités',
        en: 'News',
        ar: 'أخبار',
        href: '/actualites?program=tililab',
    },
    {
        hash: 'contact',
        fr: 'Contact',
        en: 'Contact',
        ar: 'تواصل',
        href: '#contact',
    },
];

function normalizePath(path) {
    if (!path) return '/';
    const base = String(path).split('?')[0];
    if (base.length > 1 && base.endsWith('/')) return base.slice(0, -1);
    return base || '/';
}

export default function ProgramSubNav({ program }) {
    const currentPath = normalizePath(usePage().url);
    const isTilila = program === 'tilila';
    const links = isTilila ? TILILA_LINKS : TILILAB_LINKS;
    const applyHref = isTilila ? '/tilila/participate' : '/tililab/form';
    const show =
        currentPath === '/' ||
        currentPath === '/tilila' ||
        currentPath === '/tililab';

    if (!show) {
        return null;
    }

    return (
        <nav
            aria-label={
                isTilila ? 'Tilila Awards navigation' : 'Tililab navigation'
            }
            className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur"
        >
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2">
                <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {links.map((item) => {
                        const href = item.href ?? `#${item.hash}`;
                        const isExternal =
                            href.startsWith('/') && !href.startsWith('/#');

                        if (isExternal) {
                            return (
                                <Link
                                    key={item.hash}
                                    href={href}
                                    className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-tgray uppercase transition hover:bg-alpha-blue hover:text-beta-blue"
                                >
                                    <TransText
                                        en={item.en}
                                        fr={item.fr}
                                        ar={item.ar}
                                    />
                                </Link>
                            );
                        }

                        return (
                            <a
                                key={item.hash}
                                href={href}
                                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-tgray uppercase transition hover:bg-alpha-blue hover:text-beta-blue"
                            >
                                <TransText
                                    en={item.en}
                                    fr={item.fr}
                                    ar={item.ar}
                                />
                            </a>
                        );
                    })}
                </div>
                <Link
                    href={applyHref}
                    className="hidden shrink-0 rounded-full bg-beta-blue px-4 py-2 text-xs font-bold tracking-wide text-twhite uppercase transition hover:opacity-90 sm:inline-flex"
                >
                    {isTilila ? (
                        <TransText
                            en="Submit application"
                            fr="Déposer une candidature"
                            ar="قدّم ترشيحك"
                        />
                    ) : (
                        <TransText
                            en="Apply to Tililab"
                            fr="Candidater à Tililab"
                            ar="ترشح لتيليلاب"
                        />
                    )}
                </Link>
            </div>
        </nav>
    );
}
