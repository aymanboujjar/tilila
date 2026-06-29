import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { RevealOnScroll } from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
import ArchivesBootcampSection from '@/pages/user/tilila/archives/components/ArchivesBootcampSection';
import {
    ArchivesGallerySection,
    ArchivesLaureatsSection,
} from '@/pages/user/tilila/archives/components/ArchivesHubSections';
import ArchivesJurySection from '@/pages/user/tilila/archives/components/ArchivesJurySection';
import ArchivesToolbar from '@/pages/user/tilila/archives/components/ArchivesToolbar';
import {
    TililaContainer,
    TililaSection,
} from '@/pages/user/tilila/partials/TililaUi';
import { buildArchiveEditions, latestArchiveYear } from '@/pages/user/tilila/utils/archiveEditions';
import {
    buildBootcampArchiveItems,
    buildCategorySections,
    buildGalleryItems,
    buildLaureatCards,
    buildTililabArchiveEditions,
    filterGalleryItems,
    hubArchivesUrl,
    hubEditionCta,
} from '@/pages/user/tilila/utils/archivesHubData';
import { useTranslation } from '@/contexts/TranslationContext';

function SectionCard({ children }) {
    return (
        <section className="rounded-2xl border border-border/40 bg-twhite p-6 shadow-[0_4px_24px_rgba(68,25,168,0.06)] sm:p-8">
            {children}
        </section>
    );
}

const HUB_COPY = {
    tilila: {
        title: {
            en: 'Palmarès & archives',
            fr: 'Palmarès & archives',
            ar: 'السجل والأرشيف',
        },
        description: {
            en: 'Browse winners, jury members, photos, ceremony replays and winner videos from past editions.',
            fr: 'Parcourez les lauréats, les jurys, les photos, les replays de cérémonie et les vidéos des lauréats des éditions passées.',
            ar: 'تصفّح الفائزين ولجان التحكيم والصور وإعادات الحفل وفيديوهات الفائزين من الدورات السابقة.',
        },
    },
    tililab: {
        title: {
            en: 'Winners & archives',
            fr: 'Lauréats & archives',
            ar: 'الفائزون والأرشيف',
        },
        description: {
            en: 'Browse winners, speakers, bootcamp programme, photos and project videos from past editions.',
            fr: 'Parcourez les lauréats, les intervenants, le programme bootcamp, les photos et les vidéos de projets des éditions passées.',
            ar: 'تصفّح الفائزين والمتحدثين وبرنامج المعسكر والصور وفيديوهات المشاريع من الدورات السابقة.',
        },
    },
};

export default function ProgramArchivesHubSection({ program = 'tilila' }) {
    const { editions: rawEditions } = usePage().props;
    const { locale } = useTranslation();
    const copy = HUB_COPY[program] ?? HUB_COPY.tilila;

    const archiveEditions = useMemo(() => {
        if (program === 'tililab') {
            return buildTililabArchiveEditions(rawEditions ?? []);
        }

        return buildArchiveEditions(rawEditions ?? []);
    }, [program, rawEditions]);

    const [year, setYear] = useState(() => latestArchiveYear(archiveEditions));
    const [galleryFilter, setGalleryFilter] = useState('all');

    const years = useMemo(
        () => archiveEditions.map((edition) => edition.year),
        [archiveEditions],
    );

    const laureatCards = useMemo(
        () => buildLaureatCards(archiveEditions, year, locale, program),
        [archiveEditions, year, locale, program],
    );

    const galleryItems = useMemo(() => {
        const all = buildGalleryItems(archiveEditions, year, program);
        return filterGalleryItems(all, galleryFilter);
    }, [archiveEditions, year, galleryFilter, program]);

    const bootcampItems = useMemo(
        () =>
            program === 'tililab'
                ? buildBootcampArchiveItems(archiveEditions, year)
                : [],
        [archiveEditions, year, program],
    );

    const sections = useMemo(
        () => buildCategorySections(archiveEditions, year, locale),
        [archiveEditions, year, locale],
    );

    const detailsUrl = hubEditionCta(archiveEditions, year, program);
    const fullArchivesUrl = hubArchivesUrl(program);

    return (
        <TililaSection
            id="archives"
            className="border-t border-brand-primary/10 bg-beta-white py-14 sm:py-16"
        >
            <RevealOnScroll>
                <TililaContainer>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-[11px] font-bold tracking-[0.28em] text-beta-turquoise uppercase">
                                <TransText
                                    en="Archives"
                                    fr="Archives"
                                    ar="الأرشيف"
                                />
                            </p>
                            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-beta-blue sm:text-3xl">
                                <TransText {...copy.title} />
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-tgray sm:text-base">
                                <TransText {...copy.description} />
                            </p>
                        </div>

                        <Link
                            href={fullArchivesUrl}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-beta-blue bg-twhite px-5 py-3 text-xs font-bold tracking-[0.1em] text-beta-blue uppercase transition hover:bg-beta-blue hover:text-twhite sm:w-auto"
                        >
                            <TransText
                                en="Full archives"
                                fr="Archives complètes"
                                ar="الأرشيف الكامل"
                            />
                            <ArrowRight className="size-4" aria-hidden />
                        </Link>
                    </div>
                </TililaContainer>
            </RevealOnScroll>

            <div className="mt-8">
                <ArchivesToolbar
                    program={program}
                    onProgramChange={() => {}}
                    years={years}
                    year={year}
                    onYearChange={setYear}
                    hideProgramToggle
                />
            </div>

            <TililaContainer className="mt-8 space-y-8 sm:mt-10">
                <SectionCard>
                    <ArchivesLaureatsSection
                        cards={laureatCards}
                        year={year}
                        program={program}
                        detailsUrl={detailsUrl}
                    />
                </SectionCard>

                <SectionCard>
                    <ArchivesJurySection
                        members={sections.jurys}
                        program={program}
                        year={year}
                        detailsUrl={detailsUrl}
                    />
                </SectionCard>

                {/* {program === 'tililab' ? (
                    <SectionCard>
                        <ArchivesBootcampSection
                            items={bootcampItems}
                            year={year}
                            detailsUrl={detailsUrl}
                            locale={locale}
                        />
                    </SectionCard>
                ) : null} */}

                <SectionCard>
                    <ArchivesGallerySection
                        items={galleryItems}
                        year={year}
                        program={program}
                        filter={galleryFilter}
                        onFilterChange={setGalleryFilter}
                        detailsUrl={detailsUrl}
                    />
                </SectionCard>
            </TililaContainer>
        </TililaSection>
    );
}
