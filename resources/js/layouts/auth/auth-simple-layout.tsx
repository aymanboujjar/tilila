import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-svh overflow-hidden bg-beta-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,151,170,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_34%)]" />
            <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-alpha-blue/70 blur-3xl" />
            <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative mx-auto grid min-h-svh max-w-7xl lg:grid-cols-[1.1fr_0.9fr]">
                <div className="hidden flex-col justify-between px-6 py-8 lg:flex lg:px-8 xl:px-12">
                    <Link href={home()} className="inline-flex items-center">
                        <img
                            src="/assets/logo.webp"
                            alt="Tilila"
                            className="h-12 w-auto object-contain"
                            loading="eager"
                            decoding="async"
                        />
                    </Link>

                    <div className="max-w-xl">
                        <span className="inline-flex items-center rounded-full bg-alpha-blue px-4 py-2 text-xs font-semibold tracking-[0.3em] text-beta-blue">
                            TILILA DIGITAL PLATFORM
                        </span>
                        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-tblack xl:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-4 max-w-lg text-base leading-7 text-tgray xl:text-lg">
                            {description}
                        </p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-border bg-background/90 p-4 shadow-sm backdrop-blur">
                                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-tgray">
                                    Secure access
                                </div>
                                <p className="mt-2 text-sm leading-6 text-tblack">
                                    Sign in to manage your account and saved
                                    settings.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border bg-background/90 p-4 shadow-sm backdrop-blur">
                                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-tgray">
                                    Fast response
                                </div>
                                <p className="mt-2 text-sm leading-6 text-tblack">
                                    Need help? Our team responds through the
                                    contact page.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border bg-background/90 p-4 shadow-sm backdrop-blur">
                                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-tgray">
                                    One platform
                                </div>
                                <p className="mt-2 text-sm leading-6 text-tblack">
                                    Access the same design system across every
                                    TILILA page.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm text-tgray">
                        Need assistance?{' '}
                        <a
                            href="mailto:contact@tilila.ma"
                            className="font-semibold text-tblack transition-colors hover:text-beta-blue"
                        >
                            contact@tilila.ma
                        </a>
                    </div>
                </div>

                <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 xl:px-12">
                    <div className="w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8 lg:max-w-xl lg:p-10">
                        <div className="mb-8 flex flex-col items-center gap-4 text-center lg:hidden">
                            <Link href={home()} className="inline-flex items-center">
                                <img
                                    src="/assets/logo.webp"
                                    alt="Tilila"
                                    className="h-11 w-auto object-contain"
                                    loading="eager"
                                    decoding="async"
                                />
                            </Link>

                            <div className="space-y-2">
                                <h1 className="text-2xl font-semibold tracking-tight text-tblack">
                                    {title}
                                </h1>
                                <p className="max-w-sm text-sm leading-6 text-tgray">
                                    {description}
                                </p>
                            </div>
                        </div>

                        <div className="hidden space-y-2 border-b border-border pb-6 lg:block">
                            <div className="text-xs font-semibold tracking-[0.35em] text-tgray">
                                AUTHENTICATION
                            </div>
                            <h2 className="text-2xl font-semibold tracking-tight text-tblack">
                                {title}
                            </h2>
                            <p className="max-w-lg text-sm leading-6 text-tgray">
                                {description}
                            </p>
                        </div>

                        <div className="pt-2 lg:pt-8">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
