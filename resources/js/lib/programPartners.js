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

function partnerBelongsToProgram(partner, program) {
    return partner.program === program || partner.program === 'both';
}

function comparePartners(a, b) {
    return (a.sort ?? 0) - (b.sort ?? 0) || (a.id ?? 0) - (b.id ?? 0);
}

/** Published partners for a single program, preserving sort order. */
export function partnersForProgram(partners, program) {
    return (partners ?? [])
        .filter((partner) => partnerBelongsToProgram(partner, program))
        .sort(comparePartners);
}

export function partnersInGroupForProgram(partners, group, program) {
    return partnersForProgram(partners, program).filter((partner) =>
        partnerGroups(partner).includes(group),
    );
}

/** Institutional and media partner lists for Tilila Awards or Tililab. */
export function groupedProgramPartners(partners, program) {
    return {
        institutional: partnersInGroupForProgram(
            partners,
            'institutional',
            program,
        ),
        media: partnersInGroupForProgram(partners, 'media', program),
    };
}

/** Unique media partners for the home page (Tilila order, then Tililab-only logos). */
export function combinedHomeMediaPartners(partners) {
    const tilila = partnersInGroupForProgram(partners, 'media', 'tilila');
    const tililab = partnersInGroupForProgram(partners, 'media', 'tililab');
    const seen = new Set();

    return [...tilila, ...tililab].filter((partner) => {
        const key = partnerKey(partner);

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);

        return true;
    });
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

export function allPartnersCarousel(partners) {
    return dedupePartners(partners, ['institutional', 'media']);
}

/** Deduplicated partner strip for footer / preview sections. */
export function partnerStrip(partners) {
    return dedupePartners(partners, ['institutional', 'media']);
}

/** Grid of unique partners for bottom-of-page previews. */
export function partnersPreviewGrid(partners, program = 'tilila') {
    const scoped = partnersForProgram(partners, program);

    return dedupePartners(scoped, ['institutional', 'media']);
}
