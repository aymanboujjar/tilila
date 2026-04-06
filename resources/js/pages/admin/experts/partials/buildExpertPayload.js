/**
 * Maps admin form state (comma-separated lists) to API payload.
 * Profile image is sent as `profile_image` (not `image`) so Laravel/PHP
 * do not confuse the upload with the `image` validation rule or DB column.
 * `remove_image` clears the stored image on edit.
 *
 * @param {Record<string, unknown>} data
 * @returns {Record<string, unknown>}
 */
export function buildExpertPayload(data) {
    const {
        industriesStr,
        languagesStr,
        remove_image,
        profile_image,
        ...rest
    } = data;

    const payload = {
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
        badge:
            typeof rest.badge === 'string' && rest.badge.trim() !== ''
                ? rest.badge.trim()
                : null,
        status: rest.status,
        email:
            typeof rest.email === 'string' && rest.email.trim() !== ''
                ? rest.email.trim()
                : null,
        details: rest.details ?? {},
    };

    if (
        profile_image instanceof File ||
        (profile_image instanceof Blob && profile_image.size > 0)
    ) {
        payload.profile_image = profile_image;
    }
    if (remove_image === true) {
        payload.remove_image = true;
    }

    return payload;
}
