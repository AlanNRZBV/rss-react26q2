import { type FC, useEffect, useState } from 'react';
import type { FormSchemaType } from '../../store/store.ts';

type DataItemProps = {
  submission: FormSchemaType;
  createdAt: number;
};

const DataItem: FC<DataItemProps> = ({ submission, createdAt }) => {
  const {
    name,
    age,
    confirmPassword,
    password,
    country,
    email,
    files,
    gender,
  } = submission;

  const [isHighlighted, setIsHighlighted] = useState(() => {
    return Date.now() - createdAt < 2000;
  });

  useEffect(() => {
    if (!isHighlighted) return;
    const timer = setTimeout(() => setIsHighlighted(false), 2000);
    return () => clearTimeout(timer);
  }, [isHighlighted]);

  return (
    <div
      className={`transition-colors duration-500 ${
        isHighlighted
          ? 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950'
          : ''
      }`}
    >
      <dl className="-my-3 divide-y divide-gray-200 rounded border border-gray-200 text-sm dark:divide-gray-900 dark:border-gray-900">
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900 dark:text-white">Name</dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            {name}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900 dark:text-white">Age</dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            {age}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900 dark:text-white">Email</dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            {email}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900 dark:text-white">Country</dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            {country}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900 dark:text-white">Gender</dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            {gender}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900 dark:text-white">
            Password
          </dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            {password}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900 dark:text-white">
            Confirm Password
          </dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            {confirmPassword}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900 dark:text-white">Files</dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            <img
              src={files as string}
              alt={`Uploaded by ${name}`}
              className="max-h-62.5 rounded border border-gray-200 object-cover shadow-sm dark:border-gray-700"
            />
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default DataItem;
