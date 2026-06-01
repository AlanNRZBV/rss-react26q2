import axios from 'axios';
import type { FC } from 'react';
import type { ApiError } from '../../api/errorHandler.ts';

type LocalErrorProps = {
  error: Error;
};

const LocalError: FC<LocalErrorProps> = ({ error }) => {
  let errorCode = 500;
  if (axios.isAxiosError(error)) {
    errorCode = error.response?.status || 500;
  } else if (error && typeof error === 'object' && 'statusCode' in error) {
    errorCode = (error as ApiError).statusCode || 500;
  }

  const is404Error = errorCode === 404;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-100 p-8 bg-red-50/50 dark:bg-red-900/10 border-2 border-dashed border-red-200 dark:border-red-800/50 rounded-2xl transition-all">
      <div className="text-7xl font-black text-red-200/70 dark:text-red-900/40 mb-4 tracking-tighter select-none">
        {errorCode}
      </div>
      <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2 text-center">
        {is404Error ? 'Nothing found' : 'Fetching data error'}
      </h3>
      <p className="text-red-600 dark:text-red-300 text-center mb-8 max-w-sm">
        {error.message || 'Unexpected error'}
      </p>
    </div>
  );
};

export default LocalError;
