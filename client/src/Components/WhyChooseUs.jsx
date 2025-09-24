import React from "react";
import { motion } from "framer-motion";

import { FaCheckCircle } from "react-icons/fa";
import bigImg from "/assets/Images/girls.jpg";
import smallImg1 from "/assets/Images/12.jpg";
import smallImg2 from "/assets/Images/13.png";
import img from "./assets/bg3.png";

const WhyChooseUs = ({ isDigitalSecurityActive }) => {
  return (
    <section
      className="py-12 md:py-16 bg-gray-600"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 md:px-12">
        {/* Left side - Images */}
        <div className="grid grid-cols-2 gap-4">
          <motion.img
            src={bigImg}
            alt="Main"
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-2xl shadow-lg col-span-2 lg:col-span-1"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 100 }}
          />

          <div className="flex flex-col gap-4">
            <motion.img
              src={smallImg1}
              alt="Small1"
              className="w-full h-[120px] sm:h-[150px] md:h-[190px] object-cover rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
            <motion.img
              src={smallImg2}
              alt="Small2"
              className="w-full h-[120px] sm:h-[150px] md:h-[190px] object-cover rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </div>

        {/* Right side - Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6  lg:text-left"
        >
          {/* Heading */}
          <div className="flex  gap-2 ">
            <header
              className={`!font-bold text-2xl ${
                isDigitalSecurityActive ? "text-[#702829]" : "text-[#15487d]"
              }`}
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Why Choose Us
            </header>
          </div>

          {/* Title */}
          <h2
            className={`!text-lg sm:!text-xl md:!text-4xl !font-bold  ${
              isDigitalSecurityActive ? "!text-black" : "text-[#15487d]"
            }`}
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            WE'RE QUALIFIED & PROFESSIONAL
          </h2>

          {/* Description */}
          <p
            className="text-gray-800 text-sm sm:text-base md:text-lg"
             style={{ fontFamily: "Arial Narrow"}}
          >
            Shehrity is a leading security services provider dedicated to
            ensuring safety through innovation and professionalism. With
            experienced staff and advanced technology, we deliver unmatched
            solutions tailored for individuals, businesses, and communities.
          </p>

      
<ul className="space-y-3 text-sm sm:text-base text-gray-900">
  {[
    "Security Consulting",
    "Private Security",
    "Close Protections",
    "24/7 Constant Support",
  ].map((item, index) => (
    <li
      key={index}
      className="flex items-center gap-3 text-gray-700 justify-center lg:justify-start"
    >
      {/* Icon */}
      <FaCheckCircle className="text-[#0a325e] text-lg flex-shrink-0" />

      {/* Text */}
      <span>{item}</span>
    </li>
  ))}
</ul>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
