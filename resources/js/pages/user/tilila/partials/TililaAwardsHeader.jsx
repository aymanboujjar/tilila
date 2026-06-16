import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import TransText from '@/components/TransText';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NAV = [
    { hash: 'hero', fr: 'Candidater', en: 'Apply', ar: 'ترشح' },
    { hash: 'prizes', fr: 'Les prix', en: 'Prizes', ar: 'الجوائز' },
    { hash: 'calendar', fr: 'Calendrier', en: 'Calendar', ar: 'التقويم' },
    { hash: 'jury', fr: 'Jury', en: 'Jury', ar: 'لجنة التحكيم' },
    { href: '/tilila/reglement', fr: 'Règlement', en: 'Rules', ar: 'النظام' },
    { hash: 'partners', fr: 'Partenaires', en: 'Partners', ar: 'الشركاء' },
];

export default function TililaAwardsHeader() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border/80 bg-twhite/95 backdrop-blur-md">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link href="/" className="shrink-0">
                    <img
                        src="/assets/logo.png"
                        alt="Tilila Awards"
                        className="h-10 w-auto object-contain sm:h-11"
                        loading="eager"
                    />
                </Link>

                <nav
                    className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-7"
                    aria-label="Tilila Awards"
                >
                    {NAV.map((item) => {
                        const href = item.href ?? `#${item.hash}`;
                        const isRoute = href.startsWith('/');

                        const className =
                            'shrink-0 text-[11px] font-bold tracking-[0.14em] text-tblack uppercase transition hover:text-beta-blue';

                        if (isRoute) {
                            return (
                                <Link key={item.fr} href={href} className={className}>
                                    <TransText en={item.en} fr={item.fr} ar={item.ar} />
                                </Link>
                            );
                        }

                        return (
                            <a key={item.fr} href={href} className={className}>
                                <TransText en={item.en} fr={item.fr} ar={item.ar} />
                            </a>
                        );
                    })}
                </nav>

                <div className="ml-auto flex items-center gap-2 sm:gap-3">
                    <LanguageSwitcher className="hidden sm:flex" />
                    <Link
                        href="/tilila/participate"
                        className="hidden items-center justify-center rounded-lg bg-beta-blue px-5 py-2.5 text-[11px] font-bold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple sm:inline-flex"
                    >
                        <TransText
                            en="Submit application"
                            fr="Déposer une candidature"
                            ar="قدّم ترشيحك"
                        />
                    </Link>
                    <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-beta-blue lg:hidden"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </div>

            {open ? (
                <nav className="border-t border-border bg-twhite px-4 py-4 lg:hidden">
                    <ul className="flex flex-col gap-1">
                        {NAV.map((item) => {
                            const href = item.href ?? `#${item.hash}`;
                            const isRoute = href.startsWith('/');
                            const className =
                                'rounded-lg px-3 py-2.5 text-xs font-bold tracking-[0.12em] text-tblack uppercase hover:bg-alpha-blue';

                            return (
                                <li key={item.fr}>
                                    {isRoute ? (
                                        <Link
                                            href={href}
                                            className={className}
                                            onClick={() => setOpen(false)}
                                        >
                                            <TransText en={item.en} fr={item.fr} ar={item.ar} />
                                        </Link>
                                    ) : (
                                        <a
                                            href={href}
                                            className={className}
                                            onClick={() => setOpen(false)}
                                        >
                                            <TransText en={item.en} fr={item.fr} ar={item.ar} />
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                        <li className="pt-2">
                            <Link
                                href="/tilila/participate"
                                className="flex items-center justify-center rounded-lg bg-beta-blue px-4 py-3 text-xs font-bold tracking-[0.12em] text-twhite uppercase"
                                onClick={() => setOpen(false)}
                            >
                                <TransText
                                    en="Submit application"
                                    fr="Déposer une candidature"
                                    ar="قدّم ترشيحك"
                                />
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : null}
        </header>
    );
}
