import { useMatchRoute } from '@tanstack/react-router';
import Card from '../Card/Card.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import { Route } from '../../routes/_layout.tsx';
import { getPokemonsQueryOptions } from '../../api/queries.ts';
import { useQuery } from '@tanstack/react-query';

type CardListProps = {
  searchTerm: string;
};

const LIMIT = 25;

const CardList = ({ searchTerm }: CardListProps) => {
  const { page } = Route.useSearch();

  const { data, isPending, isError, error } = useQuery(
    getPokemonsQueryOptions(searchTerm, page, LIMIT)
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

  if (isPending) {
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

  if (isError) {
    return (
      <div
        className="py-8 text-center text-red-600 rounded-2xl border
        border-gray-200 bg-white shadow-sm"
      >
        <p>{error.message}</p>
      </div>
    );
  }

  const pokemons = data?.results || [];
  const totalPages = data?.total || 0;

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
        className={`grid gap-2 lg:gap-4
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
