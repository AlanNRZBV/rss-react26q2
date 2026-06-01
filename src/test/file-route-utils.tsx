import React from 'react';
import { act, render, type RenderOptions } from '@testing-library/react';
import {
  createRouter,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import { ThemeProvider } from '../context/ThemeContext.tsx';

import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '../test-utils/QueryClientWrapper.tsx';

export { createMockFileRoute } from './mock-route-utils';

interface RenderWithFileRoutesOptions extends RenderOptions {
  initialLocation?: string;
  routerContext?: Record<string, unknown>;
}

export async function renderWithFileRoutes(
  _ui: React.ReactElement,
  {
    initialLocation = '/',
    routerContext = {},
    ...renderOptions
  }: RenderWithFileRoutesOptions = {}
) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: routerContext,
  });

  const queryClient = createTestQueryClient();
  let result!: ReturnType<typeof render>;

  await act(async () => {
    await router.load();
    result = render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>,
      renderOptions
    );
  });

  return { ...result, router };
}
