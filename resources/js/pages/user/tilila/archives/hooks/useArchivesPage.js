import { useCallback, useMemo, useState } from 'react';
import {
    enrichArchiveEdition,
    filterAndSortEditions,
} from '@/pages/user/tilila/utils/archivesPageData';

export function useArchivesPage(editions, locale) {
    const [query, setQuery] = useState('');
    const [yearFilter, setYearFilter] = useState('all');
    const [sort, setSort] = useState('newest');
    const [timelineYear, setTimelineYear] = useState(null);

    const enriched = useMemo(
        () => editions.map((e) => enrichArchiveEdition(e, locale)),
        [editions, locale],
    );

    const years = useMemo(() => enriched.map((e) => e.year), [enriched]);

    const filtered = useMemo(
        () =>
            filterAndSortEditions(
                enriched,
                { query, year: yearFilter, sort },
                locale,
            ),
        [enriched, query, yearFilter, sort, locale],
    );

    const hasActiveFilters =
        query.trim() !== '' || yearFilter !== 'all' || sort !== 'newest';

    const resetFilters = useCallback(() => {
        setQuery('');
        setYearFilter('all');
        setSort('newest');
        setTimelineYear(null);
    }, []);

    const scrollToYear = useCallback((year) => {
        setTimelineYear(year);
        const el = document.getElementById(`edition-${year}`);

        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return {
        query,
        setQuery,
        yearFilter,
        setYearFilter,
        sort,
        setSort,
        timelineYear,
        years,
        filtered,
        enriched,
        hasActiveFilters,
        resetFilters,
        scrollToYear,
    };
}
