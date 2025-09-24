"use client";
import { motion, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BiSolidUpArrowAlt } from "react-icons/bi";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Toggle button visibility when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 w-14 h-14 flex items-center justify-center rounded  transition
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* Arrow */}
      <span className="text-2xl z-10"><BiSolidUpArrowAlt /></span>

      {/* Circular Progress */}
      <svg className="absolute w-full h-full -rotate-120">
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="#15487d"
          strokeWidth="2"
          fill="transparent"
        />
        <motion.circle
          cx="28"
          cy="28"
          r={radius}
          stroke="#15487d"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: circumference,
            pathLength: scrollYProgress, // ← Animated smoothly by Framer Motion
          }}
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;


    
       





                  

                


                     