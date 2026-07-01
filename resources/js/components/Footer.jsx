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
    const year = new Date().getFullYear();
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
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                <div className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,21.5rem)_repeat(3,minmax(0,1fr))] lg:gap-x-10">
                    <FooterColumn className="sm:col-span-2 lg:col-span-1">
                        <img
                            src="/assets/logo.png"
                            alt="Tilila"
                            className="h-9 w-auto object-contain"
                        />
                        <p className="mt-3 max-w-xl text-xs leading-relaxed text-tgray sm:text-sm lg:max-w-none">
                            <TransText
                                en="Tilila is SOREAD 2M’s Equity, Diversity and Inclusion (EDI) flagship initiative, driven by a simple ambition: to make 2M a media platform that reflects the full richness and diversity of Morocco. Gender equality, cultural and regional diversity, the inclusion of persons with disabilities, and a strong commitment to youth and emerging talent are at the heart of Tilila. By making EDI a driving force for editorial, cultural and social transformation, Tilila promotes change that is visible, experienced and measurable. A diverse, equitable and accessible Morocco, championed by 2M."
                                fr="Tilila est la marque-programme EDI de Soread 2M : une ambition simple, faire de 2M un média qui reflète le Maroc dans toute sa pluralité. Parité femmes-hommes, diversité culturelle et régionale, inclusion des personnes en situation de handicap, engagement pour la jeunesse et les talents : Tilila fait de l’EDI un moteur éditorial, culturel et social — qui se voit, se vit et se mesure. Le Maroc pluriel, équitable et accessible, porté par 2M."
                                ar="تيليلا هي العلامة المرجعية لبرنامج المساواة والتنوع والإدماج (EDI) التابع لـ سورياد 2M، وتقوم على طموح بسيط يتمثل في جعل 2M وسيلة إعلام تعكس المغرب بكل غناه وتعدده. فمن خلال تعزيز المساواة بين النساء والرجال، والتنوع الثقافي والجهوي، وإدماج الأشخاص في وضعية إعاقة، ودعم الشباب والمواهب، تجعل تيليلا من المساواة والتنوع والإدماج محركًا للتحول الإعلامي والثقافي والمجتمعي. رؤية تتجسد في الواقع، وتُعاش، ويُقاس أثرها. مغربٌ متنوع، منصف، ومتاح للجميع، برعاية 2M."
                            />
                        </p>
                        <div className="mt-4 flex items-center gap-3.5">
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
                                    <Icon
                                        className="size-5"
                                        strokeWidth={1.75}
                                    />
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
                        <ul className="mt-3 space-y-2">
                            <li>
                                <FooterLink href="/tilila">
                                    Tilila Awards
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/tililab">Tililab</FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/faq">
                                    <TransText
                                        en="FAQ"
                                        fr="FAQ"
                                        ar="الأسئلة الشائعة"
                                    />
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
                        <ul className="mt-3 space-y-2">
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
                        </ul>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterHeading>
                            <TransText en="Contact" fr="Contact" ar="التواصل" />
                        </FooterHeading>
                        <ul className="mt-3 space-y-2">
                            <li>
                                <FooterLink href="/contact">
                                    <TransText
                                        en="Contact us"
                                        fr="Contactez-nous"
                                        ar="اتصل بنا"
                                    />
                                </FooterLink>
                            </li>
                        </ul>
                    </FooterColumn>

                    {/* <FooterColumn className="col-span-2">
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
                    </FooterColumn> */}
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 text-xs text-tgray sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        <TransText
                            en={`© ${year} SOREAD 2M — Tilila. All rights reserved.`}
                            fr={`© ${year} SOREAD 2M — Tilila. Tous droits réservés.`}
                            ar={`© ${year} SOREAD 2M — تيليلا. جميع الحقوق محفوظة.`}
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
