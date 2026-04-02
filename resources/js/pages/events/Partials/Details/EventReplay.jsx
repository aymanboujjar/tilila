import React from 'react';

export default function EventReplay({ title, videoTitle, durationLabel }) {
    return (
        <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-foreground">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-alpha-blue text-beta-blue ring-1 ring-border">
                    ▶
                </span>
                {title}
            </div>

            <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
                <div className="relative aspect-video bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-tr from-tblack/25 via-transparent to-transparent" />
                    <button
                        type="button"
                        className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-tblack shadow-sm ring-1 ring-border hover:bg-white"
                        aria-label="Play replay"
                    >
                        ▶
                    </button>
                    <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center rounded-full bg-tblack/75 px-2.5 py-1 text-[11px] font-semibold text-white">
                            LIVE REPLAY
                        </span>
                    </div>
                    <div className="absolute bottom-3 right-3 text-[11px] font-semibold text-white/90">
                        {durationLabel}
                    </div>
                </div>
                <div className="px-5 py-4">
                    <div className="text-sm font-extrabold text-foreground">
                        {videoTitle ?? 'Replay'}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                        Click play to watch the session replay.
                    </div>
                </div>
            </div>
        </div>
    );
}

