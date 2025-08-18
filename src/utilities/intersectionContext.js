"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import { useIntersectionObserver } from "./intersectionObserver";
import PropTypes from "prop-types";

const IntersectionContext = createContext();

export function IntersectionProvider({ children }) {
  const [showButton, setShowButton] = useState(false);
  const heroRef = useRef(null);

  useIntersectionObserver(heroRef, (isIntersecting) =>
    setShowButton(!isIntersecting)
  );

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
