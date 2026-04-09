import React from 'react';

function Pill({ children }) {
    return (
        <span className="inline-flex items-center rounded-full bg-alpha-blue px-2.5 py-1 text-xs font-semibold text-beta-blue ring-1 ring-border">
            {children}
        </span>
    );
}

export default function EventHero({
    badge,
    dateLabel,
    locationLabel,
    title,
    subtitle,
    onRegister,
    imageSrc,
    showRegister = false,
}) {
    return (
        <header className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-tblack via-[#0f172a] to-[#0b1220] shadow-sm ring-1 ring-border">
            {imageSrc ? (
                <>
                    <img
                        src={imageSrc}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-[0.62]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-tblack/58 via-[#0f172a]/52 to-[#0b1220]/72" />
                </>
            ) : null}
            <div className="relative px-6 py-10 sm:px-10 sm:py-12">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    {badge ? <Pill>{badge}</Pill> : null}
                    <div className="font-semibold text-white/80">
                        {[dateLabel, locationLabel].filter(Boolean).join(' • ')}
                    </div>
                </div>

                <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    {title}
                </h1>
                {subtitle ? (
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80">
                        {subtitle}
                    </p>
                ) : null}

                {showRegister ? (
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={onRegister}
                            className="inline-flex items-center justify-center rounded-md bg-beta-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            Register to the event
                        </button>
                    </div>
                ) : null}
            </div>
        </header>
    );
}

