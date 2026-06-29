import { Play } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import TransText from '@/components/TransText';
import { useYoutubeAvailability } from '@/hooks/useYoutubeAvailability';
import { withYoutubeAutoplay } from '@/lib/youtubeEmbed';

function VideoCoverPlay({ posterSrc, onPlay, brand }) {
    return (
        <button
            type="button"
            onClick={onPlay}
            className="group relative block h-full w-full overflow-hidden bg-[#0a1028]"
            aria-label={
                brand ? `Play ${brand} project video` : 'Play winner video'
            }
        >
            {posterSrc ? (
                <img
                    src={posterSrc}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                />
            ) : null}
            <span
                className="absolute inset-0 bg-gradient-to-t from-[#1a237e]/55 via-[#1a237e]/10 to-transparent"
                aria-hidden
            />
            <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-twhite/95 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition group-hover:scale-105 sm:size-14">
                    <Play
                        className="ms-0.5 size-5 fill-beta-blue sm:size-6"
                        aria-hidden
                    />
                </span>
            </span>
        </button>
    );
}

const WinnerPosterVideo = memo(function WinnerPosterVideo({
    uploadSrc,
    youtubeUrl,
    brand,
    posterSrc = '',
}) {
    const [started, setStarted] = useState(false);
    const videoRef = useRef(null);
    const youtube = useYoutubeAvailability(youtubeUrl);
    const embedUrl = youtube.available ? youtube.embedUrl : null;

    useEffect(() => {
        if (!started || !uploadSrc || !videoRef.current) {
            return;
        }

        videoRef.current.play().catch(() => {});
    }, [started, uploadSrc]);

    if (uploadSrc) {
        if (!started) {
            return (
                <VideoCoverPlay
                    posterSrc={posterSrc}
                    brand={brand}
                    onPlay={() => setStarted(true)}
                />
            );
        }

        return (
            <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                controls
                playsInline
                preload="auto"
                autoPlay
                title={brand ? `${brand} — project video` : 'Winner video'}
            >
                <source src={uploadSrc} />
            </video>
        );
    }

    if (embedUrl) {
        if (!started) {
            return (
                <VideoCoverPlay
                    posterSrc={posterSrc}
                    brand={brand}
                    onPlay={() => setStarted(true)}
                />
            );
        }

        return (
            <iframe
                title={brand ? `${brand} — project video` : 'Winner video'}
                src={withYoutubeAutoplay(embedUrl) ?? embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        );
    }

    if (youtubeUrl) {
        return (
            <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="relative flex h-full w-full items-center justify-center bg-[#0a1028]"
            >
                {posterSrc ? (
                    <img
                        src={posterSrc}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-70"
                        loading="lazy"
                    />
                ) : null}
                <span className="relative z-10 flex flex-col items-center gap-3 text-xs font-bold tracking-wide text-twhite uppercase">
                    <span className="flex size-12 items-center justify-center rounded-full bg-twhite/95 shadow-lg sm:size-14">
                        <Play
                            className="ms-0.5 size-5 fill-beta-blue sm:size-6"
                            aria-hidden
                        />
                    </span>
                    <TransText
                        en="Watch video"
                        fr="Voir la vidéo"
                        ar="شاهد الفيديو"
                    />
                </span>
            </a>
        );
    }

    return (
        <div className="relative flex h-full w-full items-center justify-center bg-[#0a1028]">
            {posterSrc ? (
                <img
                    src={posterSrc}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                    loading="lazy"
                />
            ) : null}
            <p className="relative z-10 px-4 text-center text-xs text-twhite/80">
                <TransText
                    en="Winner video coming soon"
                    fr="Vidéo du lauréat bientôt disponible"
                    ar="فيديو الفائز قريباً"
                />
            </p>
        </div>
    );
});

export default WinnerPosterVideo;
