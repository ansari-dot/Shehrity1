


import React from "react";
import vidios from "/assets/Videos/123.mp4";
import { TypeAnimation } from "react-type-animation";

const HeroSection = ({ isDigitalSecurityActive }) => {
  return (
    <div className="relative w-full h-[95vh] overflow-hidden pt-[10px] md:pt-[95px]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={vidios} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 sm:px-10 md:px-16 text-white space-y-4 sm:space-y-8 mt-24 sm:mt-20 lg:mt-6">
        {/* Title */}
        <h1
          className="text-xl sm:text-2xl md:text-4xl !font-bold max-w-xl sm:max-w-2xl leading-snug"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          Protecting People, Assets & Communities —
          <br className="hidden sm:block" />
          <TypeAnimation
            sequence={[
              "Trusted Physical Security Solutions.", // text
              2000, // wait 2 sec
              "", // delete
              500, // small pause
            ]}
            wrapper="span"
            speed={10}
            deletionSpeed={30}
            repeat={Infinity}
            className="text-[#ffffff] text-xl sm:text-2xl md:text-3xl font-bold"
          />
        </h1>

        {/* Paragraph */}
        <p
          className="sm:text-base md:text-sm max-w-md sm:max-w-xl mt-2"
          style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
        >
          Comprehensive protection powered by expertise, technology, and 24/7
          support.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* About Us */}
          <button
            className={`px-5 py-2.5 rounded-full  text-sm font-bold transform hover:scale-105 
        transition-all duration-300
              ${
                isDigitalSecurityActive
                  ? "bg-[#702829] hover:bg-[#702829] text-white" // brown in digital mode
                  : "!bg-[rgb(10,50,94)] hover:bg-blue-950 text-white" // blue in physical mode
              }
            `}
            style={{ borderRadius: "9999px", fontFamily: "Arial, sans-serif" }}
          
          >
            About Us
          </button>

          {/* View Solution */}
          <button
            className={`px-5 py-2.5 rounded-full  text-sm font-bold  transform hover:scale-105 
        transition-all duration-300
              ${
                isDigitalSecurityActive
                  ? "bg-white text-black border border-gray-300 hover:bg-gray-200" // white in digital mode
                  : "bg-white text-black !border-2 !border-blue-900 hover:bg-gray-100" // white with blue border in physical mode
              }
            `}
            style={{ borderRadius: "9999px", fontFamily: "Arial, sans-serif" }}
          >
            View Solution
          </button>
        </div>

        {/* Checkpoints */}
        {/* <div className="flex flex-wrap gap-1 mb-2">
          <span className="px-3 py-1.5 border border-gray-300 rounded-full text-sm"
                      style={{ fontFamily: "Arial, sans-serif" }}
          >
            ✔️ ISO Certified
          </span>
          <span className="px-3 py-1.5 border border-gray-300 rounded-full text-sm"
                      style={{ fontFamily: "Arial, sans-serif" }}>
            ✔️ Trusted by NGOs & Enterprises
          </span>
          <span className="px-3 py-1.5 border border-gray-300 rounded-full text-sm"
                      style={{ fontFamily: "Arial, sans-serif" }}>
            ✔️ 24/7 Support
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
