import { Link } from '@inertiajs/react';
import { ArrowRight, FolderOpen } from 'lucide-react';
import {
    TILILAB_HUB_CATEGORIES,
    TILILA_HUB_CATEGORIES,
} from '@/pages/user/tilila/data/archive-hub-categories';
import { ARCHIVE_CATEGORY_ICONS } from '@/pages/user/tilila/utils/archiveCategories';
import { useTranslation } from '@/contexts/TranslationContext';

function labelFor(category, locale) {
    return category[locale] || category.fr || category.en;
}

const CATEGORY_ICON_MAP = {
    laureats: 'laureats',
    campagnes: 'campagnes',
    jurys: 'jurys',
    photos: 'photos',
    videos: 'videos',
    projets: 'videos',
    programme: 'programme',
    intervenants: 'intervenants',
    bootcamp: 'photos',
};

function CategoryList({
    categories,
    targetProgram,
    activeProgram,
    locale,
    onSelect,
}) {
    return (
        <ul className="mt-2 space-y-1">
            {categories.map((category) => {
                const iconKey = CATEGORY_ICON_MAP[category.id] ?? 'laureats';
                const Icon =
                    ARCHIVE_CATEGORY_ICONS[iconKey] ??
                    ARCHIVE_CATEGORY_ICONS.laureats;

                return (
                    <li key={category.id}>
                        <button
                            type="button"
                            onClick={() => onSelect(category.id, targetProgram)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-[13px] font-semibold transition ${
                                activeProgram === targetProgram
                                    ? 'text-tblack hover:bg-beta-white hover:text-beta-blue'
                                    : 'text-tgray hover:bg-beta-white hover:text-beta-blue'
                            }`}
                        >
                            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-beta-white text-beta-blue">
                                <Icon className="size-3.5" aria-hidden />
                            </span>
                            {labelFor(category, locale)}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default function ArchivesSidebar({ program, onNavigate }) {
    const { t, locale } = useTranslation();

    return (
        <aside className="xl:sticky xl:top-36 xl:self-start">
            <div className="rounded-2xl border border-border/50 bg-twhite p-5 shadow-[0_8px_30px_rgba(26,35,126,0.06)]">
                <p className="text-xs font-extrabold tracking-[0.2em] text-beta-turquoise uppercase">
                    {t('tilila.archives.hub.sommaire')}
                </p>

                <div className="mt-5 space-y-6">
                    <div>
                        <p className="px-3 text-[11px] font-extrabold tracking-wide text-beta-blue uppercase">
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

                    <div className="border-t border-border/40 pt-5">
                        <p className="px-3 text-[11px] font-extrabold tracking-wide text-beta-turquoise uppercase">
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
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl bg-linear-to-r from-beta-blue to-brand-light-purple p-5 text-twhite shadow-[0_4px_24px_rgba(68,25,168,0.12)]">
                <FolderOpen
                    className="size-7 text-beta-turquoise"
                    strokeWidth={1.5}
                    aria-hidden
                />
                <p className="mt-3 text-sm leading-relaxed font-medium text-twhite/90">
                    {t('tilila.archives.hub.contactPrompt')}
                </p>
                <Link
                    href="/about#contact"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-twhite/30 bg-twhite/10 px-4 py-2.5 text-xs font-extrabold tracking-[0.1em] text-twhite uppercase backdrop-blur transition hover:bg-twhite hover:text-beta-blue"
                >
                    {t('tilila.archives.hub.contactCta')}
                    <ArrowRight className="size-3.5" aria-hidden />
                </Link>
            </div>
        </aside>
    );
}
