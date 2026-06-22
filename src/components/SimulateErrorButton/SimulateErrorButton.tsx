'use client';

import { useState } from 'react';
import CustomButton from '../UI/CustomButton/CustomButton.tsx';

const SimulateErrorButton = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Simulated application error');
  }

  const handleSimulateError = () => {
    console.error('Simulated error triggered by user');
    setThrowError(true);
  };

  return (
    <CustomButton onClick={handleSimulateError} className="self-end bg-red-200">
      Simulate Error
    </CustomButton>
  );
};

export default SimulateErrorButton;
