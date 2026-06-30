import { Link, useForm } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    CloudUpload,
    Send,
    XCircle,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

const CITY_OPTIONS = [
    {
        value: '',
        fr: 'Sélectionner une ville',
        en: 'Select a city',
        ar: 'اختر مدينة',
    },
    {
        value: 'casablanca',
        fr: 'Casablanca',
        en: 'Casablanca',
        ar: 'الدار البيضاء',
    },
    { value: 'rabat', fr: 'Rabat', en: 'Rabat', ar: 'الرباط' },
    { value: 'marrakech', fr: 'Marrakech', en: 'Marrakech', ar: 'مراكش' },
    { value: 'tanger', fr: 'Tanger', en: 'Tangier', ar: 'طنجة' },
    { value: 'fes', fr: 'Fès', en: 'Fes', ar: 'فاس' },
    { value: 'agadir', fr: 'Agadir', en: 'Agadir', ar: 'أكادير' },
    { value: 'meknes', fr: 'Meknès', en: 'Meknes', ar: 'مكناس' },
    { value: 'oujda', fr: 'Oujda', en: 'Oujda', ar: 'وجدة' },
    { value: 'autre', fr: 'Autre', en: 'Other', ar: 'أخرى' },
];

const LANGUAGE_OPTIONS = [
    { value: 'fr', fr: 'Français', en: 'French', ar: 'الفرنسية' },
    { value: 'ar', fr: 'Arabe', en: 'Arabic', ar: 'العربية' },
    { value: 'zgh', fr: 'Amazighe', en: 'Amazigh', ar: 'الأمازيغية' },
];

const PLACEHOLDERS = {
    first_name: {
        fr: 'Ex. : Yasmine',
        en: 'E.g. Yasmine',
        ar: 'مثال: ياسمين',
    },
    last_name: {
        fr: 'Ex. : Benali',
        en: 'E.g. Benali',
        ar: 'مثال: بنعلي',
    },
    phone: {
        fr: '+212 6 12 34 56 78',
        en: '+212 6 12 34 56 78',
        ar: '+212 6 12 34 56 78',
    },
    email: {
        fr: 'exemple@email.ma',
        en: 'name@email.com',
        ar: 'exemple@email.ma',
    },
    city: {
        fr: 'Ex. : Casablanca',
        en: 'E.g. Casablanca',
        ar: 'مثال: الدار البيضاء',
    },
    cin: {
        fr: 'Ex. : AB123456',
        en: 'E.g. AB123456',
        ar: 'مثال: AB123456',
    },
    education_level: {
        fr: 'Ex. : Licence en communication',
        en: 'E.g. BA in Communication',
        ar: 'مثال: إجازة في الاتصال',
    },
    profession: {
        fr: 'Ex. : Créatif digital',
        en: 'E.g. Digital creative',
        ar: 'مثال: مبدع رقمي',
    },
    project_title: {
        fr: 'Ex. : Publicité inclusive pour…',
        en: 'E.g. Inclusive ad for…',
        ar: 'مثال: إعلان شامل من أجل…',
    },
    prior_work_link: {
        fr: 'https://vimeo.com/…',
        en: 'https://vimeo.com/…',
        ar: 'https://vimeo.com/…',
    },
    social_links: {
        fr: 'https://linkedin.com/in/…',
        en: 'https://linkedin.com/in/…',
        ar: 'https://linkedin.com/in/…',
    },
    candidate_presentation: {
        fr: 'Présentez votre parcours, vos compétences et votre expérience…',
        en: 'Introduce your background, skills and experience…',
        ar: 'قدّم مسارك ومهاراتك وخبرتك…',
    },
    project_presentation: {
        fr: 'Décrivez votre projet, son format et son objectif…',
        en: 'Describe your project, its format and objective…',
        ar: 'صف مشروعك وصيغته وهدفه…',
    },
    main_message: {
        fr: 'Quel est le message central que vous souhaitez transmettre ?',
        en: 'What is the core message you want to convey?',
        ar: 'ما الرسالة الأساسية التي تريد إيصالها؟',
    },
    motivation: {
        fr: 'Pourquoi souhaitez-vous participer à Tililab ?',
        en: 'Why do you want to take part in Tililab?',
        ar: 'لماذا ترغب في المشاركة في تيليلاب؟',
    },
};

function pickTri(tri, locale) {
    if (locale === 'ar') {
        return tri.ar;
    }
    if (locale === 'en') {
        return tri.en;
    }
    return tri.fr;
}

function pickPlaceholder(key, locale) {
    return pickTri(PLACEHOLDERS[key] ?? { fr: '', en: '', ar: '' }, locale);
}

function firstFormError(errors) {
    const values = Object.values(errors ?? {});
    const flat = values.flat().filter(Boolean);
    return flat[0] ?? null;
}

function FormFaqLink({ embedded = false }) {
    return (
        <Link
            href="/faq#tililab"
            className={
                embedded
                    ? 'inline-flex items-center gap-2 rounded-lg border-2 border-twhite/50 bg-twhite/5 px-5 py-2.5 text-xs font-bold tracking-[0.1em] text-twhite uppercase transition hover:bg-twhite/10'
                    : 'inline-flex items-center gap-2 rounded-lg border-2 border-beta-blue bg-transparent px-5 py-2.5 text-xs font-bold tracking-[0.1em] text-beta-blue uppercase transition hover:bg-alpha-blue'
            }
        >
            <TransText en="FAQ" fr="FAQ" ar="الأسئلة الشائعة" />
            <ArrowRight className="size-4" aria-hidden />
        </Link>
    );
}

function Field({ label, error, children, embedded = false, required = true }) {
    return (
        <label className="block text-sm">
            <span
                className={
                    embedded
                        ? 'font-medium text-twhite'
                        : 'font-semibold text-tblack'
                }
            >
                {label}
                {required ? ' *' : ''}
            </span>
            <div className="mt-1.5">{children}</div>
            {error ? (
                <p className="mt-1 text-xs text-red-400">{error}</p>
            ) : null}
        </label>
    );
}

function CheckRow({ id, checked, onChange, label, error, embedded = false }) {
    return (
        <div>
            <div className="flex items-start gap-2.5">
                <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={(v) => onChange(Boolean(v))}
                    className={
                        embedded
                            ? 'border-twhite/50 data-[state=checked]:border-tililab-cyan data-[state=checked]:bg-tililab-cyan'
                            : undefined
                    }
                />
                <Label
                    htmlFor={id}
                    className={
                        embedded
                            ? 'text-sm leading-relaxed text-twhite/90'
                            : 'text-sm text-tgray'
                    }
                >
                    {label}
                </Label>
            </div>
            {error ? (
                <p className="mt-1 text-xs text-red-400">{error}</p>
            ) : null}
        </div>
    );
}

function FileDropzone({ onFile, error }) {
    const inputRef = useRef(null);

    const handleFile = (file) => {
        if (file) {
            onFile(file);
        }
    };

    return (
        <div>
            <p className="mb-2 text-sm font-medium text-twhite">
                <TransText
                    en="Attach a file (portfolio, work or project)"
                    fr="Joindre un fichier (Portfolio, réalisation ou projet)"
                    ar="إرفاق ملف (ملف أعمال، عمل أو مشروع)"
                />
            </p>
            <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        inputRef.current?.click();
                    }
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    handleFile(e.dataTransfer.files?.[0]);
                }}
                className="cursor-pointer rounded-lg border border-dashed border-twhite bg-twhite/5 px-4 py-10 text-center transition hover:bg-twhite/10"
            >
                <CloudUpload
                    className="mx-auto size-9 text-twhite"
                    aria-hidden
                />
                <p className="mt-3 text-sm font-medium text-twhite">
                    <TransText
                        en="Drag and drop your file here or Browse"
                        fr="Glisser-déposer votre fichier ici ou Parcourir"
                        ar="اسحب ملفك هنا أو تصفح"
                    />
                </p>

                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.zip,video/mp4,video/quicktime,video/webm"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                />
            </div>
            {error ? (
                <p className="mt-1 text-xs text-red-400">{error}</p>
            ) : null}
        </div>
    );
}

function EmbeddedFormFields({
    data,
    setData,
    errors,
    inputClass,
    selectClass,
}) {
    const { locale } = useTranslation();

    const labelFor = (item) => {
        if (locale === 'ar') return item.ar;
        if (locale === 'en') return item.en;
        return item.fr;
    };

    const ph = (key) => pickPlaceholder(key, locale);

    const handleDroppedFile = (file) => {
        if (file.type.startsWith('video/')) {
            setData('original_video', file);
            return;
        }
        if (file.type === 'application/pdf') {
            setData('pdf_dossier', file);
            return;
        }
        setData('portfolio_file', file);
    };

    return (
        <>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                            label="Prénom"
                            error={errors.first_name}
                            embedded
                        >
                            <input
                                className={inputClass}
                                value={data.first_name}
                                placeholder={ph('first_name')}
                                onChange={(e) =>
                                    setData('first_name', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field label="Nom" error={errors.last_name} embedded>
                            <input
                                className={inputClass}
                                value={data.last_name}
                                placeholder={ph('last_name')}
                                onChange={(e) =>
                                    setData('last_name', e.target.value)
                                }
                                required
                            />
                        </Field>
                    </div>

                    <Field
                        label="Date de naissance"
                        error={errors.birth_date}
                        embedded
                    >
                        <input
                            type="date"
                            className={inputClass}
                            value={data.birth_date}
                            onChange={(e) =>
                                setData('birth_date', e.target.value)
                            }
                            required
                        />
                    </Field>

                    <Field label="Ville" error={errors.city} embedded>
                        <select
                            className={selectClass}
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            required
                        >
                            {CITY_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {labelFor(opt)}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Téléphone" error={errors.phone} embedded>
                            <input
                                className={inputClass}
                                value={data.phone}
                                placeholder={ph('phone')}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field label="E-mail" error={errors.email} embedded>
                            <input
                                type="email"
                                className={inputClass}
                                value={data.email}
                                placeholder={ph('email')}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                required
                            />
                        </Field>
                    </div>
                </div>

                <div className="space-y-4">
                    <Field
                        label="Langue du projet"
                        error={errors.locale}
                        embedded
                    >
                        <select
                            className={selectClass}
                            value={data.locale}
                            onChange={(e) => setData('locale', e.target.value)}
                            required
                        >
                            {LANGUAGE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {labelFor(opt)}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field
                        label="Lien portfolio / Réalisation / Projet (URL)"
                        error={errors.prior_work_link}
                        embedded
                        required={false}
                    >
                        <input
                            type="url"
                            className={inputClass}
                            value={data.prior_work_link}
                            onChange={(e) =>
                                setData('prior_work_link', e.target.value)
                            }
                            placeholder={ph('prior_work_link')}
                        />
                    </Field>

                    <FileDropzone
                        onFile={handleDroppedFile}
                        error={
                            errors.original_video ||
                            errors.portfolio_file ||
                            errors.pdf_dossier
                        }
                    />
                </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-8">
                <div className="space-y-4">
                    <Field label="CIN" error={errors.cin} embedded>
                        <input
                            className={inputClass}
                            value={data.cin}
                            placeholder={ph('cin')}
                            onChange={(e) => setData('cin', e.target.value)}
                            required
                        />
                    </Field>
                    <Field
                        label="Niveau d'études"
                        error={errors.education_level}
                        embedded
                    >
                        <input
                            className={inputClass}
                            value={data.education_level}
                            placeholder={ph('education_level')}
                            onChange={(e) =>
                                setData('education_level', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field
                        label="Profession"
                        error={errors.profession}
                        embedded
                    >
                        <input
                            className={inputClass}
                            value={data.profession}
                            placeholder={ph('profession')}
                            onChange={(e) =>
                                setData('profession', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field
                        label="Titre du projet"
                        error={errors.project_title}
                        embedded
                    >
                        <input
                            className={inputClass}
                            value={data.project_title}
                            placeholder={ph('project_title')}
                            onChange={(e) =>
                                setData('project_title', e.target.value)
                            }
                            required
                        />
                    </Field>
                </div>

                <div className="space-y-4">
                    <Field
                        label="Présentation du candidat"
                        error={errors.candidate_presentation}
                        embedded
                    >
                        <textarea
                            rows={3}
                            className={inputClass}
                            value={data.candidate_presentation}
                            placeholder={ph('candidate_presentation')}
                            onChange={(e) =>
                                setData(
                                    'candidate_presentation',
                                    e.target.value,
                                )
                            }
                            required
                        />
                    </Field>
                    <Field
                        label="Présentation du projet"
                        error={errors.project_presentation}
                        embedded
                    >
                        <textarea
                            rows={3}
                            className={inputClass}
                            value={data.project_presentation}
                            placeholder={ph('project_presentation')}
                            onChange={(e) =>
                                setData('project_presentation', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field
                        label="Message principal"
                        error={errors.main_message}
                        embedded
                    >
                        <textarea
                            rows={2}
                            className={inputClass}
                            value={data.main_message}
                            placeholder={ph('main_message')}
                            onChange={(e) =>
                                setData('main_message', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field
                        label="Motivation"
                        error={errors.motivation}
                        embedded
                    >
                        <textarea
                            rows={2}
                            className={inputClass}
                            value={data.motivation}
                            placeholder={ph('motivation')}
                            onChange={(e) =>
                                setData('motivation', e.target.value)
                            }
                            required
                        />
                    </Field>
                </div>
            </div>
        </>
    );
}

export default function TililabParticipateForm({ embedded = false }) {
    const [resultModal, setResultModal] = useState(null);
    const [errorSummary, setErrorSummary] = useState('');

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            city: '',
            country: 'ma',
            birth_date: '',
            cin: '',
            education_level: '',
            profession: '',
            social_links: '',
            project_title: '',
            prior_work_link: '',
            candidate_presentation: '',
            project_presentation: '',
            main_message: '',
            motivation: '',
            original_video: null,
            original_video_link: '',
            portfolio_file: null,
            pdf_dossier: null,
            locale: 'fr',
            declared_under_30: false,
            declared_accuracy: false,
            declared_rights: false,
            accepted_rules: false,
        });

    useEffect(() => {
        if (!embedded || !data.accepted_rules) {
            return;
        }
        setData('declared_under_30', true);
        setData('declared_accuracy', true);
        setData('declared_rights', true);
    }, [embedded, data.accepted_rules, setData]);

    const inputClass = embedded
        ? 'w-full rounded-md border-0 bg-twhite px-3 py-2.5 text-sm text-tblack placeholder:text-tgray/60'
        : 'w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground';

    const selectClass = embedded
        ? 'w-full rounded-md border-0 bg-twhite px-3 py-2.5 text-sm text-tblack'
        : inputClass;

    const fieldsetClass = 'space-y-4 rounded-2xl border border-border p-6';
    const legendClass = 'px-2 text-lg font-semibold text-tblack';

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        setResultModal(null);
        setErrorSummary('');

        post('/tililab/form', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setResultModal('success');
            },
            onError: (serverErrors) => {
                setErrorSummary(firstFormError(serverErrors) ?? '');
                setResultModal('error');
            },
        });
    };

    const closeResultModal = (open) => {
        if (!open) {
            setResultModal(null);
        }
    };

    return (
        <>
            {processing ? (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/50 px-4 backdrop-blur-[2px]"
                    role="status"
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Spinner className="size-10 text-twhite" />
                    <p className="text-center text-sm font-semibold text-twhite">
                        <TransText
                            en="Submitting your application…"
                            fr="Envoi de votre candidature en cours…"
                            ar="جاري إرسال ترشحكم…"
                        />
                    </p>
                </div>
            ) : null}

            <Dialog open={resultModal !== null} onOpenChange={closeResultModal}>
                <DialogContent className="sm:max-w-md">
                    {resultModal === 'success' ? (
                        <>
                            <DialogHeader>
                                <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                                    <CheckCircle2
                                        className="size-7"
                                        aria-hidden
                                    />
                                </div>
                                <DialogTitle className="text-center">
                                    <TransText
                                        en="Application submitted"
                                        fr="Candidature envoyée"
                                        ar="تم إرسال الترشح"
                                    />
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                    <TransText
                                        en="Thank you. We received your Tililab application."
                                        fr="Merci. Nous avons bien reçu votre candidature Tililab."
                                        ar="شكراً. استلمنا ترشحكم لتيليلاب."
                                    />
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-center">
                                <Button
                                    asChild
                                    className="rounded-full bg-[#00b8d9] text-twhite hover:brightness-110"
                                >
                                    <Link href="/tililab">
                                        <TransText
                                            en="Back to Tililab"
                                            fr="Retour à Tililab"
                                            ar="العودة إلى تيليلاب"
                                        />
                                    </Link>
                                </Button>
                            </DialogFooter>
                        </>
                    ) : null}

                    {resultModal === 'error' ? (
                        <>
                            <DialogHeader>
                                <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-600">
                                    <XCircle className="size-7" aria-hidden />
                                </div>
                                <DialogTitle className="text-center">
                                    <TransText
                                        en="Submission failed"
                                        fr="Échec de l'envoi"
                                        ar="تعذّر الإرسال"
                                    />
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                    {errorSummary ? (
                                        errorSummary
                                    ) : (
                                        <TransText
                                            en="Please check the highlighted fields and try again."
                                            fr="Veuillez vérifier les champs signalés et réessayer."
                                            ar="يرجى التحقق من الحقول المحددة والمحاولة مرة أخرى."
                                        />
                                    )}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-center">
                                <Button
                                    type="button"
                                    className="rounded-full bg-[#00b8d9] text-twhite hover:brightness-110"
                                    onClick={() => setResultModal(null)}
                                >
                                    <TransText
                                        en="Close"
                                        fr="Fermer"
                                        ar="إغلاق"
                                    />
                                </Button>
                            </DialogFooter>
                        </>
                    ) : null}
                </DialogContent>
            </Dialog>

            <form onSubmit={submit} aria-busy={processing}>
                {embedded ? (
                    <>
                        <EmbeddedFormFields
                            data={data}
                            setData={setData}
                            errors={errors}
                            inputClass={inputClass}
                            selectClass={selectClass}
                        />

                        <div className="mt-8 flex flex-col items-center gap-6 sm:mt-10">
                            <CheckRow
                                id="rules-embedded"
                                checked={data.accepted_rules}
                                onChange={(v) => setData('accepted_rules', v)}
                                label="J'accepte le règlement du concours Tililab"
                                error={errors.accepted_rules}
                                embedded
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#00b8d9] px-8 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:brightness-110 disabled:opacity-60"
                            >
                                {processing ? (
                                    <Spinner className="size-4 text-twhite" />
                                ) : (
                                    <Send className="size-4" aria-hidden />
                                )}
                                <TransText
                                    en={
                                        processing
                                            ? 'Submitting…'
                                            : 'Submit application'
                                    }
                                    fr={
                                        processing
                                            ? 'Envoi en cours…'
                                            : 'Envoyer ma candidature'
                                    }
                                    ar={
                                        processing
                                            ? 'جاري الإرسال…'
                                            : 'إرسال الترشح'
                                    }
                                />
                            </button>
                            <FormFaqLink embedded />
                        </div>
                    </>
                ) : (
                    <StandardFormFields
                        data={data}
                        setData={setData}
                        errors={errors}
                        inputClass={inputClass}
                        fieldsetClass={fieldsetClass}
                        legendClass={legendClass}
                        processing={processing}
                    />
                )}
            </form>
        </>
    );
}

function StandardFormFields({
    data,
    setData,
    errors,
    inputClass,
    fieldsetClass,
    legendClass,
    processing,
}) {
    const { locale } = useTranslation();
    const ph = (key) => pickPlaceholder(key, locale);

    return (
        <div className="mt-8 space-y-8">
            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>
                    <TransText
                        en="Personal information"
                        fr="Informations personnelles"
                        ar="معلومات شخصية"
                    />
                </legend>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="Prénom" error={errors.first_name}>
                        <input
                            className={inputClass}
                            value={data.first_name}
                            placeholder={ph('first_name')}
                            onChange={(e) =>
                                setData('first_name', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field label="Nom" error={errors.last_name}>
                        <input
                            className={inputClass}
                            value={data.last_name}
                            placeholder={ph('last_name')}
                            onChange={(e) =>
                                setData('last_name', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field label="Date de naissance" error={errors.birth_date}>
                        <input
                            type="date"
                            className={inputClass}
                            value={data.birth_date}
                            onChange={(e) =>
                                setData('birth_date', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field label="CIN" error={errors.cin}>
                        <input
                            className={inputClass}
                            value={data.cin}
                            placeholder={ph('cin')}
                            onChange={(e) => setData('cin', e.target.value)}
                            required
                        />
                    </Field>
                    <Field label="Ville" error={errors.city}>
                        <input
                            className={inputClass}
                            value={data.city}
                            placeholder={ph('city')}
                            onChange={(e) => setData('city', e.target.value)}
                            required
                        />
                    </Field>
                    <Field label="E-mail" error={errors.email}>
                        <input
                            type="email"
                            className={inputClass}
                            value={data.email}
                            placeholder={ph('email')}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </Field>
                    <Field label="Téléphone" error={errors.phone}>
                        <input
                            className={inputClass}
                            value={data.phone}
                            placeholder={ph('phone')}
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />
                    </Field>
                    <Field
                        label="Niveau d'études"
                        error={errors.education_level}
                    >
                        <input
                            className={inputClass}
                            value={data.education_level}
                            placeholder={ph('education_level')}
                            onChange={(e) =>
                                setData('education_level', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field label="Profession" error={errors.profession}>
                        <input
                            className={inputClass}
                            value={data.profession}
                            placeholder={ph('profession')}
                            onChange={(e) =>
                                setData('profession', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field
                        label="LinkedIn / Instagram / Portfolio"
                        error={errors.social_links}
                        required={false}
                    >
                        <input
                            className={inputClass}
                            value={data.social_links}
                            placeholder={ph('social_links')}
                            onChange={(e) =>
                                setData('social_links', e.target.value)
                            }
                        />
                    </Field>
                </div>
            </fieldset>

            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>
                    <TransText en="Project" fr="Projet soumis" ar="المشروع" />
                </legend>
                <div className="mt-4 space-y-4">
                    <Field label="Titre du projet" error={errors.project_title}>
                        <input
                            className={inputClass}
                            value={data.project_title}
                            placeholder={ph('project_title')}
                            onChange={(e) =>
                                setData('project_title', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field
                        label="Lien vers une réalisation antérieure"
                        error={errors.prior_work_link}
                        required={false}
                    >
                        <input
                            type="url"
                            className={inputClass}
                            value={data.prior_work_link}
                            placeholder={ph('prior_work_link')}
                            onChange={(e) =>
                                setData('prior_work_link', e.target.value)
                            }
                        />
                    </Field>
                    <Field
                        label="Upload Portfolio"
                        error={errors.portfolio_file}
                        required={false}
                    >
                        <input
                            type="file"
                            accept=".pdf,.zip"
                            onChange={(e) =>
                                setData('portfolio_file', e.target.files[0])
                            }
                        />
                    </Field>
                    <Field
                        label="Upload Vidéo"
                        error={errors.original_video}
                        required={false}
                    >
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) =>
                                setData('original_video', e.target.files[0])
                            }
                        />
                    </Field>
                    <Field
                        label="Upload Dossier PDF"
                        error={errors.pdf_dossier}
                        required={false}
                    >
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                setData('pdf_dossier', e.target.files[0])
                            }
                        />
                    </Field>
                </div>
            </fieldset>

            <fieldset className={fieldsetClass}>
                <div className="space-y-4">
                    <Field
                        label="Présentation du candidat"
                        error={errors.candidate_presentation}
                    >
                        <textarea
                            rows={4}
                            className={inputClass}
                            value={data.candidate_presentation}
                            placeholder={ph('candidate_presentation')}
                            onChange={(e) =>
                                setData(
                                    'candidate_presentation',
                                    e.target.value,
                                )
                            }
                            required
                        />
                    </Field>
                    <Field
                        label="Présentation du projet"
                        error={errors.project_presentation}
                    >
                        <textarea
                            rows={4}
                            className={inputClass}
                            value={data.project_presentation}
                            placeholder={ph('project_presentation')}
                            onChange={(e) =>
                                setData('project_presentation', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field
                        label="Message principal"
                        error={errors.main_message}
                    >
                        <textarea
                            rows={3}
                            className={inputClass}
                            value={data.main_message}
                            placeholder={ph('main_message')}
                            onChange={(e) =>
                                setData('main_message', e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field label="Motivation" error={errors.motivation}>
                        <textarea
                            rows={3}
                            className={inputClass}
                            value={data.motivation}
                            placeholder={ph('motivation')}
                            onChange={(e) =>
                                setData('motivation', e.target.value)
                            }
                            required
                        />
                    </Field>
                </div>
            </fieldset>

            <fieldset className="space-y-3 rounded-2xl border border-border p-6">
                <CheckRow
                    id="u30"
                    checked={data.declared_under_30}
                    onChange={(v) => setData('declared_under_30', v)}
                    label="Je certifie être âgé(e) de moins de 30 ans"
                    error={errors.declared_under_30}
                />
                <CheckRow
                    id="acc"
                    checked={data.declared_accuracy}
                    onChange={(v) => setData('declared_accuracy', v)}
                    label="Je certifie l'exactitude des informations"
                    error={errors.declared_accuracy}
                />
                <CheckRow
                    id="rights"
                    checked={data.declared_rights}
                    onChange={(v) => setData('declared_rights', v)}
                    label="Je suis titulaire des droits relatifs aux éléments transmis"
                    error={errors.declared_rights}
                />
                <CheckRow
                    id="rules"
                    checked={data.accepted_rules}
                    onChange={(v) => setData('accepted_rules', v)}
                    label="J'accepte le règlement du concours Tililab"
                    error={errors.accepted_rules}
                />
            </fieldset>

            <button
                type="submit"
                disabled={processing}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#00b8d9] py-3 text-sm font-semibold text-twhite hover:brightness-110 disabled:opacity-60"
            >
                {processing ? <Spinner className="size-4 text-twhite" /> : null}
                <TransText
                    en={processing ? 'Submitting…' : 'Submit application'}
                    fr={
                        processing
                            ? 'Envoi en cours…'
                            : 'Envoyer ma candidature'
                    }
                    ar={processing ? 'جاري الإرسال…' : 'إرسال الترشح'}
                />
                {!processing ? (
                    <ArrowRight className="size-4" aria-hidden />
                ) : null}
            </button>

            <div className="flex justify-center pt-2">
                <FormFaqLink />
            </div>
        </div>
    );
}
