// https://bom-shibuya.hatenablog.com/entry/2020/10/27/182226
import { useCallback, useEffect, useRef } from "react";

export const useAnimationFrame = (callback: () => void) => {
  const requestRef = useRef<ReturnType<typeof requestAnimationFrame>>();

  const animate = useCallback(() => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        return cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};
