import { useState, useEffect } from "react";

interface UseTitleOutput {
  title: string;
  changeTitle: (newTitle: string) => void;
}

export const useTitle = (): UseTitleOutput => {
  const [title, setTitle] = useState<string>(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const changeTitle = (newTitle: string) => setTitle(newTitle);

  return { title, changeTitle };
};
