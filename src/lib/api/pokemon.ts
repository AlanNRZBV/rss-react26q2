import { handleApiError } from '../../api/errorHandler';
import {
  formatDetailedPokemonData,
  formatPokemonData,
} from '../pokemonMappers';

const API_BASE = 'https://pokeapi.co/api/v2/pokemon';
const REVALIDATE_SECONDS = Number(process.env.API_TTL_VALUE ?? 120);

export async function getPokemonsList(
  searchTerm: string,
  page: number,
  limit = 25
) {
  const term = searchTerm.trim().toLowerCase();
  const offset = (page - 1) * limit;

  try {
    if (term) {
      const res = await fetch(`${API_BASE}/${term}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      return { results: [formatPokemonData(data)], total: 1 };
    }

    const listRes = await fetch(`${API_BASE}?limit=${limit}&offset=${offset}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    const list = await listRes.json();

    const detailed = await Promise.all(
      list.results.map(async (item: { url: string }) => {
        const r = await fetch(item.url, {
          next: { revalidate: REVALIDATE_SECONDS },
        });
        return formatPokemonData(await r.json());
      })
    );

    return { results: detailed, total: list.count };
  } catch (error) {
    handleApiError(error, term);
    return { results: [], total: 0 };
  }
}

export async function getPokemonDetails(id: string) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    return formatDetailedPokemonData(await res.json());
  } catch (error) {
    handleApiError(error, id);
    return null;
  }
}
