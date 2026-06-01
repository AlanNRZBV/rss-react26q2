import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseApi } from '../api/instance.ts';
import { handleApiError } from '../api/errorHandler.ts';
import { formatPokemonData } from '../lib/pokemonMappers.ts';

export const getPokemonsQueryOptions = (
  searchTerm = '',
  page = 1,
  limit = 25
) => {
  const term = searchTerm.trim().toLowerCase();

  return queryOptions({
    queryKey: ['pokemons', 'list', { term, page, limit }] as const,
    staleTime: import.meta.env.VITE_API_TTL_VALUE || 120,
    queryFn: async () => {
      const offset = (page - 1) * limit;
      try {
        if (term) {
          const { data } = await baseApi.get(`/${term}`);
          return {
            results: [formatPokemonData(data)],
            total: 1,
          };
        }

        const listResponse = await baseApi.get<{
          count: number;
          results: { name: string; url: string }[];
        }>(`?limit=${limit}&offset=${offset}`);

        const totalCount = listResponse.data.count;

        const detailedPromises = listResponse.data.results.map(async (item) => {
          const { data } = await axios.get(item.url);
          return formatPokemonData(data);
        });

        const detailedResults = await Promise.all(detailedPromises);

        return {
          results: detailedResults,
          total: totalCount,
        };
      } catch (error) {
        handleApiError(error, term);
      }
    },
  });
};

export const usePokemons = (searchTerm: string, page: number, limit = 25) => {
  return useQuery(getPokemonsQueryOptions(searchTerm, page, limit));
};
