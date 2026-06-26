import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import TransText from '@/components/TransText';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/contexts/TranslationContext';
import { shouldUseTransparentHeader } from '@/lib/transparentHero';
import { cn } from '@/lib/utils';

const SCROLL_THRESHOLD = 12;

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
                href: '/about',
                en: 'Tilila: SOREAD 2M EDI programme',
                fr: 'Tilila : Programme EDI SOREAD 2M',
                ar: 'تيليلا: برنامج EDI SOREAD 2M',
            },
            {
                href: '/about',
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
    // {
    //      type: 'link',
    //     href: '/actualites',
    //     en: 'News',
    //     fr: 'Actualités',
    //     ar: 'أخبار',
    //     match: (p) => p.startsWith('/actualites') || p.startsWith('/events'),
    // },
    // {
    //     type: 'link',
    //     href: '/about#partners',
    //     en: 'Partners',
    //     fr: 'Partenaires',
    //     ar: 'الشركاء',
    //     match: (p, hash) => p === '/about' && hash === 'partners',
    // },
    {
        type: 'link',
        href: '/faq',
        en: 'FAQ',
        fr: 'FAQ',
        ar: 'الأسئلة الشائعة',
        match: (p) => p === '/faq' || p.startsWith('/faq'),
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

const APPLY_CTAS = [
    {
        href: '/tilila',
        en: 'Participate Tilila Awards',
        fr: 'Candidater aux Tilila Awards',
        ar: 'الترشح لتيليلا أووردز',
        shortEn: 'Tilila',
        shortFr: 'Tilila',
        shortAr: 'تيليلا',
        className: 'bg-beta-blue hover:bg-brand-light-purple',
    },
    {
        href: '/tililab',
        en: 'Participate Tililab',
        fr: 'Candidater au Tililab',
        ar: 'الترشح لتيليلاب',
        shortEn: 'Tililab',
        shortFr: 'Tililab',
        shortAr: 'تيليلاب',
        className: 'bg-beta-turquoise hover:opacity-90',
    },
];

const applyBtnClass =
    'inline-flex items-center justify-center rounded-xl px-3 py-3 text-[10px] font-bold tracking-[0.05em] text-twhite uppercase transition ';

function ApplyCtaButton({ cta, compact = false, className = '', onNavigate }) {
    return (
        <Link
            href={cta.href}
            className={`${applyBtnClass} ${cta.className} ${className}`}
            onClick={onNavigate}
        >
            {compact ? (
                <TransText en={cta.shortEn} fr={cta.shortFr} ar={cta.shortAr} />
            ) : (
                <>
                    <span className="hidden 2xl:inline">
                        <TransText en={cta.en} fr={cta.fr} ar={cta.ar} />
                    </span>
                    <span className="2xl:hidden">
                        <TransText
                            en={cta.shortEn}
                            fr={cta.shortFr}
                            ar={cta.shortAr}
                        />
                    </span>
                </>
            )}
        </Link>
    );
}

const linkClass = (active, onDark) =>
    cn(
        'inline-flex h-10 shrink-0 items-center whitespace-nowrap text-[12px] font-bold tracking-[0.05em] uppercase transition 2xl:tracking-[0.07em]',
        onDark
            ? active
                ? 'text-twhite'
                : 'text-twhite/90 hover:text-twhite'
            : active
              ? 'text-beta-blue'
              : 'text-tblack hover:text-beta-blue',
    );

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

function NavLink({ item, active, onNavigate, onDark }) {
    return (
        <Link
            href={item.href}
            className={linkClass(active, onDark)}
            onClick={onNavigate}
        >
            <NavLabel item={item} />
        </Link>
    );
}

function DesktopNavDropdown({ item, active, onDark }) {
    return (
        <div className="group relative shrink-0">
            <button
                type="button"
                className={`gap-0.5 ${linkClass(active, onDark)}`}
                aria-haspopup="true"
                aria-expanded={active}
            >
                <NavLabel item={item} />
                <ChevronDown
                    className="size-3 shrink-0 transition group-hover:rotate-180 group-focus-within:rotate-180"
                    aria-hidden
                />
            </button>
            <div className="pointer-events-none absolute top-full left-1/2 z-[60] hidden w-72 -translate-x-1/2 pt-2 group-hover:block group-focus-within:block">
                <div className="pointer-events-auto rounded-xl border border-border/80 bg-twhite py-2 shadow-lg">
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
        </div>
    );
}

function DesktopNavItems({ currentPath, currentHash, onDark }) {
    const isActive = (item) => item.match(currentPath, currentHash);

    return NAV.map((item) => {
        const active = isActive(item);

        if (item.type === 'dropdown') {
            return (
                <DesktopNavDropdown
                    key={item.id}
                    item={item}
                    active={active}
                    onDark={onDark}
                />
            );
        }

        return (
            <NavLink
                key={item.href}
                item={item}
                active={active}
                onDark={onDark}
            />
        );
    });
}

export default function TililaSiteHeader() {
    const [open, setOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const page = usePage();
    const pageUrl = page.url || '/';
    const currentPath = normalizePath(pageUrl.split('?')[0]);
    const currentHash = (pageUrl.split('#')[1] || '').replace(/^#/, '');
    const heroSlides = page.props.hero_slides ?? [];
    const transparentHeader = shouldUseTransparentHeader(
        currentPath,
        heroSlides,
    );
    const onDark = transparentHeader && !scrolled && !open;

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > SCROLL_THRESHOLD);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, [currentPath]);

    const isActive = (item) => item.match(currentPath, currentHash);

    const closeMobile = () => {
        setOpen(false);
        setAboutOpen(false);
    };

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 overflow-visible transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
                onDark
                    ? 'border-b border-transparent bg-transparent'
                    : 'border-b border-border/80 bg-twhite/95 shadow-sm backdrop-blur-md',
            )}
        >
            <div className="mx-auto flex h-[72px] max-w-[100rem] flex-nowrap items-center gap-2 overflow-visible px-3 sm:gap-3 sm:px-5 lg:px-6 xl:px-8">
                <Link href="/" className="shrink-0">
                    <img
                        src="/assets/logo.png"
                        alt="Tilila Awards"
                        className={cn(
                            'h-12 w-auto  object-contain transition',
                            onDark && 'brightness-0 invert',
                        )}
                        loading="eager"
                    />
                </Link>

                <nav
                    className="hidden min-w-0 flex-1 overflow-visible lg:block"
                    aria-label="Tilila"
                >
                    <div className="flex flex-row flex-nowrap items-center justify-center space-x-8 overflow-visible">
                        <DesktopNavItems
                            currentPath={currentPath}
                            currentHash={currentHash}
                            onDark={onDark}
                        />
                    </div>
                </nav>

                <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
                    <div className="hidden items-center gap-1 lg:flex xl:gap-1.5">
                        {APPLY_CTAS.map((cta) => (
                            <ApplyCtaButton key={cta.href} cta={cta} />
                        ))}
                    </div>
                    <button
                        type="button"
                        className={cn(
                            'inline-flex size-10 items-center justify-center rounded-lg border lg:hidden',
                            onDark
                                ? 'border-twhite/40 text-twhite'
                                : 'border-border text-beta-blue',
                        )}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                    <LanguageSwitcher
                        className="h-8 px-2 text-[10px]"
                        onDark={onDark}
                    />
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
                        <div className="mt-2 grid gap-2">
                            {APPLY_CTAS.map((cta) => (
                                <ApplyCtaButton
                                    key={cta.href}
                                    cta={cta}
                                    compact
                                    className="w-full px-4 py-3 text-xs"
                                    onNavigate={closeMobile}
                                />
                            ))}
                        </div>
                    </nav>
                </div>
            ) : null}
        </header>
    );
}
