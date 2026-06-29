function normalizePathPrefix(prefix) {
    if (!prefix) {
        return null;
    }

    return prefix.replace(/\/$/, '') || '/';
}

function pathMatchesPrefix(pathname, prefix) {
    const path = (pathname || '/').replace(/\/$/, '') || '/';
    const norm = normalizePathPrefix(prefix);

    if (!norm) {
        return false;
    }

    if (norm === '/') {
        return path === '/';
    }

    return path === norm || path.startsWith(`${norm}/`);
}

function getSlidesForPath(pathname, slides) {
    return (slides ?? []).filter((slide) =>
        pathMatchesPrefix(pathname, slide.pathPrefix),
    );
}

function getHomeSlides(slides) {
    return (slides ?? []).filter(
        (slide) => slide.pathPrefix === '/' || slide.alsoOnHome,
    );
}

function isHomeHeroPath(pathname) {
    const path = (pathname || '/').replace(/\/$/, '') || '/';

    return path === '/';
}

function shouldShowHeroCarousel(pathname, slides) {
    const path = pathname || '/';

    if (
        path.startsWith('/admin') ||
        path.startsWith('/expert/') ||
        path.startsWith('/settings')
    ) {
        return false;
    }

    if (/^\/events\/[^/]+/.test(path)) {
        return false;
    }

    if (/^\/media\/[^/]+/.test(path)) {
        return false;
    }

    if (/^\/opportunities\/[^/]+/.test(path)) {
        return false;
    }

    if (/^\/experts\/[^/]+/.test(path)) {
        return false;
    }

    if (path === '/tilila/participate' || path === '/tilila/reglement') {
        return false;
    }

    if (/^\/tilila\/editions\//.test(path)) {
        return false;
    }

    if (path === '/tililab/form') {
        return false;
    }

    if (path === '/' || path === '/tilila' || path === '/tililab') {
        return false;
    }

    if (path === '/about' || path.startsWith('/about/')) {
        return false;
    }

    if (
        path === '/tilila/archives' ||
        path.startsWith('/tilila/archives/editions/')
    ) {
        return false;
    }

    if (/^\/tililab\/editions\//.test(path)) {
        return false;
    }

    if (isHomeHeroPath(path)) {
        return getHomeSlides(slides).length > 0;
    }

    return getSlidesForPath(path, slides).length > 0;
}

export function normalizePublicPath(pathname) {
    if (!pathname) {
        return '/';
    }

    const base = String(pathname).split('?')[0].split('#')[0];

    if (base.length > 1 && base.endsWith('/')) {
        return base.slice(0, -1);
    }

    return base || '/';
}

const FULL_BLEED_HERO_PATHS = new Set([
    '/',
    '/tilila',
    '/tililab',
    '/contact',
    '/faq',
    '/actualites',
    '/tilila/archives',
]);

export function hasFullBleedHero(pathname) {
    const path = normalizePublicPath(pathname);

    if (FULL_BLEED_HERO_PATHS.has(path)) {
        return true;
    }

    return path.startsWith('/tilila/archives/editions/');
}

export function shouldUseTransparentHeader(pathname, heroSlides = []) {
    const path = normalizePublicPath(pathname);

    if (hasFullBleedHero(path)) {
        return true;
    }

    if (path === '/about' || path.startsWith('/about/')) {
        return false;
    }

    return shouldShowHeroCarousel(path, heroSlides);
}
