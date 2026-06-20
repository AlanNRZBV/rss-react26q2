import Image from 'next/image';
import { getPokemonDetails } from '../../lib/api/pokemon';
import type { PokemonDetailedData } from '../../types/types';
import PokemonDetailsSelect from './PokemonDetailsSelect';

const MEASUREMENTS_CONFIG = [
  {
    label: 'Weight',
    getValue: (p: PokemonDetailedData) => `${(p.weight || 0) / 10} kg`,
    hasBorder: true,
  },
  {
    label: 'Height',
    getValue: (p: PokemonDetailedData) => `${(p.height || 0) / 10} m`,
    hasBorder: false,
  },
];

const BADGES_CONFIG = [
  {
    title: 'Types',
    getItems: (p: PokemonDetailedData) => p.types || [],
    colorClass:
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  },
  {
    title: 'Abilities',
    getItems: (p: PokemonDetailedData) => p.abilities || [],
    colorClass:
      'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  },
];

const STATS_CONFIG = [
  { label: 'HP', getValue: (p: PokemonDetailedData) => p.stats?.hp ?? 'N/A' },
  {
    label: 'Attack',
    getValue: (p: PokemonDetailedData) => p.stats?.attack ?? 'N/A',
  },
];

export default async function PokemonDetails({ id }: { id: string }) {
  const pokemon = await getPokemonDetails(id);

  if (!pokemon) {
    return null;
  }

  return (
    <div
      className="sticky top-4 flex flex-col gap-4 p-6 bg-white rounded-2xl
      border border-transparent shadow-sm transition-all hover:shadow-md
      dark:bg-gray-900 dark:hover:shadow-gray-800/25"
    >
      <PokemonDetailsSelect pokemon={pokemon} />
      <Image
        src={pokemon.imageUrl || 'https://placehold.co/200x200?text=NoImage'}
        alt={pokemon.name}
        width={192}
        height={192}
        className="h-48 w-48 object-contain self-center"
      />
      <div className="mt-4 space-y-4">
        <div
          className="flex justify-between rounded-lg bg-white p-3 border
          border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          {MEASUREMENTS_CONFIG.map((item) => (
            <div
              key={item.label}
              className={`text-center w-1/2 ${
                item.hasBorder
                  ? 'border-r border-gray-100 dark:border-gray-700'
                  : ''
              }`}
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider dark:text-gray-400">
                {item.label}
              </p>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {item.getValue(pokemon)}
              </p>
            </div>
          ))}
        </div>
        {BADGES_CONFIG.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {section.getItems(pokemon).map((badgeText) => (
                <span
                  key={badgeText}
                  className={`rounded-full px-3 py-1 text-xs capitalize ${section.colorClass}`}
                >
                  {badgeText}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">
            Base Stats
          </h3>
          <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400">
            {STATS_CONFIG.map((stat) => (
              <li
                key={stat.label}
                className="flex justify-between dark:text-gray-200"
              >
                <span>{stat.label}</span>
                <span className="font-medium">{stat.getValue(pokemon)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
