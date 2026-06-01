import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import ErrorFallback from './components/ErrorBoundary/ErrorFallback.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error, reset }) => (
    <ErrorFallback error={error} resetError={reset} />
  ),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TanStackRouterDevtools router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
