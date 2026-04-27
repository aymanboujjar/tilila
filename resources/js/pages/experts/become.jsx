import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function BecomeExpert() {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        full_name: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        current_title: '',
        expertise: '',
        bio: '',
        linkedin_url: '',
        portfolio_url: '',
        cv: null,
        locale: 'en',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/experts/become', {
            forceFormData: true,
            onSuccess: () => {
                reset('full_name', 'email', 'phone', 'country', 'city', 'current_title', 'expertise', 'bio', 'linkedin_url', 'portfolio_url', 'cv');
            },
        });
    };

    const inputClass =
        'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

    return (
        <>
            <Head title="Become an Expert" />

            <section className="bg-beta-white py-10">
                <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
                        <div className="mb-8">
                            <p className="text-xs font-semibold tracking-[0.3em] text-tgray uppercase">
                                Experts Network
                            </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-tblack">
                                Become an Expert
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-tgray">
                                Submit your profile to join the TILILA experts directory. Our team will review your request and approve or deny it from the back-office.
                            </p>
                        </div>

                        {recentlySuccessful ? (
                            <div className="mb-6 rounded-lg border border-alpha-green/30 bg-beta-green px-4 py-3 text-sm text-alpha-green">
                                Your request has been submitted. We will contact you after review.
                            </div>
                        ) : null}

                        <form onSubmit={submit} className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-tblack">Full name *</label>
                                    <input
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        className={inputClass}
                                        placeholder="Your full name"
                                    />
                                    {errors.full_name ? <p className="mt-1 text-xs text-alpha-danger">{errors.full_name}</p> : null}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-tblack">Email *</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={inputClass}
                                        placeholder="name@example.com"
                                    />
                                    {errors.email ? <p className="mt-1 text-xs text-alpha-danger">{errors.email}</p> : null}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-tblack">Phone</label>
                                    <input
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className={inputClass}
                                        placeholder="+212 ..."
                                    />
                                    {errors.phone ? <p className="mt-1 text-xs text-alpha-danger">{errors.phone}</p> : null}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-tblack">Current title *</label>
                                    <input
                                        value={data.current_title}
                                        onChange={(e) => setData('current_title', e.target.value)}
                                        className={inputClass}
                                        placeholder="Journalist, Researcher, ..."
                                    />
                                    {errors.current_title ? <p className="mt-1 text-xs text-alpha-danger">{errors.current_title}</p> : null}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-tblack">Country</label>
                                    <input
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className={inputClass}
                                        placeholder="Morocco"
                                    />
                                    {errors.country ? <p className="mt-1 text-xs text-alpha-danger">{errors.country}</p> : null}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-tblack">City</label>
                                    <input
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className={inputClass}
                                        placeholder="Casablanca"
                                    />
                                    {errors.city ? <p className="mt-1 text-xs text-alpha-danger">{errors.city}</p> : null}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-tblack">Expertise areas *</label>
                                <textarea
                                    value={data.expertise}
                                    onChange={(e) => setData('expertise', e.target.value)}
                                    className={`${inputClass} min-h-24 resize-y`}
                                    placeholder="Ex: Media ethics, digital journalism, climate policy"
                                />
                                {errors.expertise ? <p className="mt-1 text-xs text-alpha-danger">{errors.expertise}</p> : null}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-tblack">Short bio *</label>
                                <textarea
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    className={`${inputClass} min-h-28 resize-y`}
                                    placeholder="Tell us about your work and achievements"
                                />
                                {errors.bio ? <p className="mt-1 text-xs text-alpha-danger">{errors.bio}</p> : null}
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-tblack">LinkedIn URL</label>
                                    <input
                                        value={data.linkedin_url}
                                        onChange={(e) => setData('linkedin_url', e.target.value)}
                                        className={inputClass}
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                    {errors.linkedin_url ? <p className="mt-1 text-xs text-alpha-danger">{errors.linkedin_url}</p> : null}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-tblack">Portfolio URL</label>
                                    <input
                                        value={data.portfolio_url}
                                        onChange={(e) => setData('portfolio_url', e.target.value)}
                                        className={inputClass}
                                        placeholder="https://..."
                                    />
                                    {errors.portfolio_url ? <p className="mt-1 text-xs text-alpha-danger">{errors.portfolio_url}</p> : null}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-tblack">CV (PDF/DOC, max 5MB)</label>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setData('cv', e.target.files?.[0] ?? null)}
                                    className={inputClass}
                                />
                                {errors.cv ? <p className="mt-1 text-xs text-alpha-danger">{errors.cv}</p> : null}
                            </div>

                            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border/70 pt-4">
                                <Link
                                    href="/experts"
                                    className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-tgray hover:text-tblack"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-full bg-beta-blue px-5 py-2 text-sm font-semibold text-twhite transition hover:bg-beta-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

BecomeExpert.layout = (page) => <AppLayout>{page}</AppLayout>;
