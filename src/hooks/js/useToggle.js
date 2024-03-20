import { useState } from "react";

export const useToggle = (initialValue) => {
  const [current, setCurrent] = useState(initialValue);

  const handleToggle = () => setCurrent((prev) => !prev);

  const setToggle = (value) => setCurrent(value);

  return { current, handleToggle, setToggle };
};
