import { extractAgency } from '@/pages/user/tilila/utils/archiveEditions';

function emptyTriple() {
    return { en: '', fr: '', ar: '' };
}

function parseCampaignFromBio(bio, locale = 'fr') {
    const text = bio?.[locale] || bio?.fr || bio?.en || '';
    const match =
        text.match(/Campagne\s*«\s*([^»]+)\s*»/i) ||
        text.match(/Campaign\s*«\s*([^»]+)\s*»/i) ||
        text.match(/حملة\s*«\s*([^»]+)\s*»/);

    if (!match) {
        return emptyTriple();
    }

    const title = `« ${match[1].trim()} »`;

    return { en: title, fr: title, ar: title };
}

function agencyFromBio(bio) {
    const locales = ['fr', 'en', 'ar'];
    const names = locales
        .map((locale) => extractAgency(bio, locale))
        .filter(Boolean);

    if (!names.length) {
        return emptyTriple();
    }

    const name = names[0];

    return {
        en: extractAgency(bio, 'en') || name,
        fr: extractAgency(bio, 'fr') || name,
        ar: extractAgency(bio, 'ar') || name,
    };
}

export function storageAssetSrc(path) {
    if (!path || typeof path !== 'string') {
        return '';
    }

    if (
        path.startsWith('http://') ||
        path.startsWith('https://') ||
        path.startsWith('/')
    ) {
        return path;
    }

    if (path.startsWith('assets/')) {
        return `/${path}`;
    }

    return `/storage/${path}`;
}

/** Normalize campaign, agency name, and agency logo from winner JSON. */
export function resolveWinnerDisplay(winner) {
    const campaign =
        winner?.campaign?.en || winner?.campaign?.fr || winner?.campaign?.ar
            ? winner.campaign
            : parseCampaignFromBio(winner?.bio);

    const agency =
        winner?.agency?.en || winner?.agency?.fr || winner?.agency?.ar
            ? winner.agency
            : agencyFromBio(winner?.bio);

    return {
        campaign,
        agency,
        agencyPhoto: storageAssetSrc(winner?.agency_photo_path),
    };
}

export function agencyLabelText(agency, locale = 'fr') {
    return agency?.[locale] || agency?.fr || agency?.en || agency?.ar || '';
}

function trophyLabels(winner) {
    return [winner?.trophy?.en, winner?.trophy?.fr, winner?.trophy?.ar]
        .filter(Boolean)
        .map((value) => String(value).toLowerCase());
}

/** Whether this winner row is the Jury Prize (Prix du Jury). */
export function isJuryPrizeWinner(winner) {
    return trophyLabels(winner).some(
        (label) =>
            label.includes('jury prize') ||
            label.includes('prix du jury') ||
            label.includes('لجنة التحكيم'),
    );
}

/** First Jury Prize winner in an edition list, if any. */
export function findJuryPrizeWinner(winners) {
    if (!Array.isArray(winners)) {
        return null;
    }

    return winners.find(isJuryPrizeWinner) ?? null;
}

/** Image shown beside the Jury Prize laureate on the Tilila program page. */
export function resolveShowcaseImage(winner, edition, fallback = '') {
    if (winner?.showcase_image_path) {
        return storageAssetSrc(winner.showcase_image_path);
    }

    const gallery = Array.isArray(edition?.gallery_images)
        ? edition.gallery_images
        : [];

    if (gallery[0]) {
        return storageAssetSrc(gallery[0]);
    }

    if (edition?.cover_image_path) {
        return storageAssetSrc(edition.cover_image_path);
    }

    return fallback;
}
