/** Shared typing for `useTranslation()` (see `contexts/TranslationContext`). */
export type TranslationContextValue = {
    locale: string;
    setLocale: (locale: string) => void;
    t: (key: string) => string;
};
