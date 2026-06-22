import type { NextRequest } from 'next/server';
import { getPokemonDetails } from '../../../lib/api/pokemon';
import type { PokemonDetailedData } from '../../../types/types';

function escapeCsvField(value: string | number) {
  const str = String(value).replace(/"/g, '""');
  return `"${str}"`;
}

function buildCsvRow(item: PokemonDetailedData, origin: string) {
  const detailsUrl = `${origin}/${item.id}`;

  return [
    escapeCsvField(item.name),
    escapeCsvField(detailsUrl),
    escapeCsvField(item.types.join(', ')),
    escapeCsvField(item.stats.hp),
    escapeCsvField(item.stats.attack),
    escapeCsvField(item.weight / 10),
    escapeCsvField(item.height / 10),
    escapeCsvField(item.abilities.join(', ')),
  ].join(',');
}

export async function GET(request: NextRequest) {
  const idsParam = request.nextUrl.searchParams.get('ids') ?? '';
  const ids = [
    ...new Set(
      idsParam
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)
    ),
  ];

  if (ids.length === 0) {
    return new Response('No items selected', { status: 400 });
  }

  const details = await Promise.all(ids.map((id) => getPokemonDetails(id)));
  const validDetails = details.filter(
    (item): item is PokemonDetailedData => item !== null
  );

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

  const rows = validDetails.map((item) =>
    buildCsvRow(item, request.nextUrl.origin)
  );
  const csvContent = [headers.join(','), ...rows].join('\n');

  return new Response(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv;charset=utf-8;',
      'Content-Disposition': `attachment; filename="${validDetails.length}_items.csv"`,
    },
  });
}
