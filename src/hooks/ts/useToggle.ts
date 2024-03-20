import { useState } from "react";

export const useToggle = (initialValue: boolean) => {
  const [current, setCurrent] = useState(initialValue);

  const handleToggle = () => setCurrent((prev) => !prev);

  const setToggle = (value: boolean) => setCurrent(value);

  return { current, handleToggle, setToggle };
};
