import { Route } from '../../routes/_layout.tsx';
import type { PokemonCardData } from '../../types/types';
import type { FC, MouseEvent } from 'react';
import { usePokemonActions, useSelectedPokemons } from '../../store/store.ts';

type CardProps = {
  pokemon: PokemonCardData;
};

const Card: FC<CardProps> = ({ pokemon }) => {
  const navigate = Route.useNavigate();
  const parsedId = String(pokemon.id);

  const selectedPokemons = useSelectedPokemons();
  const { togglePokemons } = usePokemonActions();
  const isSelected = selectedPokemons.includes(parsedId);

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
      className={`relative cursor-pointer rounded-lg border bg-white p-4 
      shadow-sm flex flex-col items-center gap-2 transition-all hover:shadow-md 
      dark:bg-gray-900 dark:hover:shadow-gray-800/25
      ${
        isSelected
          ? 'border-indigo-500 ring-1 ring-indigo-500 dark:border-indigo-400 dark:ring-indigo-400'
          : 'border-gray-200 dark:border-gray-800 dark:hover:border-gray-700'
      }`}
    >
      <div
        className="absolute left-3 top-3"
        onClick={(e) => e.stopPropagation()}
      >
        <label
          htmlFor={`checkbox-${pokemon.id}`}
          className="flex cursor-pointer items-start gap-4"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`checkbox-${pokemon.id}`}
              checked={isSelected}
              onChange={() => togglePokemons(parsedId)}
              className="size-4 rounded border-gray-300 text-indigo-600
              focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-900
              dark:ring-offset-gray-900 dark:checked:bg-indigo-500
              dark:checked:border-indigo-500 cursor-pointer"
            />
          </div>
        </label>
      </div>
      <img
        src={pokemon.imageUrl || 'https://placehold.co/64x128?text=NoImage'}
        alt={pokemon.name || ''}
        className="h-24 w-24 object-contain"
      />
      <h3 className="capitalize font-semibold text-gray-800 dark:text-white">
        {pokemon.name || 'N/A'}
      </h3>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon.types?.map((type) => (
          <span
            key={type}
            className="rounded-full bg-blue-100 px-2 py-0.5 text-xs
            text-blue-700 capitalize dark:bg-blue-800/20 dark:text-blue-300"
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
};

export default Card;
