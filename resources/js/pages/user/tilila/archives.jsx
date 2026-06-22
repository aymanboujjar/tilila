import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import AppLayout from '@/layouts/app-layout';
import ArchivesCategoryPanels from '@/pages/user/tilila/archives/components/ArchivesCategoryPanels';
import ArchivesContactCta from '@/pages/user/tilila/archives/components/ArchivesContactCta';
import ArchivesHero from '@/pages/user/tilila/archives/components/ArchivesHero';
import {
    ArchivesGallerySection,
    ArchivesLaureatsSection,
    ArchivesPhotosSection,
} from '@/pages/user/tilila/archives/components/ArchivesHubSections';
import ArchivesJurySection from '@/pages/user/tilila/archives/components/ArchivesJurySection';
import ArchivesSidebar from '@/pages/user/tilila/archives/components/ArchivesSidebar';
import ArchivesTililabCards from '@/pages/user/tilila/archives/components/ArchivesTililabCards';
import { useArchivesHub } from '@/pages/user/tilila/archives/hooks/useArchivesHub';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { buildArchiveEditions } from '@/pages/user/tilila/utils/archiveEditions';
import {
    buildCategorySections,
    buildGalleryItems,
    buildLaureatCards,
    buildTililabArchiveEditions,
    filterGalleryItems,
    hubEditionCta,
} from '@/pages/user/tilila/utils/archivesHubData';

export default function TililaArchives() {
    const { editions: rawEditions, tililabEditions: rawTililab } =
        usePage().props;
    const { t, locale } = useTranslation();

    const tililaEditions = useMemo(
        () => buildArchiveEditions(rawEditions ?? []),
        [rawEditions],
    );

    const tililabEditions = useMemo(
        () => buildTililabArchiveEditions(rawTililab ?? []),
        [rawTililab],
    );

    const {
        program,
        setProgram,
        year,
        setSelectedYear,
        years,
        galleryFilter,
        setGalleryFilter,
        activeEditions,
        scrollToSection,
    } = useArchivesHub(tililaEditions, tililabEditions);

    const laureatCards = useMemo(
        () => buildLaureatCards(activeEditions, year, locale, program),
        [activeEditions, year, locale, program],
    );

    const galleryItems = useMemo(() => {
        const all = buildGalleryItems(activeEditions, year);
        return filterGalleryItems(all, galleryFilter);
    }, [activeEditions, year, galleryFilter]);

    const sections = useMemo(
        () => buildCategorySections(activeEditions, year, locale),
        [activeEditions, year, locale],
    );

    const detailsUrl = hubEditionCta(activeEditions, year);

    const handleSidebarNav = (
        sectionId,
        targetProgram,
        galleryFilterOverride,
    ) => {
        if (targetProgram && targetProgram !== program) {
            setProgram(targetProgram);
        }

        if (galleryFilterOverride) {
            setGalleryFilter(galleryFilterOverride);
        } else if (sectionId === 'photos') {
            setGalleryFilter('photos');
        } else if (sectionId === 'videos') {
            setGalleryFilter('videos');
        } else if (sectionId === 'bootcamp' || sectionId === 'projets') {
            setGalleryFilter(
                sectionId === 'projets' ? 'videos' : 'all',
            );
        }

        const map = {
            laureats: 'laureats',
            finalistes: 'laureats',
            projets: 'galerie',
            bootcamp: 'galerie',
            galerie: 'galerie',
            photos: 'galerie',
            videos: 'videos',
            jurys: 'jurys',
            intervenants: 'intervenants',
            campagnes: 'campagnes',
        };

        window.setTimeout(
            () => {
                scrollToSection(map[sectionId] ?? sectionId);
            },
            targetProgram && targetProgram !== program ? 100 : 0,
        );
    };

    return (
        <>
            <Head title={t('tilila.archives.pageTitle')} />

            <div className="min-h-screen bg-twhite">
                <ArchivesHero />

                <div className="relative z-10 -mt-6 rounded-t-3xl bg-twhite shadow-[0_-8px_30px_rgba(26,35,126,0.06)] sm:-mt-8">
                    <TililaContainer className="pt-8 pb-14 sm:pt-10 sm:pb-16">
                        <div className="flex gap-8 border-b border-border/50">
                            {['tilila', 'tililab'].map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setProgram(tab)}
                                    className={`pb-3 text-xs font-extrabold tracking-[0.14em] uppercase transition sm:text-sm ${
                                        program === tab
                                            ? 'border-b-[3px] border-beta-blue text-beta-blue'
                                            : 'text-tgray hover:text-beta-blue'
                                    }`}
                                >
                                    {tab === 'tilila'
                                        ? 'Tilila Awards'
                                        : 'Tililab'}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {years.map((y) => (
                                <button
                                    key={y}
                                    type="button"
                                    onClick={() => setSelectedYear(y)}
                                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                                        year === y
                                            ? 'bg-beta-blue text-twhite shadow-sm'
                                            : 'border border-border/70 bg-white text-tblack hover:border-beta-blue hover:text-beta-blue'
                                    }`}
                                >
                                    {y}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => setSelectedYear('all')}
                                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                                    year === 'all'
                                        ? 'bg-beta-blue text-twhite shadow-sm'
                                        : 'border border-border/70 bg-white text-tblack hover:border-beta-blue hover:text-beta-blue'
                                }`}
                            >
                                {t('tilila.archives.allYears')}
                            </button>
                        </div>

                        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-12">
                            <div className="min-w-0 space-y-12">
                                <ArchivesLaureatsSection
                                    cards={laureatCards}
                                    year={year}
                                    program={program}
                                    detailsUrl={detailsUrl}
                                />

                                <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
                                    <ArchivesGallerySection
                                        items={galleryItems}
                                        year={year}
                                        program={program}
                                        filter={galleryFilter}
                                        onFilterChange={setGalleryFilter}
                                        detailsUrl={detailsUrl}
                                        compact
                                    />

                                    <ArchivesJurySection
                                        members={sections.jurys}
                                        program={program}
                                        year={year}
                                        detailsUrl={detailsUrl}
                                        compact
                                    />
                                </div>

                            </div>

                            <ArchivesSidebar
                                program={program}
                                onNavigate={handleSidebarNav}
                            />
                        </div>
                    </TililaContainer>
                </div>

                <ArchivesTililabCards onNavigate={handleSidebarNav} />
                <ArchivesContactCta />
            </div>
        </>
    );
}

TililaArchives.layout = (page) => <AppLayout>{page}</AppLayout>;
