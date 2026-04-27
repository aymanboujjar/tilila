import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';

export default function BecomeExpert() {
    const { locale } = useTranslation();
    const ui = {
        en: {
            head: 'Become an Expert',
            network: 'Experts Network',
            title: 'Become an Expert',
            subtitle: 'Submit your multilingual profile once. On approval, your expert account and public profile are created from this application.',
            step1: 'Submit profile',
            step2: 'Admin review',
            step3: 'Account + publication',
            success: 'Your request has been submitted. We will contact you after review.',
            identity: 'Identity',
            email: 'Email *',
            phone: 'Phone',
            fullName: 'Full name',
            professional: 'Professional Position',
            currentTitle: 'Current title',
            country: 'Country',
            city: 'City',
            industries: 'Industries (comma separated)',
            languages: 'Languages (comma separated)',
            expertiseBio: 'Expertise and Bio',
            expertise: 'Expertise areas',
            bio: 'Short bio',
            social: 'Social Links',
            linkedin: 'LinkedIn URL',
            twitter: 'Twitter / X URL',
            instagram: 'Instagram URL',
            portfolio: 'Portfolio URL',
            cv: 'CV (PDF/DOC, max 5MB)',
            cancel: 'Cancel',
            submitting: 'Submitting...',
            submit: 'Submit Request',
        },
        fr: {
            head: 'Devenir experte',
            network: 'Réseau des expertes',
            title: 'Devenir experte',
            subtitle: 'Soumettez votre profil multilingue une seule fois. Après validation, votre compte et profil public seront créés à partir de cette candidature.',
            step1: 'Soumettre le profil',
            step2: 'Revue admin',
            step3: 'Compte + publication',
            success: 'Votre demande a été soumise. Nous vous contacterons après la revue.',
            identity: 'Identité',
            email: 'Email *',
            phone: 'Téléphone',
            fullName: 'Nom complet',
            professional: 'Position professionnelle',
            currentTitle: 'Poste actuel',
            country: 'Pays',
            city: 'Ville',
            industries: 'Secteurs (séparés par des virgules)',
            languages: 'Langues (séparées par des virgules)',
            expertiseBio: 'Expertise et biographie',
            expertise: 'Domaines d’expertise',
            bio: 'Courte biographie',
            social: 'Liens sociaux',
            linkedin: 'URL LinkedIn',
            twitter: 'URL Twitter / X',
            instagram: 'URL Instagram',
            portfolio: 'URL Portfolio',
            cv: 'CV (PDF/DOC, max 5MB)',
            cancel: 'Annuler',
            submitting: 'Envoi...',
            submit: 'Envoyer la demande',
        },
        ar: {
            head: 'أصبحي خبيرة',
            network: 'شبكة الخبيرات',
            title: 'أصبحي خبيرة',
            subtitle: 'أرسلي ملفك متعدد اللغات مرة واحدة. بعد القبول، سيتم إنشاء حسابك وملفك العام من هذا الطلب.',
            step1: 'إرسال الملف',
            step2: 'مراجعة الإدارة',
            step3: 'الحساب + النشر',
            success: 'تم إرسال طلبك بنجاح. سنتواصل معك بعد المراجعة.',
            identity: 'الهوية',
            email: 'البريد الإلكتروني *',
            phone: 'الهاتف',
            fullName: 'الاسم الكامل',
            professional: 'الوضع المهني',
            currentTitle: 'الصفة الحالية',
            country: 'البلد',
            city: 'المدينة',
            industries: 'القطاعات (مفصولة بفواصل)',
            languages: 'اللغات (مفصولة بفواصل)',
            expertiseBio: 'الخبرة والسيرة',
            expertise: 'مجالات الخبرة',
            bio: 'نبذة قصيرة',
            social: 'روابط التواصل',
            linkedin: 'رابط لينكدإن',
            twitter: 'رابط تويتر / X',
            instagram: 'رابط إنستغرام',
            portfolio: 'رابط الأعمال',
            cv: 'السيرة الذاتية (PDF/DOC بحد أقصى 5MB)',
            cancel: 'إلغاء',
            submitting: 'جارٍ الإرسال...',
            submit: 'إرسال الطلب',
        },
    };
    const c = ui[locale] ?? ui.en;

    const {
        data,
        setData,
        transform,
        post,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm({
        name_i18n: { en: '', fr: '', ar: '' },
        email: '',
        phone: '',
        country: '',
        city: '',
        industries_text: '',
        languages_text: '',
        title_i18n: { en: '', fr: '', ar: '' },
        expertise_i18n: { en: '', fr: '', ar: '' },
        bio_i18n: { en: '', fr: '', ar: '' },
        linkedin_url: '',
        twitter_url: '',
        instagram_url: '',
        portfolio_url: '',
        cv: null,
        locale: 'en',
    });

    const splitCsv = (value) =>
        String(value ?? '')
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

    const submit = (e) => {
        e.preventDefault();

        transform((current) => {
            const { industries_text, languages_text, ...rest } = current;

            return {
                ...rest,
                industries: splitCsv(industries_text),
                languages: splitCsv(languages_text),
            };
        });

        post('/experts/become', {
            forceFormData: true,
            onSuccess: () => {
                reset(
                    'name_i18n',
                    'email',
                    'phone',
                    'country',
                    'city',
                    'industries_text',
                    'languages_text',
                    'title_i18n',
                    'expertise_i18n',
                    'bio_i18n',
                    'linkedin_url',
                    'twitter_url',
                    'instagram_url',
                    'portfolio_url',
                    'cv',
                );
            },
        });
    };

    const setTri = (key, lang, value) => {
        setData(key, {
            ...(data[key] ?? { en: '', fr: '', ar: '' }),
            [lang]: value,
        });
    };

    const inputClass =
        'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

    return (
        <>
            <Head title={c.head} />

            <section className="bg-[radial-gradient(circle_at_top_left,#dff2ff_0%,#ffffff_45%,#f5fbff_100%)] py-10 sm:py-14">
                <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 rounded-2xl border border-beta-blue/20 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
                        <p className="text-xs font-semibold tracking-[0.3em] text-tgray uppercase">
                            {c.network}
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-tblack sm:text-4xl">
                            {c.title}
                        </h1>
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-tgray sm:text-base">
                            {c.subtitle}
                        </p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-xl border border-border/70 bg-background p-4">
                                <p className="text-xs font-semibold text-muted-foreground uppercase">
                                    Step 1
                                </p>
                                <p className="mt-1 text-sm font-semibold text-tblack">
                                    {c.step1}
                                </p>
                            </div>
                            <div className="rounded-xl border border-border/70 bg-background p-4">
                                <p className="text-xs font-semibold text-muted-foreground uppercase">
                                    Step 2
                                </p>
                                <p className="mt-1 text-sm font-semibold text-tblack">
                                    {c.step2}
                                </p>
                            </div>
                            <div className="rounded-xl border border-border/70 bg-background p-4">
                                <p className="text-xs font-semibold text-muted-foreground uppercase">
                                    Step 3
                                </p>
                                <p className="mt-1 text-sm font-semibold text-tblack">
                                    {c.step3}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">

                        {recentlySuccessful ? (
                            <div className="mb-6 rounded-lg border border-alpha-green/30 bg-beta-green px-4 py-3 text-sm text-alpha-green">
                                {c.success}
                            </div>
                        ) : null}

                        <form onSubmit={submit} className="space-y-8">
                            <h3 className="mb-3 text-base font-semibold text-tblack">
                                {c.identity}
                            </h3>
                            <div className="rounded-xl border border-border/70 p-4 sm:p-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-tblack">
                                            {c.email}
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="name@example.com"
                                        />
                                        {errors.email ? (
                                            <p className="mt-1 text-xs text-alpha-danger">
                                                {errors.email}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-tblack">
                                            {c.phone}
                                        </label>
                                        <input
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="+212 ..."
                                        />
                                        {errors.phone ? (
                                            <p className="mt-1 text-xs text-alpha-danger">
                                                {errors.phone}
                                            </p>
                                        ) : null}
                                    </div>

                                    {['en', 'fr', 'ar'].map((lang) => (
                                        <div key={`name-${lang}`}>
                                            <label className="mb-2 block text-sm font-semibold text-tblack">
                                                {c.fullName} ({lang.toUpperCase()}){' '}
                                                {lang === 'en' ? '*' : ''}
                                            </label>
                                            <input
                                                value={
                                                    data.name_i18n?.[lang] ?? ''
                                                }
                                                onChange={(e) =>
                                                    setTri(
                                                        'name_i18n',
                                                        lang,
                                                        e.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="Your full name"
                                            />
                                            {errors[`name_i18n.${lang}`] ? (
                                                <p className="mt-1 text-xs text-alpha-danger">
                                                    {
                                                        errors[
                                                            `name_i18n.${lang}`
                                                        ]
                                                    }
                                                </p>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h3 className="mb-3 text-base font-semibold text-tblack">
                                {c.professional}
                            </h3>
                            <div className="rounded-xl border border-border/70 p-4 sm:p-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    {['en', 'fr', 'ar'].map((lang) => (
                                        <div key={`title-${lang}`}>
                                            <label className="mb-2 block text-sm font-semibold text-tblack">
                                                {c.currentTitle} (
                                                {lang.toUpperCase()}){' '}
                                                {lang === 'en' ? '*' : ''}
                                            </label>
                                            <input
                                                value={
                                                    data.title_i18n?.[lang] ??
                                                    ''
                                                }
                                                onChange={(e) =>
                                                    setTri(
                                                        'title_i18n',
                                                        lang,
                                                        e.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="Journalist, Researcher, ..."
                                            />
                                            {errors[`title_i18n.${lang}`] ? (
                                                <p className="mt-1 text-xs text-alpha-danger">
                                                    {
                                                        errors[
                                                            `title_i18n.${lang}`
                                                        ]
                                                    }
                                                </p>
                                            ) : null}
                                        </div>
                                    ))}

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-tblack">
                                            {c.country}
                                        </label>
                                        <input
                                            value={data.country}
                                            onChange={(e) =>
                                                setData(
                                                    'country',
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Morocco"
                                        />
                                        {errors.country ? (
                                            <p className="mt-1 text-xs text-alpha-danger">
                                                {errors.country}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-tblack">
                                            {c.city}
                                        </label>
                                        <input
                                            value={data.city}
                                            onChange={(e) =>
                                                setData('city', e.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="Casablanca"
                                        />
                                        {errors.city ? (
                                            <p className="mt-1 text-xs text-alpha-danger">
                                                {errors.city}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-tblack">
                                            {c.industries}
                                        </label>
                                        <input
                                            value={data.industries_text}
                                            onChange={(e) =>
                                                setData(
                                                    'industries_text',
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="economics, media, policy"
                                        />
                                        {errors.industries ? (
                                            <p className="mt-1 text-xs text-alpha-danger">
                                                {errors.industries}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-tblack">
                                            {c.languages}
                                        </label>
                                        <input
                                            value={data.languages_text}
                                            onChange={(e) =>
                                                setData(
                                                    'languages_text',
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="en, fr, ar"
                                        />
                                        {errors.languages ? (
                                            <p className="mt-1 text-xs text-alpha-danger">
                                                {errors.languages}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-base font-semibold text-tblack">
                                    {c.expertiseBio}
                                </h3>
                                <div className="rounded-xl border border-border/70 p-4 sm:p-5">
                                    {['en', 'fr', 'ar'].map((lang) => (
                                        <div key={`expertise-${lang}`}>
                                            <label className="mb-2 block text-sm font-semibold text-tblack">
                                                {c.expertise} (
                                                {lang.toUpperCase()}){' '}
                                                {lang === 'en' ? '*' : ''}
                                            </label>
                                            <textarea
                                                value={
                                                    data.expertise_i18n?.[
                                                        lang
                                                    ] ?? ''
                                                }
                                                onChange={(e) =>
                                                    setTri(
                                                        'expertise_i18n',
                                                        lang,
                                                        e.target.value,
                                                    )
                                                }
                                                className={`${inputClass} min-h-24 resize-y`}
                                                placeholder="Ex: Media ethics, digital journalism, climate policy"
                                            />
                                            {errors[
                                                `expertise_i18n.${lang}`
                                            ] ? (
                                                <p className="mt-1 text-xs text-alpha-danger">
                                                    {
                                                        errors[
                                                            `expertise_i18n.${lang}`
                                                        ]
                                                    }
                                                </p>
                                            ) : null}
                                        </div>
                                    ))}

                                    {['en', 'fr', 'ar'].map((lang) => (
                                        <div key={`bio-${lang}`}>
                                            <label className="mb-2 block text-sm font-semibold text-tblack">
                                                {c.bio} ({lang.toUpperCase()}){' '}
                                                {lang === 'en' ? '*' : ''}
                                            </label>
                                            <textarea
                                                value={
                                                    data.bio_i18n?.[lang] ?? ''
                                                }
                                                onChange={(e) =>
                                                    setTri(
                                                        'bio_i18n',
                                                        lang,
                                                        e.target.value,
                                                    )
                                                }
                                                className={`${inputClass} min-h-28 resize-y`}
                                                placeholder="Tell us about your work and achievements"
                                            />
                                            {errors[`bio_i18n.${lang}`] ? (
                                                <p className="mt-1 text-xs text-alpha-danger">
                                                    {errors[`bio_i18n.${lang}`]}
                                                </p>
                                            ) : null}
                                        </div>
                                    ))}

                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-base font-semibold text-tblack">
                                    {c.social}
                                </h3>
                                <div className="rounded-xl border border-border/70 p-4 sm:p-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-tblack">
                                                {c.linkedin}
                                            </label>
                                            <input
                                                value={data.linkedin_url}
                                                onChange={(e) =>
                                                    setData(
                                                        'linkedin_url',
                                                        e.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                            {errors.linkedin_url ? (
                                                <p className="mt-1 text-xs text-alpha-danger">
                                                    {errors.linkedin_url}
                                                </p>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-tblack">
                                                {c.twitter}
                                            </label>
                                            <input
                                                value={data.twitter_url}
                                                onChange={(e) =>
                                                    setData(
                                                        'twitter_url',
                                                        e.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="https://x.com/..."
                                            />
                                            {errors.twitter_url ? (
                                                <p className="mt-1 text-xs text-alpha-danger">
                                                    {errors.twitter_url}
                                                </p>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-tblack">
                                                {c.instagram}
                                            </label>
                                            <input
                                                value={data.instagram_url}
                                                onChange={(e) =>
                                                    setData(
                                                        'instagram_url',
                                                        e.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="https://instagram.com/..."
                                            />
                                            {errors.instagram_url ? (
                                                <p className="mt-1 text-xs text-alpha-danger">
                                                    {errors.instagram_url}
                                                </p>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-tblack">
                                                {c.portfolio}
                                            </label>
                                            <input
                                                value={data.portfolio_url}
                                                onChange={(e) =>
                                                    setData(
                                                        'portfolio_url',
                                                        e.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="https://..."
                                            />
                                            {errors.portfolio_url ? (
                                                <p className="mt-1 text-xs text-alpha-danger">
                                                    {errors.portfolio_url}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-tblack">
                                    {c.cv}
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) =>
                                        setData(
                                            'cv',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className={inputClass}
                                />
                                {errors.cv ? (
                                    <p className="mt-1 text-xs text-alpha-danger">
                                        {errors.cv}
                                    </p>
                                ) : null}
                            </div>

                            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border/70 pt-4">
                                <Link
                                    href="/experts"
                                    className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-tgray hover:text-tblack"
                                >
                                    {c.cancel}
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-full bg-beta-blue px-5 py-2 text-sm font-semibold text-twhite transition hover:bg-beta-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? c.submitting : c.submit}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

BecomeExpert.layout = (page) => <AppLayout>{page}</AppLayout>;
