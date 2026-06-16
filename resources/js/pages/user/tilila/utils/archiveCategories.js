import {
    Award,
    Briefcase,
    Building2,
    Camera,
    Gavel,
    Megaphone,
    Play,
} from 'lucide-react';

export const ARCHIVE_CATEGORY_ICONS = {
    laureats: Award,
    campagnes: Megaphone,
    marques: Building2,
    agences: Briefcase,
    jurys: Gavel,
    photos: Camera,
    videos: Play,
};

export function archiveCategoryLabel(category, locale) {
    return category[locale] || category.fr || category.en;
}

export function archiveCategoryDescription(category, locale) {
    return (
        category.description?.[locale] ||
        category.description?.fr ||
        category.description?.en ||
        ''
    );
}

export function groupArchiveItemsByYear(items) {
    const grouped = items.reduce((acc, item) => {
        if (!acc[item.year]) {
            acc[item.year] = { meta: item, items: [] };
        }
        acc[item.year].items.push(item);
        return acc;
    }, {});

    return Object.keys(grouped)
        .sort((a, b) => Number(b) - Number(a))
        .map((year) => ({
            year,
            meta: grouped[year].meta,
            items: grouped[year].items,
        }));
}
