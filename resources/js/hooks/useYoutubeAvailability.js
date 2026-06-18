import { useEffect, useState } from 'react';
import { getYoutubeEmbedUrl } from '@/lib/youtubeEmbed';

function youtubeOembedUrl(raw) {
    const trimmed = typeof raw === 'string' ? raw.trim() : '';

    if (!trimmed) {
        return null;
    }

    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
        return `https://www.youtube.com/oembed?url=${encodeURIComponent(trimmed)}&format=json`;
    }

    const embed = getYoutubeEmbedUrl(trimmed);
    const id = embed?.match(/embed\/([^?]+)/)?.[1];

    if (!id) {
        return null;
    }

    const watchUrl = trimmed.includes('/live/')
        ? `https://www.youtube.com/live/${id}`
        : `https://www.youtube.com/watch?v=${id}`;

    return `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;
}

const UNAVAILABLE = { loading: false, available: false, embedUrl: null };

/**
 * Verifies a YouTube URL is embeddable via oEmbed before showing an iframe.
 * @param {string|null|undefined} videoUrl
 */
export function useYoutubeAvailability(videoUrl) {
    const trimmed = typeof videoUrl === 'string' ? videoUrl.trim() : '';
    const embedUrl = trimmed ? getYoutubeEmbedUrl(trimmed) : null;
    const oembedUrl = trimmed ? youtubeOembedUrl(trimmed) : null;
    const shouldFetch = Boolean(trimmed && embedUrl && oembedUrl);

    const [result, setResult] = useState(null);
    const [verifiedFor, setVerifiedFor] = useState(null);

    useEffect(() => {
        if (!shouldFetch) {
            return undefined;
        }

        let cancelled = false;

        fetch(oembedUrl)
            .then((response) => {
                if (cancelled) {
                    return;
                }

                setResult(
                    response.ok
                        ? { available: true, embedUrl }
                        : { available: false, embedUrl: null },
                );
                setVerifiedFor(trimmed);
            })
            .catch(() => {
                if (!cancelled) {
                    setResult({ available: false, embedUrl: null });
                    setVerifiedFor(trimmed);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [shouldFetch, oembedUrl, embedUrl, trimmed]);

    if (!shouldFetch) {
        return UNAVAILABLE;
    }

    if (verifiedFor !== trimmed || result === null) {
        return { loading: true, available: false, embedUrl: null };
    }

    return {
        loading: false,
        available: result.available,
        embedUrl: result.available ? result.embedUrl : null,
    };
}
