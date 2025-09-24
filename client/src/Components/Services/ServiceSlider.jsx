import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 

const ServiceSlider = () => {
  const slides = [
    { id: 1, image: "../assets/Images/guardb.jpg" },
    { id: 2, image: "../assets/Images/tec.jpg" },
    { id: 5, image: "../assets/Images/guardb.jpg" },
    { id: 6, image: "../assets/Images/tec.jpg" },
  ];

  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Slider */}
      <div className="relative w-full overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-full h-[90vh] flex justify-center items-center"
            >
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-4xl !font-bold mb-2 font-['Roboto_Condensed',sans-serif] !text-[#15487d]"
           style={{ fontFamily: "Arial, sans-serif" }}>
            Our Services
          </h1>
          <p className="text-sm md:text-xl  max-w-xl !font-bold !text-[#15487d]"
           style={{ fontFamily: "Arial, sans-serif" }}>
            Explore our services tailored for both physical and digital worlds.
          </p>
        </div>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute inset-y-0 left-0 flex items-center justify-center w-12 text-white hover:bg-white/20 rounded-s-lg z-10"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-white hover:bg-white/20 rounded-e-lg z-10"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dots Pagination */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full border transition ${
                current === index
                  ? "bg-[#15487d] border-blue-700"
                  : "border-gray-300 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="grid md:grid-cols-2 gap-4 p-4 md:p-6 bg-gray-50 py-8 md:py-12 max-w-5xl mx-auto">
        {/* Physical Security */}
        <div className="group relative bg-white shadow-md rounded-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Hover Content - Compact */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-center">
              <h3 className="text-sm md:text-base font-bold text-blue-800 mb-0.5 font-['Roboto_Condensed',sans-serif]">Physical Security</h3>
              <p className="text-xs text-gray-700 leading-tight mb-0.5 font-['Roboto_Condensed',sans-serif]">
                Armed guards, access control, patrol
              </p>
              <p className="text-xs text-gray-600 font-['Roboto_Condensed',sans-serif]">
                24/7 • Trained • Custom
              </p>
            </div>
          </div>
          
          {/* Default Content - Compact */}
          <div className="relative p-3 md:p-4 text-center group-hover:opacity-0 transition-opacity duration-300">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xs md:text-sm font-bold text-blue-800 mb-0.5 font-['Roboto_Condensed',sans-serif]">
              Physical Security
            </h3>
            <p className="text-xs text-gray-700 mb-1.5 font-['Roboto_Condensed',sans-serif]">
              On-ground security for businesses
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/physical-security")}
              className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded font-medium transition hover:bg-blue-700 font-['Roboto_Condensed',sans-serif]"
            >
              Learn More
            </motion.button>
          </div>
        </div>

        {/* Digital Security */}
        <div className="group relative bg-white shadow-md rounded-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Hover Content - Compact */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-center">
              <h3 className="text-sm md:text-base font-bold text-green-800 mb-0.5 font-['Roboto_Condensed',sans-serif]">Digital Security</h3>
              <p className="text-xs text-gray-700 leading-tight mb-0.5 font-['Roboto_Condensed',sans-serif]">
                Cybersecurity, threat detection, protection
              </p>
              <p className="text-xs text-gray-600 font-['Roboto_Condensed',sans-serif]">
                Real-time • Encryption • 24/7
              </p>
            </div>
          </div>
          
          {/* Default Content - Compact */}
          <div className="relative p-3 md:p-4 text-center group-hover:opacity-0 transition-opacity duration-300">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2a2 2 0 11-4 0V7a1 1 0 012 0 1 1 0 012 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xs md:text-sm font-bold text-green-800 mb-0.5 font-['Roboto_Condensed',sans-serif]">
              Digital Security
            </h3>
            <p className="text-xs text-gray-700 mb-1.5 font-['Roboto_Condensed',sans-serif]">
              Cutting-edge cybersecurity
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/digital-security")}
              className="px-2.5 py-1 text-xs bg-green-600 text-white rounded font-medium transition hover:bg-green-700 font-['Roboto_Condensed',sans-serif]"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </div>
       
    </>
  );
};

export default ServiceSlider;
