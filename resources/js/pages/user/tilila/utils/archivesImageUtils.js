/** Whether the image is a small logo / winner portrait (needs object-contain). */
export function isLogoLikeArchiveImage(src, brandPhoto) {
    if (!src) {
        return false;
    }

    if (brandPhoto && src === brandPhoto) {
        return true;
    }

    return /\/winners\//.test(src) && !/\/showcase\//.test(src);
}

export function isTrophyFallback(src) {
    return /trophee-tilila|tililab-logo/i.test(src || '');
}

export function archiveImageFitClass({ isLogo = false, isTrophy = false } = {}) {
    if (isLogo || isTrophy) {
        return 'object-contain object-center p-4 sm:p-6';
    }

    return 'object-cover object-top';
}
