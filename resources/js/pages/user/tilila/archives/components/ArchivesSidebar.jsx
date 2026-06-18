import {
    TILILAB_HUB_CATEGORIES,
    TILILA_HUB_CATEGORIES,
} from '@/pages/user/tilila/data/archive-hub-categories';
import { useTranslation } from '@/contexts/TranslationContext';

function labelFor(category, locale) {
    return category[locale] || category.fr || category.en;
}

function CategoryList({ categories, targetProgram, activeProgram, locale, onSelect }) {
    return (
        <ul className="mt-4 space-y-3">
            {categories.map((category) => (
                <li key={category.id}>
                    <button
                        type="button"
                        onClick={() => onSelect(category.id, targetProgram)}
                        className={`flex w-full items-center gap-3 text-start text-sm font-semibold transition ${
                            activeProgram === targetProgram
                                ? 'text-tblack hover:text-beta-blue'
                                : 'text-tgray/60 hover:text-beta-blue'
                        }`}
                    >
                        <span className="size-2.5 shrink-0 rounded-full border-2 border-beta-blue" />
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
            <div className="space-y-8">
                <div>
                    <p className="text-sm font-extrabold tracking-wide text-beta-blue uppercase">
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
                    <p className="text-sm font-extrabold tracking-wide text-beta-blue uppercase">
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

            <p className="mt-8 hidden text-xs text-tgray lg:block">
                {t('tilila.archives.hub.sidebarHint')}
            </p>
        </aside>
    );
}
