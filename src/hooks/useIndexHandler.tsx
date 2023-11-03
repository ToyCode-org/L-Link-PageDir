import { useState } from "react";

export const useIndexHandler = () => {
  const [indexNumber, setIndex] = useState(0);
  const indexHandler = (num: number) => {
    setIndex(num);
  };

  return { indexNumber, indexHandler };
};
