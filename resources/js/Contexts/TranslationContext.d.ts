import type { ReactNode } from 'react';
import type { TranslationContextValue } from '@/types/translation';

export type { TranslationContextValue };

export function TranslationProvider(props: { children: ReactNode }): ReactNode;

export function useTranslation(): TranslationContextValue;
