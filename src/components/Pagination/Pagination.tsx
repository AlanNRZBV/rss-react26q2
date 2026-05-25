import type { FC, ReactNode } from 'react';

type PaginationButtonProps = {
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
  children: ReactNode;
};

const PaginationButton: FC<PaginationButtonProps> = ({
  onClick,
  disabled,
  ariaLabel,
  children,
}) => (
  <li>
    <button
      onClick={onClick}
      disabled={disabled}
      className="grid size-8 place-content-center rounded border
      border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180
      disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300
      dark:hover:bg-gray-800 dark:hover:text-white"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  </li>
);

type PaginationItemProps = {
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
};

const PaginationItem: FC<PaginationItemProps> = ({
  page,
  isActive,
  onClick,
}) => {
  if (isActive) {
    return (
      <li
        className="block size-8 rounded border border-indigo-600
        bg-indigo-600 text-center text-sm/8 font-medium text-white dark:border-indigo-500 dark:bg-indigo-500"
      >
        {page}
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => onClick(page)}
        className="block size-8 rounded border border-gray-200 text-center
        text-sm/8 font-medium transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300
        dark:hover:bg-gray-800 dark:hover:text-white"
      >
        {page}
      </button>
    </li>
  );
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageItems = () => {
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
          isActive={i === currentPage}
          onClick={handlePageChange}
        />
      );
    }
    return items;
  };

  return (
    <ul className="flex justify-center gap-1 text-gray-900 mt-8 mb-12">
      <PaginationButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        ariaLabel="Previous page"
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

      {renderPageItems()}

      <PaginationButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        ariaLabel="Next page"
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
