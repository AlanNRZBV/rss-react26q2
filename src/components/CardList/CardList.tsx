import { useCallback } from 'react';
import { useMatchRoute } from '@tanstack/react-router';
import Card from '../Card/Card.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import { Route } from '../../routes/_layout.tsx';
import { usePokemons } from '../../hooks/usePokemons.ts';

type CardListProps = {
  searchTerm: string;
};

const LIMIT = 10;

const CardList = ({ searchTerm }: CardListProps) => {
  const { page } = Route.useSearch();
  const { pokemons, loading, error, totalPages } = usePokemons(
    searchTerm,
    page,
    LIMIT
  );

  const navigate = Route.useNavigate();
  const matchRoute = useMatchRoute();

  const isDetailsOpen = !!matchRoute({ to: '/$pokemonId' });

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate({
        search: (prev) => ({
          ...prev,
          page: newPage ?? 1,
        }),
      });
    },
    [navigate]
  );

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
