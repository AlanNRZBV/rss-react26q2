import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';

export const renderWithProviders = (ui: React.ReactElement) => {
  return rtlRender(<ThemeProvider>{ui}</ThemeProvider>);
};
