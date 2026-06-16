import { useEffect, useState } from 'react';
import { getYoutubeEmbedUrl } from '@/lib/youtubeEmbed';

function youtubeOembedUrl(raw) {
    const trimmed = typeof raw === 'string' ? raw.trim() : '';
    if (!trimmed) return null;

    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
        return `https://www.youtube.com/oembed?url=${encodeURIComponent(trimmed)}&format=json`;
    }

    const embed = getYoutubeEmbedUrl(trimmed);
    const id = embed?.match(/embed\/([^?]+)/)?.[1];
    if (!id) return null;

    const watchUrl = trimmed.includes('/live/')
        ? `https://www.youtube.com/live/${id}`
        : `https://www.youtube.com/watch?v=${id}`;

    return `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;
}

/**
 * Verifies a YouTube URL is embeddable via oEmbed before showing an iframe.
 * @param {string|null|undefined} videoUrl
 */
export function useYoutubeAvailability(videoUrl) {
    const [state, setState] = useState({
        loading: Boolean(videoUrl),
        available: false,
        embedUrl: null,
    });

    useEffect(() => {
        const trimmed = typeof videoUrl === 'string' ? videoUrl.trim() : '';

        if (!trimmed) {
            setState({ loading: false, available: false, embedUrl: null });
            return;
        }

        const embedUrl = getYoutubeEmbedUrl(trimmed);
        if (!embedUrl) {
            setState({ loading: false, available: false, embedUrl: null });
            return;
        }

        const oembedUrl = youtubeOembedUrl(trimmed);
        if (!oembedUrl) {
            setState({ loading: false, available: false, embedUrl: null });
            return;
        }

        let cancelled = false;
        setState({ loading: true, available: false, embedUrl: null });

        fetch(oembedUrl)
            .then((response) => {
                if (cancelled) return;
                if (response.ok) {
                    setState({
                        loading: false,
                        available: true,
                        embedUrl,
                    });
                    return;
                }
                setState({
                    loading: false,
                    available: false,
                    embedUrl: null,
                });
            })
            .catch(() => {
                if (!cancelled) {
                    setState({
                        loading: false,
                        available: false,
                        embedUrl: null,
                    });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [videoUrl]);

    return state;
}
