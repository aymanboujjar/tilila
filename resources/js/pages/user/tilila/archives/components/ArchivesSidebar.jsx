import { Link } from '@inertiajs/react';
import { FolderOpen } from 'lucide-react';
import {
    TILILAB_HUB_CATEGORIES,
    TILILA_HUB_CATEGORIES,
} from '@/pages/user/tilila/data/archive-hub-categories';
import { useTranslation } from '@/contexts/TranslationContext';

function labelFor(category, locale) {
    return category[locale] || category.fr || category.en;
}

function CategoryList({
    categories,
    targetProgram,
    activeProgram,
    locale,
    onSelect,
}) {
    return (
        <ul className="mt-3 space-y-2.5">
            {categories.map((category) => (
                <li key={category.id}>
                    <button
                        type="button"
                        onClick={() => onSelect(category.id, targetProgram)}
                        className={`flex w-full items-start gap-2.5 text-start text-[13px] leading-snug font-semibold transition ${
                            activeProgram === targetProgram
                                ? 'text-tblack hover:text-beta-blue'
                                : 'text-tgray/70 hover:text-beta-blue'
                        }`}
                    >
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-beta-blue" />
                        {labelFor(category, locale)}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default function ArchivesSidebar({ program, onNavigate }) {
    const { t, locale } = useTranslation();

    return (
        <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-extrabold tracking-wide text-beta-blue uppercase">
                {t('tilila.archives.hub.sommaire')}
            </p>

            <div className="mt-6 space-y-7">
                <div>
                    <p className="text-xs font-extrabold tracking-wide text-beta-blue uppercase">
                        Tilila Awards
                    </p>
                    <CategoryList
                        categories={TILILA_HUB_CATEGORIES}
                        targetProgram="tilila"
                        activeProgram={program}
                        locale={locale}
                        onSelect={onNavigate}
                    />
                </div>

                <div>
                    <p className="text-xs font-extrabold tracking-wide text-beta-blue uppercase">
                        Tililab
                    </p>
                    <CategoryList
                        categories={TILILAB_HUB_CATEGORIES}
                        targetProgram="tililab"
                        activeProgram={program}
                        locale={locale}
                        onSelect={onNavigate}
                    />
                </div>
            </div>

            <div className="mt-8 rounded-xl bg-brand-light-purple/25 p-5">
                <FolderOpen
                    className="size-8 text-beta-blue"
                    strokeWidth={1.5}
                    aria-hidden
                />
                <p className="mt-3 text-sm leading-relaxed font-semibold text-tblack">
                    {t('tilila.archives.hub.contactPrompt')}
                </p>
                <Link
                    href="/about#contact"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-md border-2 border-beta-blue bg-twhite px-4 py-2.5 text-xs font-extrabold tracking-[0.12em] text-beta-blue uppercase transition hover:bg-beta-blue hover:text-twhite"
                >
                    {t('tilila.archives.hub.contactCta')}
                </Link>
            </div>
        </aside>
    );
}
