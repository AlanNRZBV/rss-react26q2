import type { FC } from 'react';
import type { FormSchemaType } from '../../store/store.ts';

type DataItemProps = {
  submission: FormSchemaType;
};

const DataItem: FC<DataItemProps> = ({ submission }) => {
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
  return (
    <div className="flow-root">
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
            {files as string}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default DataItem;
