import { buildArchivesSections } from '@/pages/user/tilila/utils/archivesAggregate';

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
