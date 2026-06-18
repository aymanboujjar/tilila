/** Filter partners returned from Inertia by display group. */
export function partnersInGroup(partners, group) {
    return (partners ?? []).filter((partner) =>
        partnerGroups(partner).includes(group),
    );
}

function partnerGroups(partner) {
    if (Array.isArray(partner?.groups) && partner.groups.length > 0) {
        return partner.groups;
    }

    return partner?.group ? [partner.group] : [];
}

function partnerKey(partner) {
    return partner.logo_path || partner.logo_url || partner.name;
}

/**
 * Filter by groups and keep one row per logo (first by sort order from the API).
 */
export function dedupePartners(partners, groups) {
    const seen = new Set();

    return (partners ?? [])
        .filter((partner) =>
            partnerGroups(partner).some((group) => groups.includes(group)),
        )
        .filter((partner) => {
            const key = partnerKey(partner);

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);

            return true;
        });
}

/** Deduplicated partner strip for footer / preview sections. */
export function partnerStrip(partners) {
    return dedupePartners(partners, [
        'featured',
        'institutional',
        'media',
        'strip',
    ]);
}

/** Grid of unique partners for bottom-of-page previews. */
export function partnersPreviewGrid(partners, program = 'tilila') {
    const groups =
        program === 'tililab'
            ? ['featured', 'institutional', 'program', 'media', 'strip']
            : ['featured', 'institutional', 'media', 'strip'];

    return dedupePartners(partners, groups);
}
