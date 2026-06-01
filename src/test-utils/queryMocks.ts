/* eslint-disable @tanstack/query/exhaustive-deps */
import { mockPokemonList, mockPokemonDetailed } from './mocks/pokemonData';
import {
  getPokemonsQueryOptions,
  getPokemonDetailsQueryOptions,
} from '../api/queries';

export const mockPokemonsQuery = (
  results = mockPokemonList,
  total = results.length
) =>
  ({
    queryKey: ['pokemons', 'list', { term: '', page: 1, limit: 25 }],
    queryFn: () => Promise.resolve({ results, total }),
  }) as unknown as ReturnType<typeof getPokemonsQueryOptions>;

export const mockPokemonDetailsQuery = (details = mockPokemonDetailed) =>
  ({
    queryKey: ['pokemons', 'details', details.id.toString()],
    queryFn: () => Promise.resolve(details),
  }) as unknown as ReturnType<typeof getPokemonDetailsQueryOptions>;

export const mockQueryError = (message: string) => ({
  queryKey: ['pokemons', 'list', 'error'],
  queryFn: () => Promise.reject(new Error(message)),
});

export const mockQueryLoading = () => ({
  queryKey: ['pokemons', 'list', 'loading'],
  queryFn: () => new Promise(() => {}),
});
