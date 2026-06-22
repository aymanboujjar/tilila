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
        <aside className="flex h-full min-h-[460px] w-full flex-col justify-between rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(26,35,126,0.08)] sm:p-7 lg:min-h-0 lg:p-8">
            <div className="flex flex-col gap-5 lg:gap-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-beta-blue text-twhite lg:size-14">
                    <Mail
                        className="size-5 lg:size-6"
                        strokeWidth={1.5}
                        aria-hidden
                    />
                </div>

                <ActualitesSectionHeading accent="turquoise">
                    <TransText
                        fr="Newsletter"
                        en="Newsletter"
                        ar="النشرة"
                    />
                </ActualitesSectionHeading>

                <div className="space-y-3 lg:space-y-4">
                    <h3 className="text-lg font-extrabold leading-tight text-tblack lg:text-xl">
                        <TransText
                            fr="Restez informés"
                            en="Stay informed"
                            ar="ابقوا على اطلاع"
                        />
                    </h3>

                    <p className="text-sm leading-relaxed text-tgray lg:text-[15px] lg:leading-7">
                        {t('actualites.newsletter.description')}
                    </p>
                </div>
            </div>

            <form onSubmit={submit} className="mt-6 flex flex-col gap-4 lg:mt-8">
                <label htmlFor="actualites-newsletter-email" className="sr-only">
                    Email
                </label>
                <input
                    id="actualites-newsletter-email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder={t('actualites.newsletter.emailPlaceholder')}
                    className="w-full rounded-lg border border-border/60 bg-twhite px-4 py-3.5 text-sm text-tblack outline-none transition placeholder:text-tgray/60 focus:border-beta-blue focus:ring-2 focus:ring-beta-blue/20 lg:py-4"
                    required
                />
                {errors.email ? (
                    <p className="-mt-2 text-xs text-red-600">{errors.email}</p>
                ) : null}
                {flash?.success ? (
                    <p className="-mt-2 text-xs font-semibold text-beta-turquoise">
                        {flash.success}
                    </p>
                ) : null}

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-lg bg-beta-blue px-6 py-3.5 text-xs font-extrabold tracking-[0.14em] text-twhite uppercase transition hover:bg-brand-light-purple disabled:opacity-60 lg:py-4"
                >
                    <TransText fr="S'abonner" en="Subscribe" ar="اشترك" />
                </button>
            </form>
        </aside>
    );
}
