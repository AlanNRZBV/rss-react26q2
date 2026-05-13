import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { STORAGE_KEY } from '../lib/constants.ts';
import Header from '../components/Header/Header.tsx';
import CardList from '../components/CardList/CardList.tsx';
import CustomButton from '../components/UI/CustomButton/CustomButton.tsx';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  validateSearch: (search) => {
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
      <CardList searchTerm={activeSearchTerm} />
      <CustomButton
        onClick={handleSimulateError}
        className="self-end bg-red-200"
      >
        Simulate Error
      </CustomButton>
    </>
  );
}
