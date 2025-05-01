import { useState } from 'react';

export const useToggle = (initialValue: boolean) => {
  const [current, setCurrent] = useState(initialValue);

  const handleToggle = () => setCurrent((prev) => !prev);

  return { current, handleToggle };
};
