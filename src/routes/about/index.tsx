import { createFileRoute } from '@tanstack/react-router';
import NavBar from '../../components/NavBar/NavBar.tsx';
import BarContainer from '../../components/UI/BarContainer/BarContainer.tsx';
import ProjectDetails from './-components/ProjectDetails.tsx';

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4">
      <BarContainer>
        <NavBar />
      </BarContainer>
      <BarContainer>
        <ProjectDetails />
      </BarContainer>
    </div>
  );
}
