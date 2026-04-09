import React, { useId, useState } from 'react';
import { useForm } from '@inertiajs/react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from '@/contexts/TranslationContext';

export default function RegistrationCard({
    badge,
    title,
    description,
    submitLabel,
    eventId,
    isOpen = false,
    onClose,
}) {
    const { locale } = useTranslation();
    const [agreed, setAgreed] = useState(false);
    const [done, setDone] = useState(false);
    const formId = useId();
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            full_name: '',
            email: '',
            phone: '',
            locale,
        });

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    setAgreed(false);
                    setDone(false);
                    clearErrors();
                    reset();
                    onClose?.();
                }
            }}
        >
            <DialogContent className="max-h-[85vh] overflow-y-auto p-0 sm:max-w-xl">
                <div className="border-b border-border bg-background px-6 py-5 sm:px-8">
                    <DialogHeader className="space-y-2 text-left">
                        {badge ? (
                            <div className="inline-flex w-fit items-center rounded-full bg-alpha-blue px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-beta-blue ring-1 ring-border">
                                {badge}
                            </div>
                        ) : null}
                        <DialogTitle className="text-2xl font-extrabold tracking-tight text-foreground">
                            {title ?? 'Event Registration'}
                        </DialogTitle>
                        {description ? (
                            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                                {description}
                            </DialogDescription>
                        ) : null}
                    </DialogHeader>
                </div>

                <div className="bg-background px-6 py-6 sm:px-8">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="text-sm font-extrabold text-foreground">
                            Quick Registration
                        </div>

                        {done ? (
                            <div className="mt-4 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                                Registration submitted. We’ll contact you soon.
                            </div>
                        ) : (
                            <form
                                className="mt-4 space-y-3"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!agreed) return;
                                    if (!eventId) return;
                                    clearErrors();
                                    post(
                                        `/events/${encodeURIComponent(eventId)}/register`,
                                        {
                                            preserveScroll: true,
                                            onSuccess: () => setDone(true),
                                        },
                                    );
                                }}
                            >
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor={`${formId}-name`}
                                        className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id={`${formId}-name`}
                                        type="text"
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                        placeholder="Your name"
                                        autoComplete="name"
                                        value={data.full_name}
                                        onChange={(e) =>
                                            setData('full_name', e.target.value)
                                        }
                                    />
                                    {errors.full_name ? (
                                        <div className="text-xs text-alpha-danger">
                                            {errors.full_name}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="space-y-1.5">
                                    <label
                                        htmlFor={`${formId}-email`}
                                        className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id={`${formId}-email`}
                                        type="email"
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                    {errors.email ? (
                                        <div className="text-xs text-alpha-danger">
                                            {errors.email}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="space-y-1.5">
                                    <label
                                        htmlFor={`${formId}-phone`}
                                        className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground"
                                    >
                                        Phone (optional)
                                    </label>
                                    <input
                                        id={`${formId}-phone`}
                                        type="tel"
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                        placeholder="+212 …"
                                        autoComplete="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                    />
                                    {errors.phone ? (
                                        <div className="text-xs text-alpha-danger">
                                            {errors.phone}
                                        </div>
                                    ) : null}
                                </div>

                                <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm">
                                    <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 rounded border-border text-beta-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                        checked={agreed}
                                        onChange={(e) =>
                                            setAgreed(e.target.checked)
                                        }
                                    />
                                    <span className="text-muted-foreground">
                                        I agree to be contacted about this event and
                                        accept the{' '}
                                        <span className="font-semibold text-beta-blue">
                                            privacy policy
                                        </span>
                                        .
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={!agreed || processing}
                                    className={[
                                        'mt-2 inline-flex w-full items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                                        agreed && !processing
                                            ? 'bg-beta-blue text-white hover:opacity-90'
                                            : 'cursor-not-allowed bg-muted text-muted-foreground',
                                    ].join(' ')}
                                >
                                    {processing
                                        ? 'Submitting…'
                                        : (submitLabel ??
                                          'Complete Registration')}
                                </button>
                            </form>
                        )}

                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={() => onClose?.()}
                                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

