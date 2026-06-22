import { useForm, usePage } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import { useEffect } from 'react';
import TransText from '@/components/TransText';
import ActualitesSectionHeading from '@/pages/user/actualites/partials/ActualitesSectionHeading';
import { useTranslation } from '@/contexts/TranslationContext';

export default function ActualitesNewsletterCard() {
    const { locale, t } = useTranslation();
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        locale,
    });

    useEffect(() => {
        setData('locale', locale);
    }, [locale, setData]);

    const submit = (e) => {
        e.preventDefault();
        post('/newsletter', {
            preserveScroll: true,
            onSuccess: () => reset('email'),
        });
    };

    return (
        <aside className="flex h-full flex-col rounded-2xl bg-[#f0f1f5] p-6 sm:p-8">
            <div className="flex size-12 items-center justify-center rounded-full bg-beta-blue text-twhite">
                <Mail className="size-5" strokeWidth={1.5} aria-hidden />
            </div>

            <div className="mt-5">
                <ActualitesSectionHeading>
                    <TransText
                        fr="Newsletter"
                        en="Newsletter"
                        ar="النشرة"
                    />
                </ActualitesSectionHeading>
            </div>

            <h3 className="mt-4 text-lg font-extrabold text-tblack">
                <TransText
                    fr="Restez informés"
                    en="Stay informed"
                    ar="ابقوا على اطلاع"
                />
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-tgray">
                <TransText
                    fr="Recevez les dernières actualités Tilila directement par e-mail."
                    en="Receive the latest Tilila news directly by email."
                    ar="تلقّوا آخر أخبار تيليلا مباشرة عبر البريد الإلكتروني."
                />
            </p>

            <form onSubmit={submit} className="mt-6 flex flex-1 flex-col">
                <label htmlFor="actualites-newsletter-email" className="sr-only">
                    Email
                </label>
                <input
                    id="actualites-newsletter-email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder={t('media.newsletter.emailPlaceholder')}
                    className="w-full rounded-lg border border-border/60 bg-twhite px-4 py-3 text-sm text-tblack shadow-sm outline-none transition placeholder:text-tgray/70 focus:border-beta-blue focus:ring-2 focus:ring-beta-blue/20"
                    required
                />
                {errors.email ? (
                    <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                ) : null}
                {flash?.success ? (
                    <p className="mt-2 text-xs font-semibold text-beta-turquoise">
                        {flash.success}
                    </p>
                ) : null}

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-4 w-full rounded-md bg-beta-blue px-6 py-3.5 text-xs font-extrabold tracking-[0.12em] text-twhite uppercase transition hover:bg-brand-light-purple disabled:opacity-60"
                >
                    <TransText fr="S'abonner" en="Subscribe" ar="اشترك" />
                </button>
            </form>
        </aside>
    );
}
