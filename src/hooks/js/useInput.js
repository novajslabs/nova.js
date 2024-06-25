import { useState } from 'react';

export const useInput = (initialValue) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return { inputValue, onInputChange };
};
