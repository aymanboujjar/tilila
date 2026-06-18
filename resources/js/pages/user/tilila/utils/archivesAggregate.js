import {
    buildArchiveEditions,
    extractAgency,
} from '@/pages/user/tilila/utils/archiveEditions';
import { storagePhotoSrc, textFor } from '@/pages/user/tilila/partials/EditionDetailContent';

function parseCampaignFromLine(line, locale = 'fr') {
    const text = line?.[locale] || line?.fr || line?.en || '';
    const campaignMatch = text.match(
        /Campagne\s*«\s*([^»]+)\s*»|Campaign\s*«\s*([^»]+)\s*»/i,
    );

    return (campaignMatch?.[1] || campaignMatch?.[2] || '').trim() || null;
}

function parseCampaignFromWinner(winner, locale) {
    const bio = textFor(winner?.bio, locale);
    const name = winner?.full_name || '';
    const campaignMatch = bio.match(/Campagne\s*:\s*(.+)/i)
        || bio.match(/Campaign:\s*(.+)/i);

    if (campaignMatch) {
        return campaignMatch[1].trim();
    }

    return name || null;
}

function uniqueStrings(values) {
    return [...new Set(values.filter(Boolean))];
}

/** @param {ReturnType<typeof buildArchiveEditions>} editions */
export function buildArchivesSections(editions, locale = 'fr') {
    const laureats = [];
    const campagnes = [];
    const marques = [];
    const agences = [];
    const jurys = [];
    const photos = [];
    const videos = [];

    for (const edition of editions) {
        const editionLabel = textFor(edition.edition_label, locale);
        const base = {
            year: edition.year,
            editionLabel,
            detailsUrl: edition.details_url,
        };

        if (edition.winners?.length) {
            for (const winner of edition.winners) {
                laureats.push({
                    ...base,
                    trophy: textFor(winner.trophy, locale),
                    name: winner.full_name,
                    detail: textFor(winner.bio, locale),
                });

                if (winner.full_name) {
                    marques.push({ ...base, name: winner.full_name });
                }

                const agency = extractAgency(winner.bio, locale);
                if (agency) {
                    agences.push({ ...base, name: agency });
                }

                const campaign = parseCampaignFromWinner(winner, locale);
                if (campaign) {
                    campagnes.push({ ...base, name: campaign });
                }
            }
        }

        if (edition.history_lines?.length) {
            for (const line of edition.history_lines) {
                laureats.push({
                    ...base,
                    trophy: null,
                    name: null,
                    detail: textFor(line, locale),
                });

                const campaign = parseCampaignFromLine(line, locale);
                if (campaign) {
                    campagnes.push({ ...base, name: campaign });
                }

                const text = textFor(line, locale);
                const brandMatch = text.match(
                    /—\s*([^—]+?)(?:\s*—\s*Campagne|\s*—\s*Agence|\s*—\s*Agency|$)/i,
                );
                if (brandMatch?.[1]) {
                    const brand = brandMatch[1]
                        .replace(/^(\d+(?:er|e|ème)?\s*prix[^—]*—\s*)/i, '')
                        .trim();
                    if (brand) {
                        marques.push({ ...base, name: brand });
                    }
                }

                const agencyMatch = text.match(
                    /Agence\s*:\s*([^.—]+)|Agency:\s*([^.—]+)/i,
                );
                const agency = (agencyMatch?.[1] || agencyMatch?.[2] || '').trim();
                if (agency) {
                    agences.push({ ...base, name: agency });
                }
            }
        }

        if (edition.jury?.length) {
            for (const member of edition.jury) {
                jurys.push({
                    ...base,
                    name: member.full_name,
                    role: textFor(member.bio, locale),
                    photo_path: member.photo_path ?? null,
                });
            }
        }

        if (edition.gallery_images?.length) {
            for (const path of edition.gallery_images) {
                photos.push({
                    ...base,
                    src: storagePhotoSrc(path),
                });
            }
        }

        if (edition.ceremony_video_url) {
            videos.push({
                ...base,
                videoUrl: edition.ceremony_video_url,
            });
        }
    }

    const dedupeByYearName = (rows) => {
        const seen = new Set();

        return rows.filter((row) => {
            const key = `${row.year}-${row.name || row.detail || row.src}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    };

    return {
        laureats,
        campagnes: dedupeByYearName(campagnes),
        marques: dedupeByYearName(marques),
        agences: dedupeByYearName(agences),
        jurys,
        photos,
        videos,
    };
}
