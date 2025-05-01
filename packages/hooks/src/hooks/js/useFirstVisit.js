import { useState } from 'react';

export const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  const firstVisit = localStorage.getItem('firstVisit');

  if (firstVisit === null) {
    localStorage.setItem('firstVisit', 'true');
    setIsFirstVisit(true);
  }

  return isFirstVisit;
};
