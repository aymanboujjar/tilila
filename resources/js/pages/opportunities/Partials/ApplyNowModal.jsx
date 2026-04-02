import React, { useId, useMemo, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

function Field({ label, children, htmlFor, hint }) {
    return (
        <div className="space-y-1.5">
            <label
                htmlFor={htmlFor}
                className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground"
            >
                {label}
            </label>
            {children}
            {hint ? (
                <div className="text-xs text-muted-foreground">{hint}</div>
            ) : null}
        </div>
    );
}

function Input({ id, name, type = 'text', placeholder, autoComplete }) {
    return (
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
    );
}

function Textarea({ id, name, placeholder, rows = 4 }) {
    return (
        <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            rows={rows}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
    );
}

function UploadBox({ id, name, title, subtitle }) {
    return (
        <label
            htmlFor={id}
            className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-6 text-center shadow-sm transition hover:bg-accent/40"
        >
            <div className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                Upload
            </div>
            <div className="text-sm font-extrabold text-foreground">{title}</div>
            <div className="text-xs text-muted-foreground">{subtitle}</div>
            <input id={id} name={name} type="file" className="sr-only" />
        </label>
    );
}

function SectionCard({ title, description, children }) {
    return (
        <section className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:grid-cols-12">
            <div className="md:col-span-4">
                <div className="text-sm font-extrabold text-beta-blue">
                    {title}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {description}
                </div>
            </div>
            <div className="md:col-span-8">{children}</div>
        </section>
    );
}

export default function ApplyNowModal({
    isOpen,
    onClose,
    opportunityTitle,
}) {
    const formId = useId();
    const fullNameId = `${formId}-full-name`;
    const emailId = `${formId}-email`;
    const phoneId = `${formId}-phone`;
    const countryId = `${formId}-country`;
    const roleId = `${formId}-role`;
    const orgId = `${formId}-org`;
    const motivationId = `${formId}-motivation`;
    const resumeId = `${formId}-resume`;
    const portfolioId = `${formId}-portfolio`;

    const experienceOptions = useMemo(
        () => [
            { value: '1-3', label: '1-3 Years' },
            { value: '4-7', label: '4-7 Years' },
            { value: '8+', label: '8+ Years' },
        ],
        [],
    );

    const [experience, setExperience] = useState(experienceOptions[0]?.value);
    const [agreedCharter, setAgreedCharter] = useState(false);
    const [agreedPrivacy, setAgreedPrivacy] = useState(false);

    const canSubmit = agreedCharter && agreedPrivacy;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[85vh] overflow-y-auto p-0 sm:max-w-5xl">
                <div className="border-b border-border bg-background px-6 py-5 sm:px-8">
                    <DialogHeader className="space-y-2 text-left">
                        <div className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">
                            Application Form
                        </div>
                        <DialogTitle className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                            {opportunityTitle ?? 'Submit your application'}
                        </DialogTitle>
                        <DialogDescription className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                            Complete the form below to apply. All fields should be
                            accurate and up to date.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form
                    className="space-y-6 bg-background px-6 py-6 sm:px-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!canSubmit) return;
                        onClose();
                    }}
                >
                    <SectionCard
                        title="Identity & Contact"
                        description="Essential details for your candidate profile and communication."
                    >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Field label="Full Name" htmlFor={fullNameId}>
                                <Input
                                    id={fullNameId}
                                    name="full_name"
                                    placeholder="Your full name"
                                    autoComplete="name"
                                />
                            </Field>
                            <Field label="Email Address" htmlFor={emailId}>
                                <Input
                                    id={emailId}
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    autoComplete="email"
                                />
                            </Field>
                            <Field label="Phone Number" htmlFor={phoneId}>
                                <Input
                                    id={phoneId}
                                    name="phone"
                                    type="tel"
                                    placeholder="+212 6xx xxx xxx"
                                    autoComplete="tel"
                                />
                            </Field>
                            <Field label="Country of Residence" htmlFor={countryId}>
                                <select
                                    id={countryId}
                                    name="country"
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select Country
                                    </option>
                                    <option value="MA">Morocco</option>
                                    <option value="TN">Tunisia</option>
                                    <option value="DZ">Algeria</option>
                                    <option value="EG">Egypt</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </Field>
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="Expertise"
                        description="Tell us about your current standing and impact in the media industry."
                    >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Field label="Current Role" htmlFor={roleId}>
                                <Input
                                    id={roleId}
                                    name="current_role"
                                    placeholder="e.g., Senior Journalist"
                                    autoComplete="organization-title"
                                />
                            </Field>
                            <Field label="Organization" htmlFor={orgId}>
                                <Input
                                    id={orgId}
                                    name="organization"
                                    placeholder="e.g., Independent Media Hub"
                                    autoComplete="organization"
                                />
                            </Field>
                        </div>

                        <div className="mt-5">
                            <div className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">
                                Years of Experience
                            </div>
                            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {experienceOptions.map((option) => {
                                    const selected = experience === option.value;
                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setExperience(option.value)}
                                            className={[
                                                'rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition',
                                                selected
                                                    ? 'border-beta-blue bg-alpha-blue/30 text-beta-blue'
                                                    : 'border-border bg-background text-foreground hover:bg-accent/40',
                                            ].join(' ')}
                                            aria-pressed={selected}
                                        >
                                            {option.label}
                                        </button>
                                    );
                                })}
                            </div>
                            <input
                                type="hidden"
                                name="years_experience"
                                value={experience ?? ''}
                            />
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="Vision & Intent"
                        description="Why do you want to join this specific leadership cohort?"
                    >
                        <Field
                            label="Motivation Statement (max 500 words)"
                            htmlFor={motivationId}
                        >
                            <Textarea
                                id={motivationId}
                                name="motivation"
                                rows={5}
                                placeholder="Describe your career goals and how this program aligns with your vision for the future of media..."
                            />
                        </Field>
                    </SectionCard>

                    <SectionCard
                        title="Portfolio"
                        description="Upload evidence of your work and your professional journey."
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <UploadBox
                                id={resumeId}
                                name="resume"
                                title="Upload CV/Resume"
                                subtitle="PDF format (Max 5MB)"
                            />
                            <UploadBox
                                id={portfolioId}
                                name="portfolio"
                                title="Upload Portfolio"
                                subtitle="Links or PDF (Max 10MB)"
                            />
                        </div>
                    </SectionCard>

                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-start gap-3 text-sm">
                                <input
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-border text-beta-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                    checked={agreedCharter}
                                    onChange={(e) => setAgreedCharter(e.target.checked)}
                                />
                                <span className="text-muted-foreground">
                                    I have read and agree to the{' '}
                                    <span className="font-semibold text-beta-blue">
                                        Tilila Quality Charter
                                    </span>
                                    . I commit to maintaining the editorial standards and
                                    professional ethics outlined.
                                </span>
                            </label>

                            <label className="flex cursor-pointer items-start gap-3 text-sm">
                                <input
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-border text-beta-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                    checked={agreedPrivacy}
                                    onChange={(e) => setAgreedPrivacy(e.target.checked)}
                                />
                                <span className="text-muted-foreground">
                                    I consent to the processing of my personal data for the
                                    purpose of this application as described in the{' '}
                                    <span className="font-semibold text-beta-blue">
                                        Data Privacy Policy
                                    </span>
                                    .
                                </span>
                            </label>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className={[
                                    'inline-flex items-center justify-center rounded-md px-6 py-2.5 text-sm font-semibold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                                    canSubmit
                                        ? 'bg-beta-blue text-white hover:opacity-90'
                                        : 'cursor-not-allowed bg-muted text-muted-foreground',
                                ].join(' ')}
                            >
                                Submit Application
                            </button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

