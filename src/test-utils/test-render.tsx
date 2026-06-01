import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { QueryClientWrapper } from './QueryClientWrapper';
import { ThemeProvider } from '../context/ThemeContext';

export const renderWithProviders = (ui: React.ReactElement) => {
  return rtlRender(
    <ThemeProvider>
      <QueryClientWrapper>{ui}</QueryClientWrapper>
    </ThemeProvider>
  );
};
