import { Link } from '@inertiajs/react';
import { Mail, MessageCircle, Twitter } from 'lucide-react';
import { login, register } from '@/routes';
import { useTranslation } from '@/contexts/TranslationContext';
import TransText from '@/components/TransText';

const platformLinks = [
    {
        en: 'Tililab',
        fr: 'Tililab',
        ar: 'تيليلاب',
        href: '/tililab',
    },
    {
        en: 'Apply to Tililab',
        fr: 'Postuler à Tililab',
        ar: 'قدّم إلى تيليلاب',
        href: '/tililab/form',
    },
    {
        en: 'Partners',
        fr: 'Partenaires',
        ar: 'الشركاء',
        href: '/about#partners',
    },
    {
        en: 'Tilila Editions',
        fr: 'Éditions Tilila',
        ar: 'دورات تيليلا',
        href: '/tilila#archive',
    },
];

const initiativesLinks = [
    { en: 'Tililab', fr: 'Tililab', ar: 'تيليلاب', href: '/tililab' },
    { en: 'Tilila', fr: 'Tilila', ar: 'تيليلا', href: '/tilila' },
    {
        en: 'Opportunities',
        fr: 'Opportunités',
        ar: 'الفرص',
        href: '/opportunities',
    },
];

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 py-14">
                <div className="grid gap-10 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-3 text-tblack">
                            <img
                                src="/assets/logo.webp"
                                alt="Tilila"
                                className="size-25 object-contain"
                                loading="eager"
                                decoding="async"
                            />
                        </div>

                        <p className="mt-5 max-w-xs text-sm leading-6 text-tgray">
                            <TransText
                                en="Tilila Connect highlights women experts and builds inclusive narratives through Tilila & Tililab editions."
                                fr="Tilila Connect valorise les expertes et construit des récits inclusifs via Tilila et Tililab."
                                ar="تُبرز Tilila Connect الخبيرات وتبني سرديات شاملة عبر تيليلا وتيليلاب."
                            />
                        </p>

                        <div className="mt-5 flex items-center gap-4 text-tgray">
                            <a
                                href="/"
                                aria-label={t('footer.aria.twitter')}
                                className="inline-flex size-9 items-center justify-center rounded-full bg-alpha-blue text-beta-blue transition-colors hover:bg-beta-blue hover:text-twhite"
                            >
                                <Twitter className="size-4" />
                            </a>
                            <a
                                href="/"
                                aria-label={t('footer.aria.community')}
                                className="inline-flex size-9 items-center justify-center rounded-full bg-alpha-blue text-beta-blue transition-colors hover:bg-beta-blue hover:text-twhite"
                            >
                                <MessageCircle className="size-4" />
                            </a>
                            <a
                                href="mailto:contact@tilila.ma"
                                aria-label={t('footer.aria.email')}
                                className="inline-flex size-9 items-center justify-center rounded-full bg-alpha-blue text-beta-blue transition-colors hover:bg-beta-blue hover:text-twhite"
                            >
                                <Mail className="size-4" />
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-2 md:col-start-6">
                        <h3 className="text-sm font-semibold text-tblack">
                            <TransText
                                en="Platform"
                                fr="Plateforme"
                                ar="المنصة"
                            />
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-tgray">
                            {platformLinks.map((item) => (
                                <li key={item.en}>
                                    <Link
                                        href={item.href}
                                        className="transition-colors hover:text-tblack"
                                    >
                                        <TransText
                                            en={item.en}
                                            fr={item.fr}
                                            ar={item.ar}
                                        />
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href={login()}
                                    className="transition-colors hover:text-tblack"
                                >
                                    <TransText
                                        en="Login"
                                        fr="Connexion"
                                        ar="تسجيل الدخول"
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-sm font-semibold text-tblack">
                            <TransText
                                en="Initiatives"
                                fr="Initiatives"
                                ar="المبادرات"
                            />
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-tgray">
                            {initiativesLinks.map((item) => (
                                <li key={item.en}>
                                    <Link
                                        href={item.href}
                                        className="transition-colors hover:text-tblack"
                                    >
                                        <TransText
                                            en={item.en}
                                            fr={item.fr}
                                            ar={item.ar}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h3 className="text-sm font-semibold text-tblack">
                            <TransText en="Contact" fr="Contact" ar="التواصل" />
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-tgray">
                            <li>
                                <TransText
                                    en="Casablanca, Morocco"
                                    fr="Casablanca, Maroc"
                                    ar="الدار البيضاء، المغرب"
                                />
                            </li>
                            <li>
                                <a
                                    href="mailto:contact@tilila.ma"
                                    className="transition-colors hover:text-tblack"
                                >
                                    contact@tilila.ma
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+212522000000"
                                    className="transition-colors hover:text-tblack"
                                >
                                    +212 5 22 00 00 00
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-tgray md:flex-row md:items-center md:justify-between">
                    <span>
                        <TransText
                            en="© 2026 Tilila. All rights reserved."
                            fr="© 2026 Tilila. Tous droits réservés."
                            ar="© 2026 تيليلا. جميع الحقوق محفوظة."
                        />
                    </span>
                    <span>
                        <TransText
                            en="Powered by"
                            fr="Propulsé par"
                            ar="بدعم من"
                        />{' '}
                        <span className="font-semibold">2M</span>
                    </span>
                </div>
            </div>
        </footer>
    );
}
