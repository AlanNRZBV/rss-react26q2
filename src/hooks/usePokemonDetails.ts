import { queryOptions, useQuery } from '@tanstack/react-query';
import { baseApi } from '../api/instance.ts';
import { handleApiError } from '../api/errorHandler.ts';
import { formatDetailedPokemonData } from '../lib/pokemonMappers.ts';

export const getPokemonDetailsQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['pokemons', 'details', id] as const,
    queryFn: async () => {
      try {
        const { data } = await baseApi.get(`/${id}`);
        return formatDetailedPokemonData(data);
      } catch (error) {
        handleApiError(error, id);
      }
    },
  });
};

export const usePokemonDetails = (id: string) => {
  return useQuery(getPokemonDetailsQueryOptions(id));
};
