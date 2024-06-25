import { useState } from 'react';

export const useInput = <T>(initialValue: T) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value as unknown as T);
  };

  return { inputValue, onInputChange };
};
