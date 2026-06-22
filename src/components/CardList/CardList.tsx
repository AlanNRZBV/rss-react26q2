import Card from '../Card/Card';
import LocalError from '../LocalError/LocalError';
import type { PokemonCardData } from '../../types/types';

type CardGridProps = {
  pokemons: PokemonCardData[];
  isDetailsOpen: boolean;
};

export default function CardGrid({ pokemons, isDetailsOpen }: CardGridProps) {
  if (pokemons.length === 0) {
    return <LocalError error={new Error('No results')} />;
  }

  return (
    <div
      className={`grid gap-2 lg:gap-4 ${
        isDetailsOpen
          ? 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-3'
          : 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-5'
      }`}
    >
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
