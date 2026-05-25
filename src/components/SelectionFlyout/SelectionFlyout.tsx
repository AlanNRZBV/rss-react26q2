import type { FC } from 'react';
import BarContainer from '../UI/BarContainer/BarContainer.tsx';
import CustomButton from '../UI/CustomButton/CustomButton.tsx';
import {
  usePokemonActions,
  useSelectedDetails,
  useSelectedPokemons,
} from '../../store/store.ts';

const SelectionFlyout: FC = () => {
  const selectedPokemons = useSelectedPokemons();
  const selectedDetail = useSelectedDetails();
  const { clearPokemons, clearDetails } = usePokemonActions();

  if (selectedPokemons.length === 0 && !selectedDetail) return null;

  const handleClearAll = () => {
    clearPokemons();
    clearDetails();
  };

  return (
    <div
      className="fixed inset-x-0 bottom-6 z-50 mx-auto px-4
      sm:px-6 lg:px-8 animate-fade-in-up"
    >
      <BarContainer className="mx-auto max-w-2xl shadow-2xl dark:shadow-gray-950/50">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {selectedPokemons.length > 0 && (
            <button
              onClick={clearPokemons}
              className="group flex items-center gap-3 rounded-full
              outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Clear selected list items"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center
                rounded-full bg-indigo-100 text-sm font-bold text-indigo-700
                transition-colors group-hover:bg-red-100
                group-hover:text-red-700 dark:bg-indigo-900/40
                dark:text-indigo-300 dark:group-hover:bg-red-900/40
                dark:group-hover:text-red-300"
              >
                {selectedPokemons.length}
              </span>
              <span
                className="flex items-center gap-1 text-sm font-medium
                text-gray-700 transition-colors group-hover:text-red-600
                dark:text-gray-300 dark:group-hover:text-red-400"
              >
                Items selected
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4 opacity-0 transition-opacity
                  group-hover:opacity-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          )}
          {selectedPokemons.length > 0 && selectedDetail && (
            <div
              className="hidden h-6 w-px bg-gray-200 dark:bg-gray-700
            sm:block"
            />
          )}
          {selectedDetail && (
            <button
              onClick={clearDetails}
              className="group flex items-center gap-2 rounded-full
              outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Clear selected detail"
            >
              <span className="relative flex size-3">
                <span
                  className="absolute inline-flex h-full w-full animate-ping
                  rounded-full bg-indigo-400 opacity-75 transition-colors
                  group-hover:bg-red-400"
                />
                <span
                  className="relative inline-flex size-3 rounded-full
                  bg-indigo-500 transition-colors group-hover:bg-red-500"
                />
              </span>
              <span
                className="flex items-center gap-1 text-sm font-medium
                text-indigo-600 transition-colors group-hover:text-red-600
                dark:text-indigo-400 dark:group-hover:text-red-400"
              >
                Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4 opacity-0 transition-opacity
                  group-hover:opacity-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-4 ml-auto pl-4">
          <CustomButton
            onClick={handleClearAll}
            className="border-transparent! bg-transparent!
            hover:bg-transparent! dark:bg-transparent!
            dark:hover:bg-transparent! shadow-none text-gray-500!
            hover:text-gray-900! dark:text-gray-400! dark:hover:text-white!"
          >
            Unselect all
          </CustomButton>
          <CustomButton>Download</CustomButton>
        </div>
      </BarContainer>
    </div>
  );
};

export default SelectionFlyout;
