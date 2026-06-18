import { Link } from '@inertiajs/react';
import { ArrowRight, Award, Play, Trophy } from 'lucide-react';
import { getYoutubeEmbedUrl } from '@/lib/youtubeEmbed';
import TransText from '@/components/TransText';
import { TILILA_ARCHIVE_CATEGORIES } from '@/pages/user/tilila/data/archive-categories';
import TililaHorizontalCarousel from '@/pages/user/tilila/partials/TililaHorizontalCarousel';
import {
    TililaContainer,
    TililaIconBadge,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';
import {
    ARCHIVE_CATEGORY_ICONS,
    archiveCategoryDescription,
    archiveCategoryLabel,
    groupArchiveItemsByYear,
} from '@/pages/user/tilila/utils/archiveCategories';
import { useTranslation } from '@/contexts/TranslationContext';

function EmptyState({ message }) {
    return (
        <div className="mt-6 rounded-2xl border border-dashed border-beta-blue/20 bg-alpha-blue/40 px-6 py-12 text-center">
            <p className="text-sm leading-relaxed text-tgray">{message}</p>
        </div>
    );
}

function EditionLink({ year, url }) {
    return (
        <Link
            href={url}
            className="group mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-wide text-beta-blue uppercase transition hover:text-brand-light-purple"
        >
            <TransText
                en={`Edition ${year}`}
                fr={`Édition ${year}`}
                ar={`الدورة ${year}`}
            />
            <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
        </Link>
    );
}

function YearStrip({ year, label, count }) {
    return (
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-s-4 border-beta-turquoise ps-4">
            <div>
                <p className="text-3xl leading-none font-extrabold text-beta-blue">
                    {year}
                </p>
                {label ? (
                    <p className="mt-1 text-sm font-medium text-tgray">
                        {label}
                    </p>
                ) : null}
            </div>
            {count > 0 ? (
                <span className="rounded-full bg-alpha-blue px-3 py-1 text-xs font-bold text-beta-blue">
                    {count}
                </span>
            ) : null}
        </div>
    );
}

function SectionBlock({ id, category, locale, index, itemCount, children }) {
    const Icon = ARCHIVE_CATEGORY_ICONS[id] ?? Award;
    const isAlt = index % 2 === 1;

    return (
        <section
            id={id}
            className={`scroll-mt-28 py-14 sm:py-16 ${isAlt ? 'bg-beta-white' : 'bg-twhite'}`}
        >
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                    <TililaIconBadge icon={Icon} className="shrink-0" />
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-beta-blue sm:text-3xl">
                            {archiveCategoryLabel(category, locale)}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-tgray sm:text-base">
                            {archiveCategoryDescription(category, locale)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                    <span className="text-5xl leading-none font-black text-beta-blue/10">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    {itemCount > 0 ? (
                        <span className="rounded-full border border-beta-blue/15 bg-alpha-blue px-4 py-1.5 text-xs font-bold text-beta-blue">
                            {itemCount}
                        </span>
                    ) : null}
                </div>
            </div>
            {children}
        </section>
    );
}

function LaureatsSection({ items }) {
    const groups = groupArchiveItemsByYear(items);

    if (!groups.length) {
        return (
            <EmptyState
                message={
                    <TransText
                        en="Winners will be published after each ceremony."
                        fr="Les lauréats seront publiés après chaque cérémonie."
                        ar="يُعلَن عن الفائزين بعد كل حفل."
                    />
                }
            />
        );
    }

    return (
        <div className="space-y-12">
            {groups.map((group) => (
                <div key={group.year}>
                    <YearStrip
                        year={group.year}
                        label={group.meta.editionLabel}
                        count={group.items.length}
                    />
                    <TililaHorizontalCarousel
                        ariaLabel={`Winners ${group.year}`}
                        slideClassName="w-[min(100%,340px)] shrink-0 snap-start md:w-[42%] lg:w-[30%]"
                        fadeFrom={
                            group.year % 2 ? 'from-beta-white' : 'from-twhite'
                        }
                    >
                        {group.items.map((row, index) => (
                            <article
                                key={`${group.year}-${index}`}
                                className="flex h-full min-h-[200px] flex-col rounded-2xl border border-border/60 bg-twhite p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-beta-blue/10 text-beta-blue">
                                    <Trophy className="size-4" />
                                </span>
                                <div className="mt-4 flex-1 text-sm leading-relaxed text-tgray">
                                    {row.trophy ? (
                                        <p className="font-bold text-tblack">
                                            {row.trophy}
                                            {row.name ? (
                                                <span className="mt-1 block font-semibold text-beta-blue">
                                                    {row.name}
                                                </span>
                                            ) : null}
                                        </p>
                                    ) : null}
                                    {row.detail ? (
                                        <p className="mt-2 line-clamp-5">
                                            {row.detail}
                                        </p>
                                    ) : null}
                                </div>
                            </article>
                        ))}
                    </TililaHorizontalCarousel>
                    <EditionLink
                        year={group.year}
                        url={group.meta.detailsUrl}
                    />
                </div>
            ))}
        </div>
    );
}

function NamedCardsSection({ items, emptyMessage }) {
    const groups = groupArchiveItemsByYear(items);

    if (!groups.length) {
        return <EmptyState message={emptyMessage} />;
    }

    return (
        <div className="space-y-12">
            {groups.map((group) => (
                <div key={group.year}>
                    <YearStrip
                        year={group.year}
                        label={group.meta.editionLabel}
                        count={group.items.length}
                    />
                    <TililaHorizontalCarousel
                        ariaLabel={`Items ${group.year}`}
                        slideClassName="w-[min(100%,260px)] shrink-0 snap-start sm:w-[38%] lg:w-[24%]"
                        fadeFrom={
                            group.year % 2 ? 'from-beta-white' : 'from-twhite'
                        }
                    >
                        {group.items.map((item, index) => (
                            <article
                                key={`${group.year}-${item.name}-${index}`}
                                className="group flex h-full min-h-[120px] flex-col justify-between rounded-2xl border border-border/60 bg-linear-to-br from-twhite to-beta-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-beta-blue/25 hover:shadow-md"
                            >
                                <p className="text-lg leading-snug font-bold text-tblack group-hover:text-beta-blue">
                                    {item.name}
                                </p>
                                <p className="mt-3 text-xs font-bold tracking-wide text-beta-blue uppercase">
                                    {group.year}
                                </p>
                            </article>
                        ))}
                    </TililaHorizontalCarousel>
                    <EditionLink
                        year={group.year}
                        url={group.meta.detailsUrl}
                    />
                </div>
            ))}
        </div>
    );
}

function JurysSection({ items }) {
    const groups = groupArchiveItemsByYear(items);

    if (!groups.length) {
        return (
            <EmptyState
                message={
                    <TransText
                        en="Jury members are published for each edition."
                        fr="Les membres du jury sont publiés pour chaque édition."
                        ar="يُنشر أعضاء لجنة التحكيم لكل دورة."
                    />
                }
            />
        );
    }

    return (
        <div className="space-y-12">
            {groups.map((group) => (
                <div key={group.year}>
                    <YearStrip
                        year={group.year}
                        label={group.meta.editionLabel}
                        count={group.items.length}
                    />
                    <TililaHorizontalCarousel
                        ariaLabel={`Jury ${group.year}`}
                        slideClassName="w-[min(100%,280px)] shrink-0 snap-start sm:w-[45%] lg:w-[28%]"
                        fadeFrom={
                            group.year % 2 ? 'from-beta-white' : 'from-twhite'
                        }
                    >
                        {group.items.map((member, index) => (
                            <article
                                key={`${group.year}-${index}`}
                                className="relative flex h-full min-h-[160px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-twhite p-5 shadow-sm"
                            >
                                <div className="absolute -end-4 -top-4 size-20 rounded-full bg-beta-turquoise/10" />
                                <p className="relative text-base font-bold text-tblack">
                                    {member.name}
                                </p>
                                {member.role ? (
                                    <p className="relative mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-tgray">
                                        {member.role}
                                    </p>
                                ) : null}
                            </article>
                        ))}
                    </TililaHorizontalCarousel>
                    <EditionLink
                        year={group.year}
                        url={group.meta.detailsUrl}
                    />
                </div>
            ))}
        </div>
    );
}

function PhotosSection({ items }) {
    const groups = groupArchiveItemsByYear(items);

    if (!groups.length) {
        return (
            <EmptyState
                message={
                    <TransText
                        en="Photos are added when galleries are published for each edition."
                        fr="Les photos sont ajoutées lorsque les galeries sont publiées pour chaque édition."
                        ar="تُضاف الصور عند نشر معارض كل دورة."
                    />
                }
            />
        );
    }

    return (
        <div className="space-y-12">
            {groups.map((group) => (
                <div key={group.year}>
                    <YearStrip
                        year={group.year}
                        label={group.meta.editionLabel}
                        count={group.items.length}
                    />
                    <TililaHorizontalCarousel
                        ariaLabel={`Photos ${group.year}`}
                        slideClassName="w-[min(100%,420px)] shrink-0 snap-start sm:w-[65%] lg:w-[45%]"
                        fadeFrom={
                            group.year % 2 ? 'from-beta-white' : 'from-twhite'
                        }
                        autoAdvanceMs={5200}
                    >
                        {group.items.map((image) => (
                            <a
                                key={image.src}
                                href={image.src}
                                target="_blank"
                                rel="noreferrer"
                                className="group block overflow-hidden rounded-2xl border border-border/60 bg-twhite shadow-md"
                            >
                                <img
                                    src={image.src}
                                    alt=""
                                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                                    loading="lazy"
                                />
                            </a>
                        ))}
                    </TililaHorizontalCarousel>
                    <EditionLink
                        year={group.year}
                        url={group.meta.detailsUrl}
                    />
                </div>
            ))}
        </div>
    );
}

function VideosSection({ items }) {
    if (!items.length) {
        return (
            <EmptyState
                message={
                    <TransText
                        en="Ceremony replays are published when available."
                        fr="Les replays de cérémonie sont publiés lorsqu’ils sont disponibles."
                        ar="تُنشر إعادات الحفل عند توفرها."
                    />
                }
            />
        );
    }

    return (
        <TililaHorizontalCarousel
            ariaLabel="Ceremony videos"
            slideClassName="w-[min(100%,560px)] shrink-0 snap-start lg:w-[58%]"
            autoAdvanceMs={0}
        >
            {items.map((item) => {
                const embed = getYoutubeEmbedUrl(item.videoUrl);
                return (
                    <article
                        key={`${item.year}-${item.videoUrl}`}
                        className="overflow-hidden rounded-2xl border border-border/60 bg-twhite shadow-lg"
                    >
                        <div className="flex items-center justify-between gap-3 border-b border-border/50 bg-linear-to-r from-beta-blue/8 to-transparent px-5 py-4">
                            <div>
                                <p className="text-2xl font-extrabold text-beta-blue">
                                    {item.year}
                                </p>
                                <p className="text-sm text-tgray">
                                    {item.editionLabel}
                                </p>
                            </div>
                            <span className="inline-flex size-10 items-center justify-center rounded-full bg-beta-blue/10 text-beta-blue">
                                <Play className="size-4" />
                            </span>
                        </div>
                        {embed ? (
                            <div className="aspect-video bg-tblack">
                                <iframe
                                    title={`Ceremony ${item.year}`}
                                    src={embed}
                                    className="h-full w-full"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <a
                                href={item.videoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-5 py-10 text-sm font-semibold text-beta-blue hover:underline"
                            >
                                <Play className="size-4" />
                                <TransText
                                    en="Watch video"
                                    fr="Voir la vidéo"
                                    ar="شاهد الفيديو"
                                />
                            </a>
                        )}
                    </article>
                );
            })}
        </TililaHorizontalCarousel>
    );
}

const SECTION_RENDERERS = {
    laureats: LaureatsSection,
    campagnes: NamedCardsSection,
    marques: NamedCardsSection,
    agences: NamedCardsSection,
    jurys: JurysSection,
    photos: PhotosSection,
    videos: VideosSection,
};

export default function TililaArchivesSections({ sections }) {
    const { locale } = useTranslation();

    return (
        <TililaSection className="bg-twhite pt-0 pb-4">
            <div className="sticky top-16 z-30 border-b border-border/60 bg-twhite/90 backdrop-blur-md sm:top-18">
                <TililaContainer className="py-3">
                    <nav
                        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
                        aria-label="Archive categories"
                    >
                        {TILILA_ARCHIVE_CATEGORIES.map((category) => {
                            const Icon =
                                ARCHIVE_CATEGORY_ICONS[category.id] ?? Award;

                            return (
                                <a
                                    key={category.id}
                                    href={`#${category.id}`}
                                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/70 bg-twhite px-4 py-2 text-xs font-bold tracking-wide text-tblack uppercase shadow-sm transition hover:border-beta-blue hover:text-beta-blue"
                                >
                                    <Icon className="size-3.5 text-beta-blue" />
                                    {archiveCategoryLabel(category, locale)}
                                </a>
                            );
                        })}
                    </nav>
                </TililaContainer>
            </div>

            <TililaContainer className="divide-y divide-border/30">
                {TILILA_ARCHIVE_CATEGORIES.map((category, index) => {
                    const Renderer = SECTION_RENDERERS[category.id];
                    const items = sections[category.id] ?? [];

                    return (
                        <SectionBlock
                            key={category.id}
                            id={category.id}
                            category={category}
                            locale={locale}
                            index={index}
                            itemCount={items.length}
                        >
                            <Renderer
                                items={items}
                                emptyMessage={
                                    <TransText
                                        en="No entries for this category yet."
                                        fr="Aucune entrée pour cette rubrique pour le moment."
                                        ar="لا توجد عناصر لهذا القسم حاليًا."
                                    />
                                }
                            />
                        </SectionBlock>
                    );
                })}
            </TililaContainer>
        </TililaSection>
    );
}
