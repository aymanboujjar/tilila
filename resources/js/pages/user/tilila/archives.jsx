import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import TililaAwardsLayout from '@/layouts/tilila-awards-layout';
import ArchivesCategoryPanels from '@/pages/user/tilila/archives/components/ArchivesCategoryPanels';
import {
    ArchivesGallerySection,
    ArchivesLaureatsSection,
    ArchivesPhotosSection,
} from '@/pages/user/tilila/archives/components/ArchivesHubSections';
import ArchivesJurySection from '@/pages/user/tilila/archives/components/ArchivesJurySection';
import ArchivesSidebar from '@/pages/user/tilila/archives/components/ArchivesSidebar';
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
import { useTranslation } from '@/contexts/TranslationContext';

function ArchivesDecor() {
    return (
        <div
            className="pointer-events-none fixed bottom-0 right-0 z-0 hidden overflow-hidden opacity-40 lg:block"
            aria-hidden
        >
            <div className="absolute bottom-0 right-0 size-0 border-b-[180px] border-l-[180px] border-b-beta-turquoise/30 border-l-transparent" />
            <div className="absolute bottom-8 right-8 size-0 border-b-[120px] border-l-[120px] border-b-beta-blue/25 border-l-transparent" />
            <div className="absolute bottom-16 right-24 size-0 border-b-[80px] border-l-[80px] border-b-brand-light-purple/20 border-l-transparent" />
        </div>
    );
}

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

    const handleSidebarNav = (sectionId, targetProgram) => {
        if (targetProgram && targetProgram !== program) {
            setProgram(targetProgram);
        }
        const map = {
            laureats: 'laureats',
            finalistes: 'laureats',
            projets: 'laureats',
            galerie: 'galerie',
            photos: 'photos',
            videos: 'videos',
            jurys: 'jurys',
            intervenants: 'intervenants',
            campagnes: 'campagnes',
            marques: 'marques',
            agences: 'agences',
        };
        window.setTimeout(() => {
            scrollToSection(map[sectionId] ?? sectionId);
        }, targetProgram && targetProgram !== program ? 80 : 0);
    };

    return (
        <>
            <Head title={t('tilila.archives.pageTitle')} />

            <div className="relative min-h-screen bg-twhite pb-20">
                <ArchivesDecor />

                <TililaContainer className="relative z-10 pt-10 sm:pt-14">
                    <h1 className="text-3xl font-extrabold tracking-tight text-beta-blue uppercase sm:text-4xl lg:text-[2.75rem]">
                        {t('tilila.archives.title')}
                    </h1>

                    <div className="mt-8 flex gap-8 border-b border-border/60">
                        {['tilila', 'tililab'].map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setProgram(tab)}
                                className={`pb-3 text-sm font-extrabold tracking-wide uppercase transition ${
                                    program === tab
                                        ? 'border-b-2 border-beta-blue text-beta-blue'
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

                    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] xl:grid-cols-[minmax(0,1fr)_260px] xl:gap-14">
                        <div className="min-w-0 space-y-14">
                            <ArchivesLaureatsSection
                                cards={laureatCards}
                                year={year}
                                program={program}
                                detailsUrl={detailsUrl}
                            />

                            <ArchivesGallerySection
                                items={galleryItems}
                                year={year}
                                filter={galleryFilter}
                                onFilterChange={setGalleryFilter}
                                detailsUrl={detailsUrl}
                            />

                            <ArchivesJurySection
                                members={sections.jurys}
                                program={program}
                                year={year}
                            />

                            <ArchivesPhotosSection
                                photos={sections.photos}
                                year={year}
                            />

                            <ArchivesCategoryPanels
                                sections={sections}
                                year={year}
                            />
                        </div>

                        <ArchivesSidebar
                            program={program}
                            onNavigate={handleSidebarNav}
                        />
                    </div>
                </TililaContainer>
            </div>
        </>
    );
}

TililaArchives.layout = (page) => (
    <TililaAwardsLayout>{page}</TililaAwardsLayout>
);
