import type { FC, ReactNode } from 'react';

interface DetailItemProps {
  label: string;
  children: ReactNode;
}

export const DetailItem: FC<DetailItemProps> = ({ label, children }) => {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-gray-300">{label}</dt>
      <dd className="text-gray-700 dark:text-gray-400 sm:col-span-2">
        {children}
      </dd>
    </div>
  );
};
