import tililaAr from './tilila/ar';
import tililaEn from './tilila/en';
import tililaFr from './tilila/fr';
import tililabAr from './tililab/ar';
import tililabEn from './tililab/en';
import tililabFr from './tililab/fr';

const tililaByLocale = { fr: tililaFr, en: tililaEn, ar: tililaAr };
const tililabByLocale = { fr: tililabFr, en: tililabEn, ar: tililabAr };

export function getTililaReglement(locale = 'fr') {
    return tililaByLocale[locale] ?? tililaByLocale.fr;
}

export function getTililabReglement(locale = 'fr') {
    return tililabByLocale[locale] ?? tililabByLocale.fr;
}

export { tililaAr as ar, tililaEn as en, tililaFr as fr };
