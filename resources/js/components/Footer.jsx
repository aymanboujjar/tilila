import { Link, useForm, usePage } from '@inertiajs/react';
import { Mail, MessageCircle, Twitter } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import TransText from '@/components/TransText';

export default function Footer() {
    const { t, locale } = useTranslation();
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        locale,
    });

    useEffect(() => {
        setData('locale', locale);
    }, [locale, setData]);

    const submitNewsletter = (e) => {
        e.preventDefault();
        post('/newsletter', {
            preserveScroll: true,
            onSuccess: () => reset('email'),
        });
    };

    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 py-14">
                <div className="grid gap-10 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <div className="relative h-25">
                            <img
                                src="/assets/logo.png"
                                alt="Tilila"
                                className="absolute top-0 -left-10.75 h-25 w-auto object-contain"
                                loading="eager"
                                decoding="async"
                            />
                        </div>

                        <p className="mt-5 max-w-xs text-sm leading-6 text-tgray">
                            <TransText
                                en="Tilila Awards and Tililab — programs for responsible communication and young creative talents, by SOREAD 2M."
                                fr="Tilila Awards et Tililab — programmes pour une communication responsable et les jeunes talents créatifs, par SOREAD 2M."
                                ar="تيليلا أووردز وتيليلاب — برامج للتواصل المسؤول والمواهب الإبداعية الشابة، من SOREAD 2M."
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
                                en="Tilila Awards"
                                fr="Tilila Awards"
                                ar="تيليلا أووردز"
                            />
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-tgray">
                            <li>
                                <Link href="/tilila/participate" className="transition-colors hover:text-tblack">
                                    <TransText en="Apply" fr="Candidater" ar="ترشح" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/tilila/reglement" className="transition-colors hover:text-tblack">
                                    <TransText en="Regulations" fr="Règlement" ar="النظام" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/tilila#prizes" className="transition-colors hover:text-tblack">
                                    <TransText en="Prizes" fr="Les prix" ar="الجوائز" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/actualites?program=tilila" className="transition-colors hover:text-tblack">
                                    <TransText en="News" fr="Actualités" ar="أخبار" />
                                </Link>
                            </li>
                        </ul>
                        <h3 className="mt-6 text-sm font-semibold text-tblack">
                            <TransText en="Tililab" fr="Tililab" ar="تيليلاب" />
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-tgray">
                            <li>
                                <Link href="/tililab/form" className="transition-colors hover:text-tblack">
                                    <TransText en="Apply" fr="Candidater" ar="ترشح" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/tililab/reglement" className="transition-colors hover:text-tblack">
                                    <TransText en="Regulations" fr="Règlement" ar="النظام" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/tililab#journey" className="transition-colors hover:text-tblack">
                                    <TransText en="Journey" fr="Parcours" ar="المسار" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-sm font-semibold text-tblack">
                            <TransText en="Resources" fr="Ressources" ar="الموارد" />
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-tgray">
                            <li>
                                <Link href="/about" className="transition-colors hover:text-tblack">
                                    <TransText en="About Tilila" fr="À propos de Tilila" ar="حول تيليلا" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/about#partners" className="transition-colors hover:text-tblack">
                                    <TransText en="Partners" fr="Partenaires" ar="الشركاء" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/mentions-legales" className="transition-colors hover:text-tblack">
                                    <TransText en="Legal & RGPD" fr="Mentions légales" ar="قانوني" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h3 className="text-sm font-semibold text-tblack">
                            <TransText
                                en="Newsletter"
                                fr="Newsletter"
                                ar="النشرة"
                            />
                        </h3>
                        <form
                            onSubmit={submitNewsletter}
                            className="mt-4 flex flex-col gap-2 sm:flex-row"
                        >
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="email@example.com"
                                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-beta-blue px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
                            >
                                <TransText
                                    en="Subscribe"
                                    fr="S’inscrire"
                                    ar="اشتراك"
                                />
                            </button>
                        </form>
                        {errors.email ? (
                            <p className="mt-2 text-xs text-destructive">
                                {errors.email}
                            </p>
                        ) : null}
                        {flash?.success ? (
                            <p className="mt-2 text-xs text-alpha-green">
                                {flash.success}
                            </p>
                        ) : null}

                        <h3 className="mt-8 text-sm font-semibold text-tblack">
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
                            en="© 2026 SOREAD 2M · Tilila programme."
                            fr="© 2026 SOREAD 2M · Programme Tilila."
                            ar="© 2026 SOREAD 2M · برنامج تيليلا."
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
