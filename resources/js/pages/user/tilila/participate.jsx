import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import RegulationCta from '@/components/program/RegulationCta';
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

const inputClass =
    'w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground';

const PLACEHOLDERS = {
    first_name: {
        fr: 'Ex. : Fatima',
        en: 'E.g. Jane',
        ar: 'مثال: فاطمة',
    },
    last_name: {
        fr: 'Ex. : Alaoui',
        en: 'E.g. Smith',
        ar: 'مثال: العلوي',
    },
    representative_role: {
        fr: 'Ex. : Directrice marketing',
        en: 'E.g. Marketing Director',
        ar: 'مثال: مديرة التسويق',
    },
    email: {
        fr: 'exemple@entreprise.ma',
        en: 'name@company.com',
        ar: 'exemple@entreprise.ma',
    },
    phone: {
        fr: '+212 6 12 34 56 78',
        en: '+212 6 12 34 56 78',
        ar: '+212 6 12 34 56 78',
    },
    company: {
        fr: 'Ex. : Nom de l’annonceur',
        en: 'E.g. Advertiser name',
        ar: 'مثال: اسم المعلن',
    },
    brand: {
        fr: 'Ex. : Nom de la marque',
        en: 'E.g. Brand name',
        ar: 'مثال: اسم العلامة',
    },
    agency: {
        fr: 'Ex. : Nom de l’agence',
        en: 'E.g. Agency name',
        ar: 'مثال: اسم الوكالة',
    },
    campaign_title: {
        fr: 'Ex. : Campagne Inclusion 2025',
        en: 'E.g. Inclusion Campaign 2025',
        ar: 'مثال: حملة الإدماج 2025',
    },
    submission_link: {
        fr: 'https://www.youtube.com/watch?v=…',
        en: 'https://www.youtube.com/watch?v=…',
        ar: 'https://www.youtube.com/watch?v=…',
    },
    creative_concept: {
        fr: 'Décrivez le concept créatif, le ton et le message principal de la campagne…',
        en: 'Describe the creative concept, tone and main message of the campaign…',
        ar: 'صف المفهوم الإبداعي ونبرة الحملة ورسالتها الرئيسية…',
    },
    edi_contribution: {
        fr: 'Expliquez comment la campagne contribue à l’équité, la diversité et l’inclusion…',
        en: 'Explain how the campaign contributes to equity, diversity and inclusion…',
        ar: 'اشرح كيف تساهم الحملة في المساواة والتنوع والإدماج…',
    },
};

function pickPlaceholder(key, locale) {
    const tri = PLACEHOLDERS[key];
    if (!tri) {
        return '';
    }
    if (locale === 'ar') {
        return tri.ar;
    }
    if (locale === 'en') {
        return tri.en;
    }
    return tri.fr;
}

function firstFormError(errors) {
    const values = Object.values(errors ?? {});
    const flat = values.flat().filter(Boolean);
    return flat[0] ?? null;
}

function resolveUploadPercent(progress) {
    if (!progress) {
        return 0;
    }

    if (typeof progress.percentage === 'number') {
        return Math.min(100, Math.max(0, progress.percentage));
    }

    if (typeof progress.progress === 'number') {
        return Math.min(100, Math.max(0, Math.round(progress.progress * 100)));
    }

    if (progress.total && progress.total > 0) {
        return Math.min(
            100,
            Math.max(0, Math.round((progress.loaded / progress.total) * 100)),
        );
    }

    return 0;
}

function formatBytes(bytes) {
    if (!bytes || bytes <= 0) {
        return null;
    }

    const units = ['B', 'KB', 'MB', 'GB'];
    let value = bytes;
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex += 1;
    }

    const decimals = unitIndex === 0 ? 0 : 1;
    return `${value.toFixed(decimals)} ${units[unitIndex]}`;
}

export default function TililaParticipate() {
    const { locale } = useTranslation();
    const ph = (key) => pickPlaceholder(key, locale);
    const [resultModal, setResultModal] = useState(null);
    const [errorSummary, setErrorSummary] = useState('');
    const [uploadPercent, setUploadPercent] = useState(0);
    const [uploadBytes, setUploadBytes] = useState({ loaded: 0, total: null });
    const [submissionPhase, setSubmissionPhase] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            first_name: '',
            last_name: '',
            representative_role: '',
            email: '',
            phone: '',
            company: '',
            brand: '',
            agency: '',
            city: '',
            country: 'ma',
            campaign_title: '',
            first_broadcast_date: '',
            submission_link: '',
            creative_concept: '',
            edi_contribution: '',
            submission_video: null,
            submission_audio: null,
            submission_visual: null,
            extra_documents: [],
            declared_accuracy: false,
            declared_rights: false,
            accepted_rules: false,
        });

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        setResultModal(null);
        setErrorSummary('');
        setUploadPercent(0);
        setUploadBytes({ loaded: 0, total: null });
        setSubmissionPhase('uploading');

        post('/tilila/participate', {
            forceFormData: true,
            preserveScroll: true,
            showProgress: false,
            onProgress: (progress) => {
                const percent = resolveUploadPercent(progress);
                setUploadPercent(percent);
                setUploadBytes({
                    loaded: progress.loaded ?? 0,
                    total: progress.total ?? null,
                });

                if (percent >= 100) {
                    setSubmissionPhase('processing');
                }
            },
            onSuccess: () => {
                reset();
                setResultModal('success');
            },
            onError: (serverErrors) => {
                setErrorSummary(firstFormError(serverErrors) ?? '');
                setResultModal('error');
            },
            onFinish: () => {
                setSubmissionPhase(null);
                setUploadPercent(0);
                setUploadBytes({ loaded: 0, total: null });
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
            <Head title="Tilila Awards — Candidature" />

            {processing ? (
                <SubmissionProgressOverlay
                    phase={submissionPhase}
                    percent={uploadPercent}
                    loaded={uploadBytes.loaded}
                    total={uploadBytes.total}
                />
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
                                        en="Thank you. We received your Tilila Awards application and sent a confirmation email when possible."
                                        fr="Merci. Nous avons bien reçu votre candidature Tilila Awards et un e-mail de confirmation vous a été envoyé lorsque possible."
                                        ar="شكراً. استلمنا ترشحكم لتيليلا أووردز وأرسلنا بريداً تأكيدياً عند الإمكان."
                                    />
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-center">
                                <Button
                                    asChild
                                    className="rounded-full bg-beta-blue text-twhite hover:bg-beta-blue/90"
                                >
                                    <Link href="/tilila">
                                        <TransText
                                            en="Back to Tilila Awards"
                                            fr="Retour aux Tilila Awards"
                                            ar="العودة إلى تيليلا أووردز"
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
                                        fr="Échec de l’envoi"
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
                                    className="rounded-full bg-beta-blue text-twhite hover:bg-beta-blue/90"
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

            <div className="mx-auto max-w-3xl px-4 py-10">
                <Link
                    href="/tilila"
                    className="text-sm font-semibold text-beta-blue hover:underline"
                >
                    <TransText
                        en="← Back to Tilila Awards"
                        fr="← Retour aux Tilila Awards"
                        ar="← العودة إلى تيليلا أووردز"
                    />
                </Link>
                <h1 className="mt-4 text-2xl font-bold text-tblack">
                    <TransText
                        en="Submit your campaign"
                        fr="Déposer une candidature"
                        ar="تقديم حملة"
                    />
                </h1>
                <div className="mt-4">
                    <RegulationCta href="/tilila/reglement" />
                </div>
                <form
                    onSubmit={submit}
                    className="mt-8 space-y-8"
                    aria-busy={processing}
                >
                    <fieldset className="space-y-4 rounded-2xl border border-border p-6">
                        <legend className="px-2 text-lg font-semibold text-tblack">
                            <TransText
                                en="General information"
                                fr="Informations générales"
                                ar="معلومات عامة"
                            />
                        </legend>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                label="Prénom / First name"
                                error={errors.first_name}
                                required
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
                            <Field
                                label="Nom / Last name"
                                error={errors.last_name}
                                required
                            >
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
                            label="Fonction / Role"
                            error={errors.representative_role}
                            required
                        >
                            <input
                                className={inputClass}
                                value={data.representative_role}
                                placeholder={ph('representative_role')}
                                onChange={(e) =>
                                    setData(
                                        'representative_role',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                        </Field>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="E-mail" error={errors.email} required>
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
                            <Field
                                label="Téléphone"
                                error={errors.phone}
                                required
                            >
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
                        </div>
                        <Field
                            label="Entreprise / Annonceur"
                            error={errors.company}
                            required
                        >
                            <input
                                className={inputClass}
                                value={data.company}
                                placeholder={ph('company')}
                                onChange={(e) =>
                                    setData('company', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field label="Marque" error={errors.brand} required>
                            <input
                                className={inputClass}
                                value={data.brand}
                                placeholder={ph('brand')}
                                onChange={(e) =>
                                    setData('brand', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Agence de communication "
                            error={errors.agency}
                            required
                        >
                            <input
                                className={inputClass}
                                value={data.agency}
                                placeholder={ph('agency')}
                                onChange={(e) =>
                                    setData('agency', e.target.value)
                                }
                                required
                            />
                        </Field>
                    </fieldset>

                    <fieldset className="space-y-4 rounded-2xl border border-border p-6">
                        <legend className="px-2 text-lg font-semibold text-tblack">
                            <TransText
                                en="Campaign"
                                fr="Campagne soumise"
                                ar="الحملة"
                            />
                        </legend>
                        <Field
                            label="Titre de la campagne"
                            error={errors.campaign_title}
                            required
                        >
                            <input
                                className={inputClass}
                                value={data.campaign_title}
                                placeholder={ph('campaign_title')}
                                onChange={(e) =>
                                    setData('campaign_title', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Date de première diffusion"
                            error={errors.first_broadcast_date}
                            required
                        >
                            <input
                                type="date"
                                className={inputClass}
                                value={data.first_broadcast_date}
                                onChange={(e) =>
                                    setData(
                                        'first_broadcast_date',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Lien de consultation"
                            error={errors.submission_link}
                        >
                            <input
                                type="url"
                                className={inputClass}
                                value={data.submission_link}
                                placeholder={ph('submission_link')}
                                onChange={(e) =>
                                    setData('submission_link', e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Vidéo" error={errors.submission_video}>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) =>
                                    setData(
                                        'submission_video',
                                        e.target.files[0],
                                    )
                                }
                            />
                        </Field>
                        <Field label="Audio" error={errors.submission_audio}>
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={(e) =>
                                    setData(
                                        'submission_audio',
                                        e.target.files[0],
                                    )
                                }
                            />
                        </Field>
                        <Field label="Visuel" error={errors.submission_visual}>
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) =>
                                    setData(
                                        'submission_visual',
                                        e.target.files[0],
                                    )
                                }
                            />
                        </Field>
                        <Field
                            label="Documents complémentaires"
                            error={errors.extra_documents}
                        >
                            <input
                                type="file"
                                multiple
                                onChange={(e) =>
                                    setData(
                                        'extra_documents',
                                        Array.from(e.target.files),
                                    )
                                }
                            />
                        </Field>
                    </fieldset>

                    <fieldset className="space-y-4 rounded-2xl border border-border p-6">
                        <legend className="px-2 text-lg font-semibold text-tblack">
                            <TransText
                                en="Presentation"
                                fr="Présentation"
                                ar="عرض"
                            />
                        </legend>
                        <Field
                            label="Concept créatif et message principal"
                            error={errors.creative_concept}
                            required
                        >
                            <textarea
                                rows={4}
                                className={inputClass}
                                value={data.creative_concept}
                                placeholder={ph('creative_concept')}
                                onChange={(e) =>
                                    setData('creative_concept', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Contribution EDI"
                            error={errors.edi_contribution}
                            required
                        >
                            <textarea
                                rows={4}
                                className={inputClass}
                                value={data.edi_contribution}
                                placeholder={ph('edi_contribution')}
                                onChange={(e) =>
                                    setData('edi_contribution', e.target.value)
                                }
                                required
                            />
                        </Field>
                    </fieldset>

                    <fieldset className="space-y-3 rounded-2xl border border-border p-6">
                        <CheckRow
                            id="acc"
                            checked={data.declared_accuracy}
                            onChange={(v) => setData('declared_accuracy', v)}
                            label="Je certifie l'exactitude des informations"
                            error={errors.declared_accuracy}
                            required
                        />
                        <CheckRow
                            id="rights"
                            checked={data.declared_rights}
                            onChange={(v) => setData('declared_rights', v)}
                            label="Je dispose des droits nécessaires"
                            error={errors.declared_rights}
                            required
                        />
                        <CheckRow
                            id="rules"
                            checked={data.accepted_rules}
                            onChange={(v) => setData('accepted_rules', v)}
                            label="J'accepte le règlement Tilila Awards"
                            error={errors.accepted_rules}
                            required
                        />
                    </fieldset>

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-beta-blue py-3 text-sm font-semibold text-twhite hover:opacity-90 disabled:opacity-60"
                    >
                        {processing ? (
                            <Spinner className="size-4 text-twhite" />
                        ) : null}
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
                            ar={processing ? 'جاري الإرسال…' : 'إرسال الترشح'}
                        />
                    </button>
                </form>
            </div>
        </>
    );
}

TililaParticipate.layout = (page) => <AppLayout>{page}</AppLayout>;

function SubmissionProgressOverlay({ phase, percent, loaded, total }) {
    const isProcessing = phase === 'processing';
    const displayPercent = isProcessing ? 100 : percent;
    const loadedLabel = formatBytes(loaded);
    const totalLabel = formatBytes(total);
    const bytesLabel =
        loadedLabel && totalLabel
            ? `${loadedLabel} / ${totalLabel}`
            : loadedLabel
              ? loadedLabel
              : null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-[2px]"
            role="status"
            aria-live="polite"
            aria-busy="true"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={displayPercent}
        >
            <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl">
                <div className="flex items-center justify-center gap-2">
                    {isProcessing ? (
                        <Spinner className="size-5 text-beta-blue" />
                    ) : null}
                    <p className="text-center text-sm font-semibold text-tblack">
                        {isProcessing ? (
                            <TransText
                                en="Finalizing your submission…"
                                fr="Finalisation de votre candidature…"
                                ar="جاري إنهاء إرسال ترشحكم…"
                            />
                        ) : (
                            <TransText
                                en="Uploading your application…"
                                fr="Téléversement de votre candidature…"
                                ar="جاري رفع ملفات ترشحكم…"
                            />
                        )}
                    </p>
                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                        className={`h-full rounded-full bg-beta-blue transition-[width] duration-150 ease-out ${
                            isProcessing ? 'animate-pulse' : ''
                        }`}
                        style={{ width: `${displayPercent}%` }}
                    />
                </div>

                <p className="mt-3 text-center text-2xl font-bold text-tblack tabular-nums">
                    {displayPercent}%
                </p>

                {bytesLabel && !isProcessing ? (
                    <p className="mt-1 text-center text-xs text-muted-foreground">
                        {bytesLabel}
                    </p>
                ) : null}

                {isProcessing ? (
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                        <TransText
                            en="Upload complete. Validating and saving your submission on our servers."
                            fr="Téléversement terminé. Validation et enregistrement de votre candidature sur nos serveurs."
                            ar="اكتمل الرفع. جاري التحقق من ترشحكم وحفظه على خوادمنا."
                        />
                    </p>
                ) : (
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                        <TransText
                            en="Progress reflects the actual upload of your files."
                            fr="La progression reflète le téléversement réel de vos fichiers."
                            ar="تعكس النسبة رفع ملفاتكم الفعلي."
                        />
                    </p>
                )}
            </div>
        </div>
    );
}

function Field({ label, error, required = false, children }) {
    return (
        <label className="block text-sm">
            <span className="font-semibold text-tblack">
                {label}
                {required ? <span className="text-red-600"> *</span> : null}
            </span>
            <div className="mt-1">{children}</div>
            {error ? (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            ) : null}
        </label>
    );
}

function CheckRow({ id, checked, onChange, label, error, required = false }) {
    return (
        <div>
            <div className="flex items-center gap-2">
                <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={(v) => onChange(Boolean(v))}
                />
                <Label htmlFor={id} className="text-sm text-tgray">
                    {label}
                    {required ? <span className="text-red-600"> *</span> : null}
                </Label>
            </div>
            {error ? (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            ) : null}
        </div>
    );
}
