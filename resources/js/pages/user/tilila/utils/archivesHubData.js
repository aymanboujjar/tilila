import {
    storagePhotoSrc,
    textFor,
} from '@/pages/user/tilila/partials/EditionDetailContent';
import {
    extractAgency,
    editionWinnerRows,
} from '@/pages/user/tilila/utils/archiveEditions';
import { buildArchivesSections } from '@/pages/user/tilila/utils/archivesAggregate';
import { normalizeEdition as normalizeTililabEdition } from '@/pages/user/tililab/utils/editions';

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

export function buildLaureatCards(editions, year, locale, program = 'tilila') {
    const pool = editionsForYear(editions, year);
    const cards = [];

    for (const edition of pool) {
        const rows = editionWinnerRows(edition, locale);

        for (const [index, row] of rows.entries()) {
            const agencyMatch = row.detail?.match(
                /Agence\s*:\s*(.+)|Agency:\s*(.+)/i,
            );
            const agency =
                extractAgency(
                    { [locale]: row.detail, fr: row.detail, en: row.detail },
                    locale,
                ) ||
                agencyMatch?.[1]?.trim() ||
                agencyMatch?.[2]?.trim() ||
                '';

            cards.push({
                id: `${edition.id}-laureat-${index}`,
                trophy: row.trophy || row.detail?.split('—')[0]?.trim() || '',
                name:
                    row.name ||
                    row.detail?.split('—')[1]?.trim() ||
                    row.detail ||
                    '',
                agency,
                photoSrc: row.photo
                    ? storagePhotoSrc(row.photo)
                    : edition.cover_image_src ||
                      (program === 'tililab'
                          ? '/assets/tililab/tililab-logo.png'
                          : '/assets/tilila/trophee-tilila.png'),
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
                src: storagePhotoSrc(path),
                year: edition.year,
                detailsUrl: `${edition.details_url}#gallery`,
            });
        }

        if (edition.ceremony_video_url) {
            const thumb =
                edition.cover_image_src || '/assets/tilila/trophee-tilila.png';
            items.push({
                id: `${edition.id}-video`,
                type: 'video',
                videoUrl: edition.ceremony_video_url,
                src: thumb,
                year: edition.year,
                detailsUrl: `${edition.details_url}#edition-hero`,
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
