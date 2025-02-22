import { useEffect } from "react";

export const useEvent = <T extends Event>(
  name: string,
  callback: (event: T) => void,
  deps: unknown[] = []
) =>
  useEffect(() => {
    window.addEventListener(
      name,
      callback as EventListenerOrEventListenerObject
    );
    return () =>
      window.removeEventListener(
        name,
        callback as EventListenerOrEventListenerObject
      );
  }, [name, callback, ...deps]);
