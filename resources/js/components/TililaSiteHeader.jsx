import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import TransText from '@/components/TransText';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/contexts/TranslationContext';

const NAV = [
    {
        type: 'link',
        href: '/',
        en: 'Home',
        fr: 'Accueil',
        ar: 'الرئيسية',
        match: (p) => p === '/',
    },
    {
        type: 'dropdown',
        id: 'about',
        en: 'About',
        fr: 'À propos',
        ar: 'من نحن',
        match: (p) => p.startsWith('/about'),
        children: [
            {
                href: '/about#overview',
                en: 'Tilila: SOREAD 2M EDI programme',
                fr: 'Tilila : Programme EDI SOREAD 2M',
                ar: 'تيليلا: برنامج EDI SOREAD 2M',
            },
            {
                href: '/about#mission',
                en: 'Parity & Diversity Committee',
                fr: 'Comité Parité & Diversité',
                ar: 'لجنة المساواة والتنوع',
            },
        ],
    },
    {
        type: 'link',
        href: '/tilila',
        en: 'Tilila Awards',
        fr: 'Tilila Awards',
        ar: 'تيليلا أووردز',
        match: (p) =>
            p === '/tilila' ||
            (p.startsWith('/tilila/') && !p.startsWith('/tilila/archives')),
    },
    {
        type: 'link',
        href: '/tililab',
        en: 'Tililab',
        fr: 'Tililab',
        ar: 'تيليلاب',
        match: (p) => p === '/tililab' || p.startsWith('/tililab/'),
    },
    {
        type: 'link',
        href: '/tilila/archives',
        en: 'Archives & awards',
        fr: 'Archives & Palmarès',
        frLg: 'Archives',
        ar: 'الأرشيف والجوائز',
        match: (p) => p.startsWith('/tilila/archives'),
    },
    {
        type: 'link',
        href: '/events',
        en: 'News',
        fr: 'Actualités',
        ar: 'أخبار',
        match: (p) => p.startsWith('/events'),
    },
    {
        type: 'link',
        href: '/about#partners',
        en: 'Partners',
        fr: 'Partenaires',
        ar: 'الشركاء',
        match: (p, hash) => p === '/about' && hash === 'partners',
    },
    {
        type: 'link',
        href: '/tilila#faq',
        en: 'FAQ',
        fr: 'FAQ',
        ar: 'الأسئلة الشائعة',
        match: (p, hash) =>
            (p === '/tilila' || p.startsWith('/tilila/')) && hash === 'faq',
    },
    {
        type: 'link',
        href: '/contact',
        en: 'Contact',
        fr: 'Contact',
        ar: 'تواصل',
        match: (p) => p === '/contact',
    },
];

const linkClass = (active) =>
    `inline-flex h-10 shrink-0 items-center whitespace-nowrap text-[8px] font-bold tracking-[0.05em] uppercase transition xl:text-[9px] 2xl:text-[10px] 2xl:tracking-[0.07em] ${
        active ? 'text-beta-blue' : 'text-tblack hover:text-beta-blue'
    }`;

function normalizePath(path) {
    if (!path) return '/';
    const base = String(path).split('?')[0];
    if (base.length > 1 && base.endsWith('/')) return base.slice(0, -1);
    return base || '/';
}

function NavLabel({ item }) {
    const { locale } = useTranslation();

    if (item.frLg && locale === 'fr') {
        return (
            <>
                <span className="2xl:hidden">{item.frLg}</span>
                <span className="hidden 2xl:inline">{item.fr}</span>
            </>
        );
    }

    return <TransText en={item.en} fr={item.fr} ar={item.ar} />;
}

function NavLink({ item, active, onNavigate }) {
    return (
        <Link
            href={item.href}
            className={linkClass(active)}
            onClick={onNavigate}
        >
            <NavLabel item={item} />
        </Link>
    );
}

function DesktopNavDropdown({ item, active }) {
    return (
        <div className="group relative shrink-0">
            <button
                type="button"
                className={`gap-0.5 ${linkClass(active)}`}
                aria-haspopup="true"
                aria-expanded={active}
            >
                <NavLabel item={item} />
                <ChevronDown
                    className="size-3 shrink-0 transition group-hover:rotate-180"
                    aria-hidden
                />
            </button>
            <div className="invisible absolute top-full left-1/2 z-50 mt-1 w-64 -translate-x-1/2 rounded-xl border border-border/80 bg-twhite py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {item.children.map((child) => (
                    <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-xs leading-snug font-semibold text-tblack transition hover:bg-alpha-blue/40 hover:text-beta-blue"
                    >
                        <TransText
                            en={child.en}
                            fr={child.fr}
                            ar={child.ar}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

function DesktopNavItems({ currentPath, currentHash }) {
    const isActive = (item) => item.match(currentPath, currentHash);

    return NAV.map((item) => {
        const active = isActive(item);

        if (item.type === 'dropdown') {
            return (
                <DesktopNavDropdown
                    key={item.id}
                    item={item}
                    active={active}
                />
            );
        }

        return (
            <NavLink key={item.href} item={item} active={active} />
        );
    });
}

export default function TililaSiteHeader() {
    const [open, setOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const pageUrl = usePage().url || '/';
    const currentPath = normalizePath(pageUrl.split('?')[0]);
    const currentHash = (pageUrl.split('#')[1] || '').replace(/^#/, '');

    const isActive = (item) => item.match(currentPath, currentHash);

    const closeMobile = () => {
        setOpen(false);
        setAboutOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border/80 bg-twhite/95 backdrop-blur-md">
            <div className="mx-auto flex h-[72px] max-w-[100rem] flex-nowrap items-center gap-2 px-3 sm:gap-3 sm:px-5 lg:px-6 xl:px-8">
                <Link href="/" className="shrink-0">
                    <img
                        src="/assets/logo.png"
                        alt="Tilila Awards"
                        className="h-8 w-auto max-w-[7.5rem] object-contain sm:h-9 xl:max-w-none"
                        loading="eager"
                    />
                </Link>

                <nav
                    className="hidden min-w-0 flex-1 lg:block"
                    aria-label="Tilila"
                >
                    <div className="flex flex-row flex-nowrap items-center justify-center gap-x-2 overflow-x-auto xl:gap-x-2.5 2xl:gap-x-3.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <DesktopNavItems
                            currentPath={currentPath}
                            currentHash={currentHash}
                        />
                    </div>
                </nav>

                <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <Link
                        href="/tilila/participate"
                        className="hidden items-center justify-center rounded-lg bg-beta-blue px-2.5 py-2 text-[7px] font-bold tracking-[0.05em] text-twhite uppercase transition hover:bg-brand-light-purple lg:inline-flex xl:px-3.5 xl:text-[8px] 2xl:text-[9px]"
                    >
                        <span className="hidden 2xl:inline">
                            <TransText
                                en="Submit application"
                                fr="Déposer une candidature"
                                ar="قدّم ترشيحك"
                            />
                        </span>
                        <span className="2xl:hidden">
                            <TransText
                                en="Apply"
                                fr="Candidater"
                                ar="ترشح"
                            />
                        </span>
                    </Link>
                    <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-beta-blue lg:hidden"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                    <LanguageSwitcher className="h-8 px-2 text-[10px]" />
                </div>
            </div>

            {open ? (
                <div className="border-t border-border/80 bg-twhite px-4 py-4 lg:hidden">
                    <nav className="flex flex-col gap-1">
                        {NAV.map((item) => {
                            if (item.type === 'dropdown') {
                                const active = isActive(item);

                                return (
                                    <div key={item.id}>
                                        <button
                                            type="button"
                                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold ${
                                                active
                                                    ? 'text-beta-blue'
                                                    : 'text-tblack'
                                            }`}
                                            onClick={() =>
                                                setAboutOpen((v) => !v)
                                            }
                                            aria-expanded={aboutOpen}
                                        >
                                            <TransText
                                                en={item.en}
                                                fr={item.fr}
                                                ar={item.ar}
                                            />
                                            <ChevronDown
                                                className={`size-4 transition ${aboutOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        {aboutOpen ? (
                                            <div className="mb-1 flex flex-col gap-0.5 ps-3">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="rounded-lg px-3 py-2 text-sm font-medium text-tgray hover:bg-alpha-blue/40 hover:text-beta-blue"
                                                        onClick={closeMobile}
                                                    >
                                                        <TransText
                                                            en={child.en}
                                                            fr={child.fr}
                                                            ar={child.ar}
                                                        />
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-alpha-blue/40 ${
                                        isActive(item)
                                            ? 'text-beta-blue'
                                            : 'text-tblack'
                                    }`}
                                    onClick={closeMobile}
                                >
                                    <TransText
                                        en={item.en}
                                        fr={item.fr}
                                        ar={item.ar}
                                    />
                                </Link>
                            );
                        })}
                        <Link
                            href="/tilila/participate"
                            className="mt-2 inline-flex items-center justify-center rounded-lg bg-beta-blue px-4 py-3 text-xs font-bold tracking-wide text-twhite uppercase"
                            onClick={closeMobile}
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
