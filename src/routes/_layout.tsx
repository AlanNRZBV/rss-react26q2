import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { STORAGE_KEY } from '../lib/constants.ts';
import Header from '../components/Header/Header.tsx';
import CardList from '../components/CardList/CardList.tsx';
import CustomButton from '../components/UI/CustomButton/CustomButton.tsx';
import SelectionFlyout from '../components/SelectionFlyout/SelectionFlyout.tsx';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page) || 1,
    };
  },
});

function RouteComponent() {
  const [throwError, setThrowError] = useState(false);
  const [activeSearchTerm, setActiveSearchTerm] = useLocalStorage(
    STORAGE_KEY,
    ''
  );
  const [searchTerm, setSearchTerm] = useState(activeSearchTerm);

  const matchRoute = useMatchRoute();
  const isDetailsOpen = !!matchRoute({ to: '/$pokemonId' });

  const handleSimulateError = () => {
    console.error('Simulated error triggered by user');
    setThrowError(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    setActiveSearchTerm(trimmedTerm);
    setSearchTerm(trimmedTerm);
  };

  if (throwError) {
    throw new Error('Simulated application error');
  }

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />
      <main className="flex flex-col lg:flex-row gap-6">
        <div
          className={`transition-all duration-300 ${
            isDetailsOpen ? 'w-full lg:w-2/3' : 'w-full'
          }`}
        >
          <CardList searchTerm={activeSearchTerm} />
        </div>
        {isDetailsOpen && (
          <aside className="w-full lg:w-1/3 top-4">
            <Outlet />
          </aside>
        )}
        <SelectionFlyout />
      </main>
      <CustomButton
        onClick={handleSimulateError}
        className="self-end bg-red-200"
      >
        Simulate Error
      </CustomButton>
    </>
  );
}
