import { useCallback, useMemo, useState } from 'react';

import { latestArchiveYear } from '@/pages/user/tilila/utils/archiveEditions';

function initialProgram() {
    if (typeof window === 'undefined') {
        return 'tilila';
    }

    return new URLSearchParams(window.location.search).get('program') ===
        'tililab'
        ? 'tililab'
        : 'tilila';
}

export function useArchivesHub(tililaEditions, tililabEditions) {
    const [program, setProgramState] = useState(initialProgram);
    const [selectedYear, setSelectedYear] = useState(() => {
        const editions =
            initialProgram() === 'tililab' ? tililabEditions : tililaEditions;

        return latestArchiveYear(editions);
    });
    const [galleryFilter, setGalleryFilter] = useState('all');

    const setProgram = useCallback(
        (nextProgram) => {
            setProgramState(nextProgram);
            const editions =
                nextProgram === 'tilila' ? tililaEditions : tililabEditions;
            setSelectedYear(latestArchiveYear(editions));
            setGalleryFilter('all');
        },
        [tililaEditions, tililabEditions],
    );

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
