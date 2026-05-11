import axios from 'axios';
import type { PokemonCardData } from '../types';
import { baseApi } from './instance.ts';

type RawStat = {
  stat: { name: string };
  base_stat: number;
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
  sprites: RawSprites;
  types: RawType[];
  stats: RawStat[];
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
  limit = 18,
  offset = 0
): Promise<PokemonCardData[]> {
  try {
    const term = searchTerm.trim().toLowerCase();

    if (term) {
      const { data } = await baseApi.get(`/${term}`);

      return [formatPokemonData(data)];
    }

    const listResponse = await baseApi.get(`?limit=${limit}&offset=${offset}`);

    const detailedPromises = listResponse.data.results.map(
      async (item: { name: string; url: string }) => {
        const { data } = await axios.get(item.url);

        return formatPokemonData(data);
      }
    );

    return await Promise.all(detailedPromises);
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
