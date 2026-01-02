
// src/hooks/useDebounce.js
import { useEffect, useState } from "react";

/**
 * Returns a debounced version of `value` that updates only after `delay` ms.
 * Useful to avoid filtering on every keystroke when the user types quickly.
 */
export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
