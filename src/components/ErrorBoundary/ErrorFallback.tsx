import CustomButton from '../UI/CustomButton/CustomButton';
import type { FC } from 'react';

type ErrorFallbackProps = {
  error: Error;
  resetError: () => void;
};

const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg rounded-lg border border-red-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-gray-900">
              Something went wrong
            </h2>
          </div>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>

          <div className="mt-6">
            <CustomButton
              onClick={resetError}
              className="w-full justify-center"
            >
              Try again
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
