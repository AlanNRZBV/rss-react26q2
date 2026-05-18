import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  const updateValue = (newValue: string) => {
    const trimmedValue = newValue.trim();
    setValue(trimmedValue);
    localStorage.setItem(key, trimmedValue);
  };

  return [value, updateValue] as const;
};
