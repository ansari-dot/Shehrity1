import React from "react";
import { motion } from "framer-motion";

const milestones = [
  { year: "1980", event: "Company Founded", desc: "Started as a small security firm with big dreams" },
  { year: "1995", event: "Major Expansion", desc: "Expanded services to include armed security and event protection" },
  { year: "2010", event: "Technology Integration", desc: "Integrated cutting-edge surveillance and monitoring systems" },
  { year: "2020", event: "Digital Transformation", desc: "Launched mobile app and AI-powered security solutions" },
  { year: "2024", event: "Industry Leader", desc: "Recognized as Australia's premier security service provider" },
];

export default function TimelineSection({ isDigitalSecurityActive }) {
  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // 🎨 Colors
  const primaryColor = isDigitalSecurityActive ? "#702829" : "#15487d"; // text + circle
  const headingColor = isDigitalSecurityActive ? "#070606": "#15487d"; // Our Journey
  const yearColor = isDigitalSecurityActive ? "#702829" : "#15487d"; // numbers

  const lineColor = isDigitalSecurityActive ? "#070606" : "#bfdbfe"; // vertical line
  const circleColor = isDigitalSecurityActive ? "#702829" : "#15487d"; // dot

  return (
    <div className="p-6 md:p-10 mb-20 ">
      {/* Section Heading */}
      <div className="flex justify-center items-center mb-12 ">
        <h2
          className="text-2xl md:text-3xl !font-bold text-center"
          style={{ fontFamily: "Arial, sans-serif", color: headingColor }}
        >
          Our Journey
        </h2>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div
          className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full hidden md:block "
          style={{ backgroundColor: lineColor }}
        ></div>

        <div className="space-y-12 md:space-y-16">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Card */}
            {/* Card */}
<div
  className={`w-full md:w-1/2 ${
    index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
  }`}
>
  <div
    className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
    style={{
      backgroundColor: isDigitalSecurityActive ? "#f4f4f4" : "#ffffff", // ✅ Full background
    }}
  >
    {/* Year */}
    <div
      className="!font-bold text-xl md:text-2xl mb-2"
      style={{ color: yearColor }}
    >
      {milestone.year}
    </div>

    {/* Event Title */}
    <h3
      className="!text-lg md:text-xl !font-bold mb-2"
      style={{ fontFamily: "Arial, sans-serif", color: primaryColor }}
    >
      {milestone.event}
    </h3>

    {/* Description */}
    <p style={{ fontFamily: '"Arial Narrow", Arial, sans-serif' }}>
      {milestone.desc}
    </p>
  </div>
</div>


              {/* Circle on the line */}
              <div className="relative z-10 flex justify-center md:block">
                <div
                  className="w-5 h-5 rounded-full border-4 border-white shadow-lg transition-transform duration-300 hover:scale-125"
                  style={{ backgroundColor: circleColor }}
                ></div>
              </div>

              <div className="hidden md:block w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
