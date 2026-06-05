import { type FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import CustomButton from '../CustomButton/CustomButton.tsx';
import ControlledForm from '../../Forms/ControlledForm/ControlledForm.tsx';
import UncontrolledForm from '../../Forms/UncontrolledForm/UncontrolledForm.tsx';
import type { ModalType } from '../../../App.tsx';

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  title: string;
  formType: ModalType;
};

const CustomModal: FC<CustomModalProps> = ({
  title,
  isOpen,
  onClose,
  formType,
  description,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const content =
    formType === 'controlled' ? <ControlledForm /> : <UncontrolledForm />;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="m-auto w-full max-w-xl rounded-lg bg-white p-6 shadow-lg backdrop:bg-black/50 dark:backdrop:bg-white/10 open:animate-in open:fade-in open:zoom-in-95 dark:bg-gray-800"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="modalTitle"
          className="text-xl capitalize font-bold text-gray-900 sm:text-2xl"
        >
          {title}
        </h2>
        <CustomButton
          onClick={() => {
            onClose();
          }}
          variant="iconOnly"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </CustomButton>
      </div>
      <p
        id="modalDescription"
        className="text-pretty capitalize text-gray-700 dark:text-gray-300"
      >
        {description}
      </p>
      <div>{content}</div>
    </dialog>,
    document.body
  );
};

export default CustomModal;
