import axios from 'axios';

export type ApiError = Error & {
  statusCode: number | null;
  axiosCode?: string;
};

const createApiError = (
  statusCode: number | null,
  message: string,
  axiosCode?: string
) => {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  error.axiosCode = axiosCode;
  return error;
};

export const handleApiError = (error: unknown, term?: string) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const code = error.code;

    if (status) {
      if (status === 404) {
        const message = term
          ? `No Pokémon found for "${term}".`
          : 'Resource not found.';
        throw createApiError(404, message, code);
      }
      if (status >= 500) {
        throw createApiError(
          status,
          `Server error. Please try again later.`,
          code
        );
      }
      if (status >= 400) {
        throw createApiError(
          status,
          `Client error. Please check your request.`,
          code
        );
      }
    }

    switch (code) {
      case 'ERR_NETWORK':
        throw createApiError(
          null,
          'Network error. Please check your internet connection.',
          code
        );
      case 'ECONNABORTED':
      case 'ETIMEDOUT':
        throw createApiError(
          null,
          'Request timed out. The server took too long to respond.',
          code
        );
      case 'ERR_CANCELED':
        throw createApiError(null, 'The request was canceled.', code);
      case 'ERR_BAD_RESPONSE':
        throw createApiError(
          500,
          'Invalid or unexpected format received from the server.',
          code
        );
      case 'ERR_BAD_REQUEST':
        throw createApiError(
          400,
          'Missing required parameters or bad request format.',
          code
        );
      case 'ERR_INVALID_URL':
        throw createApiError(null, 'Invalid API URL configuration.', code);
      default:
        throw createApiError(null, `Request failed: ${error.message}`, code);
    }
  }

  if (error instanceof Error) {
    throw createApiError(null, error.message);
  }

  throw createApiError(null, 'An unexpected error occurred.');
};
