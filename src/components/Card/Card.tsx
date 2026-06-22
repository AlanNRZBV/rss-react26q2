import Image from 'next/image';
import type { PokemonCardData } from '../../types/types';
import CardSelect from './CardSelect.tsx';

export default function Card({ pokemon }: { pokemon: PokemonCardData }) {
  return (
    <div className="relative rounded-lg border bg-white p-4 shadow-sm flex flex-col items-center gap-2 dark:bg-gray-900 dark:border-gray-800">
      <CardSelect pokemon={pokemon} />
      <Image
        src={pokemon.imageUrl || 'https://placehold.co/64x128?text=NoImage'}
        alt={pokemon.name || ''}
        width={96}
        height={96}
        className="h-24 w-24 object-contain"
      />
      <h3 className="capitalize font-semibold text-gray-800 dark:text-white">
        {pokemon.name || 'N/A'}
      </h3>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon.types?.map((type) => (
          <span
            key={type}
            className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 capitalize dark:bg-blue-800/20 dark:text-blue-300"
          >
            {type}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-600 w-full mt-auto dark:text-gray-400">
        <p>HP: {pokemon.stats?.hp ?? 'N/A'}</p>
        <p>Attack: {pokemon.stats?.attack ?? 'N/A'}</p>
      </div>
    </div>
  );
}
