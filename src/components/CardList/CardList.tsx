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

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: newPage ?? 1,
      }),
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div
          role="status"
          aria-label="Loading pokemons"
          className="h-10 w-10 animate-spin rounded-full border-4
          border-blue-500 border-t-transparent"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="py-8 text-center text-red-600 rounded-2xl border
        border-gray-200 bg-white shadow-sm"
      >
        <p>{error}</p>
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div
        className="py-16 text-center rounded-2xl border border-gray-200
        bg-white shadow-sm"
      >
        <p className="text-gray-500 font-medium">No results</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        className={`grid gap-2 lg:gap-4 transition-all duration-300
        ${
          isDetailsOpen
            ? 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-5'
        }`}
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
    </div>
  );
};

export default CardList;
