'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '../../i18n/navigation';
import { usePokemonActions, useSelectedDetails } from '../../store/store';
import type { PokemonDetailedData } from '../../types/types';

export default function PokemonDetailsSelect({
  pokemon,
}: {
  pokemon: PokemonDetailedData;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedDetails = useSelectedDetails();
  const { toggleDetails } = usePokemonActions();

  const isSelected = selectedDetails?.id === pokemon.id;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('id');
    router.push(params.size ? `${pathname}?${params.toString()}` : pathname);
  };

  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id={`detail-checkbox-${pokemon.id}`}
          checked={isSelected}
          onChange={() => toggleDetails(pokemon)}
          className="size-5 rounded border-gray-300 text-indigo-600
          focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-900
          dark:ring-offset-gray-900 dark:checked:bg-indigo-500
          dark:checked:border-indigo-500 cursor-pointer transition-all"
        />
        <label
          htmlFor={`detail-checkbox-${pokemon.id}`}
          className="text-2xl font-bold capitalize text-gray-900
          dark:text-white cursor-pointer hover:text-indigo-600
          dark:hover:text-indigo-400 transition-colors"
        >
          {pokemon.name}
        </label>
      </div>
      <button
        onClick={handleClose}
        className="text-gray-400 hover:text-gray-900 transition-colors
        dark:text-gray-500 dark:hover:text-white"
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
  );
}
