import { useEffect, useMemo, useState } from 'react';

export function useArchivesHub(tililaEditions, tililabEditions) {
    const [program, setProgram] = useState('tilila');
    const [selectedYear, setSelectedYear] = useState('all');
    const [galleryFilter, setGalleryFilter] = useState('all');

    const activeEditions = useMemo(
        () => (program === 'tilila' ? tililaEditions : tililabEditions),
        [program, tililaEditions, tililabEditions],
    );

    const years = useMemo(
        () => activeEditions.map((e) => e.year),
        [activeEditions],
    );

    useEffect(() => {
        setSelectedYear('all');
        setGalleryFilter('all');
    }, [program]);

    const year = selectedYear ?? 'all';

    const scrollToSection = (sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return {
        program,
        setProgram,
        year,
        setSelectedYear,
        years,
        galleryFilter,
        setGalleryFilter,
        activeEditions,
        scrollToSection,
    };
}
