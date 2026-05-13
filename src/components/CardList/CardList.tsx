import { useState, useEffect } from 'react';
import Card from '../Card/Card.tsx';
import { fetchPokemons } from '../../api/pokemons.ts';
import type { PokemonCardData } from '../../types';
import Pagination from '../Pagination/Pagination.tsx';
import { Route } from '../../routes';
import { useNavigate } from '@tanstack/react-router';

type CardListProps = {
  searchTerm: string;
};

const LIMIT = 10;

const CardList = ({ searchTerm }: CardListProps) => {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.id });

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const offset = (page - 1) * LIMIT;
        const data = await fetchPokemons(searchTerm, LIMIT, offset);
        setPokemons(data.results);
        setTotalPages(Math.ceil(data.total / LIMIT));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, [searchTerm, page]);

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  if (loading) {
    return (
      <main
        className="flex justify-center items-center py-16 rounded-2xl
        border border-gray-200 bg-white shadow-sm"
      >
        <div
          role="status"
          aria-label="Loading pokemons"
          className="h-10 w-10 animate-spin rounded-full border-4
          border-blue-500 border-t-transparent"
        />
      </main>
    );
  }

  if (error) {
    return (
      <main
        className="py-8 text-center text-red-600 rounded-2xl border
        border-gray-200 bg-white shadow-sm"
      >
        <p>{error}</p>
      </main>
    );
  }

  if (pokemons.length === 0) {
    return (
      <main
        className="py-16 text-center rounded-2xl border border-gray-200
        bg-white shadow-sm"
      >
        <p className="text-gray-500 font-medium">No results</p>
      </main>
    );
  }

  return (
    <main
      className="flex flex-col gap-6 rounded-2xl border border-gray-200
      bg-white shadow-sm p-6"
    >
      <div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6
     "
      >
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default CardList;
