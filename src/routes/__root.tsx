import { createRootRoute, Outlet } from '@tanstack/react-router';
import NotFound from '../components/NotFound/NotFound.tsx';
import Layout from '../components/Layout/Layout.tsx';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
