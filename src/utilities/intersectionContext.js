"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";
// import { useIntersectionObserver } from "./intersectionObserver";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";

const IntersectionContext = createContext();

export function IntersectionProvider({ children }) {
  const [showButton, setShowButton] = useState(false);
  const heroRef = useRef(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname.match(/^\/[a-z]{2}$/);

  useEffect(() => {
    if (isHomePage) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  }, [pathname, isHomePage]);
  // Simple scroll-based logic for home page
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      // Show button when scrolled down more than 300px
      const scrollThreshold = window.innerWidth >= 768 ? 400 : 300;
      const shouldShow = window.scrollY > scrollThreshold;
      setShowButton(shouldShow);
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <IntersectionContext.Provider value={{ showButton, heroRef }}>
      {children}
    </IntersectionContext.Provider>
  );
}

IntersectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useIntersection() {
  const context = useContext(IntersectionContext);
  if (!context) {
    throw new Error(
      "useIntersectionObserver must be used within IntersectionProvider"
    );
  }
  return context;
}
