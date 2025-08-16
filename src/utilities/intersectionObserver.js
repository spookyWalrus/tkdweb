"use client";
import { useRef, useEffect } from "react";

export function useIntersectionObserver(ref, callback, options) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => callbackRef.current(entry.isIntersecting),
      options
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
}
