'use client';

import type { MouseEvent } from 'react';
import { useRouter, usePathname } from '../../i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { usePokemonActions, useSelectedPokemons } from '../../store/store';
import type { PokemonCardData } from '../../types/types';

export default function CardSelect({ pokemon }: { pokemon: PokemonCardData }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedPokemons = useSelectedPokemons();
  const { togglePokemons } = usePokemonActions();
  const isSelected = selectedPokemons.some((p) => p.id === pokemon.id);

  const openDetails = (e: MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams(searchParams);
    params.set('id', String(pokemon.id));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={openDetails}
        aria-hidden
      />
      <div
        className="absolute left-3 top-3"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => togglePokemons(pokemon)}
          className="size-4 rounded border-gray-300 text-indigo-600 cursor-pointer"
        />
      </div>
    </>
  );
}
