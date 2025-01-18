import { useEffect, useRef } from "react";

export const useDebounce = (fn, delay) => {
  const timerRef = useRef(null);
  const debouncedFunction = (...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);
  return debouncedFunction;
};
