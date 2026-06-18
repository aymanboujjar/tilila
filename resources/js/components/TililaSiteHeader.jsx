import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import TransText from '@/components/TransText';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NAV = [
    { href: '/', en: 'Home', fr: 'Accueil', ar: 'الرئيسية', match: (p) => p === '/' },
    { href: '/tilila', en: 'Tilila Awards', fr: 'Tilila Awards', ar: 'تيليلا أووردز', match: (p) => p === '/tilila' },
    { href: '/tililab', en: 'Tililab', fr: 'Tililab', ar: 'تيليلاب', match: (p) => p === '/tililab' },
    { href: '/tilila/archives', en: 'Archives', fr: 'Archives', ar: 'الأرشيف', match: (p) => p.startsWith('/tilila/archives') },
    { href: '/events', en: 'News', fr: 'Actualités', ar: 'أخبار', match: (p) => p.startsWith('/events') || p.startsWith('/actualites') },
    { href: '/about#partners', en: 'Partners', fr: 'Partenaires', ar: 'الشركاء', match: (p) => p === '/about' },
    { href: '/tilila#faq', en: 'FAQ', fr: 'FAQ', ar: 'الأسئلة الشائعة', match: () => false },
    { href: '/contact', en: 'Contact', fr: 'Contact', ar: 'تواصل', match: (p) => p === '/contact' },
];

function normalizePath(path) {
    if (!path) return '/';
    const base = String(path).split('?')[0];
    if (base.length > 1 && base.endsWith('/')) return base.slice(0, -1);
    return base || '/';
}

export default function TililaSiteHeader() {
    const [open, setOpen] = useState(false);
    const currentPath = normalizePath((usePage().url || '/').split('?')[0]);

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
                    className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-6"
                    aria-label="Tilila"
                >
                    {NAV.map((item) => {
                        const active = item.match(currentPath);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`shrink-0 text-[10px] font-bold tracking-[0.12em] uppercase transition xl:text-[11px] ${
                                    active
                                        ? 'text-beta-blue'
                                        : 'text-tblack hover:text-beta-blue'
                                }`}
                            >
                                <TransText en={item.en} fr={item.fr} ar={item.ar} />
                            </Link>
                        );
                    })}
                </nav>

                <div className="ml-auto flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/tilila/participate"
                        className="hidden items-center justify-center rounded-lg bg-beta-blue px-4 py-2.5 text-[10px] font-bold tracking-[0.1em] text-twhite uppercase transition hover:bg-brand-light-purple sm:inline-flex xl:px-5 xl:text-[11px]"
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
                    <LanguageSwitcher />
                </div>
            </div>

            {open ? (
                <div className="border-t border-border/80 bg-twhite px-4 py-4 lg:hidden">
                    <nav className="flex flex-col gap-1">
                        {NAV.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-tblack hover:bg-alpha-blue/40"
                                onClick={() => setOpen(false)}
                            >
                                <TransText en={item.en} fr={item.fr} ar={item.ar} />
                            </Link>
                        ))}
                        <Link
                            href="/tilila/participate"
                            className="mt-2 inline-flex items-center justify-center rounded-lg bg-beta-blue px-4 py-3 text-xs font-bold tracking-wide text-twhite uppercase"
                            onClick={() => setOpen(false)}
                        >
                            <TransText
                                en="Submit application"
                                fr="Déposer une candidature"
                                ar="قدّم ترشيحك"
                            />
                        </Link>
                    </nav>
                </div>
            ) : null}
        </header>
    );
}
