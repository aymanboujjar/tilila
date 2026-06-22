import { Link, useForm } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, CloudUpload, XCircle } from 'lucide-react';
import { useState } from 'react';
import TransText from '@/components/TransText';
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

function firstFormError(errors) {
    const values = Object.values(errors ?? {});
    const flat = values.flat().filter(Boolean);
    return flat[0] ?? null;
}

function Field({ label, error, children, embedded = false }) {
    return (
        <label className="block text-sm">
            <span
                className={
                    embedded
                        ? 'font-semibold text-twhite/90'
                        : 'font-semibold text-tblack'
                }
            >
                {label} *
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
            <div className="flex items-start gap-2">
                <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={(v) => onChange(Boolean(v))}
                    className={embedded ? 'border-twhite/40' : undefined}
                />
                <Label
                    htmlFor={id}
                    className={
                        embedded
                            ? 'text-sm leading-relaxed text-twhite/85'
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
            declared_under_30: false,
            declared_accuracy: false,
            declared_rights: false,
            accepted_rules: false,
        });

    const inputClass = embedded
        ? 'w-full rounded-md border border-twhite/20 bg-twhite/10 px-3 py-2.5 text-sm text-twhite placeholder:text-twhite/40'
        : 'w-full rounded-md border border-border bg-background px-3 py-2 text-sm';

    const fieldsetClass = embedded
        ? 'space-y-4 rounded-xl border border-twhite/15 bg-twhite/5 p-5 sm:p-6'
        : 'space-y-4 rounded-2xl border border-border p-6';

    const legendClass = embedded
        ? 'px-2 text-base font-semibold text-twhite'
        : 'px-2 text-lg font-semibold text-tblack';

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
                                    className="rounded-full bg-beta-blue text-twhite hover:bg-beta-blue/90"
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

            <form
                onSubmit={submit}
                className="space-y-6 sm:space-y-8"
                aria-busy={processing}
            >
                <fieldset className={fieldsetClass}>
                    <legend className={legendClass}>
                        <TransText
                            en="Personal information"
                            fr="Informations personnelles"
                            ar="معلومات شخصية"
                        />
                    </legend>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <Field
                            label="Prénom"
                            error={errors.first_name}
                            embedded={embedded}
                        >
                            <input
                                className={inputClass}
                                value={data.first_name}
                                onChange={(e) =>
                                    setData('first_name', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Nom"
                            error={errors.last_name}
                            embedded={embedded}
                        >
                            <input
                                className={inputClass}
                                value={data.last_name}
                                onChange={(e) =>
                                    setData('last_name', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Date de naissance"
                            error={errors.birth_date}
                            embedded={embedded}
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
                        <Field label="CIN" error={errors.cin} embedded={embedded}>
                            <input
                                className={inputClass}
                                value={data.cin}
                                onChange={(e) => setData('cin', e.target.value)}
                                required
                            />
                        </Field>
                        <Field label="Ville" error={errors.city} embedded={embedded}>
                            <input
                                className={inputClass}
                                value={data.city}
                                onChange={(e) =>
                                    setData('city', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="E-mail"
                            error={errors.email}
                            embedded={embedded}
                        >
                            <input
                                type="email"
                                className={inputClass}
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Téléphone"
                            error={errors.phone}
                            embedded={embedded}
                        >
                            <input
                                className={inputClass}
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Niveau d'études"
                            error={errors.education_level}
                            embedded={embedded}
                        >
                            <input
                                className={inputClass}
                                value={data.education_level}
                                onChange={(e) =>
                                    setData('education_level', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Profession"
                            error={errors.profession}
                            embedded={embedded}
                        >
                            <input
                                className={inputClass}
                                value={data.profession}
                                onChange={(e) =>
                                    setData('profession', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="LinkedIn / Instagram / Portfolio"
                            error={errors.social_links}
                            embedded={embedded}
                        >
                            <input
                                className={inputClass}
                                value={data.social_links}
                                onChange={(e) =>
                                    setData('social_links', e.target.value)
                                }
                            />
                        </Field>
                    </div>
                </fieldset>

                <fieldset className={fieldsetClass}>
                    <legend className={legendClass}>
                        <TransText
                            en="Project"
                            fr="Projet soumis"
                            ar="المشروع"
                        />
                    </legend>
                    <div className="mt-4 space-y-4">
                        <Field
                            label="Titre du projet"
                            error={errors.project_title}
                            embedded={embedded}
                        >
                            <input
                                className={inputClass}
                                value={data.project_title}
                                onChange={(e) =>
                                    setData('project_title', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Lien vers une réalisation antérieure"
                            error={errors.prior_work_link}
                            embedded={embedded}
                        >
                            <input
                                type="url"
                                className={inputClass}
                                value={data.prior_work_link}
                                onChange={(e) =>
                                    setData('prior_work_link', e.target.value)
                                }
                            />
                        </Field>
                        {embedded ? (
                            <div className="rounded-xl border border-dashed border-twhite/25 bg-twhite/5 px-4 py-8 text-center">
                                <CloudUpload
                                    className="mx-auto size-8 text-beta-turquoise"
                                    aria-hidden
                                />
                                <p className="mt-3 text-sm text-twhite/80">
                                    <TransText
                                        en="Drag and drop your file here or browse. PDF, MP4, MOV or link (max. 100 MB)"
                                        fr="Glisser-déposer votre fichier ici ou Parcourir. PDF, MP4, MOV ou lien (max. 100 Mo)"
                                        ar="اسحب ملفك هنا أو تصفح. PDF أو MP4 أو MOV أو رابط (100 ميغا كحد أقصى)"
                                    />
                                </p>
                            </div>
                        ) : null}
                        <Field
                            label="Upload Portfolio"
                            error={errors.portfolio_file}
                            embedded={embedded}
                        >
                            <input
                                type="file"
                                accept=".pdf,.zip"
                                className={
                                    embedded
                                        ? 'text-sm text-twhite/80 file:me-3 file:rounded-md file:border-0 file:bg-beta-turquoise file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-twhite'
                                        : undefined
                                }
                                onChange={(e) =>
                                    setData('portfolio_file', e.target.files[0])
                                }
                            />
                        </Field>
                        <Field
                            label="Upload Vidéo"
                            error={errors.original_video}
                            embedded={embedded}
                        >
                            <input
                                type="file"
                                accept="video/*"
                                className={
                                    embedded
                                        ? 'text-sm text-twhite/80 file:me-3 file:rounded-md file:border-0 file:bg-beta-turquoise file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-twhite'
                                        : undefined
                                }
                                onChange={(e) =>
                                    setData('original_video', e.target.files[0])
                                }
                            />
                        </Field>
                        <Field
                            label="Upload Dossier PDF"
                            error={errors.pdf_dossier}
                            embedded={embedded}
                        >
                            <input
                                type="file"
                                accept=".pdf"
                                className={
                                    embedded
                                        ? 'text-sm text-twhite/80 file:me-3 file:rounded-md file:border-0 file:bg-beta-turquoise file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-twhite'
                                        : undefined
                                }
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
                            embedded={embedded}
                        >
                            <textarea
                                rows={4}
                                className={inputClass}
                                value={data.candidate_presentation}
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
                            embedded={embedded}
                        >
                            <textarea
                                rows={4}
                                className={inputClass}
                                value={data.project_presentation}
                                onChange={(e) =>
                                    setData(
                                        'project_presentation',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Message principal"
                            error={errors.main_message}
                            embedded={embedded}
                        >
                            <textarea
                                rows={3}
                                className={inputClass}
                                value={data.main_message}
                                onChange={(e) =>
                                    setData('main_message', e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Motivation"
                            error={errors.motivation}
                            embedded={embedded}
                        >
                            <textarea
                                rows={3}
                                className={inputClass}
                                value={data.motivation}
                                onChange={(e) =>
                                    setData('motivation', e.target.value)
                                }
                                required
                            />
                        </Field>
                    </div>
                </fieldset>

                <fieldset
                    className={
                        embedded
                            ? 'space-y-3 rounded-xl border border-twhite/15 bg-twhite/5 p-5 sm:p-6'
                            : 'space-y-3 rounded-2xl border border-border p-6'
                    }
                >
                    <CheckRow
                        id="u30"
                        checked={data.declared_under_30}
                        onChange={(v) => setData('declared_under_30', v)}
                        label="Je certifie être âgé(e) de moins de 30 ans"
                        error={errors.declared_under_30}
                        embedded={embedded}
                    />
                    <CheckRow
                        id="acc"
                        checked={data.declared_accuracy}
                        onChange={(v) => setData('declared_accuracy', v)}
                        label="Je certifie l'exactitude des informations"
                        error={errors.declared_accuracy}
                        embedded={embedded}
                    />
                    <CheckRow
                        id="rights"
                        checked={data.declared_rights}
                        onChange={(v) => setData('declared_rights', v)}
                        label="Je suis titulaire des droits relatifs aux éléments transmis"
                        error={errors.declared_rights}
                        embedded={embedded}
                    />
                    <CheckRow
                        id="rules"
                        checked={data.accepted_rules}
                        onChange={(v) => setData('accepted_rules', v)}
                        label="J'accepte le règlement du concours Tililab"
                        error={errors.accepted_rules}
                        embedded={embedded}
                    />
                </fieldset>

                <div
                    className={
                        embedded
                            ? 'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
                            : undefined
                    }
                >
                    {embedded ? <div className="flex-1" /> : null}
                    <button
                        type="submit"
                        disabled={processing}
                        className={
                            embedded
                                ? 'inline-flex items-center justify-center gap-2 rounded-lg bg-beta-turquoise px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-twhite uppercase transition hover:brightness-110 disabled:opacity-60 sm:ms-auto'
                                : 'flex w-full items-center justify-center gap-2 rounded-full bg-beta-blue py-3 text-sm font-semibold text-twhite hover:opacity-90 disabled:opacity-60'
                        }
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
                        {embedded && !processing ? (
                            <ArrowRight className="size-4" aria-hidden />
                        ) : null}
                    </button>
                </div>
            </form>
        </>
    );
}
