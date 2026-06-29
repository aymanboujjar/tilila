import { useForm, usePage } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { useEffect } from 'react';
import TransText from '@/components/TransText';
import ContactSectionHeading from '@/pages/contact/partials/ContactSectionHeading';
import { useTranslation } from '@/contexts/TranslationContext';

const SUBJECT_OPTIONS = [
    {
        value: 'general',
        fr: 'Information générale',
        en: 'General information',
        ar: 'معلومات عامة',
    },
    {
        value: 'tilila',
        fr: 'Tilila Awards',
        en: 'Tilila Awards',
        ar: 'تيليلا أووردز',
    },
    {
        value: 'tililab',
        fr: 'Tililab',
        en: 'Tililab',
        ar: 'تيليلاب',
    },
    {
        value: 'partnership',
        fr: 'Partenariat',
        en: 'Partnership',
        ar: 'شراكة',
    },
    {
        value: 'press',
        fr: 'Presse & médias',
        en: 'Press & media',
        ar: 'الصحافة والإعلام',
    },
    {
        value: 'other',
        fr: 'Autre',
        en: 'Other',
        ar: 'أخرى',
    },
];

const inputClass =
    'w-full rounded-lg border border-border/60 bg-twhite px-4 py-3 text-sm text-tblack outline-none transition placeholder:text-tgray/60 focus:border-beta-blue focus:ring-2 focus:ring-beta-blue/20';

export default function ContactFormSection() {
    const { locale } = useTranslation();
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        organization: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false,
        locale,
    });

    useEffect(() => {
        setData('locale', locale);
    }, [locale, setData]);

    const labelFor = (opt) => opt[locale] || opt.fr || opt.en;

    const submit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () =>
                reset(
                    'name',
                    'organization',
                    'email',
                    'phone',
                    'subject',
                    'message',
                    'consent',
                ),
        });
    };

    return (
        <div
            id="contact-form"
            className="flex h-full min-h-full w-full scroll-mt-28 flex-col rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(26,35,126,0.06)] sm:p-8 lg:p-10"
        >
            <ContactSectionHeading>
                <TransText
                    fr="Formulaire de contact"
                    en="Contact form"
                    ar="استمارة التواصل"
                />
            </ContactSectionHeading>

            <form
                onSubmit={submit}
                className="mt-6 flex min-h-0 flex-1 flex-col gap-5"
            >
                <div className="grid shrink-0 gap-5 sm:grid-cols-2">
                    <label className="block text-sm">
                        <span className="font-semibold text-tblack">
                            <TransText
                                fr="Nom et prénom"
                                en="Full name"
                                ar="الاسم الكامل"
                            />
                            <span className="text-beta-blue"> *</span>
                        </span>
                        <input
                            className={`mt-2 ${inputClass}`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={
                                locale === 'fr'
                                    ? 'Votre nom'
                                    : locale === 'ar'
                                      ? 'اسمكم'
                                      : 'Your name'
                            }
                            required
                        />
                        {errors.name ? (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.name}
                            </p>
                        ) : null}
                    </label>

                    <label className="block text-sm">
                        <span className="font-semibold text-tblack">
                            <TransText
                                fr="Organisation"
                                en="Organization"
                                ar="المؤسسة"
                            />
                        </span>
                        <input
                            className={`mt-2 ${inputClass}`}
                            value={data.organization}
                            onChange={(e) =>
                                setData('organization', e.target.value)
                            }
                            placeholder={
                                locale === 'fr'
                                    ? 'Votre organisation'
                                    : locale === 'ar'
                                      ? 'مؤسستكم'
                                      : 'Your organization'
                            }
                        />
                    </label>
                </div>

                <div className="grid shrink-0 gap-5 sm:grid-cols-2">
                    <label className="block text-sm">
                        <span className="font-semibold text-tblack">
                            E-mail<span className="text-beta-blue"> *</span>
                        </span>
                        <input
                            type="email"
                            className={`mt-2 ${inputClass}`}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder={
                                locale === 'fr'
                                    ? 'Votre adresse e-mail'
                                    : locale === 'ar'
                                      ? 'بريدكم الإلكتروني'
                                      : 'Your email address'
                            }
                            required
                        />
                        {errors.email ? (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.email}
                            </p>
                        ) : null}
                    </label>

                    <label className="block text-sm">
                        <span className="font-semibold text-tblack">
                            <TransText fr="Téléphone" en="Phone" ar="الهاتف" />
                        </span>
                        <input
                            type="tel"
                            className={`mt-2 ${inputClass}`}
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder={
                                locale === 'fr'
                                    ? 'Votre numéro de téléphone'
                                    : locale === 'ar'
                                      ? 'رقم هاتفكم'
                                      : 'Your phone number'
                            }
                        />
                    </label>
                </div>

                <label className="block shrink-0 text-sm">
                    <span className="font-semibold text-tblack">
                        <TransText fr="Objet" en="Subject" ar="الموضوع" />
                        <span className="text-beta-blue"> *</span>
                    </span>
                    <select
                        className={`mt-2 ${inputClass}`}
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        required
                    >
                        <option value="">
                            {locale === 'fr'
                                ? 'Sélectionnez un sujet'
                                : locale === 'ar'
                                  ? 'اختر موضوعاً'
                                  : 'Select a subject'}
                        </option>
                        {SUBJECT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {labelFor(opt)}
                            </option>
                        ))}
                    </select>
                    {errors.subject ? (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.subject}
                        </p>
                    ) : null}
                </label>

                <label className="flex min-h-[140px] flex-1 flex-col text-sm lg:min-h-[180px]">
                    <span className="shrink-0 font-semibold text-tblack">
                        <TransText fr="Message" en="Message" ar="الرسالة" />
                        <span className="text-beta-blue"> *</span>
                    </span>
                    <textarea
                        className={`mt-2 min-h-[140px] flex-1 resize-none ${inputClass} lg:min-h-[180px]`}
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        placeholder={
                            locale === 'fr'
                                ? 'Décrivez votre demande...'
                                : locale === 'ar'
                                  ? 'صفوا طلبكم...'
                                  : 'Describe your request...'
                        }
                        required
                    />
                    {errors.message ? (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.message}
                        </p>
                    ) : null}
                </label>

                <div className="mt-auto shrink-0 space-y-4 pt-2">
                    <label className="flex items-start gap-3 text-sm leading-relaxed text-tgray">
                        <input
                            type="checkbox"
                            checked={data.consent}
                            onChange={(e) =>
                                setData('consent', e.target.checked)
                            }
                            className="mt-1 size-4 rounded border-border text-beta-blue focus:ring-beta-blue/30"
                            required
                        />
                        <span>
                            <TransText
                                fr="J'accepte que les informations communiquées soient utilisées pour le traitement de ma demande."
                                en="I agree that the information provided may be used to process my request."
                                ar="أوافق على استخدام المعلومات المقدمة لمعالجة طلبي."
                            />
                        </span>
                    </label>
                    {errors.consent ? (
                        <p className="text-xs text-red-600">{errors.consent}</p>
                    ) : null}

                    {flash?.success ? (
                        <p className="text-sm font-semibold text-beta-turquoise">
                            {flash.success}
                        </p>
                    ) : null}

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-beta-blue px-6 py-3.5 text-xs font-extrabold tracking-[0.14em] text-twhite uppercase transition hover:bg-brand-light-purple disabled:opacity-60"
                    >
                        <TransText
                            fr="Envoyer mon message"
                            en="Send my message"
                            ar="إرسال رسالتي"
                        />
                        <Send className="size-4" aria-hidden />
                    </button>
                </div>
            </form>
        </div>
    );
}
