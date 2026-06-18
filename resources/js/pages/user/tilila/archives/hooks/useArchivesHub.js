import { useCallback, useMemo, useState } from 'react';

export function useArchivesHub(tililaEditions, tililabEditions) {
    const [program, setProgramState] = useState('tilila');
    const [selectedYear, setSelectedYear] = useState('all');
    const [galleryFilter, setGalleryFilter] = useState('all');

    const setProgram = useCallback((nextProgram) => {
        setProgramState(nextProgram);
        setSelectedYear('all');
        setGalleryFilter('all');
    }, []);

    const activeEditions = useMemo(
        () => (program === 'tilila' ? tililaEditions : tililabEditions),
        [program, tililaEditions, tililabEditions],
    );

    const years = useMemo(
        () => activeEditions.map((e) => e.year),
        [activeEditions],
    );

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
