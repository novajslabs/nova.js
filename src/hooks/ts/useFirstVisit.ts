import { useState } from 'react';

export const useFirstVisit = (): boolean => {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);

  const firstVisit = localStorage.getItem('firstVisit');

  if (firstVisit === null) {
    localStorage.setItem('firstVisit', 'true');
    setIsFirstVisit(true);
  }

  return isFirstVisit;
};
