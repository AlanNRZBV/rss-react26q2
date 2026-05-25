import React from 'react';
import { act, render, type RenderOptions } from '@testing-library/react';
import {
  createRouter,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import { ThemeProvider } from '../context/ThemeContext.tsx';

export { createMockFileRoute } from './mock-route-utils';

interface RenderWithFileRoutesOptions extends Omit<RenderOptions, 'wrapper'> {
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

  let result!: ReturnType<typeof render>;

  await act(async () => {
    await router.load();
    result = render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>,
      renderOptions
    );
  });

  return { ...result, router };
}
