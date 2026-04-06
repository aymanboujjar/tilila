import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import ar from '@/locales/ar.json';

const SUPPORTED_LOCALES = ['en', 'fr', 'ar'];
const STORAGE_KEY = 'locale';

const TranslationContext = createContext(null);

function resolveDotNotationKey(dictionary, key) {
    if (!key || typeof key !== 'string') return undefined;

    return key.split('.').reduce((currentValue, pathSegment) => {
        if (currentValue == null || typeof currentValue !== 'object')
            return undefined;
        return currentValue[pathSegment];
    }, dictionary);
}

export function TranslationProvider({ children }) {
    const [locale, setLocaleState] = useState('en');

    useEffect(() => {
        try {
            const storedLocale = localStorage.getItem(STORAGE_KEY);
            if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale)) {
                setLocaleState(storedLocale);
            }
        } catch {
            // localStorage can be unavailable (privacy mode, etc.)
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, locale);
        } catch {
            // localStorage can be unavailable (privacy mode, etc.)
        }
    }, [locale]);

    useEffect(() => {
        const html = document.documentElement;

        if (locale === 'ar') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
            return;
        }

        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', locale);
    }, [locale]);

    const dictionaries = useMemo(() => ({ en, fr, ar }), []);

    const setLocale = (nextLocale) => {
        if (!nextLocale || !SUPPORTED_LOCALES.includes(nextLocale)) return;
        setLocaleState(nextLocale);
    };

    const t = (key) => {
        const dictionary = dictionaries[locale] ?? dictionaries.en;
        const resolved = resolveDotNotationKey(dictionary, key);
        return typeof resolved === 'string' ? resolved : key;
    };

    const value = useMemo(
        () => ({ locale, setLocale, t }),
        [locale, dictionaries],
    );

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const contextValue = useContext(TranslationContext);
    if (!contextValue) {
        throw new Error(
            'useTranslation must be used within TranslationProvider',
        );
    }
    return contextValue;
}
