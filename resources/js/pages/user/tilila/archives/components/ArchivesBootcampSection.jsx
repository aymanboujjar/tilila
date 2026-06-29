import TransText from '@/components/TransText';
import ArchivesSectionHeading from '@/pages/user/tilila/archives/components/ArchivesSectionHeading';
import TililabBootcampProgramme from '@/pages/user/tililab/components/TililabBootcampProgramme';

export default function ArchivesBootcampSection({
    items = [],
    year,
    detailsUrl,
    locale,
}) {
    const yearLabel = year === 'all' ? '' : ` ${year}`;

    if (!items.length) {
        return (
            <section id="bootcamp-programme" className="scroll-mt-32">
                <ArchivesSectionHeading
                    kicker={
                        <TransText en="Tililab" fr="Tililab" ar="تيليلاب" />
                    }
                    title={
                        <TransText
                            en={`Bootcamp programme${yearLabel}`}
                            fr={`Programme bootcamp${yearLabel}`}
                            ar={`برنامج المعسكر${yearLabel}`}
                        />
                    }
                />
                <p className="mt-8 rounded-2xl border border-dashed border-tililab-cyan/30 bg-alpha-tililab px-6 py-12 text-center text-sm text-tililab-slate">
                    <TransText
                        en="Bootcamp programme for this selection will be published soon."
                        fr="Le programme bootcamp pour cette sélection sera publié prochainement."
                        ar="سيُنشر برنامج المعسكر لهذا الاختيار قريبًا."
                    />
                </p>
            </section>
        );
    }

    return (
        <section id="bootcamp-programme" className="scroll-mt-32">
            <ArchivesSectionHeading
                kicker={
                    <TransText en="Tililab" fr="Tililab" ar="تيليلاب" />
                }
                title={
                    <TransText
                        en={`Bootcamp programme${yearLabel}`}
                        fr={`Programme bootcamp${yearLabel}`}
                        ar={`برنامج المعسكر${yearLabel}`}
                    />
                }
            />

            <div className="mt-8 space-y-8">
                {items.map((item) => (
                    <TililabBootcampProgramme
                        key={item.year}
                        bootcamp={item.bootcamp}
                        year={item.year}
                        locale={locale}
                        detailsUrl={detailsUrl}
                        expandFirstDay={items.length === 1}
                    />
                ))}
            </div>
        </section>
    );
}

export function EditionBootcampSchedule({ bootcamp, locale }) {
    if (!bootcamp || typeof bootcamp !== 'object') {
        return null;
    }

    return (
        <TililabBootcampProgramme
            bootcamp={bootcamp}
            locale={locale}
            expandFirstDay
        />
    );
}
