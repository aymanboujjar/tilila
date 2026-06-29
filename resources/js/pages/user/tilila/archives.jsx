import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import AppLayout from '@/layouts/app-layout';
import ArchivesBootcampSection from '@/pages/user/tilila/archives/components/ArchivesBootcampSection';
import ArchivesContactCta from '@/pages/user/tilila/archives/components/ArchivesContactCta';
import ArchivesHero from '@/pages/user/tilila/archives/components/ArchivesHero';
import {
    ArchivesGallerySection,
    ArchivesLaureatsSection,
} from '@/pages/user/tilila/archives/components/ArchivesHubSections';
import ArchivesJurySection from '@/pages/user/tilila/archives/components/ArchivesJurySection';
import ArchivesSidebar from '@/pages/user/tilila/archives/components/ArchivesSidebar';
import ArchivesStats from '@/pages/user/tilila/archives/components/ArchivesStats';
import ArchivesTililabCards from '@/pages/user/tilila/archives/components/ArchivesTililabCards';
import ArchivesToolbar from '@/pages/user/tilila/archives/components/ArchivesToolbar';
import { useArchivesHub } from '@/pages/user/tilila/archives/hooks/useArchivesHub';
import { TililaContainer } from '@/pages/user/tilila/partials/TililaUi';
import { buildArchiveEditions } from '@/pages/user/tilila/utils/archiveEditions';
import {
    buildBootcampArchiveItems,
    buildCategorySections,
    buildGalleryItems,
    buildLaureatCards,
    buildTililabArchiveEditions,
    filterGalleryItems,
    hubEditionCta,
} from '@/pages/user/tilila/utils/archivesHubData';
import { computeGlobalStats } from '@/pages/user/tilila/utils/archivesPageData';

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

    const bootcampItems = useMemo(
        () =>
            program === 'tililab'
                ? buildBootcampArchiveItems(activeEditions, year)
                : [],
        [activeEditions, year, program],
    );

    const sections = useMemo(
        () => buildCategorySections(activeEditions, year, locale),
        [activeEditions, year, locale],
    );

    const stats = useMemo(
        () => computeGlobalStats(activeEditions, locale),
        [activeEditions, locale],
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
        } else if (sectionId === 'bootcamp') {
            setGalleryFilter('photos');
        } else if (sectionId === 'projets') {
            setGalleryFilter('videos');
        }

        const map = {
            laureats: 'laureats',
            finalistes: 'laureats',
            intervenants: 'intervenants',
            programme: 'bootcamp-programme',
            projets: 'galerie',
            bootcamp: 'galerie',
            galerie: 'galerie',
            photos: 'galerie',
            videos: 'videos',
            jurys: 'jurys',
            campagnes: 'campagnes',
        };

        window.setTimeout(
            () => {
                scrollToSection(map[sectionId] ?? sectionId);
            },
            targetProgram && targetProgram !== program ? 100 : 0,
        );
    };

    const showStats = year === 'all';

    return (
        <>
            <Head title={t('tilila.archives.pageTitle')} />

            <div className="min-h-screen bg-twhite">
                <ArchivesHero editionCount={activeEditions.length} />

                <div className="relative z-10 -mt-6 rounded-t-3xl bg-twhite shadow-[0_-8px_30px_rgba(68,25,168,0.06)] sm:-mt-8">
                    {showStats ? <ArchivesStats stats={stats} /> : null}

                    <ArchivesToolbar
                        program={program}
                        onProgramChange={setProgram}
                        years={years}
                        year={year}
                        onYearChange={setSelectedYear}
                    />

                    <TililaContainer className="py-10 sm:py-14">
                        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-12">
                            <div className="min-w-0 space-y-8">
                                <section className="rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(68,25,168,0.06)] sm:p-8">
                                    <ArchivesLaureatsSection
                                        cards={laureatCards}
                                        year={year}
                                        program={program}
                                        detailsUrl={detailsUrl}
                                    />
                                </section>

                                <section className="rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(68,25,168,0.06)] sm:p-8">
                                    <ArchivesJurySection
                                        members={sections.jurys}
                                        program={program}
                                        year={year}
                                        detailsUrl={detailsUrl}
                                    />
                                </section>

                                {program === 'tililab' ? (
                                    <section className="rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(68,25,168,0.06)] sm:p-8">
                                        <ArchivesBootcampSection
                                            items={bootcampItems}
                                            year={year}
                                            detailsUrl={detailsUrl}
                                            locale={locale}
                                        />
                                    </section>
                                ) : null}

                                <section className="rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(68,25,168,0.06)] sm:p-8">
                                    <ArchivesGallerySection
                                        items={galleryItems}
                                        year={year}
                                        program={program}
                                        filter={galleryFilter}
                                        onFilterChange={setGalleryFilter}
                                        detailsUrl={detailsUrl}
                                    />
                                </section>
                            </div>

                            <ArchivesSidebar
                                program={program}
                                onNavigate={handleSidebarNav}
                            />
                        </div>
                    </TililaContainer>
                </div>

                {/* <ArchivesTililabCards onNavigate={handleSidebarNav} /> */}
                <ArchivesContactCta />
            </div>
        </>
    );
}

TililaArchives.layout = (page) => <AppLayout>{page}</AppLayout>;
