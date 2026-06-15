import { memo, useMemo, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = memo(({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const yearDataMaps = useMemo(
    () => new Map(countries.map((c) => [c.id, createYearDataMap(c.data)])),
    [countries],
  );

  const filteredCountries = useMemo(() => {
    return countries
      .filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        }
        const popA = getPopulationForYear(yearDataMaps.get(a.id)!, selectedYear) ?? 0;
        const popB = getPopulationForYear(yearDataMaps.get(b.id)!, selectedYear) ?? 0;
        return sortOrder === 'asc' ? popA - popB : popB - popA;
      });
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder, yearDataMaps]);

  const itemContent = useCallback(
    (_index: number, country: Country) => (
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    ),
    [selectedYear, selectedColumns],
  );

  return (
    <Virtuoso
      className={styles.countryList}
      data={filteredCountries}
      itemContent={itemContent}
    />
  );
});
