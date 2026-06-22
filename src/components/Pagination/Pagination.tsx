import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '../../i18n/navigation';

const buttonClass =
  'grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white';

const itemClass =
  'block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white';

const activeItemClass =
  'block size-8 rounded border border-indigo-600 bg-indigo-600 text-center text-sm/8 font-medium text-white dark:border-indigo-500 dark:bg-indigo-500';

function buildHref(page: number, query: string) {
  return {
    pathname: '/' as const,
    query: query ? { page, q: query } : { page },
  };
}

type PaginationButtonProps = {
  page: number;
  query: string;
  disabled: boolean;
  ariaLabel: string;
  children: ReactNode;
};

const PaginationButton = ({
  page,
  query,
  disabled,
  ariaLabel,
  children,
}: PaginationButtonProps) => {
  if (disabled) {
    return (
      <li>
        <span
          className={`${buttonClass} pointer-events-none`}
          aria-label={ariaLabel}
        >
          {children}
        </span>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={buildHref(page, query)}
        className={buttonClass}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    </li>
  );
};

type PaginationItemProps = {
  page: number;
  query: string;
  isActive: boolean;
};

const PaginationItem = ({ page, query, isActive }: PaginationItemProps) => {
  if (isActive) {
    return <li className={activeItemClass}>{page}</li>;
  }

  return (
    <li>
      <Link href={buildHref(page, query)} className={itemClass}>
        {page}
      </Link>
    </li>
  );
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  query?: string;
};

const Pagination = async ({
  currentPage,
  totalPages,
  query = '',
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const t = await getTranslations('pagination');

  const items = [];
  let start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  for (let i = start; i <= end; i++) {
    items.push(
      <PaginationItem
        key={i}
        page={i}
        query={query}
        isActive={i === currentPage}
      />
    );
  }

  return (
    <ul className="flex justify-center gap-1 text-gray-900 mt-8 mb-12">
      <PaginationButton
        page={currentPage - 1}
        query={query}
        disabled={currentPage <= 1}
        ariaLabel={t('prev')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </PaginationButton>

      {items}

      <PaginationButton
        page={currentPage + 1}
        query={query}
        disabled={currentPage >= totalPages}
        ariaLabel={t('next')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </PaginationButton>
    </ul>
  );
};

export default Pagination;
