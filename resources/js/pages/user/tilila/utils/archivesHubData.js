import { textFor } from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    extractAgency,
    editionWinnerRows,
} from '@/pages/user/tilila/utils/archiveEditions';
import { buildArchivesSections } from '@/pages/user/tilila/utils/archivesAggregate';
import {
    isLogoLikeArchiveImage,
    isTrophyFallback,
} from '@/pages/user/tilila/utils/archivesImageUtils';
import {
    resolveShowcaseImage,
    resolveWinnerDisplay,
    storageAssetSrc,
} from '@/pages/user/tilila/utils/winnerFields';
import { normalizeEdition as normalizeTililabEdition } from '@/pages/user/tililab/utils/editions';

const FALLBACK_TILILA = '/assets/tilila/trophee-tilila.png';
const FALLBACK_TILILAB = '/assets/tililab/tililab-logo.png';

export function buildTililabArchiveEditions(rawEditions = []) {
    return (Array.isArray(rawEditions) ? rawEditions : [])
        .filter((e) => !e?.is_current)
        .map((raw) => {
            const base = normalizeTililabEdition(raw);

            if (!base) {
                return null;
            }

            return {
                ...base,
                winners: Array.isArray(raw.winners) ? raw.winners : [],
                jury: Array.isArray(raw.jury) ? raw.jury : [],
                gallery_images: Array.isArray(raw.gallery_images)
                    ? raw.gallery_images
                    : [],
                ceremony_video_url: raw.ceremony_video_url ?? null,
                ceremony_video_path: raw.ceremony_video_path ?? null,
                details_url: base.details_url,
            };
        })
        .filter(Boolean)
        .sort((a, b) => Number(b.year) - Number(a.year));
}

function editionsForYear(editions, year) {
    if (year === 'all') {
        return editions;
    }

    return editions.filter((e) => String(e.year) === String(year));
}

function primaryEdition(editions, year) {
    const pool = editionsForYear(editions, year);

    return pool[0] ?? null;
}

function fallbackForProgram(program) {
    return program === 'tililab' ? FALLBACK_TILILAB : FALLBACK_TILILA;
}

function laureatePhotoMeta(winner, edition, program) {
    const fallback = fallbackForProgram(program);
    const brandPhoto = winner
        ? storageAssetSrc(winner.photo_path)
        : '';
    const showcase = winner
        ? resolveShowcaseImage(winner, edition, fallback)
        : edition.cover_image_src || fallback;
    const photoSrc = brandPhoto || showcase || fallback;
    const isLogo = isLogoLikeArchiveImage(photoSrc, brandPhoto);
    const isTrophy = isTrophyFallback(photoSrc);

    return { photoSrc, isLogo, isTrophy };
}

export function buildLaureatCards(editions, year, locale, program = 'tilila') {
    const pool = editionsForYear(editions, year);
    const cards = [];

    for (const edition of pool) {
        if (edition.winners?.length) {
            for (const [index, winner] of edition.winners.entries()) {
                const { campaign, agency } = resolveWinnerDisplay(winner);
                const { photoSrc, isLogo, isTrophy } = laureatePhotoMeta(
                    winner,
                    edition,
                    program,
                );

                cards.push({
                    id: `${edition.id}-laureat-${index}`,
                    trophy: textFor(winner.trophy, locale),
                    name: winner.full_name || '',
                    agency: textFor(agency, locale),
                    photoSrc,
                    isLogo,
                    isTrophy,
                    detailsUrl: `${edition.details_url}#winners`,
                    year: edition.year,
                });
            }

            continue;
        }

        const rows = editionWinnerRows(edition, locale);

        for (const [index, row] of rows.entries()) {
            const agencyMatch = row.detail?.match(
                /Agence\s*:\s*(.+)|Agency:\s*(.+)/i,
            );
            const agency =
                row.agency ||
                extractAgency(
                    { [locale]: row.detail, fr: row.detail, en: row.detail },
                    locale,
                ) ||
                agencyMatch?.[1]?.trim() ||
                agencyMatch?.[2]?.trim() ||
                '';

            const photoSrc =
                (row.photo ? storageAssetSrc(row.photo) : '') ||
                edition.cover_image_src ||
                fallbackForProgram(program);
            const isTrophy = isTrophyFallback(photoSrc);

            cards.push({
                id: `${edition.id}-laureat-${index}`,
                trophy: row.trophy || row.detail?.split('—')[0]?.trim() || '',
                name:
                    row.name ||
                    row.detail?.split('—')[1]?.trim() ||
                    row.detail ||
                    '',
                agency,
                photoSrc,
                isLogo: false,
                isTrophy,
                detailsUrl: `${edition.details_url}#winners`,
                year: edition.year,
            });
        }
    }

    return cards;
}

export function buildGalleryItems(editions, year) {
    const pool = editionsForYear(editions, year);
    const items = [];

    for (const edition of pool) {
        for (const path of edition.gallery_images ?? []) {
            items.push({
                id: `${edition.id}-photo-${path}`,
                type: 'photo',
                src: storageAssetSrc(path),
                year: edition.year,
                detailsUrl: `${edition.details_url}#gallery`,
            });
        }

        if (edition.ceremony_video_url) {
            const thumb =
                edition.cover_image_src || FALLBACK_TILILA;
            items.push({
                id: `${edition.id}-video`,
                type: 'video',
                videoUrl: edition.ceremony_video_url,
                src: thumb,
                year: edition.year,
                detailsUrl: `${edition.details_url}#video`,
            });
        }
    }

    return items;
}

export function filterGalleryItems(items, filter) {
    if (filter === 'photos') {
        return items.filter((i) => i.type === 'photo');
    }

    if (filter === 'videos') {
        return items.filter((i) => i.type === 'video');
    }

    return items;
}

export function buildCategorySections(editions, year, locale) {
    const pool = editionsForYear(editions, year);

    return buildArchivesSections(pool, locale);
}

export function hubEditionCta(editions, year) {
    const edition = primaryEdition(editions, year);

    return edition?.details_url ?? '/tilila/archives';
}

export function hubEditionLabel(editions, year, locale) {
    const edition = primaryEdition(editions, year);

    return edition ? textFor(edition.edition_label, locale) : '';
}
