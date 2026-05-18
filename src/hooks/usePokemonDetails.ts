import { useState, useEffect } from 'react';
import { fetchPokemonById } from '../api/pokemons.ts';
import type { PokemonDetailedData } from '../types/types';

export const usePokemonDetails = (pokemonId: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetailedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPokemonById(pokemonId);
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error');
      } finally {
        setLoading(false);
      }
    };

    if (pokemonId) {
      loadDetails();
    }
  }, [pokemonId]);

  return { pokemon, loading, error };
};
