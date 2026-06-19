import { Link } from '@inertiajs/react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import TransText from '@/components/TransText';
import {
    TililaBtnPrimary,
    TililaContainer,
    TililaIconBadge,
    TililaSection,
    TililaSectionHeading,
} from '@/pages/user/tilila/partials/TililaUi';

const CONTACT_ITEMS = [
    {
        icon: MapPin,
        titleEn: 'Headquarters',
        titleFr: 'Siège',
        titleAr: 'المقر',
        body: 'Casablanca, Morocco',
        href: null,
    },
    {
        icon: Mail,
        titleEn: 'Email',
        titleFr: 'E-mail',
        titleAr: 'البريد الإلكتروني',
        body: 'contact@tilila.ma',
        href: 'mailto:contact@tilila.ma',
    },
    {
        icon: Phone,
        titleEn: 'Phone',
        titleFr: 'Téléphone',
        titleAr: 'الهاتف',
        body: '+212 5 22 00 00 00',
        href: 'tel:+212522000000',
    },
];

export default function ContactSection() {
    return (
        <TililaSection id="contact" className="scroll-mt-28 bg-twhite pb-20">
            <TililaContainer>
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                    <div>
                        <TililaSectionHeading
                            title={
                                <TransText
                                    en="Contact us"
                                    fr="Nous contacter"
                                    ar="اتصل بنا"
                                />
                            }
                            subtitle={
                                <TransText
                                    en="Reach out for partnerships, media inquiries, or program questions. We’ll get back to you as soon as possible."
                                    fr="Contactez-nous pour des partenariats, des demandes médias ou des questions sur nos programmes. Nous vous répondrons au plus vite."
                                    ar="تواصل معنا للشراكات أو الاستفسارات الإعلامية أو أسئلة البرامج. سنعود إليك في أقرب وقت ممكن."
                                />
                            }
                        />

                        <div className="mt-8 space-y-5">
                            {CONTACT_ITEMS.map((item) => {
                                const content = (
                                    <>
                                        <TililaIconBadge icon={item.icon} />
                                        <div>
                                            <p className="text-sm font-extrabold text-tblack">
                                                <TransText
                                                    en={item.titleEn}
                                                    fr={item.titleFr}
                                                    ar={item.titleAr}
                                                />
                                            </p>
                                            <p className="mt-0.5 text-sm text-tgray">
                                                {item.body}
                                            </p>
                                        </div>
                                    </>
                                );

                                return item.href ? (
                                    <a
                                        key={item.titleEn}
                                        href={item.href}
                                        className="flex items-start gap-4 rounded-xl border border-border/60 bg-beta-white p-4 transition hover:border-beta-blue/40 hover:shadow-sm"
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div
                                        key={item.titleEn}
                                        className="flex items-start gap-4 rounded-xl border border-border/60 bg-beta-white p-4"
                                    >
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl border border-border/70 bg-beta-white p-8 shadow-sm sm:p-10">
                        <p className="text-xs font-bold tracking-[0.2em] text-beta-blue uppercase">
                            <TransText
                                en="Get in touch"
                                fr="Écrivez-nous"
                                ar="تواصل معنا"
                            />
                        </p>
                        <h3 className="mt-3 text-xl font-extrabold text-tblack sm:text-2xl">
                            <TransText
                                en="Send us a message"
                                fr="Envoyez-nous un message"
                                ar="أرسل لنا رسالة"
                            />
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-tgray">
                            <TransText
                                en="Use our contact form for detailed inquiries. We typically respond within one to two business days."
                                fr="Utilisez notre formulaire de contact pour vos demandes détaillées. Nous répondons généralement sous un à deux jours ouvrés."
                                ar="استخدم نموذج التواصل لاستفساراتك التفصيلية. نرد عادة خلال يوم إلى يومين عمل."
                            />
                        </p>
                        <TililaBtnPrimary
                            href="/contact"
                            className="mt-8 self-start"
                        >
                            <TransText
                                en="Open contact form"
                                fr="Ouvrir le formulaire"
                                ar="فتح نموذج التواصل"
                            />
                        </TililaBtnPrimary>
                        <Link
                            href="/contact"
                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-beta-blue uppercase transition hover:text-brand-light-purple"
                        >
                            <TransText
                                en="View contact page"
                                fr="Voir la page contact"
                                ar="عرض صفحة التواصل"
                            />
                            <ArrowRight className="size-3.5" />
                        </Link>
                    </div>
                </div>
            </TililaContainer>
        </TililaSection>
    );
}
