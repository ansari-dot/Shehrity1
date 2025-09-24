import React from "react";
import digitalVideo from "/assets/Videos/11.mp4";
import { TypeAnimation } from "react-type-animation";

const DigitalHeroSection = ({isDigitalSecurityActive }) => {
  return (
    <div className="relative w-full h-[95vh] overflow-hidden pt-[5px]  md:pt-[90px]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-screen object-cover"
      >
        <source src={digitalVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 sm:px-10 md:px-16 text-white space-y-6 sm:space-y-8 mt-24 sm:mt-20 lg:mt-6">
        {/* Title */}
        <h1
          className="text-xl sm:text-2xl md:text-4xl !font-bold max-w-xl sm:max-w-2xl leading-snug"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          Safeguarding Your Digital World —
          <br className="hidden sm:block" />
          <TypeAnimation
            sequence={[
              "Advanced Cyber & IT Security Solutions.", // text
              2000, // wait 2s
              "", // delete
              500, // pause
            ]}
            wrapper="span"
            speed={10}
            deletionSpeed={30}
            repeat={Infinity}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
          />
        </h1>

        {/* Paragraph */}
        <p
          className="text-sm sm:text-base md:text-sm max-w-md sm:max-w-xl mt-3"
          style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
        >
          From firewalls to data encryption — protect your business against
          evolving cyber threats with our cutting-edge digital security
          services.
        </p>

        {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
  <button
    className={`px-5 py-2.5 rounded-full  text-sm !font-ibold  transform hover:scale-105 
        transition-all duration-300
      ${isDigitalSecurityActive 
        ? "!bg-[#702829] hover:bg-[#5a2021]"   // brown in digital mode
        : "bg-[#15487d] hover:bg-blue-950"}   // blue in physical mode
    `}
   style={{ borderRadius: "9999px", fontFamily: "Arial, sans-serif" }}
  >
    Get a Free Cyber Audit
  </button>

  <button
    className={`px-5 py-2.5 rounded-full text-sm !font-bold text-black !border-2
       !border-[#702829] transform hover:scale-105 
        transition-all duration-300
      ${isDigitalSecurityActive 
        ? "bg-white hover:bg-[#702829]"   // brown in digital mode
        : "bg-[#15487d] hover:bg-gray-900"}   // blue in physical mode
    `}
    style={{ borderRadius: "9999px", fontFamily: "Arial, sans-serif" }}
  >
    Explore Digital Solutions
  </button>
</div>

        {/* Checkpoints */}
        {/* <div className="md:flex flex flex-wrap gap-1 ">
          <span className="px-3 py-1.5 border border-gray-300 rounded-full text-sm">
            🔒 End-to-End Encryption
          </span>
          <span className="px-3 py-1.5 border border-gray-300 rounded-full text-sm">
            🛡️ AI-Powered Threat Detection
          </span>
          <span className="px-3 py-1.5 border border-gray-300 rounded-full text-sm">
            🌐 24/7 Cyber Monitoring
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default DigitalHeroSection;

