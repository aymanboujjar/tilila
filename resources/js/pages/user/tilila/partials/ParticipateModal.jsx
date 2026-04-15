import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

import TransText from '@/components/TransText';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function Field({ label, children, error }) {
    return (
        <div className="space-y-2">
            <div className="text-sm font-semibold text-foreground">{label}</div>
            {children}
            {error ? (
                <div className="text-xs text-alpha-danger">{error}</div>
            ) : null}
        </div>
    );
}

export default function ParticipateModal({ open, onOpenChange }) {
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            organization: '',
            job_title: '',
            city: '',
            country: 'ma',
            submission_title: '',
            submission_description: '',
            submission_link: '',
            accepted_rules: false,
        });

    useEffect(() => {
        if (!open) {
            clearErrors();
        }
    }, [open, clearErrors]);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        post('/tilila/participate', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onOpenChange(false);
            },
            onError: () => {
                requestAnimationFrame(() => {
                    const el = document.getElementById(
                        'tilila-participate-scroll',
                    );
                    if (el) el.scrollTop = 0;
                });
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[85vh] overflow-hidden p-0 sm:max-w-4xl">
                <div className="border-b border-border bg-background/95 px-6 py-5 backdrop-blur supports-backdrop-filter:bg-background/80">
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-xl">
                            <TransText
                                en="Participate in the Trophée Tilila"
                                fr="Participer au Trophée Tilila"
                                ar="المشاركة في جائزة تيليلا"
                            />
                        </DialogTitle>
                        <DialogDescription>
                            <TransText
                                en="Fill in the participation form, accept the contest rules, and receive an acknowledgment by email."
                                fr="Remplir le formulaire de participation, accepter le règlement du concours, puis recevoir un accusé de réception par e-mail."
                                ar="املأ استمارة المشاركة، اقبل نظام المسابقة، وستصلك رسالة تأكيد عبر البريد الإلكتروني."
                            />
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form
                    onSubmit={submit}
                    id="tilila-participate-scroll"
                    className="max-h-[calc(85vh-140px)] overflow-y-auto px-6 py-6"
                >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field
                            label={
                                <TransText
                                    en="First name"
                                    fr="Prénom"
                                    ar="الاسم الأول"
                                />
                            }
                            error={errors.first_name}
                        >
                            <Input
                                value={data.first_name}
                                onChange={(e) =>
                                    setData('first_name', e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label={
                                <TransText
                                    en="Last name"
                                    fr="Nom"
                                    ar="اسم العائلة"
                                />
                            }
                            error={errors.last_name}
                        >
                            <Input
                                value={data.last_name}
                                onChange={(e) =>
                                    setData('last_name', e.target.value)
                                }
                            />
                        </Field>

                        <div className="sm:col-span-2">
                            <Field
                                label={
                                    <TransText
                                        en="Email"
                                        fr="E-mail"
                                        ar="البريد الإلكتروني"
                                    />
                                }
                                error={errors.email}
                            >
                                <Input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                            </Field>
                        </div>

                        <Field
                            label={
                                <TransText
                                    en="Phone"
                                    fr="Téléphone"
                                    ar="الهاتف"
                                />
                            }
                            error={errors.phone}
                        >
                            <Input
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label={
                                <TransText en="Country" fr="Pays" ar="البلد" />
                            }
                            error={errors.country}
                        >
                            <Input
                                value={data.country}
                                onChange={(e) =>
                                    setData('country', e.target.value)
                                }
                                placeholder="ma"
                            />
                        </Field>

                        <div className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-2">
                            <Field
                                label={
                                    <TransText
                                        en="Organization"
                                        fr="Organisation"
                                        ar="المنظمة"
                                    />
                                }
                                error={errors.organization}
                            >
                                <Input
                                    value={data.organization}
                                    onChange={(e) =>
                                        setData('organization', e.target.value)
                                    }
                                />
                            </Field>
                            <Field
                                label={
                                    <TransText
                                        en="Job title"
                                        fr="Poste"
                                        ar="المنصب"
                                    />
                                }
                                error={errors.job_title}
                            >
                                <Input
                                    value={data.job_title}
                                    onChange={(e) =>
                                        setData('job_title', e.target.value)
                                    }
                                />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Field
                                label={
                                    <TransText
                                        en="City"
                                        fr="Ville"
                                        ar="المدينة"
                                    />
                                }
                                error={errors.city}
                            >
                                <Input
                                    value={data.city}
                                    onChange={(e) =>
                                        setData('city', e.target.value)
                                    }
                                />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Field
                                label={
                                    <TransText
                                        en="Submission title"
                                        fr="Titre de la candidature"
                                        ar="عنوان المشاركة"
                                    />
                                }
                                error={errors.submission_title}
                            >
                                <Input
                                    value={data.submission_title}
                                    onChange={(e) =>
                                        setData(
                                            'submission_title',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Field
                                label={
                                    <TransText
                                        en="Short description"
                                        fr="Description (courte)"
                                        ar="وصف مختصر"
                                    />
                                }
                                error={errors.submission_description}
                            >
                                <textarea
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                    value={data.submission_description}
                                    onChange={(e) =>
                                        setData(
                                            'submission_description',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Field
                                label={
                                    <TransText
                                        en="Submission link"
                                        fr="Lien de soumission"
                                        ar="رابط المشاركة"
                                    />
                                }
                                error={errors.submission_link}
                            >
                                <Input
                                    type="url"
                                    placeholder="https://wetransfer.com/…"
                                    value={data.submission_link}
                                    onChange={(e) =>
                                        setData(
                                            'submission_link',
                                            e.target.value,
                                        )
                                    }
                                />
                                <div className="mt-2 text-xs text-muted-foreground">
                                    <TransText
                                        en="Paste a link to your files (Drive, SwissTransfer, WeTransfer, Dropbox…)."
                                        fr="Collez un lien vers vos fichiers (Drive, SwissTransfer, WeTransfer, Dropbox…)."
                                        ar="الصق رابط ملفاتك (Drive أو SwissTransfer أو WeTransfer أو Dropbox...)."
                                    />
                                </div>
                            </Field>
                        </div>

                        <div className="rounded-xl bg-background p-4 ring-1 ring-border sm:col-span-2">
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id="accepted_rules"
                                    checked={Boolean(data.accepted_rules)}
                                    onCheckedChange={(v) =>
                                        setData('accepted_rules', Boolean(v))
                                    }
                                />
                                <div className="min-w-0">
                                    <Label
                                        htmlFor="accepted_rules"
                                        className="text-sm font-semibold text-foreground"
                                    >
                                        <TransText
                                            en="I accept the contest rules"
                                            fr="J’accepte le règlement du concours"
                                            ar="أوافق على نظام المسابقة"
                                        />
                                    </Label>
                                    <div className="mt-1 text-xs text-muted-foreground">
                                        <TransText
                                            en="You must accept the rules to submit."
                                            fr="Vous devez accepter le règlement pour soumettre."
                                            ar="يجب قبول النظام للإرسال."
                                        />
                                    </div>
                                    {errors.accepted_rules ? (
                                        <div className="mt-2 text-xs text-alpha-danger">
                                            {errors.accepted_rules}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2 sm:col-span-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className={[
                                    'inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow-sm',
                                    !processing
                                        ? 'bg-beta-blue hover:opacity-90'
                                        : 'cursor-not-allowed bg-muted text-muted-foreground',
                                ].join(' ')}
                            >
                                <TransText
                                    en={
                                        processing
                                            ? 'Submitting…'
                                            : 'Submit participation'
                                    }
                                    fr={
                                        processing
                                            ? 'Envoi…'
                                            : 'Envoyer la participation'
                                    }
                                    ar={
                                        processing
                                            ? 'جارٍ الإرسال…'
                                            : 'إرسال المشاركة'
                                    }
                                />
                            </button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
