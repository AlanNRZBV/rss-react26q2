import { createFileRoute } from '@tanstack/react-router';
import NotFound from '../components/NotFound/NotFound.tsx';

export const Route = createFileRoute('/$')({
  component: () => <NotFound />,
});
