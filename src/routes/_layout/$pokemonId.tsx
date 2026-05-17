import { createFileRoute } from '@tanstack/react-router';
import { Route as LayoutRoute } from '../../routes/_layout.tsx';
import { usePokemonDetails } from '../../hooks/usePokemonDetails.ts';

export const Route = createFileRoute('/_layout/$pokemonId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { pokemonId } = Route.useParams();
  const navigate = LayoutRoute.useNavigate();

  const { pokemon, loading, error } = usePokemonDetails(pokemonId);

  const handleClose = () => {
    navigate({
      to: '/',
      search: (prev) => ({
        ...prev,
        page: prev.page ?? 1,
      }),
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4
          border-indigo-500 border-t-transparent"
        />
      </div>
    );
  }

  if (error || !pokemon) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="sticky top-4 flex flex-col gap-4 p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold capitalize text-gray-900">
          {pokemon.name}
        </h2>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-900 transition-colors"
          aria-label="Close details"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <img
        src={pokemon.imageUrl || 'https://placehold.co/200x200?text=NoImage'}
        alt={pokemon.name}
        className="h-48 w-48 object-contain self-center"
      />
      <div className="mt-4 space-y-4">
        <div
          className="flex justify-between rounded-lg bg-white p-3 border
          border-gray-100 shadow-sm"
        >
          <div className="text-center w-1/2 border-r border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Weight
            </p>
            <p className="font-medium text-gray-800">
              {pokemon.weight / 10} kg
            </p>
          </div>
          <div className="text-center w-1/2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Height
            </p>
            <p className="font-medium text-gray-800">{pokemon.height / 10} m</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Types</h3>
          <div className="flex gap-2 mt-1">
            {pokemon.types?.map((type) => (
              <span
                key={type}
                className="rounded-full bg-indigo-100 px-3 py-1
                text-sm text-indigo-700 capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Abilities</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {pokemon.abilities?.map((ability) => (
              <span
                key={ability}
                className="rounded bg-green-50 px-2 py-1 text-xs
                text-green-700 capitalize border border-green-200"
              >
                {ability}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Base Stats</h3>
          <ul className="mt-1 space-y-1 text-gray-600">
            <li className="flex justify-between">
              <span>HP</span>
              <span className="font-medium">{pokemon.stats.hp}</span>
            </li>
            <li className="flex justify-between">
              <span>Attack</span>
              <span className="font-medium">{pokemon.stats.attack}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
