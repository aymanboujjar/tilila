import React, { useState } from 'react';

export default function RegistrationCard({
    badge,
    title,
    description,
    submitLabel,
}) {
    const [agreed, setAgreed] = useState(false);

    return (
        <section className="bg-secondary/30 py-12">
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    {badge ? (
                        <div className="inline-flex items-center rounded-full bg-alpha-blue px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-beta-blue ring-1 ring-border">
                            {badge}
                        </div>
                    ) : null}
                    <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                        {title}
                    </h2>
                    {description ? (
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {description}
                        </p>
                    ) : null}
                </div>

                <div className="mx-auto mt-8 max-w-md rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                    <div className="text-sm font-extrabold text-foreground">
                        Quick Registration
                    </div>
                    <form
                        className="mt-4 space-y-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!agreed) return;
                        }}
                    >
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                placeholder="Your name"
                                autoComplete="name"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                        </div>

                        <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm">
                            <input
                                type="checkbox"
                                className="mt-1 h-4 w-4 rounded border-border text-beta-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <span className="text-muted-foreground">
                                I agree to be contacted about this event and accept the{' '}
                                <span className="font-semibold text-beta-blue">
                                    privacy policy
                                </span>
                                .
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={!agreed}
                            className={[
                                'mt-2 inline-flex w-full items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                                agreed
                                    ? 'bg-beta-blue text-white hover:opacity-90'
                                    : 'cursor-not-allowed bg-muted text-muted-foreground',
                            ].join(' ')}
                        >
                            {submitLabel ?? 'Complete Registration'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

