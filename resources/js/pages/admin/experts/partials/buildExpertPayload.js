/**
 * Maps admin form state (comma-separated lists) to API payload.
 *
 * @param {Record<string, unknown>} data
 * @returns {Record<string, unknown>}
 */
export function buildExpertPayload(data) {
    const { industriesStr, languagesStr, ...rest } = data;

    return {
        slug: typeof rest.slug === 'string' ? rest.slug.trim() : rest.slug,
        name: rest.name,
        title: rest.title,
        location: rest.location,
        country: rest.country,
        industries: String(industriesStr ?? '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        languages: String(languagesStr ?? '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        gradient: rest.gradient,
        badge:
            typeof rest.badge === 'string' && rest.badge.trim() !== ''
                ? rest.badge.trim()
                : null,
        status: rest.status,
        email:
            typeof rest.email === 'string' && rest.email.trim() !== ''
                ? rest.email.trim()
                : null,
        avatar:
            typeof rest.avatar === 'string' && rest.avatar.trim() !== ''
                ? rest.avatar.trim()
                : null,
        details: rest.details ?? {},
    };
}
