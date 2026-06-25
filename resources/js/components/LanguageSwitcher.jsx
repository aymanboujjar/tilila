import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/contexts/TranslationContext';
import { cn } from '@/lib/utils';

const languages = [
    { id: 'en', label: 'EN' },
    { id: 'fr', label: 'FR' },
    { id: 'ar', label: 'AR' },
];

export default function LanguageSwitcher({ className = '', onDark = false }) {
    const { locale, setLocale, t } = useTranslation();
    const current =
        languages.find((language) => language.id === locale) ?? languages[1];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    aria-label={t('nav.language')}
                    className={cn(
                        'inline-flex h-9 shrink-0 cursor-pointer items-center gap-1 rounded-lg border px-2.5 text-xs font-bold tracking-wide shadow-sm transition',
                        'focus-visible:border-beta-blue focus-visible:ring-2 focus-visible:ring-beta-blue/25 focus-visible:outline-none',
                        onDark
                            ? 'border-twhite/50 bg-twhite/95 text-tblack backdrop-blur-sm hover:bg-twhite'
                            : 'border-border bg-twhite text-tblack hover:border-beta-blue/30',
                        className,
                    )}
                >
                    <span>{current.label}</span>
                    <ChevronDown
                        className="size-3.5 shrink-0 opacity-60"
                        aria-hidden
                    />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="z-[100] min-w-[4.5rem] border-border bg-twhite p-1 text-tblack shadow-lg"
            >
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.id}
                        onSelect={() => setLocale(language.id)}
                        className={cn(
                            'cursor-pointer justify-center rounded-md px-3 py-2 text-xs font-bold tracking-wide text-tblack focus:bg-alpha-blue focus:text-beta-blue',
                            locale === language.id &&
                                'bg-alpha-blue text-beta-blue',
                        )}
                    >
                        {language.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
