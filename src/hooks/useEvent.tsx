import { useEffect } from "react";

export const useEvent = (name: string, callback: () => void) =>
  useEffect(() => {
    window.addEventListener(name, callback);
    return () => window.removeEventListener(name, callback);
  }, [name, callback]);
