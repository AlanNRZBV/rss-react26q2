import { useCallback } from 'react';
import type { PokemonCardData, PokemonDetailedData } from '../types/types.ts';

export const useCsvDownload = () => {
  const downloadCsv = useCallback((items: PokemonCardData[]) => {
    if (!items || items.length === 0) return;

    const headers = [
      'Name',
      'Details URL',
      'Types',
      'HP',
      'Attack',
      'Weight (kg)',
      'Height (m)',
      'Abilities',
    ];

    const formatString = (value: string | number) => {
      const str = String(value).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = items.map((item) => {
      const detailsUrl = `${window.location.origin}/${item.id}`;
      const isDetailed = 'weight' in item;
      const detailed = isDetailed ? (item as PokemonDetailedData) : null;

      return [
        formatString(item.name),
        formatString(detailsUrl),
        formatString(item.types.join(', ')),
        formatString(item.stats.hp),
        formatString(item.stats.attack),
        formatString(detailed ? detailed.weight / 10 : 'N/A'),
        formatString(detailed ? detailed.height / 10 : 'N/A'),
        formatString(detailed ? detailed.abilities.join(', ') : 'N/A'),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const fileName = `${items.length}_items.csv`;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return { downloadCsv };
};
