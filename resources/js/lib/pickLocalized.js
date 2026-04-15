/**
 * Resolves copy for the active locale from either a plain string or an { en, fr, ar } bundle.
 */
export function pickLocalized(value, locale) {
    if (value == null) {
        return '';
    }

    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'object') {
        if (locale === 'ar') {
            return value.ar ?? value.fr ?? value.en ?? '';
        }

        if (locale === 'fr') {
            return value.fr ?? value.en ?? '';
        }

        return value.en ?? '';
    }

    return String(value);
}

/** Short helper for defining triplets inline in data files. */
export function T(en, fr, ar) {
    return { en, fr, ar };
}
