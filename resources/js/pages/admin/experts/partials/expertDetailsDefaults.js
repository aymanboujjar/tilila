export function emptyTri() {
    return { en: '', fr: '', ar: '' };
}

/** Default `details` JSON for the public expert profile page. */
export function emptyDetails() {
    return {
        headlineTags: [],
        bio: [],
        quote: emptyTri(),
        expertise: [],
        journey: [],
        appearances: [],
        articles: [],
    };
}

/**
 * Merge stored details with defaults so the admin form always has every key.
 *
 * @param {unknown} raw
 */
export function normalizeDetails(raw) {
    const e = emptyDetails();
    if (!raw || typeof raw !== 'object') {
        return e;
    }
    const d = /** @type {Record<string, unknown>} */ (raw);
    return {
        headlineTags: Array.isArray(d.headlineTags) ? d.headlineTags : e.headlineTags,
        bio: Array.isArray(d.bio) ? d.bio : e.bio,
        quote:
            d.quote && typeof d.quote === 'object'
                ? { ...e.quote, ...d.quote }
                : e.quote,
        expertise: Array.isArray(d.expertise) ? d.expertise : e.expertise,
        journey: Array.isArray(d.journey) ? d.journey : e.journey,
        appearances: Array.isArray(d.appearances) ? d.appearances : e.appearances,
        articles: Array.isArray(d.articles) ? d.articles : e.articles,
    };
}
