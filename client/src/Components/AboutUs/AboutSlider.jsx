import React from "react";
import { motion } from "framer-motion";
import aboutus from "../assets/aboutbg2.jpg";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const AboutSlider = ({ isDigitalSecurityActive }) => {
  return (

      <div className="relative z-20">
  <motion.div
  className="relative w-full h-[60vh] mt-0 items-center flex justify-center bg-cover shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
  style={{ backgroundImage: `url(${aboutus})` }}
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ amount: 0.3 }}
>
  {/* Centered Text */}
  <div className="relative text-center px-6">
    <h1
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl !font-bold drop-shadow-lg tracking-wide ${
        isDigitalSecurityActive ? "!text-[#702829]" : "!text-[#15487d]"
      }`}
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      About Us
    </h1>

    <p
      className="mt-4 max-w-2xl mx-auto text-gray-800 text-sm sm:text-base md:text-lg font-semibold drop-shadow-md"
      style={{ fontFamily: "Arial Narrow" }}
    >
      We are dedicated to providing innovative solutions that blend technology,
      creativity, and professionalism. Our mission is to build digital
      experiences that truly inspire.
    </p>

    {/* Learn More Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`mt-6 px-6 py-2 !rounded-3xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all ${
        isDigitalSecurityActive
          ? "bg-[#702829] text-white"
          : "bg-[#0b3664] text-white"
      }`}
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      Learn More
    </motion.button>
  </div>
</motion.div>
</div>



  );
};

export default AboutSlider;
