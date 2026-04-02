import type { ReactNode } from 'react';

export type TranslateFn = (key: string) => string;

export interface TranslationContextValue {
    locale: string;
    setLocale: (locale: string) => void;
    t: TranslateFn;
}

export function TranslationProvider(props: {
    children: ReactNode;
}): ReactNode;

export function useTranslation(): TranslationContextValue;
