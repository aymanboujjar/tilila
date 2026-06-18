import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import TransText from '@/components/TransText';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NAV = [
    { hash: 'hero', fr: 'Candidater', en: 'Apply', ar: 'ترشح' },
    { hash: 'prizes', fr: 'Les récompenses', en: 'Rewards', ar: 'المكافآت' },
    { hash: 'calendar', fr: 'Calendrier', en: 'Calendar', ar: 'التقويم' },
    { hash: 'jury', fr: 'Jury', en: 'Jury', ar: 'لجنة التحكيم' },
    { href: '/tililab/reglement', fr: 'Règlement', en: 'Rules', ar: 'النظام' },
    { hash: 'partners', fr: 'Partenaires', en: 'Partners', ar: 'الشركاء' },
];

export default function TililabAwardsHeader() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border/80 bg-twhite/95 backdrop-blur-md">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link href="/tililab" className="shrink-0">
                    <img
                        src="/assets/tililab/tililab-logo.png"
                        alt="Tililab"
                        className="h-10 w-10 object-contain sm:h-11 sm:w-11"
                        loading="eager"
                    />
                </Link>

                <nav
                    className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-7"
                    aria-label="Tililab"
                >
                    {NAV.map((item) => {
                        const href = item.href ?? `#${item.hash}`;
                        const isRoute = href.startsWith('/');

                        return (
                            <a
                                key={href}
                                href={href}
                                className="text-xs font-bold tracking-[0.12em] text-tblack uppercase transition hover:text-beta-blue"
                                {...(isRoute
                                    ? {}
                                    : { onClick: () => setOpen(false) })}
                            >
                                <TransText
                                    en={item.en}
                                    fr={item.fr}
                                    ar={item.ar}
                                />
                            </a>
                        );
                    })}
                </nav>

                <div className="ms-auto flex items-center gap-2">
                    <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center rounded-lg border border-border lg:hidden"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-label="Menu"
                    >
                        {open ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                    <LanguageSwitcher />
                </div>
            </div>

            {open ? (
                <nav
                    className="border-t border-border bg-twhite px-4 py-4 lg:hidden"
                    aria-label="Tililab mobile"
                >
                    <div className="flex flex-col gap-3">
                        {NAV.map((item) => {
                            const href = item.href ?? `#${item.hash}`;
                            return (
                                <a
                                    key={href}
                                    href={href}
                                    className="text-sm font-semibold text-tblack"
                                    onClick={() => setOpen(false)}
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
                </nav>
            ) : null}
        </header>
    );
}
