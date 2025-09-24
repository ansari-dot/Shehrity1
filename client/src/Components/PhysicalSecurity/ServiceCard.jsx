import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ service, setSelectedService, setShowApplyModal }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ✅ update when screen resizes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
 
 <motion.div   className="relative w-full min-h-[24rem] md:min-h-[40rem] cursor-pointer"
 // ⬆️ increased height
  onMouseEnter={() => !isMobile && setIsFlipped(true)}
  onMouseLeave={() => !isMobile && setIsFlipped(false)}
  whileHover={!isMobile ? { scale: 1.02 } : {}}
  transition={{ duration: 0.2 }}
>
  {!isMobile ? (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Front */}
      <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-[32rem] object-cover"
        />
      </div>

      {/* Back */}
      <div
        className="absolute inset-0 w-full min-h-full [backface-visibility:hidden] rounded-lg p-4 shadow-md flex flex-col bg-white"
        style={{ transform: "rotateY(180deg)" }}
      >
        <div className="text-center mb-2">
          <div className="inline-block p-2 rounded bg-gray-100">
            <div className="w-6 h-6">{service.icon}</div>
          </div>
          <h3
            className="!text-2xl font-bold text-black mt-2" // ⬆️ bigger title
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {service.title}
          </h3>
        </div>
        <p
          className="text-gray-700 !text-lg text-center mb-3" // ⬆️ bigger description
          style={{ fontFamily: "Arial Narrow" }}
        >
          {service.description.substring(0, 60)}...
        </p>
        <div className="mt-auto flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedService(service);
              setShowApplyModal(true);
            }}
            className="bg-blue-600 text-white py-2 px-4 rounded text-sm !font-bold transition"
          >
            Apply
          </button>
        </div>
      </div>
    </motion.div>
  ) : (
    // Mobile version
    <div className="w-full h-full rounded-lg overflow-hidden shadow-md flex flex-col bg-white">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-32 object-cover" // ⬆️ taller image
      />
      <div className="p-4 text-center flex flex-col flex-grow">
        <div className="inline-block p-2 rounded bg-gray-100 mb-2">
          <div className="w-6 h-6">{service.icon}</div>
        </div>
        <h3
          className="!text-2xl !font-bold text-black mb-2" // ⬆️ bigger title
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {service.title}
        </h3>
        <p
          className="text-gray-700 !text-lg mb-3" // ⬆️ bigger description
          style={{ fontFamily: "Arial Narrow" }}
        >
          {service.description.substring(0, 60)}...
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedService(service);
            setShowApplyModal(true);
          }}
          className="bg-[#0f3e70] text-white py-2 px-4 rounded text-sm !font-bold transition"
        >
          Apply
        </button>
      </div>
    </div>
  )}
</motion.div>

  );
};

export default ServiceCard;
