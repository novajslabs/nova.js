import { useState, useEffect } from "react";

export const useTitle = () => {
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const changeTitle = (newTitle) => setTitle(newTitle);

  return { title, changeTitle };
};
