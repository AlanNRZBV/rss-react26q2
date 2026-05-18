import { Route } from '../../routes/_layout.tsx';
import type { PokemonCardData } from '../../types/types';
import type { FC, MouseEvent } from 'react';

type CardProps = {
  pokemon: PokemonCardData;
};

const Card: FC<CardProps> = ({ pokemon }) => {
  const navigate = Route.useNavigate();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    navigate({
      to: '/$pokemonId',
      params: { pokemonId: String(pokemon.id) },
      search: (prev) => ({
        ...prev,
        page: prev.page ?? 1,
      }),
    });
  };

  if (!pokemon) {
    return null;
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-lg border border-gray-200
      bg-white p-4 shadow-sm flex flex-col items-center gap-2
      transition-all hover:shadow-md"
    >
      <img
        src={pokemon.imageUrl || 'https://placehold.co/64x128?text=NoImage'}
        alt={pokemon.name || ''}
        className="h-24 w-24 object-contain"
      />
      <h3 className="capitalize font-semibold text-gray-800">
        {pokemon.name || 'N/A'}
      </h3>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon.types?.map((type) => (
          <span
            key={type}
            className="rounded-full bg-blue-100 px-2 py-0.5 text-xs
            text-blue-700 capitalize"
          >
            {type}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-600 w-full mt-auto">
        <p>HP: {pokemon.stats?.hp ?? 'N/A'}</p>
        <p>Attack: {pokemon.stats?.attack ?? 'N/A'}</p>
      </div>
    </div>
  );
};

export default Card;
