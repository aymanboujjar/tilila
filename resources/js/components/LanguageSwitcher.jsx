import { useTranslation } from '@/contexts/TranslationContext';

const languages = [
    { id: 'en', label: 'EN' },
    { id: 'fr', label: 'FR' },
    { id: 'ar', label: 'AR' },
];

export default function LanguageSwitcher({ className = '' }) {
    const { locale, setLocale, t } = useTranslation();

    return (
        <select
            value={locale}
            onChange={(event) => setLocale(event.target.value)}
            aria-label={t('nav.language')}
            className={[
                'h-9 shrink-0 cursor-pointer rounded-lg border border-border bg-twhite px-2.5 text-xs font-bold tracking-wide text-tblack',
                'focus:border-beta-blue focus:ring-2 focus:ring-beta-blue/20 focus:outline-none',
                className,
            ].join(' ')}
        >
            {languages.map((language) => (
                <option key={language.id} value={language.id}>
                    {language.label}
                </option>
            ))}
        </select>
    );
}
