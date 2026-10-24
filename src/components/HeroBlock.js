"use client";
import PropTypes from "prop-types";
import { useIntersection } from "@/utilities/intersectionContext";

export default function HeroBlock({ children }) {
  const { heroRef } = useIntersection();
  const heroStyle = {
    "--hero-bg": "url(/images/tkd-HeroBack5.png)",
  };

  return (
    <div className="HeroBlockContainer">
      <div className="HeroBlock" id="hero" ref={heroRef} style={heroStyle}>
        {children}
      </div>
    </div>
  );
}

HeroBlock.propTypes = {
  children: PropTypes.node,
};
