import { Suspense } from 'react';
import { getPokemonsList } from '../../lib/api/pokemon';
import Pagination from '../../components/Pagination/Pagination';
import SelectionFlyout from '../../components/SelectionFlyout/SelectionFlyout';
import CardGrid from '../../components/CardList/CardList';
import PokemonDetails from '../../components/PokemonDetails/PokemonDetails';
import Header from '../../components/Header/Header';
import SimulateErrorButton from '../../components/SimulateErrorButton/SimulateErrorButton';

const PAGE_SIZE = 25;

type PageProps = {
  searchParams: Promise<{ page?: string; q?: string; id?: string }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const { page = '1', q = '', id } = await searchParams;
  const currentPage = Number(page) || 1;
  const { results, total } = await getPokemonsList(q, currentPage, PAGE_SIZE);
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const isDetailsOpen = Boolean(id);

  return (
    <>
      <Header initialQuery={q} />
      <main className="flex flex-col lg:flex-row gap-6">
        <div
          className={`transition-all duration-300 ${isDetailsOpen ? 'w-full lg:w-2/3' : 'w-full'}`}
        >
          <CardGrid pokemons={results} isDetailsOpen={isDetailsOpen} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            query={q}
          />
        </div>
        {isDetailsOpen && (
          <aside className="w-full lg:w-1/3 top-4">
            <Suspense fallback={<DetailsSpinner />}>
              <PokemonDetails id={id!} />
            </Suspense>
          </aside>
        )}
        <SelectionFlyout />
      </main>
      <SimulateErrorButton />
    </>
  );
}

function DetailsSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
    </div>
  );
}
