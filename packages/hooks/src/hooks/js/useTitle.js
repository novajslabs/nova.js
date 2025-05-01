import { useState } from 'react';

export const useTitle = () => {
  const [title, setTitle] = useState(document.title);

  const changeTitle = (newTitle) => {
    document.title = newTitle;
    setTitle(newTitle);
  }

  return { title, changeTitle };
};
