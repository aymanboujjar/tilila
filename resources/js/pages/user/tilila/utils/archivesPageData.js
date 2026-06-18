import { buildArchivesSections } from '@/pages/user/tilila/utils/archivesAggregate';
import { textFor } from '@/pages/user/tilila/partials/EditionDetailContent';

export const ARCHIVE_STAT_KEYS = [
    'laureats',
    'campagnes',
    'marques',
    'agences',
    'jurys',
    'photos',
    'videos',
];

export function computeEditionStats(edition, locale = 'fr') {
    const sections = buildArchivesSections([edition], locale);

    return {
        laureats: sections.laureats.length,
        campagnes: sections.campagnes.length,
        marques: sections.marques.length,
        agences: sections.agences.length,
        jurys: sections.jurys.length,
        photos: sections.photos.length,
        videos: sections.videos.length,
    };
}

export function computeGlobalStats(editions, locale = 'fr') {
    const sections = buildArchivesSections(editions, locale);

    return {
        laureats: sections.laureats.length,
        campagnes: sections.campagnes.length,
        marques: sections.marques.length,
        agences: sections.agences.length,
        jurys: sections.jurys.length,
        photos: sections.photos.length,
        videos: sections.videos.length,
        editions: editions.length,
    };
}

export function enrichArchiveEdition(edition, locale = 'fr') {
    return {
        ...edition,
        label: textFor(edition.edition_label, locale),
        theme: textFor(edition.theme, locale),
        ceremony: textFor(edition.ceremony, locale),
        stats: computeEditionStats(edition, locale),
    };
}

export function editionSearchBlob(edition, locale = 'fr') {
    const parts = [
        edition.year,
        textFor(edition.edition_label, locale),
        textFor(edition.theme, locale),
        textFor(edition.ceremony, locale),
        ...(edition.winners?.map((w) => w.full_name) ?? []),
        ...(edition.jury?.map((j) => j.full_name) ?? []),
        ...(edition.history_lines?.map((l) => textFor(l, locale)) ?? []),
    ];

    return parts.filter(Boolean).join(' ').toLowerCase();
}

export function filterAndSortEditions(
    editions,
    { query = '', year = 'all', sort = 'newest' },
    locale = 'fr',
) {
    const normalizedQuery = query.trim().toLowerCase();

    let rows = editions.filter((edition) => {
        if (year !== 'all' && String(edition.year) !== String(year)) {
            return false;
        }
        if (!normalizedQuery) return true;
        return editionSearchBlob(edition, locale).includes(normalizedQuery);
    });

    rows = [...rows].sort((a, b) => {
        const diff = Number(b.year) - Number(a.year);
        return sort === 'oldest' ? -diff : diff;
    });

    return rows;
}
