import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import ErrorFallback from './components/ErrorBoundary/ErrorFallback.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <TanStackRouterDevtools router={router} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
