import { TILILA_EDITIONS_HISTORY } from '@/pages/user/tilila/data/tilila-editions-history';
import {
    coverImageSrc,
    normalizeEdition,
} from '@/pages/user/tilila/utils/editions';
import { resolveWinnerDisplay } from '@/pages/user/tilila/utils/winnerFields';

function parseLineToWinner(line) {
    const text = line?.fr || line?.en || '';
    const trophyMatch =
        text.match(/^([^—]+)—\s*(.+?)(?:\s*—\s*Agence\s*:\s*(.+))?$/i) ||
        text.match(/^([^—]+)—\s*(.+)$/);

    if (!trophyMatch) {
        return {
            full_name: text,
            trophy: line,
            bio: { en: '', fr: '', ar: '' },
        };
    }

    const [, trophyPart, brandPart, agencyPart] = trophyMatch;

    return {
        full_name: (brandPart || trophyPart || '').trim(),
        trophy: {
            en: (trophyPart || '').trim(),
            fr: (trophyPart || '').trim(),
            ar: line?.ar || (trophyPart || '').trim(),
        },
        campaign: agencyPart
            ? {
                  en: (brandPart || '').trim(),
                  fr: (brandPart || '').trim(),
                  ar: (brandPart || '').trim(),
              }
            : { en: '', fr: '', ar: '' },
        agency: agencyPart
            ? {
                  en: agencyPart.trim(),
                  fr: agencyPart.trim(),
                  ar: agencyPart.trim(),
              }
            : { en: '', fr: '', ar: '' },
        bio: { en: '', fr: '', ar: '' },
    };
}

function historyJuryToPeople(jury = []) {
    return jury.map((member) => ({
        full_name:
            typeof member === 'string'
                ? member
                : member?.fr || member?.en || '',
        bio:
            typeof member === 'object' && member !== null
                ? {
                      en: member.en || '',
                      fr: member.fr || '',
                      ar: member.ar || '',
                  }
                : { en: '', fr: '', ar: '' },
        photo_path: null,
    }));
}

function historyToArchiveEdition(entry) {
    const year = String(entry.year);
    const lines = Array.isArray(entry.lines) ? entry.lines : [];
    const winners = lines.map(parseLineToWinner);

    return {
        id: `hist-${year}`,
        year,
        edition_label: entry.title,
        theme: entry.focus ?? { en: '', fr: '', ar: '' },
        ceremony: entry.ceremony ?? null,
        cover_image_src: entry.posterSrc || '/assets/tilila/trophee-tilila.png',
        winners,
        jury: historyJuryToPeople(entry.jury),
        gallery_images: [],
        has_gallery: false,
        ceremony_video_url: null,
        ceremony_video_path: null,
        is_history: true,
        is_current: false,
        details_url: `/tilila/archives/editions/${year}`,
        winners_url: `/tilila/archives/editions/${year}#winners`,
        jury_url: `/tilila/archives/editions/${year}#jury`,
        gallery_url: `/tilila/archives/editions/${year}#gallery`,
        has_db_page: false,
        history_lines: lines,
    };
}

function apiToArchiveEdition(raw) {
    const base = normalizeEdition(raw);

    if (!base) {
        return null;
    }

    const galleryImages = Array.isArray(raw.gallery_images)
        ? raw.gallery_images
        : [];
    const hasDbPage = raw.id && !String(raw.id).startsWith('hist-');

    return {
        ...base,
        cover_image_src:
            base.cover_image_src ||
            coverImageSrc(raw.cover_image_path, galleryImages) ||
            '/assets/tilila/trophee-tilila.png',
        winners: Array.isArray(raw.winners) ? raw.winners : [],
        jury: Array.isArray(raw.jury) ? raw.jury : [],
        gallery_images: galleryImages,
        ceremony_video_url: raw.ceremony_video_url ?? null,
        ceremony_video_path: raw.ceremony_video_path ?? null,
        ceremony: null,
        is_history: false,
        is_current: Boolean(raw.is_current),
        has_db_page: hasDbPage,
        details_url: hasDbPage
            ? `/tilila/editions/${raw.id}`
            : `/tilila/archives/editions/${base.year}`,
        winners_url: hasDbPage
            ? `/tilila/editions/${raw.id}#winners`
            : `/tilila/archives/editions/${base.year}#winners`,
        jury_url: hasDbPage
            ? `/tilila/editions/${raw.id}#jury`
            : `/tilila/archives/editions/${base.year}#jury`,
        gallery_url: hasDbPage
            ? `/tilila/editions/${raw.id}#gallery`
            : `/tilila/archives/editions/${base.year}#gallery`,
    };
}

export function buildArchiveEditions(apiEditions = []) {
    const fromApi = (Array.isArray(apiEditions) ? apiEditions : [])
        .filter((e) => !e?.is_current)
        .map(apiToArchiveEdition)
        .filter(Boolean);

    const apiYears = new Set(fromApi.map((e) => e.year));

    const fromHistory = TILILA_EDITIONS_HISTORY.filter(
        (h) => !apiYears.has(String(h.year)),
    ).map(historyToArchiveEdition);

    return [...fromApi, ...fromHistory].sort(
        (a, b) => Number(b.year) - Number(a.year),
    );
}

/** Default year filter: most recent edition, or `all` when none exist. */
export function latestArchiveYear(editions = []) {
    const year = editions[0]?.year;

    return year ?? 'all';
}

export function extractAgency(bio, locale = 'fr') {
    const text = bio?.[locale] || bio?.fr || bio?.en || '';
    const match =
        text.match(/Agence\s*:\s*(.+)/i) ||
        text.match(/Agency:\s*(.+)/i) ||
        text.match(/الوكالة:\s*(.+)/);

    return match ? match[1].trim().replace(/\.$/, '') : null;
}

export function findArchiveEdition(apiEditions = [], year) {
    const target = String(year ?? '');

    return (
        buildArchiveEditions(apiEditions).find((e) => e.year === target) ?? null
    );
}

/** Normalized winner rows for display (DB winners or history lines). */
export function editionWinnerRows(edition, locale = 'fr') {
    if (!edition) {
        return [];
    }

    const text = (obj) => obj?.[locale] || obj?.fr || obj?.en || obj?.ar || '';

    if (edition.winners?.length) {
        return edition.winners.map((winner) => {
            const { campaign, agency } = resolveWinnerDisplay(winner);

            return {
                trophy: text(winner.trophy),
                name: winner.full_name || '',
                detail: text(campaign),
                agency: text(agency),
                photo: winner.photo_path || null,
            };
        });
    }

    if (edition.history_lines?.length) {
        return edition.history_lines.map((line) => ({
            trophy: null,
            name: null,
            detail: text(line),
            photo: null,
        }));
    }

    return [];
}
