import Container from './components/Container/Container.tsx';
import CustomButton from './components/ui/CustomButton/CustomButton.tsx';

function App() {
  return (
    <Container>
      <div className="flex gap-4">
        <CustomButton title="Controlled" />
        <CustomButton variant="text" title="Uncontrolled" />
      </div>
    </Container>
  );
}

export default App;
