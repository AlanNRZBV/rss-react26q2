import type { PokemonCardData } from '../../types';

export type CardListProps = {
  searchTerm: string;
};

export type CardListState = {
  pokemons: PokemonCardData[];
  loading: boolean;
  error: string | null;
};
