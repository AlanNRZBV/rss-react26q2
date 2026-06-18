'use client';

import CustomLink from '../UI/CustomLink/CustomLink.tsx';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import CustomButton from '../UI/CustomButton/CustomButton.tsx';
import { getPokemonsQueryOptions } from '../../hooks/usePokemons.ts';
import { useTranslations } from 'next-intl';

const NavBar = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('nav');

  const handleRefresh = async () => {
    const k = getPokemonsQueryOptions().queryKey[0];
    // eslint-disable-next-line @tanstack/query/prefer-query-options
    await queryClient.invalidateQueries({
      queryKey: [k],
    });
  };

  const count = useIsFetching();

  return (
    <nav className="flex justify-between gap-4">
      <CustomLink href="/">{t('home')}</CustomLink>
      <CustomLink href="/about">{t('home')}</CustomLink>
      <CustomButton onClick={handleRefresh} disabled={count > 0}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </CustomButton>
    </nav>
  );
};

export default NavBar;
