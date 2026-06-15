import ar from './ar';
import en from './en';
import fr from './fr';

const byLocale = { fr, en, ar };

export function getTililaReglement(locale = 'fr') {
    return byLocale[locale] ?? byLocale.fr;
}

export { ar, en, fr };
