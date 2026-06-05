import Container from './components/Container/Container.tsx';
import CustomButton from './components/ui/CustomButton/CustomButton.tsx';
import { useState } from 'react';
import CustomModal from './components/ui/CustomModal/CustomModal.tsx';

export type ModalType = 'controlled' | 'uncontrolled' | null;

function App() {
  const [modal, setModal] = useState<ModalType>(null);

  const handleClose = () => {
    setModal(null);
  };

  return (
    <Container>
      <div className="flex gap-4">
        <CustomButton
          onClick={() => {
            setModal('controlled');
          }}
          title="controlled"
        />
        <CustomButton
          onClick={() => {
            setModal('uncontrolled');
          }}
          variant="outlined"
          title="uncontrolled"
        />
        <CustomModal
          isOpen={modal !== null}
          formType={modal}
          title={
            modal === 'controlled' ? 'controlled form' : 'uncontrolled form'
          }
          onClose={handleClose}
          description={
            modal === 'controlled'
              ? 'controlled form description'
              : 'uncontrolled form description'
          }
        />
      </div>
    </Container>
  );
}

export default App;
