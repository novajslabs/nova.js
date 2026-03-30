import { useState } from "react";

export const useTitle = () => {
  const [title, setTitle] = useState<string>(document.title);

  const changeTitle = (newTitle: string) => {
    document.title = newTitle;
    setTitle(newTitle);
  };

  return { title, changeTitle };
};
