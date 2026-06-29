import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { RevealOnScroll } from '@/components/motion/home-motion';
import TransText from '@/components/TransText';
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
import { buildArchiveEditions } from '@/pages/user/tilila/utils/archiveEditions';
import {
    buildCategorySections,
    buildGalleryItems,
    buildLaureatCards,
    filterGalleryItems,
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

export default function TililaArchivesHubSection() {
    const { editions: rawEditions } = usePage().props;
    const { locale } = useTranslation();
    const [year, setYear] = useState('all');
    const [galleryFilter, setGalleryFilter] = useState('all');

    const tililaEditions = useMemo(
        () => buildArchiveEditions(rawEditions ?? []),
        [rawEditions],
    );

    const years = useMemo(
        () => tililaEditions.map((edition) => edition.year),
        [tililaEditions],
    );

    const laureatCards = useMemo(
        () => buildLaureatCards(tililaEditions, year, locale, 'tilila'),
        [tililaEditions, year, locale],
    );

    const galleryItems = useMemo(() => {
        const all = buildGalleryItems(tililaEditions, year);
        return filterGalleryItems(all, galleryFilter);
    }, [tililaEditions, year, galleryFilter]);

    const sections = useMemo(
        () => buildCategorySections(tililaEditions, year, locale),
        [tililaEditions, year, locale],
    );

    const detailsUrl = hubEditionCta(tililaEditions, year);

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
                                <TransText
                                    en="Palmarès & archives"
                                    fr="Palmarès & archives"
                                    ar="السجل والأرشيف"
                                />
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-tgray sm:text-base">
                                <TransText
                                    en="Browse winners, jury members, photos, ceremony replays and winner videos from past editions."
                                    fr="Parcourez les lauréats, les jurys, les photos, les replays de cérémonie et les vidéos des lauréats des éditions passées."
                                    ar="تصفّح الفائزين ولجان التحكيم والصور وإعادات الحفل وفيديوهات الفائزين من الدورات السابقة."
                                />
                            </p>
                        </div>

                        <Link
                            href="/tilila/archives"
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
                    program="tilila"
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
                        program="tilila"
                        detailsUrl={detailsUrl}
                    />
                </SectionCard>

                <SectionCard>
                    <ArchivesJurySection
                        members={sections.jurys}
                        program="tilila"
                        year={year}
                        detailsUrl={detailsUrl}
                    />
                </SectionCard>

                <SectionCard>
                    <ArchivesGallerySection
                        items={galleryItems}
                        year={year}
                        program="tilila"
                        filter={galleryFilter}
                        onFilterChange={setGalleryFilter}
                        detailsUrl={detailsUrl}
                    />
                </SectionCard>
            </TililaContainer>
        </TililaSection>
    );
}
