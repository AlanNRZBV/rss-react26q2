import Container from './components/Container/Container.tsx';
import CustomButton from './components/ui/CustomButton/CustomButton.tsx';
import { useCallback, useState } from 'react';
import CustomModal from './components/ui/CustomModal/CustomModal.tsx';
import DataContainer from './components/DataContainer/DataContainer.tsx';

export type ModalType = 'controlled' | 'uncontrolled';

const MODAL_CONFIG: Record<ModalType, { title: string; description: string }> =
  {
    controlled: {
      title: 'Controlled Form',
      description: 'controlled form description',
    },
    uncontrolled: {
      title: 'Uncontrolled Form',
      description: 'uncontrolled form description',
    },
  };

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<ModalType>('uncontrolled');

  const handleOpen = (type: ModalType) => {
    setFormType(type);
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <Container>
      <div className="flex px-4 rounded-xl border w-full dark:bg-gray-800">
        <DataContainer />
      </div>
      <div className="flex items-center justify-center grow">
        <div className="flex gap-4">
          <CustomButton
            onClick={() => handleOpen('controlled')}
            title="controlled"
          />
          <CustomButton
            onClick={() => handleOpen('uncontrolled')}
            variant="outlined"
            title="uncontrolled"
          />
          <CustomModal
            isOpen={isOpen}
            formType={formType}
            title={MODAL_CONFIG[formType].title}
            description={MODAL_CONFIG[formType].description}
            onClose={handleClose}
          />
        </div>
      </div>
    </Container>
  );
}

export default App;
