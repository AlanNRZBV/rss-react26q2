import axios from 'axios';
import type { PokemonCardData, PokemonDetailedData } from '../types/types';
import { baseApi } from './instance.ts';

type RawStat = {
  stat: { name: string };
  base_stat: number;
};

type RawAbility = {
  ability: { name: string };
};

type RawType = {
  type: { name: string };
};

type RawSprites = {
  front_default: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
};

type PokeAPIDetails = {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: RawSprites;
  types: RawType[];
  stats: RawStat[];
  abilities: RawAbility[];
};

export type PokemonsResponse = {
  results: PokemonCardData[];
  total: number;
};

function formatDetailedPokemonData(
  details: PokeAPIDetails
): PokemonDetailedData {
  return {
    ...formatPokemonData(details),
    weight: details.weight,
    height: details.height,
    abilities: details.abilities.map((a: RawAbility) => a.ability.name),
  };
}

export const fetchPokemonById = async (
  id: string
): Promise<PokemonDetailedData> => {
  try {
    const { data } = await baseApi.get(`/${id}`);
    return formatDetailedPokemonData(data);
  } catch {
    throw new Error(`Failed to load details for pokemon #${id}`);
  }
};

function formatPokemonData(details: PokeAPIDetails): PokemonCardData {
  return {
    id: details.id,
    name: details.name,
    imageUrl:
      details.sprites.other['official-artwork'].front_default ||
      details.sprites.front_default,
    types: details.types.map((t: RawType) => t.type.name),
    stats: {
      hp:
        details.stats.find((s: RawStat) => s.stat.name === 'hp')?.base_stat ??
        0,
      attack:
        details.stats.find((s: RawStat) => s.stat.name === 'attack')
          ?.base_stat ?? 0,
    },
  };
}

export async function fetchPokemons(
  searchTerm = '',
  limit = 10,
  offset = 0
): Promise<PokemonsResponse> {
  try {
    const term = searchTerm.trim().toLowerCase();

    if (term) {
      const { data } = await baseApi.get(`/${term}`);
      return {
        results: [formatPokemonData(data)],
        total: 1,
      };
    }

    const listResponse = await baseApi.get<{
      count: number;
      previous: string;
      next: string;
      results: { name: string; url: string }[];
    }>(`?limit=${limit}&offset=${offset}`);
    const totalCount = listResponse.data.count;

    const detailedPromises = listResponse.data.results.map(
      async (item: { name: string; url: string }) => {
        const { data } = await axios.get(item.url);

        return formatPokemonData(data);
      }
    );

    const detailedResults = await Promise.all(detailedPromises);

    return {
      results: detailedResults,
      total: totalCount,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status && status >= 400) {
        throw new Error(
          status === 404
            ? `No Pokémon found for "${searchTerm}".`
            : `Server error (${status}). Please try again later.`
        );
      }
      throw new Error(error.message);
    }
    throw error;
  }
}
