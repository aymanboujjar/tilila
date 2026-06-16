import { Link, useForm, usePage } from '@inertiajs/react';
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Youtube,
} from 'lucide-react';
import { useEffect } from 'react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';

function FooterHeading({ children }) {
    return (
        <h3 className="text-xs font-bold tracking-[0.12em] text-tblack uppercase">
            {children}
        </h3>
    );
}

function FooterLink({ href, children }) {
    return (
        <Link
            href={href}
            className="text-sm text-tgray transition-colors hover:text-beta-blue"
        >
            {children}
        </Link>
    );
}

function FooterColumn({ children, className = '' }) {
    return (
        <div
            className={`min-w-0 lg:border-s lg:border-border/70 lg:ps-8 first:lg:border-s-0 first:lg:ps-0 ${className}`}
        >
            {children}
        </div>
    );
}

export default function Footer() {
    const { locale } = useTranslation();
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
        <footer id="contact" className="border-t border-border bg-twhite">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
                    <FooterColumn className="sm:col-span-2 lg:col-span-1">
                        <img
                            src="/assets/logo.png"
                            alt="Tilila"
                            className="h-11 w-auto object-contain"
                        />
                        <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-tgray">
                            <TransText
                                en="The award that recognises campaigns committed to equality, diversity and inclusion."
                                fr="Le prix qui récompense les campagnes engagées pour l'égalité, la diversité et l'inclusion."
                                ar="الجائزة التي تكرّم الحملات الملتزمة بالمساواة والتنوع والإدماج."
                            />
                        </p>
                        <div className="mt-5 flex items-center gap-4">
                            {[
                                { Icon: Facebook, label: 'Facebook' },
                                { Icon: Instagram, label: 'Instagram' },
                                { Icon: Linkedin, label: 'LinkedIn' },
                                { Icon: Youtube, label: 'YouTube' },
                            ].map(({ Icon, label }) => (
                                <a
                                    key={label}
                                    href="/"
                                    aria-label={label}
                                    className="text-beta-blue transition-opacity hover:opacity-70"
                                >
                                    <Icon className="size-5" strokeWidth={1.75} />
                                </a>
                            ))}
                        </div>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterHeading>
                            <TransText
                                en="Applications"
                                fr="Candidatures"
                                ar="الترشحات"
                            />
                        </FooterHeading>
                        <ul className="mt-4 space-y-2.5">
                            <li>
                                <FooterLink href="/tilila">
                                    Tilila Awards
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/tililab">Tililab</FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/tilila/participate">
                                    <TransText en="FAQ" fr="FAQ" ar="الأسئلة الشائعة" />
                                </FooterLink>
                            </li>
                        </ul>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterHeading>
                            <TransText
                                en="Resources"
                                fr="Ressources"
                                ar="الموارد"
                            />
                        </FooterHeading>
                        <ul className="mt-4 space-y-2.5">
                            <li>
                                <FooterLink href="/tilila/reglement">
                                    <TransText
                                        en="Tilila Awards regulations"
                                        fr="Règlement Tilila Awards"
                                        ar="نظام تيليلا أووردز"
                                    />
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/tililab/reglement">
                                    <TransText
                                        en="Tililab regulations"
                                        fr="Règlement Tililab"
                                        ar="نظام تيليلاب"
                                    />
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/tilila/reglement">
                                    <TransText
                                        en="Participation conditions"
                                        fr="Conditions de participation"
                                        ar="شروط المشاركة"
                                    />
                                </FooterLink>
                            </li>
                        </ul>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterHeading>
                            <TransText en="Contact" fr="Contact" ar="التواصل" />
                        </FooterHeading>
                        <ul className="mt-4 space-y-3 text-sm text-tgray">
                            <li>
                                <a
                                    href="mailto:awards@tilila.org"
                                    className="inline-flex items-start gap-2.5 transition-colors hover:text-beta-blue"
                                >
                                    <Mail className="mt-0.5 size-4 shrink-0 text-beta-blue" />
                                    <span>awards@tilila.org</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+212537661010"
                                    className="inline-flex items-start gap-2.5 transition-colors hover:text-beta-blue"
                                >
                                    <Phone className="mt-0.5 size-4 shrink-0 text-beta-blue" />
                                    <span>+212 5 37 66 10 10</span>
                                </a>
                            </li>
                            <li className="inline-flex items-start gap-2.5">
                                <MapPin className="mt-0.5 size-4 shrink-0 text-beta-blue" />
                                <span>
                                    <TransText
                                        en="Casablanca, Morocco"
                                        fr="Casablanca, Maroc"
                                        ar="الدار البيضاء، المغرب"
                                    />
                                </span>
                            </li>
                        </ul>
                    </FooterColumn>

                   

                    <FooterColumn className="col-span-2">
                        <FooterHeading>Newsletter</FooterHeading>
                        <p className="mt-3 text-sm text-tgray">
                            <TransText
                                en="Receive Tilila Awards news"
                                fr="Recevez les actualités de Tilila Awards"
                                ar="تلقّوا أخبار تيليلا أووردز"
                            />
                        </p>
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
                                placeholder={
                                    locale === 'ar'
                                        ? 'بريدك الإلكتروني'
                                        : locale === 'en'
                                          ? 'Your email'
                                          : 'Votre email'
                                }
                                className="min-w-0 flex-1 rounded-md border border-border bg-twhite px-3 py-2.5 text-sm text-tblack outline-none placeholder:text-tgray/70 focus-visible:ring-2 focus-visible:ring-beta-blue/25"
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="shrink-0 rounded-md bg-beta-blue px-4 py-2.5 text-xs font-bold tracking-[0.1em] text-twhite uppercase hover:opacity-95 disabled:opacity-60"
                            >
                                <TransText
                                    en="Subscribe"
                                    fr="S'inscrire"
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
                    </FooterColumn>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-xs text-tgray sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        <TransText
                            en="© Tilila Awards 2026 — All rights reserved"
                            fr="© Tilila Awards 2026 — Tous droits réservés"
                            ar="© تيليلا أووردز 2026 — جميع الحقوق محفوظة"
                        />
                    </span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <Link
                            href="/mentions-legales"
                            className="hover:text-beta-blue"
                        >
                            <TransText
                                en="Legal notice"
                                fr="Mentions légales"
                                ar="إشعارات قانونية"
                            />
                        </Link>
                        <span className="hidden text-border sm:inline">|</span>
                        <Link
                            href="/mentions-legales"
                            className="hover:text-beta-blue"
                        >
                            <TransText
                                en="Privacy policy"
                                fr="Politique de confidentialité"
                                ar="سياسة الخصوصية"
                            />
                        </Link>
                        <span className="hidden text-border sm:inline">|</span>
                        <Link
                            href="/mentions-legales"
                            className="hover:text-beta-blue"
                        >
                            <TransText
                                en="Terms of use"
                                fr="Conditions d'utilisation"
                                ar="شروط الاستخدام"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
