import React, { useId, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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

    const inputClass =
        'w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-beta-blue/50 focus:bg-background focus:ring-2 focus:ring-beta-blue/20';

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
            <DialogContent className="max-h-[90vh] gap-0 overflow-hidden rounded-2xl border border-border/60 p-0 shadow-2xl sm:max-w-[min(100%,26rem)]">
                <div className="relative overflow-hidden bg-linear-to-br from-beta-blue/12 via-background to-alpha-blue/8 px-6 pb-5 pt-7 pr-14 sm:px-8 sm:pb-6 sm:pt-8">
                    <div
                        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-beta-blue/10 blur-2xl"
                        aria-hidden
                    />
                    <DialogHeader className="relative space-y-3 text-left">
                        {badge ? (
                            <div className="inline-flex w-fit items-center rounded-full border border-beta-blue/25 bg-background/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-beta-blue backdrop-blur-sm">
                                {badge}
                            </div>
                        ) : null}
                        <DialogTitle className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                            {title ?? 'Event Registration'}
                        </DialogTitle>
                        {description ? (
                            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                                {description}
                            </DialogDescription>
                        ) : null}
                    </DialogHeader>
                </div>

                <div className="border-t border-border/50 bg-background px-6 py-6 sm:px-8">
                    {done ? (
                        <div className="flex gap-4 rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-4 text-sm text-foreground">
                            <CheckCircle2
                                className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                                aria-hidden
                            />
                            <p className="leading-relaxed text-muted-foreground">
                                <span className="font-semibold text-foreground">
                                    You&apos;re all set.
                                </span>{' '}
                                We&apos;ll contact you soon with next steps.
                            </p>
                        </div>
                    ) : (
                        <form
                            className="space-y-4"
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
                                    className="text-xs font-semibold text-foreground"
                                >
                                    Full name
                                </label>
                                <input
                                    id={`${formId}-name`}
                                    type="text"
                                    className={inputClass}
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
                                    className="text-xs font-semibold text-foreground"
                                >
                                    Email
                                </label>
                                <input
                                    id={`${formId}-email`}
                                    type="email"
                                    className={inputClass}
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
                                    className="text-xs font-semibold text-foreground"
                                >
                                    Phone{' '}
                                    <span className="font-normal text-muted-foreground">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    id={`${formId}-phone`}
                                    type="tel"
                                    className={inputClass}
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

                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/60 bg-muted/20 px-3.5 py-3 text-sm transition hover:bg-muted/30">
                                <input
                                    type="checkbox"
                                    className="mt-0.5 h-4 w-4 rounded border-border text-beta-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                    checked={agreed}
                                    onChange={(e) =>
                                        setAgreed(e.target.checked)
                                    }
                                />
                                <span className="text-muted-foreground leading-snug">
                                    I agree to be contacted about this event and
                                    accept the{' '}
                                    <span className="font-semibold text-beta-blue">
                                        privacy policy
                                    </span>
                                    .
                                </span>
                            </label>

                            <DialogFooter className="mt-6 flex-col gap-2 sm:flex-col">
                                <button
                                    type="submit"
                                    disabled={!agreed || processing}
                                    className={[
                                        'inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-md transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                                        agreed && !processing
                                            ? 'bg-beta-blue text-white hover:opacity-95'
                                            : 'cursor-not-allowed bg-muted text-muted-foreground shadow-none',
                                    ].join(' ')}
                                >
                                    {processing
                                        ? 'Submitting…'
                                        : (submitLabel ??
                                          'Complete registration')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onClose?.()}
                                    className="inline-flex w-full items-center justify-center rounded-xl border border-border/80 bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                >
                                    Cancel
                                </button>
                            </DialogFooter>
                        </form>
                    )}

                    {done ? (
                        <DialogFooter className="mt-6 sm:justify-stretch">
                            <button
                                type="button"
                                onClick={() => onClose?.()}
                                className="inline-flex w-full items-center justify-center rounded-xl bg-beta-blue px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
                            >
                                Close
                            </button>
                        </DialogFooter>
                    ) : null}
                </div>
            </DialogContent>
        </Dialog>
    );
}
