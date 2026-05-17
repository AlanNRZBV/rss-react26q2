import { useState, useEffect } from 'react';
import { fetchPokemons } from '../api/pokemons';
import type { PokemonCardData } from '../types';

export const usePokemons = (
  searchTerm: string,
  page: number,
  limit: number
) => {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (page - 1) * limit;
        const data = await fetchPokemons(searchTerm, limit, offset);
        setPokemons(data.results);
        setTotalPages(Math.ceil(data.total / limit));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchTerm, page, limit]);

  return { pokemons, loading, error, totalPages };
};
