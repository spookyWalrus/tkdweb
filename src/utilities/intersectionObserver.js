"use client";
import { useRef, useEffect } from "react";

export function useIntersectionObserver(ref, callback, options) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!ref.current) return;
    const createObserver = () => {
      const intersect = ref.current.getBoundingClientRect();
      const width = intersect.width;
      let boundary;
      if (width >= 781) {
        boundary = 0.6;
      } else {
        boundary = 0.4;
      }

      const observer = new IntersectionObserver(
        ([entry]) => callbackRef.current(entry.isIntersecting),
        { threshold: boundary }
      );

      observer.observe(ref.current);
      return observer;
    };
    let observer = createObserver();

    const handleResize = () => {
      if (observer) {
        observer.disconnect;
      }
      observer = createObserver();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListner("resize", handleResize);
    };
  }, [ref]);
}
