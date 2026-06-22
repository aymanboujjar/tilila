import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Clapperboard,
    Download,
    FileText,
    Mail,
    MapPin,
    Trophy,
} from 'lucide-react';
import TransText from '@/components/TransText';
import ContactSectionHeading from '@/pages/contact/partials/ContactSectionHeading';

const CONTACT_EMAIL = 'contact@tilila.org';

function InfoRow({ icon: Icon, iconClass, children, href }) {
    const content = (
        <div className="flex items-start gap-3">
            <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconClass}`}
            >
                <Icon className="size-4 text-twhite" aria-hidden />
            </span>
            <div className="pt-1.5 text-sm leading-relaxed text-tgray">{children}</div>
        </div>
    );

    if (href) {
        return (
            <a href={href} className="block transition hover:opacity-80">
                {content}
            </a>
        );
    }

    return content;
}

function ProgramCard({
    icon: Icon,
    iconBg,
    title,
    description,
    href,
    cta,
    borderClass,
}) {
    return (
        <div className="rounded-xl border border-border/50 bg-twhite p-5 shadow-sm">
            <div className="flex items-start gap-3">
                <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full ${iconBg} text-twhite`}
                >
                    <Icon className="size-5" aria-hidden />
                </span>
                <div>
                    <h3 className="text-sm font-extrabold text-tblack">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-tgray">
                        {description}
                    </p>
                </div>
            </div>
            <Link
                href={href}
                className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 bg-twhite px-4 py-3 text-xs font-extrabold tracking-[0.1em] uppercase transition ${borderClass}`}
            >
                {cta}
                <ArrowRight className="size-4" aria-hidden />
            </Link>
        </div>
    );
}

export default function ContactSidebar() {
    return (
        <div className="space-y-10">
            <div>
                <ContactSectionHeading>
                    <TransText
                        fr="Coordonnées"
                        en="Contact details"
                        ar="بيانات التواصل"
                    />
                </ContactSectionHeading>

                <div className="mt-5 space-y-4">
                    <InfoRow icon={MapPin} iconClass="bg-beta-blue">
                        <span className="font-semibold text-tblack">
                            <TransText
                                fr="Comité Parité & Diversité – SOREAD 2M"
                                en="Parity & Diversity Committee – SOREAD 2M"
                                ar="لجنة المساواة والتنوع – SOREAD 2M"
                            />
                        </span>
                    </InfoRow>
                    <InfoRow icon={MapPin} iconClass="bg-beta-blue">
                        <TransText
                            fr="Casablanca – Maroc"
                            en="Casablanca – Morocco"
                            ar="الدار البيضاء – المغرب"
                        />
                    </InfoRow>
                    <InfoRow
                        icon={Mail}
                        iconClass="bg-beta-turquoise"
                        href={`mailto:${CONTACT_EMAIL}`}
                    >
                        <span className="font-semibold text-beta-turquoise">
                            {CONTACT_EMAIL}
                        </span>
                    </InfoRow>
                </div>
            </div>

            <div>
                <ContactSectionHeading>
                    <TransText
                        fr="Liens utiles"
                        en="Useful links"
                        ar="روابط مفيدة"
                    />
                </ContactSectionHeading>

                <div className="mt-5 space-y-4">
                    <ProgramCard
                        icon={Trophy}
                        iconBg="bg-beta-blue"
                        title={
                            <TransText
                                fr="Tilila Awards"
                                en="Tilila Awards"
                                ar="تيليلا أووردز"
                            />
                        }
                        description={
                            <TransText
                                fr="Le concours qui récompense les campagnes engagées."
                                en="The competition that rewards committed campaigns."
                                ar="المسابقة التي تكرّم الحملات الملتزمة."
                            />
                        }
                        href="/tilila/participate"
                        cta={
                            <TransText
                                fr="Déposer une candidature"
                                en="Submit an application"
                                ar="قدّم ترشيحاً"
                            />
                        }
                        borderClass="border-beta-blue text-beta-blue hover:bg-beta-blue hover:text-twhite"
                    />

                    <ProgramCard
                        icon={Clapperboard}
                        iconBg="bg-beta-turquoise"
                        title={
                            <TransText fr="Tililab" en="Tililab" ar="تيليلاب" />
                        }
                        description={
                            <TransText
                                fr="Le concours dédié aux jeunes talents de la création audiovisuelle."
                                en="The competition for young audiovisual creation talents."
                                ar="المسابقة المخصصة للمواهب الشابة في الإبداع السمعي البصري."
                            />
                        }
                        href="/tililab/form"
                        cta={
                            <TransText
                                fr="Déposer une candidature"
                                en="Submit an application"
                                ar="قدّم ترشيحاً"
                            />
                        }
                        borderClass="border-beta-turquoise text-beta-turquoise hover:bg-beta-turquoise hover:text-twhite"
                    />
                </div>

                <div className="mt-6">
                    <p className="text-xs font-extrabold tracking-wide text-beta-blue uppercase">
                        <TransText
                            fr="Règlements"
                            en="Regulations"
                            ar="الأنظمة"
                        />
                    </p>
                    <ul className="mt-3 space-y-3">
                        {[
                            {
                                label: {
                                    fr: 'Règlement Tilila Awards',
                                    en: 'Tilila Awards regulations',
                                    ar: 'نظام تيليلا أووردز',
                                },
                                href: '/tilila/reglement/download',
                            },
                            {
                                label: {
                                    fr: 'Règlement Tililab',
                                    en: 'Tililab regulations',
                                    ar: 'نظام تيليلاب',
                                },
                                href: '/tililab/reglement/download',
                            },
                        ].map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-twhite px-4 py-3 text-sm transition hover:border-beta-blue/30"
                                >
                                    <span className="flex items-center gap-2.5 text-tblack">
                                        <FileText
                                            className="size-4 text-beta-blue"
                                            aria-hidden
                                        />
                                        <TransText
                                            fr={item.label.fr}
                                            en={item.label.en}
                                            ar={item.label.ar}
                                        />
                                    </span>
                                    <span className="flex shrink-0 items-center gap-1 text-xs font-bold tracking-wide text-beta-turquoise uppercase">
                                        <TransText
                                            fr="Télécharger"
                                            en="Download"
                                            ar="تحميل"
                                        />
                                        <Download className="size-3.5" aria-hidden />
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
