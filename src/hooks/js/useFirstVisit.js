import { useState, useEffect } from 'react';

export const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');

    if (firstVisit === null) {
      localStorage.setItem('firstVisit', 'false');
      setIsFirstVisit(true);
    }
  }, []);

  return isFirstVisit;
};
