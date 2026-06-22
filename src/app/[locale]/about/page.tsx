import BarContainer from '../../../components/UI/BarContainer/BarContainer.tsx';
import NavBar from '../../../components/NavBar/NavBar.tsx';
import ProjectDetails from '../../../components/About/ProjectDetails.tsx';

export default function AboutPage() {
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
