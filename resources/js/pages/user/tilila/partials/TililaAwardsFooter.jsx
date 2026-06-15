import { Link, useForm, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useEffect } from 'react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';

export default function TililaAwardsFooter() {
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
        <footer id="contact" className="border-t border-border bg-beta-white">
            <TililaContainer className="py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-3">
                        <img
                            src="/assets/tilila/tilila-awards-logo.png"
                            alt="Tilila"
                            className="h-12 w-auto object-contain"
                        />
                        <div className="mt-5 flex gap-3">
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
                                    className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-twhite text-beta-blue transition hover:bg-beta-blue hover:text-twhite"
                                >
                                    <Icon className="size-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-bold tracking-[0.14em] text-beta-blue uppercase">
                            <TransText en="Applications" fr="Candidatures" ar="الترشحات" />
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm text-tgray">
                            <li>
                                <Link href="/tilila/archives" className="hover:text-beta-blue">
                                    <TransText en="Archives" fr="Archives & palmarès" ar="الأرشيف" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/tilila/participate" className="hover:text-beta-blue">
                                    <TransText en="Apply" fr="Déposer une candidature" ar="قدّم ترشيحك" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/tilila#prizes" className="hover:text-beta-blue">
                                    <TransText en="Prizes" fr="Les prix" ar="الجوائز" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/tilila#calendar" className="hover:text-beta-blue">
                                    <TransText en="Calendar" fr="Calendrier" ar="التقويم" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/tilila/reglement" className="hover:text-beta-blue">
                                    <TransText en="Regulations" fr="Règlement" ar="النظام" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-bold tracking-[0.14em] text-beta-blue uppercase">
                            <TransText en="Resources" fr="Ressources" ar="الموارد" />
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm text-tgray">
                            <li>
                                <Link href="/about" className="hover:text-beta-blue">
                                    <TransText en="About Tilila" fr="À propos" ar="حول تيليلا" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/actualites?program=tilila" className="hover:text-beta-blue">
                                    <TransText en="News" fr="Actualités" ar="أخبار" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/tililab" className="hover:text-beta-blue">
                                    Tililab
                                </Link>
                            </li>
                            <li>
                                <Link href="/mentions-legales" className="hover:text-beta-blue">
                                    <TransText en="Legal notice" fr="Mentions légales" ar="قانوني" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-bold tracking-[0.14em] text-beta-blue uppercase">
                            <TransText en="Contact" fr="Contact" ar="التواصل" />
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm text-tgray">
                            <li>Casablanca, Maroc</li>
                            <li>
                                <a href="mailto:comiteparitediversité@2m.ma" className="hover:text-beta-blue">
                                    comiteparitediversité@2m.ma
                                </a>
                            </li>
                            <li>
                                <a href="tel:+212522000000" className="hover:text-beta-blue">
                                    +212 5 22 00 00 00
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h3 className="text-xs font-bold tracking-[0.14em] text-beta-blue uppercase">
                            Newsletter
                        </h3>
                        <form onSubmit={submitNewsletter} className="mt-4 flex flex-col gap-2 sm:flex-row">
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="flex-1 rounded-lg border border-border bg-twhite px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-beta-blue/30"
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-beta-blue px-4 py-2.5 text-xs font-bold tracking-wide text-twhite uppercase hover:opacity-95 disabled:opacity-60"
                            >
                                <TransText en="Subscribe" fr="S'inscrire" ar="اشتراك" />
                            </button>
                        </form>
                        {errors.email ? (
                            <p className="mt-2 text-xs text-destructive">{errors.email}</p>
                        ) : null}
                        {flash?.success ? (
                            <p className="mt-2 text-xs text-alpha-green">{flash.success}</p>
                        ) : null}
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-tgray sm:flex-row sm:items-center sm:justify-between">
                    <span>© 2026 SOREAD 2M · Programme Tilila.</span>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/mentions-legales" className="hover:text-beta-blue">
                            <TransText en="Legal notice" fr="Mentions légales" ar="قانوني" />
                        </Link>
                        <Link href="/mentions-legales" className="hover:text-beta-blue">
                            <TransText en="Privacy" fr="Confidentialité" ar="الخصوصية" />
                        </Link>
                    </div>
                </div>
            </TililaContainer>
        </footer>
    );
}
