import React from 'react';

export default function EventReplay({
    title = 'Event Replay',
    videoTitle,
    durationLabel,
    embedUrl,
    mode = 'replay',
}) {
    const isLive = mode === 'live';
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
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            title={
                                videoTitle ??
                                (isLive ? 'Live stream' : 'Event replay')
                            }
                            className="h-full w-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-linear-to-tr from-tblack/25 via-transparent to-transparent" />
                            <button
                                type="button"
                                className="absolute top-1/2 left-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-tblack shadow-sm ring-1 ring-border hover:bg-white"
                                aria-label={
                                    isLive ? 'Play live stream' : 'Play replay'
                                }
                            >
                                ▶
                            </button>
                            <div className="absolute bottom-3 left-3">
                                <span className="inline-flex items-center rounded-full bg-tblack/75 px-2.5 py-1 text-[11px] font-semibold text-white">
                                    {isLive ? 'LIVE' : 'LIVE REPLAY'}
                                </span>
                            </div>
                            {durationLabel ? (
                                <div className="absolute right-3 bottom-3 text-[11px] font-semibold text-white/90">
                                    {durationLabel}
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
                <div className="px-5 py-4">
                    <div className="text-sm font-extrabold text-foreground">
                        {videoTitle ?? (isLive ? 'Live stream' : 'Replay')}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                        {embedUrl
                            ? isLive
                                ? 'The event is live — watch above.'
                                : 'Watch the session replay above.'
                            : isLive
                              ? 'Open the player to watch the live stream.'
                              : 'Click play to watch the session replay.'}
                    </div>
                </div>
            </div>
        </div>
    );
}
